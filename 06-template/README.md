# jade
- 侵入式 HTML
- 强依赖

## 安装 jade
- cnpm i jade -S

## jade 特性
1. 根据缩进,规定层级
2. 属性放在()里面,属性之间用逗号分割
3. 内容空格个,直接往回堆
4. 自动识别单双标签

## 特殊属性
- style
    + Normal: p(style="width:300px;height:300px;background:red")
    + josn: span(style= {width: '200px', height: '200px', 'background': 'blue'}) 中华人民共和国
- class
    + normal: h1(id="logo", class="logo header-logo")
    + array: nav(class=['nav','main-nav'])

- 简写
    + h1.logo
    + h1#logo

-  JSON 格式编写
    + div&attributes({title: '这是标题', id:'good'}) 


- 原样输出内容- file.jade
html
  head
    script
      |window.onload = function(){
      |  var btn = document.getElementById('body');
      |  btn.onclick = function(){alert('test');}
      |}
  body
    |hello
    |world

- 原样输出内容2- file.jade
html
  head
    script.
     window.onload = function(){
      var btn = document.getElementById('body');
      btn.onclick = function(){alert('test');}
    }
  body.
    hello
    world

- 原样输出内容3- file.jade
    script
      include a.js 

# ejs
- 非侵入式
