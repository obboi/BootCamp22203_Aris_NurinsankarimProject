// EJS

const express = require('express');
const { request } = require('http');
const app = express()
const path = require('path');
const port = 3000

// information ejs
app.set('view engine','ejs')

app.get('/',(req, res) => {
    // res.sendFile(path.join(__dirname+'/index.html'));
    // res.sendFile('index.html', (root + __dirname))
    const nama ="Aris"
    res.render('index',{nama})
});

app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname+'/about.html'));
    res.render('about')
});

app.get('/contact', (req, res) => {
    // res.sendFile(path.join(__dirname+'/contact.html'));
    res.render('contact')
})

                    // ini harus sama dengan
app.get('/product/:product_id/',  (req, res) => {
    res.send('product id : '  + req.params.product_id +'<br></br>' +'category id : ' + req.query.category)
                                            // ini                                      
    
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('Page Not Found 404')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


