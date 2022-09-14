import Koa from 'koa'
import path from 'path'
import compress from 'koa-compress'
import body from 'koa-body'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import compose from 'koa-compose'
import json from 'koa-json'
import statics from 'koa-static'
import router from './router/index'

const app = new Koa()

const middleware = compose([
  body({
    multipart: true,
    formidable: {
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true
    }
  }),
  cors(),
  statics(path.resolve(__dirname, '../public')),
  helmet(),
  json({
    pretty: true, param: 'pretty'
  })
])

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  app.use(compress())
}
// 注意middleware必须先于router
app.use(middleware)
app.use(router())

app.listen(4000, () => {
  console.log('监听4000端口')
})
