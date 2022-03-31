// EJS

const express = require('express');
const { request } = require('http');
const expressLayouts = require('express-ejs-layouts')

const app = express()
const path = require('path');
const port = 3000

// information ejs
app.use(expressLayouts)
app.set('layout', './layout/gabung')
app.set('view engine','ejs')

app.get('/', (req, res) => {
  cont =[
    {
    nama:'Budi',
    email:'bdi@gmail.com',
  },{
    nama:'andi',
    email:'and@gmail.com',
  },{
    nama:'audi',
    email:'aui@gmail.com',
  },
  ]

  // memasukan function agar dapat memanggil setiap function yg terdapat pada file .ejs
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
    const title ="about page"
    res.render('about',{title})
});

app.get('/contact', (req, res) => {
  const title ="contact page"
  res.render('contact',{title})
  
})

                  

app.use('/', (req, res) => {
    res.status(404);
    res.send('Page Not Found 404')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


