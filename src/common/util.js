import { getValue } from '../config/RedisConfig'

// 核对code
export async function checkCode (sid, code) {
  // 用sid获取之前存储的redis值
  const result = await getValue(sid)
  if (result && result.toLowerCase() === code.toLowerCase()) {
    return true
  } else {
    return false
  }
}