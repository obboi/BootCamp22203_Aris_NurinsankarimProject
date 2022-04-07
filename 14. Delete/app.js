// Express-EJS-Layout

const express = require('express'); //deklarasi express jadi 
const { request } = require('http'); //deklarasi request 
const expressLayouts = require('express-ejs-layouts') //deklarasi expressLayouts
const morgan  = require('morgan') //deklarasi morrgan
const app = express() //deklarasi app agar jalankan express
const path = require('path'); //deklarasi path

//require 3 modul tampilan cepat
const session = require('express-session') 
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


// manggil loadcontact json, findContact json, addContact, checlDuplicate
const { loadContact, findContact, addContact, checkDuplicate, deleteContact, } = require('./contacts');
const port = 3000
//untuk memvalidasi data yang akan di inputkan, dan mengubah keterangan ketika hasil validasi ditampilkan
const { body, validationResult, check } = require('express-validator');
const { resetWatchers } = require('nodemon/lib/monitor/watch');

// morgan
app.use(morgan('dev'));

// information ejs
app.use(expressLayouts)
app.set('layout', './layout/gabung')
app.set('view engine','ejs')

app.use(express.static(__dirname + '/public'));    

// buildin middleware parsing
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
session({
  cookie:{maxAge: 6000},
  secret:'secrret',
  resave:true,
  saveUninitialized:true,
})
)
app.use(flash());

// time digunakan untuk menghitung detik dari tanggal 1 januari 1970
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get('/', (req, res) => {
  // memasukan function agar dapat memanggil setiap function yg terdapat pada file .ejs
  // manggil idex.ejs
    const nama ="Aris Nur Insan Karim"
    const title ="Wellcome to my page"
    res.render('index',
    {
      nama,
      title,
    })
   
});

// panggil about page
app.get('/about', (req, res) => {
    const title ="about page"
    res.render('about',{title})
});

// load contact dan panggil contact page
app.get('/contact', (req, res) => {
  const title ="contact page"
  const contacts = loadContact()
  res.render('contact',{title,contacts,msg: req.flash('msg'),}
  )
})


// delete
app.get('/contact/delete/:name', (req, res)=>{
  const contact = findContact(req.params.name)

  // jika kontak tidak ada
  if(!contact){
    res.status(404)
    res.send('<h1>404</h1>')
  }else{
    // res.sendStatus('ok')
    deleteContact(req.params.name)
    req.flash('msg','Data hasbeen added')
  res.redirect('/contact')
  }
})





// halaman detail kontak
app.get('/contact/add',(req,res)=>{
  res.render('add-contact',{
    title: 'Form Add Contact',
  })
})

// proses nambah data
app.post('/contact',[
  body('name').custom((value)=>{
    const duplicate = checkDuplicate(value);
    if(duplicate){
      throw new Error('Contact Name cant Use!')
    }
    return true;
  }),

  // cek email dan number bener apa asalah
  check('email','Email not valid').isEmail(),
  check('phone', 'Number not valid').isMobilePhone(),
],(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
  // return res.status(400).json({ errors: errors.array() });
  res.render('add-contact',{
    title: 'Form add Contact',
    errors: errors.array(),
  })
}else{
  addContact(req.body);
  // set massage
  req.flash('msg','Data hasbeen added')
  res.redirect('/contact')
}
})






// ambil berdasarkan nama
app.get('/contact/:name', (req, res) => {
  const contact = findContact(req.params.name);
  const title ="Halaman Contact"
  res.render('detail',{
    title,
    contact,
    msg: req.flash('msg')
  })
  
})

// menampilkan status 404-pagenotfound bila index.ejs tidak terpanggil
app.use('/', (req, res) => {
    res.status(404);
    res.send('Page Not Found 404')
  })

// open server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})