import { Server } from "./core/Server";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

async function bootstrap() {
  await connectDatabase();

  const server = new Server();
  const app = server.getApp();

  app.listen(env.PORT, () => {
    console.log(`[VIDEOS_API] I'm Ready Sir!`);
  });
}

bootstrap();
