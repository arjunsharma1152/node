const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp,product) => {
let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
output = output.replace(/{%IMAGE%}/g,product.image);
output = output.replace(/{%PRICE%}/g,product.price);
output = output.replace(/{%FROM%}/g,product.from);
output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
output = output.replace(/{%QTY%}/g,product.quantity);
output = output.replace(/{%DESC%}/g,product.description);
output = output.replace(/{%ID%}/g,product.id);

if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');

return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const apiData = JSON.parse(data);

const server = http.createServer((req,res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{
            'Content-type': 'text/html',
            'my-header': 'overview'
        });

        const cardHtml = apiData.map(tmp => replaceTemplate(tempCard,tmp)).join(' ');

        const output = tempOverview.replace('{%PRODUCTCARDS%}',cardHtml);

        res.end(output);
    } else if(pathName ==='/product'){
        res.end('PRODUCT PAGE ');
    } else if(pathName === '/api'){
        res.writeHead(200, {
            'Content-head': 'application/json'
        })
        res.end(data)        
    } else {
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-header': 'hello'
        });
        res.end("<h1>NO PAGE FOUND</h1>");
    }
})

server.listen(8000,'127.0.0.1',() => {
    console.log('listening');
})



// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(text);

// const textout = `Hello this is the content: ${text}`;

// fs.writeFileSync('./txt/output.txt',textout);