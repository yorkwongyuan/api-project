import User from '../model/User.js'
class loginController {
  async login (ctx) {
    const { body } = ctx.request
    console.log('🚀 ~ file: loginController.js ~ line 4 ~ loginController ~ login ~ body', body)
    const result = await User.findOne({
      name: '大江'
    })
    console.log(result, 'result')
    ctx.body = {
      code: 201,
      msg: '成功',
      data: result
    }
  }
}

export default new loginController()