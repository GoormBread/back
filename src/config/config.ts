// import { Inject, Injectable } from '@nestjs/common';
// import RedisStore from 'connect-redis';
// import session from 'express-session';
// import { Redis } from 'ioredis';

// @Injectable()
// export class Config {
//   constructor(
//     @Inject('SESSION_REDIS_CLIENT') private readonly sessionClient: Redis,
//   ) {}

//   getSessionMiddleware() {
//     const RedisStoreClass = RedisStore(session);
//     return session({
//       store: new RedisStoreClass({ client: this.sessionClient }), // new 키워드를 사용하여 인스턴스 생성
//       secret: process.env.SECRET_KEY,
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         secure: false, // HTTPS 사용 시 true로 설정
//         maxAge: 60000, // 쿠키의 유효기간 (밀리초 단위)
//       },
//     });
//   }
// }