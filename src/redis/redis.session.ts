import { INestApplication } from "@nestjs/common";
import * as session from "express-session";
import * as connectRedis from 'connect-redis';
import { Redis } from "ioredis";

export function setUpSession(app: INestApplication): void {
    const redisClient = new Redis(process.env.REDIS_SESSION_URL);
    const RedisStore = connectRedis(session);
    app.use(
        session({
          secret: process.env.SESSION_SECRET_KEY,  
          saveUninitialized: false,
          resave: false,
          store: new RedisStore({  
            client: redisClient,
            ttl: 30,  
          }),
          cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 60000, 
          },
        }),
      );
}