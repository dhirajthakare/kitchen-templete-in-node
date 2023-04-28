const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
    '.html':'text/html',
    '.js':'text/javascript',
    '.css':'text/css',
    '.gif':'image/gif',
    '.jpg':'image/jpg',
    '.png':'image/png',
    '.mp4':'video/mp4',
    '.woff2':'image/woff2'
}

function WerServerView(req,res){

    let UrlBase = url.parse(req.url);
    let filePath = __dirname+(UrlBase.pathname == '/' ? '/index.html':UrlBase.pathname);
    // console.log(filePath);

    fs.access(filePath, fs.F_OK , err=>{
        if(!err){
            // console.log('serve',filePath);

            fs.readFile(filePath,(err,body)=>{
                if(!err){
                    // console.log('serve',filePath);
                    let contentType = mimes[path.extname(filePath)];
                    res.writeHead(200,{'Content-type':contentType})
                    res.end(body,'utf-8');
                }else{
                    res.writeHead(500),
                    res.end('Can not show content');
                }
            })

        }else{
            res.writeHead(400),
            res.end('File is Not Vailable');
        }
    } )

}

http.createServer(WerServerView).listen(2000,()=>{
    console.log("listen on Port",2000);
});