// модули: взаимодуйствия с файловой системой, работы с путями
const fs = require('fs');
const path = require('path');


// fs.createWriteStream() сщздание потока в который можно записывать данные
const stream = fs.createReadStream(path.join(__dirname, '/text.txt'), 'utf-8');

stream.on('data', function (chunk) {
    console.log(chunk);
  });
  