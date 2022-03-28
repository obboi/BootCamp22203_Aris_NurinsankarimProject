const http = require('http');
const fs = require('fs')
const halaman = (path, res)=>{
    fs.readFile(path,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('Error : Page not found');

        }else{
            res.write(data);
        }
        res.end();

    })
}

http
    .createServer((req,res)=>{
        const url = req.url;
        console.log(url);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        
        if(url === '/about'){
            halaman ('./about.html',res)


        }else if(url === '/contact'){
            halaman ('./contact.html',res)


        }else {
            halaman ('./index.html',res)

            // res.write('Hello world!');
            // res.end()
        }

        // res.write('Hello World!');
        // res.end();
    
    })

    .listen(3000,()=>{
        console.log('Server is listening on port 3000');
    });