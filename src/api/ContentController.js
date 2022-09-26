import Post from '../model/Post'


class ContentController {
  async getPostList (ctx) {
    const post = new Post({
      title: '这是建议文章',
      content: '123123',
      isEnd: '0',
      isTop: '0',
      fav: 20,
      sort: '0',
      reads: '0',
      catalog: 'advise',
      status: '0',
      tags: []
    })
    // 临时保存, 测试用
    // const tmp = await post.save()
    // console.log('🚀 ~ file: ContentController.js ~ line 20 ~ ContentController ~ getPostList ~ tmp', tmp)
    const body = ctx.query
    // 默认按照创建时间排序
    const sort = body.sort ? body.sort : 'created'
    // 页码默认为0
    const page = body.page ? parseInt(body.page) : 0
    // 一页默认20条数据
    const limit = body.limit ? parseInt(body.limit) : 20

    let options = {}

    // 分类是否存在
    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    // 状态是否存在
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.status = body.status
    }
    // 是否置顶
    if (typeof body.isTop !== 'undefined') {
      options.isTop = body.isTop
    }
    // 是否置顶
    if (typeof body.isEnd !== 'undefined') {
      options.isEnd = body.isEnd
    }
    // 筛选出标签
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      // 意思是所有数据tags属性(数组)中, name符合条件的数据都筛选出来
      options.tags = {$elemMatch: {name: body.tag}}
    }
    const result = await Post.getList(options, sort, page, limit)
    console.log('🚀 ~ file: ContentController.js ~ line 53 ~ ContentController ~ getPostList ~ result', result)
    ctx.body = {
      code: 200,
      data: result,
      msg: "获取文章列表成功"
    }
  }
}


export default new ContentController()