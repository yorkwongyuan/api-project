import mongoose from '../config/DBHelper.js'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String
  }
})

const User = mongoose.model('user', UserSchema)

export default User
