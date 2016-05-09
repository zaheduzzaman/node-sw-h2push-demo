var https = require('http2');
var fs = require('fs');
var winston = require("winston");
var mime = require ("mime");
var url = require("url");
var path = require("path");

var options = {
    // use your key and cert here. the key and cert file names are place holder only.
  key: fs.readFileSync('my.key.pem'),
  cert: fs.readFileSync('my.cert.pem')
};

function handleGet(req, res) {
    
        var parsedRequestURI = url.parse(req.url);
        var filename = path.join(process.cwd(), parsedRequestURI.pathname);
        var pushedfilename = path.join(process.cwd(), "images/mustang_frm_pushed.jpg");

        console.log("filename =" + filename );

        if(res.push&&parsedRequestURI.pathname == "/index.html"){

            var aPushedReadStream =fs.createReadStream(pushedfilename);

            aPushedReadStream.on('open', function (){
                var push = res.push("/images/mustang_frm_pushed.jpg");
                push.writeHead(200, {"Content-Type": mime.lookup(pushedfilename)});
                aPushedReadStream.pipe(push);
                //console.log ("pushed images");
            });

            aPushedReadStream.on('end', function (){
                //push.end();
                console.log(" finished pushing images to client." );
            });
            
        }

        var aReadStream =fs.createReadStream(filename);

        aReadStream.on('open', function (){
            res.writeHead(200, {"Content-Type": mime.lookup(filename)});
            aReadStream.pipe(res);
        });

        aReadStream.on('end', function (){
            console.log(" finished streaming"+ parsedRequestURI.pathname+" to client." );
            res.end();
        });

        aReadStream.on('error', function (err){
                console.log (err);
                res.writeHead(404, {"Content-Type": mime.lookup(filename)});
                res.end(" console.log (error occurred )");
        });

   }


function handleClientRequest (req , res){
  
  if (req.method == "GET") {
       console.log("Received GET request for URL: " + req.url);
      handleGet(req , res);
  }

}

var aHttpsServer = https.createServer(options, handleClientRequest);

aHttpsServer.listen(4433);
