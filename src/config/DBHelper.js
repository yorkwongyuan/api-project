import config from './index'
import mongoose from 'mongoose'

mongoose.connect(config.DB_URL)

const EVENTS = {
  CONNECTED: 'connected',
  ERROR: 'error',
  DISCONNECTED: 'disconnected'
}

// 连接成功
mongoose.connection.on(EVENTS.CONNECTED, () => {
  console.log('mongoose connected' + config.DB_URL)
})

// 连接异常
mongoose.connection.on(EVENTS.ERROR, (err) => {
  console.log(err)
})

// 断开连接
mongoose.connection.on(EVENTS.DISCONNECTED, () => {
  console.log('mongodb disconnected')
})

export default mongoose