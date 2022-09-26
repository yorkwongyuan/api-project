import Router from 'koa-router'
import svgCaptchaController from '../../api/svgCaptchaController'
import ContentController from '../../api/ContentController'
const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', svgCaptchaController.getCaptcha)
router.get('/list', ContentController.getPostList)

export default router