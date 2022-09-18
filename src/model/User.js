// 操作数据库的部分
import mongoose from '../config/DBHelper.js'
import moment from 'dayjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    index: {unique: true},
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
  pic: { type: String, default: '/img/a.jpeg' },
  mobile: { type: String, match: /^1[3-9](\d{9})$/ },
  status: { type: String, default: '0' },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: '0' },
  count: { type: Number, default: 0 }
})

UserSchema.pre('save', function () {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
})

const User = mongoose.model('user', UserSchema)

export default User
