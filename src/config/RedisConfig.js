import config from './index'
import redis from 'redis'
import bluebird from 'bluebird'
const options = {
  ...config.REDIS,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}


bluebird.promisifyAll(redis)
const client = redis.createClient(options)
client.on('connect', function() {
  console.log('redis连接上了')
})

// 写入值
function setValue (key, value, time) {
  if (typeof value === 'string') {
    if (typeof time === 'undefined') {
      client.set(key, value)
    } else {
      client.set(key, value, 'EX', time)
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach(field => {
      client.hset(key, field, value[field], redis.print)
    })
  }
}

// 获取值
function getValue (key) {
  return client.getAsync(key)
}


export {
  setValue,
  getValue
}