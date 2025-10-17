import "dotenv/config";
import amqplib from "amqplib";
import mongoose from "mongoose";

const QUEUE_NAME = "favorites";

const start = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI || "", {});

    const connection = await amqplib.connect(process.env.RABBIT_URI || "");
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(QUEUE_NAME, async (msg) => {
      if (!msg) return;

      try {
        const content = JSON.parse(msg.content.toString());
        const { userId, videoId } = content;

        await mongoose.connection.db?.collection("favorites").updateOne(
          { userId, videoId },
          { $set: { userId, videoId, createdAt: new Date() } },
          { upsert: true }
        );

        channel.ack(msg);
      } catch (err) {
        console.error("Error processing message", err);

      }
    });

    connection.on("close", async () => {
      console.error("Trying to reconnect...");
      setTimeout(start, 5000);
    });

  } catch (err) {
    console.error("Error on favorites-service:", err);
    setTimeout(start, 5000);
  }
};

start();
