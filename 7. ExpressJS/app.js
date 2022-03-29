// const http = require('http');
// const fs = require('fs')
// const halaman = (path, res)=>{
//     fs.readFile(path,(err,data)=>{
//         if(err){
//             res.writeHead(404);
//             res.write('Error : Page not found');

//         }else{
//             res.write(data);
//         }
//         res.end();

//     })
// }

// http
//     .createServer((req,res)=>{
//         const url = req.url;
//         console.log(url);
//         res.writeHead(200, {
//             'Content-Type': 'text/html',
//         })
        
//         if(url === '/about'){
//             halaman ('./about.html',res)


//         }else if(url === '/contact'){
//             halaman ('./contact.html',res)


//         }else {
//             halaman ('./index.html',res)

//             // res.write('Hello world!');
//             // res.end()
//         }

//         // res.write('Hello World!');
//         // res.end();
    
//     })

//     .listen(3000,()=>{
//         console.log('Server is listening on port 3000');
//     });


const express = require('express');
const { request } = require('http');
const app = express()
const path = require('path');
const port = 3000

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
    // res.sendFile('index.html', (root + __dirname))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname+'/contact.html'));
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


