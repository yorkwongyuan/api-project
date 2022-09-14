import combine from 'koa-combine-routers'
import loginRouter from './routes/loginRouter'

const router = combine(loginRouter)

export default router

