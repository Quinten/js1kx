const fs = require('fs');
const minify = require('babel-minify');

const files = [
    'index.js'
];

fs.watchFile('./src', (curr, prev) => {
    console.log('Minify...');
    let origCode = '';
    files.forEach((filename) => {
        origCode += fs.readFileSync('src/' + filename, 'utf8')
    });
    let {code} = minify('(()=>{' + origCode + '})();', {});
    fs.writeFileSync('pub/index.min.js', code);
    console.log('Done...');
});
