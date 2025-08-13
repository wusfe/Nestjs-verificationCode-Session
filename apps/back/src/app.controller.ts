import { Controller, Get, Res, Req, Session, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import svgCaptcha from 'svg-captcha';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('getCaptcha')
  getCaptcha(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      width: 100,
      height: 40,
      background: '#cc9966',
      size: 4
    });

    session.captcha = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('login')
  login(@Session() session, @Body() query, @Res() res,  @Req() req) {
    console.log('服务器:', session.captcha);
    console.log('客户端:', req.headers.cookie);
    
    if(!session.captcha) {
      // session.captcha = null;
      throw new BadRequestException('验证码失效')
    }


    console.log(session.captcha, 'session.captcha');
    
    if (session?.captcha?.toLocaleLowerCase() === query?.captcha?.toLocaleLowerCase()) {
      return { code: 200, msg: '登录成功' }
    } else {
      throw new BadRequestException('验证码错误')
    }


  }
}
