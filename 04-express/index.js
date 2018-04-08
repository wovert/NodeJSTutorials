const express = require('express')
const fs = require('fs')
const app = express()
const users = {
  'id': 'admin',
  'pw': 'admin'
}


app.use(express.static("./www"));

app.get('/login', (req, res)=>{
  fs.readFile('./www/login.html','utf-8', (error, data)=>{
    if(!error) {
      res.send(data)
      res.end()
    }
  }) 
})

app.post('/login', (req, res)=>{

  const id = req.query['id'];
  const pw = req.query['pw'];
  console.log(req.query)

  if (users.id != id) {
    res.send({ok: false, msg: 'user is not exists'})
  } else {
    if (users.pw != pw) {
      res.send({ok: false, msg: 'password is invalid.'})
    } else {
      res.send({ok: true, msg: 'success'})
    }
  }
  res.end()
})



app.listen(8080, ()=>{
  console.log('listen to 8080...')
})
