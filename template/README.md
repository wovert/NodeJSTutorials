# 模版引擎

## jade

> 侵入式、强依赖(不能使用HTML/CSS代码)

- 根据缩进，规定层级
- 属性：script(src="a.js",type="text/javascript") 内容
- style={property:value,property:value,}
- class=['a','b','c']
- div&attributes({title:'',id:''})
- jade.render(字符串)
- jade.renderFile(template,params)
- |content或script.
  - script.
    - window.onload = function(){}
- script
  include a.js
- span #{name} 或 span=name 输出变量name的值
- -var
- `div!=content (content=<h1>title</h1>,原样输出)`

- var a=10;
- if()
- else

```js
const jade = require('jade')
var str = jade.render('html')
fs.writeFile(name.html, str, (err,)=>{...})
jade.renderFile(xx.jade, {pretty:true,name:"cg",json:{},arr:[]})
div(style=json)
div(class=arr)
```

## ejs

> 温和、非侵入式（不破坏原有的HTML/CSS)、弱依赖

- 效率很差，字符串处理

```js
<% if(type=='admin') { %>
<% include ../admin/index.css %>
<% } else { %>
<% include ../home/index.css %>
<% } %>
<%= str %> 转义输出
<%-str%> 不转义输出
<% include ../aa.txt %>

ejs.renderFile('./view/1.ejs',{name:'cg'},(err,data)=>{
  if(err) {
    console.log('compile error');
  } else {
    consol.log(data);
  }
})
```

1.ejs

```js
<% js代码 %>
<% js代码 %>
```

`$ npm install express express-static body-parser cookie-parser cookie-session jade ejs`