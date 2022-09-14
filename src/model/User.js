import mongoose from '../config/DBHelper.js'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String
  }
})

const User = mongoose.model('user', UserSchema)

export default User
