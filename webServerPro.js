const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const { rejects } = require("assert");
let mimes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".gif": "image/gif",
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".woff2": "image/woff2",
};

let checkFilepromise = (filePath) => {
  return new Promise((resolve, rejects) => {
    fs.access(filePath, fs.F_OK, (err) => {
      if (!err) {
        resolve(filePath);
      } else {
        rejects(err);
      }
    });
  });
};

let RedFilepromise = (filePath) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(filePath, (err, body) => {
      if (!err) {
        resolve(body);
      } else {
        rejects(err);
      }
    });
  });
};

function WerServerView(req, res) {
  let UrlBase = url.parse(req.url);
  let filePath =
    __dirname + (UrlBase.pathname == "/" ? "/index.html" : UrlBase.pathname);
    console.log(filePath);
  let contentType = mimes[path.extname(filePath)];

  checkFilepromise(filePath)
    .then(RedFilepromise)
    .then((bodyContent) => {
      res.writeHead(200, { "Content-type": contentType });
      res.end(bodyContent, "utf-8");
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(500);
      res.end("File is Not accessble");
    });
}

http.createServer(WerServerView).listen(3000,()=>{
    console.log("listen on Port",3000);
});
