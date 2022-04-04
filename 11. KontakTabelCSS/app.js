// Express-EJS-Layout

const express = require('express');
const { request } = require('http');
const expressLayouts = require('express-ejs-layouts')
const morgan  = require('morgan')
const app = express()
const path = require('path');

// manggil loadcontact file json
const { loadContact } = require('./contacts');
const port = 3000


// morgan
app.use(morgan('dev'));

// information ejs
app.use(expressLayouts)
app.set('layout', './layout/gabung')
app.set('view engine','ejs')

app.use(express.static(__dirname + '/public'));    

// time digunakan untuk menghitung detik dari tanggal 1 januari 1970
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get('/', (req, res) => {


  // memasukan function agar dapat memanggil setiap function yg terdapat pada file .ejs
    const nama ="Aris"
    const title ="Wellcome to my page"

    // memanggil loadcontact untuk contact.js
    const contacts = loadContact()
    res.render('index',
    {
      nama,
      title,
      contacts,
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



// const contacts = require ('./contacts');

// const main = async () => {
//     const name = await contacts.Wquestions('What is your name? ');
//     const phone = await contacts.Wquestions('Your number? ');
//     const email = await contacts.Wquestions('Your email? ');

    
//     contacts.saveContacts(name, phone, email);   

    
// };

// main();