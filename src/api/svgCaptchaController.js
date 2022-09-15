import svgCaptcha from 'svg-captcha'
import { setValue } from '../config/RedisConfig'

class PublicController {
  getCaptcha (ctx) {
    const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4, // 验证码位数
      ignoreChars: 'io0l', // 不显示的几个字母或者数字
      color: true, // 字体有眼色
      noise: Math.floor(Math.random() * 5), // 干扰线条数
      width: 150, // 宽度
      height: 50 // 高度
    })
    const sid = body.sid
    setValue(sid, newCaptcha.text, 35)
    ctx.body = {
      code: 200,
      message: newCaptcha.data
    }
  }
}

export default new PublicController()