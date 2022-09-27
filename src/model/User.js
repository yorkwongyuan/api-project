// 操作数据库的部分
import mongoose from '../config/DBHelper.js'
import moment from 'dayjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    index: {unique: true}, // 相当于就是username为必填项
    sparse: true
  },
  password: {
    type: String
  },
  nickname: {
    type: String
  },
  created: {
    type: String
  },
  updated: { type: String },
  favs: { type: Number, default: 100 },
  gender: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  pic: { type: String, default: '/img/default.jpg' },
  mobile: { type: String, match: /^1[3-9](\d{9})$/ }, // 插入的数据必须满足这个正则表达式
  status: { type: String, default: '0' },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: '0' },
  count: { type: Number, default: 0 }
})

// 保存/更新, 都会记录下当时的时间, 也就是更新created这个字段
UserSchema.pre('save', function () {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
})

UserSchema.pre('update', function () {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
})

// 保存的时候出现错误
UserSchema.post('save', function (error, doc, next) {
  // 如果存储了重复的邮箱的时候
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error: Mongoose has a duplicate key'))
  } else {
    next(error)
  }
})

UserSchema.statics = {
  findById: function (id) {
    // 通过用户的id查找数据, 并且屏蔽password,username,mobile这三个数据
    return this.findOne({_id: id}, {
      password: 0,
      username: 0,
      mobile: 0
    })
  }
}

const User = mongoose.model('user', UserSchema)

export default User
