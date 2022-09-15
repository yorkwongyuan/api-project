import Router from 'koa-router'
import svgCaptchaController from '../../api/svgCaptchaController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', svgCaptchaController.getCaptcha)

export default router