// 操作数据库的部分
import mongoose from '../config/DBHelper.js'
import moment from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  // 这里ref的意思说白了就是, 这个uid是user表的uid, 你去user表里查一个uid为这个值的数据
  uid: { type: String, ref: 'user' }, /// String 否用户ID
  title: { type: String }, // String 否文章标题
  content: { type: String }, // String 否文章内容
  created: { type: Date }, // Date 否 now() 创建帖子的时间
  catalog: { type: String }, // String 否  帖子的分类，index-全部，ask-提问，advise-建议，discuss-交流，share-分享，logs-动态 ，notice-公告
  fav: { type: String }, // String 否  帖子积分
  isEnd: { type: String }, // String 否 0 0-未结束，1-已结束
  reads: { type: Number }, // Number 否 0 阅读记数
  answer: { type: Number }, // Number 否 0 回答记数
  status: { type: String }, // String 否 0 0-打开回复，1-关闭回复
  isTop: { type: String }, // String 否 0 0-未置顶，1-已置顶
  sort: { type: String }, // String 否 0 置顶排序
  tags: { type: Array }
})

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})


PostSchema.statics = {
  /**
   * 获取文章数据接口
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   * @returns 
   */
  getList (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit) // 跳过已经存在的那几页
      .limit(limit) // 只请求一页数据
      .populate({
        path: 'uid', // 通过uid找到对应的数据
        select: 'name isVip pic' // 只拿这几项
      })
  }
}

const Post = mongoose.model('post', PostSchema)

export default Post
