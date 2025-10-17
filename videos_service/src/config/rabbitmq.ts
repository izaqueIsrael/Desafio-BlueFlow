import amqplib, { Channel } from "amqplib";
import { env } from "./env";

class RabbitMQ {
  private connection?: amqplib.ChannelModel;
  private channel?: Channel;
  private url: string;

  constructor() {
    this.url = env.RABBIT_URI;
  }

  public async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.url);
      this.channel = await this.connection.createChannel();
      console.log("[RABBITMQ] connected");
      
      this.connection.on("close", async () => {
        console.error("[RABBITMQ] disconnected...");
        setTimeout(() => this.connect(), 5000);
      });

    } catch (err) {
      console.error("[VIDEOS_API] Error on connection to rabbitmq", err);
      setTimeout(() => this.connect(), 5000);
    }
  }

  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error("[RABBITMQ] Channel needs to be initialized");
    }
    return this.channel;
  }
  
}

export default RabbitMQ;
