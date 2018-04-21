# consolidate 
> 模版引擎整合库

## 模版引擎
- ejs
- jade

## 模版引擎适配
- consolidate
1. reuqire consolidate
2. server.set('view engine', 'html')
3. setver.set('views', '模版文件目录')
4. server.engine('html', consolidate,ejs);
5. server.get('/index', function(req, res) {
  res.render('模版文件', 数据);
})


# route 路由
> 不同的目录对应到不同的模块

domain.ltd/aa => mod1
domain.ltd/news/ => mod_news
  post  => news_post
  list => news_list
  content => news_content

domain.ltd/user/ => mod_users


- Router - 迷你server
  + router.get()
  + router.post()
  + router.use()


1. 创建 router
var router = express.Router();

2. 把　router 添加到 server
server.use('/user', router)

3. router 内部
router.get(...);
router.post(...);


