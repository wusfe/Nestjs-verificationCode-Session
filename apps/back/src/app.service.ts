import { Injectable } from '@nestjs/common';
import svgCaptcha from 'svg-captcha'
@Injectable()
export class AppService {
  getCaptcha(){
    
   var captcha = svgCaptcha.create({
    width: 100,
    height: 40,
    color: true,
    background: '#cc9966',
    size: 4
   });


   

    return {
      success: true,

      data: {
        text: captcha.text,
        svg: captcha.data
      }
    }
  }
}
