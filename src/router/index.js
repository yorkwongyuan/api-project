import combine from 'koa-combine-routers'
import loginRouter from './routes/loginRouter'
import publicRouter from './routes/publicRouter'

const router = combine(loginRouter, publicRouter)

export default router

