const fs = require('fs');

// file watcher + minifier
// _______________________

const {minify} = require('terser');

const files = [
    'index.js'
];

fs.watchFile('./src', (curr, prev) => {
    console.log('Minify...');
    let origCode = '';
    files.forEach((filename) => {
        origCode += fs.readFileSync('src/' + filename, 'utf8')
    });
    let doStuff = async _ => {
        let {code} = await minify('(()=>{' + origCode + '})();');
        fs.writeFileSync('pub/index.min.js', code);
        console.log('Done...');
    };
    doStuff();
});

// server
// ______

const cwd = process.cwd() + '/pub';
const http = require('http');
//const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = cwd + request.url;
    if (filePath == cwd + '/') {
        filePath = cwd + '/index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT'){
                response.writeHead(404);
                response.end();
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(4010);
console.log('Server running at http://localhost:4010/');
