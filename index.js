const fs = require('fs');
const http = require('http');
const url = require('url');
const server = http.createServer((req,res) => {
    console.log(req.url);
    res.end("HELLO");
})

server.listen(8000,'127.0.0.1',() => {
    console.log('listening');
})



// const text = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(text);

// const textout = `Hello this is the content: ${text}`;

// fs.writeFileSync('./txt/output.txt',textout);