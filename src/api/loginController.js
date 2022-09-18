import User from '../model/User.js'
import { checkCode } from '../common/util'
import bcrypt from 'bcrypt'
import moment from 'dayjs'
import jwt from 'jsonwebtoken'
import config from '../config'
class loginController {
  async login (ctx) {
    // post请求获取数据方法
    const { body } = ctx.request
    const code = body.code
    const sid = body.sid
    const isCodeOk = await checkCode(sid, code)

    let msg = ''
    let isAvailable = true
    let userInfo = {}
    function validateError (_msg) {
      msg = _msg
      isAvailable = false
    }
    if (isCodeOk) {
      // 用户名校验
      if (body.username) {
        const username = body.username
        userInfo = await User.findOne({username})
        userInfo = userInfo.toJSON()
        const password = userInfo.password
        let arr = ['username', 'password']
        arr.forEach(key => {
          delete userInfo[key]
        })
        let isPasswordOk = false
        if (body.password) {
          // 校验密码
          isPasswordOk = await bcrypt.compare(body.password, password)
          if (!isPasswordOk) {
            validateError('账号或密码错误')
          }
        } else {
          validateError('密码不得为空')
        }
      } else {
        validateError('用户名不得为空')
      }
    } else {
      validateError('验证码错误')
    }

    // 校验通过
    if (isAvailable) {
      let token = jwt.sign({_id: userInfo._id}, config.JWT_SECRET, {
        expiresIn: '1h'
      })
      ctx.body = {
        code: 200,
        token,
        data: userInfo
      }
    } else {
      ctx.body = {
        code: 500,
        msg,
        data: userInfo
      }
    }
  }
  // 注册
  async register (ctx) {
    const { body } = ctx.request
    if (body && body.sid && body.code) {
      console.log(body, 'body')
      const code = body.code
      const sid = body.sid
      // 是否通过校验
      let isAvailable = true
      let msg = ''
      // code是否正确
      const isCodeOk = await checkCode(sid, code)
      function validateError (_msg) {
        msg = _msg
        isAvailable = false
      }
      // --> 验证码正确
      if (isCodeOk) {
        // --> 用户名校验
        if (body.username) {
          const username = await User.findOne({username: body.username})
          // 用户名冲突
          if (username) {
            validateError('用户名冲突')
          }
        } else {
          validateError('用户名不得为空')
        }

        // --> 密码昵称
        if (body.nickname) {
          const nickname = await User.findOne({nickname: body.nickname})
          if (nickname) {
            validateError('昵称冲突')
          }
        } else {
          validateError('昵称不得为空')
        }

        // 校验通过
        if (isAvailable) {
          const password = await bcrypt.hash(body.password, 5)
          const user = new User({
            username: body.username,
            nickname: body.nickname,
            password,
            created: moment().format('YYYY-MM-DD HH:mm:ss')
          })
          // 写入数据库
          const result = user.save()
          ctx.body = {
            code: 200,
            msg: '注册成功',
            data: result
          }
        } else {
          ctx.body = {
            code: 500,
            msg
          }
        }

        // --> 验证码错误
      } else {
        validateError('验证码错误')
      }
    }
  }
}

export default new loginController()