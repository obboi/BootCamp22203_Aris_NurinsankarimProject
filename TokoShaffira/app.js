const http = require('http');
const fs = require('fs')
const path = require('path')
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

http.createServer(function(req,res){

        if(req.url === "/"){
            fs.readFile("./landingpage/index.html", "utf-8", function(err, html){
                res.writeHead(200,{"Content-Type": "text/html"});
                res.end(html);
            });

        }else if(req.url === "/index.html"){
            fs.readFile("./landingpage/index.html", "utf-8", function(err, html){
                res.writeHead(200,{"Content-Type": "text/html"});
                res.end(html);
            });
        
        
        }else if(req.url.match("\.css$")){
            var cssPath = path.join(__dirname, 'landingpage', req.url);
            var filestream = fs.createReadStream(cssPath);
            res.writeHead(200, {"Content-Type": "text/css"});
            filestream.pipe(res);

        }else if(req.url.match("\.jpg$")){
            var imagePath = path.join(__dirname, 'landingpage', req.url);
            var filestream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "image/jpg"});
            filestream.pipe(res);
        
        //about
        }else if(req.url === "/about.html"){
            fs.readFile("./landingpage/about.html", "utf-8", function(err, html){
                res.writeHead(200,{"Content-Type": "text/html"});
                res.end(html);
            });

        }else if(req.url.match("\.css$")){
            var cssPath = path.join(__dirname, 'landingpage', req.url);
            var filestream = fs.createReadStream(cssPath);
            res.writeHead(200, {"Content-Type": "text/css"});
            filestream.pipe(res);

        }else if(req.url.match("\.jpg$")){
            var imagePath = path.join(__dirname, 'landingpage', req.url);
            var filestream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "image/jpg"});
            filestream.pipe(res);
        
        //contact
        }else if(req.url === "/contact.html"){
            fs.readFile("./landingpage/contact.html", "utf-8", function(err, html){
                res.writeHead(200,{"Content-Type": "text/html"});
                res.end(html);
            });

        }else if(req.url.match("\.css$")){
            var cssPath = path.join(__dirname, 'landingpage', req.url);
            var filestream = fs.createReadStream(cssPath);
            res.writeHead(200, {"Content-Type": "text/css"});
            filestream.pipe(res);

        //service

    }else if(req.url === "/service.html"){
        fs.readFile("./landingpage/service.html", "utf-8", function(err, html){
            res.writeHead(200,{"Content-Type": "text/html"});
            res.end(html);
        });

    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, 'landingpage', req.url);
        var filestream = fs.createReadStream(cssPath);
        res.writeHead(200, {"Content-Type": "text/css"});
        filestream.pipe(res);

        
        
        }else{
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("No Page Found")
        }
    
}).listen(3000);
