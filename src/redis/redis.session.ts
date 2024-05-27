import { INestApplication } from "@nestjs/common";
import * as session from "express-session";
import * as connectRedis from 'connect-redis';
import { Redis } from "ioredis";

export function setUpSession(app: INestApplication): void {
    const redisClient = new Redis(process.env.REDIS_SESSION_URL);
    const RedisStore = connectRedis(session);
    app.use(
        session({
          secret: 'dskjalskg',  // 세션에 사용될 시크릿 값. 감춰두자.
          saveUninitialized: false,
          resave: false,
          store: new RedisStore({  // 세션 스토어 설정. 여기서 RedisStore를 설정해서 client에 위에서 설정한 레디스를 입력하자.
            client: redisClient,
            ttl: 30,  // time to live
          }),
          cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 30000,  //세션이 redis에 저장되는 기간은 maxAge로 조절한다.(ms)
          },
        }),
      );
}