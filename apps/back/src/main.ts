import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'test-captcha',
    name: 'test.captcha',
    // 服务器存活6秒
    cookie: { maxAge: 1000 * 6, path: '/', httpOnly: true },

    // 更新服务器session缓存时间 和 客户端的cookies缓存时间
    rolling: true

    /**
     * 
     * 客户端 Cookie

如果 maxAge 到期了，浏览器会自动删除这个 cookie

之后发请求就不会再带上这个 session cookie
     */
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
