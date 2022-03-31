// EJS

const express = require('express');
const { request } = require('http');
const app = express()
const path = require('path');
const port = 3000

// information ejs
app.set('view engine','ejs')

app.get('/', (req, res) => {
  cont =[
  //   {
  //   nama:'Budi',
  //   email:'bdi@gmail.com',
  // },{
  //   nama:'andi',
  //   email:'and@gmail.com',
  // },{
  //   nama:'audi',
  //   email:'aui@gmail.com',
  // },
  ]
    const nama ="Aris"
    const title ="Wellcome to my page"
    res.render('index',
    {
      nama,
      title,
      cont,
    })
});

app.get('/about', (req, res) => {
    
    res.render('about')
});

app.get('/contact', (req, res) => {
    
    res.render('contact')
})

                  

app.use('/', (req, res) => {
    res.status(404);
    res.send('Page Not Found 404')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


