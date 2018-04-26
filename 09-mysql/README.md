# 安装 mysql 客户端
1. 链接 mysql
mysql.createConnection();

2. 查询
const sql = 'select * from user';
dbLink.query(sql, (err, data) => {
  if (err) {
    console.log('错除了', err);
  } else {
    console.log('Success: ', data);
    console.log(JSON.stringify(data)); // [{...}, ...]

  }
});