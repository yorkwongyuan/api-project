import Router from 'koa-router'
import loginController from '../../api/loginController'
const router = new Router()

router.prefix('/login')
router.post('/login', loginController.login)
router.post('/register', loginController.register)

export default router