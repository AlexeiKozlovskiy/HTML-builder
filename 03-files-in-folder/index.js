const path = require('path');
const fs = require('fs');


// readdir()-метод для чтения содержимого дериктории

// basename()- возвращает конечную часть пути, первым параметром принимает путь, 
// вторым необязательным аргументом - расширение файла, которое нужно убрать 
// из возвращаемого результата;

// extname()-возвращает расширение файла переданного пути;

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        const name = path.basename(file, path.extname(file));
        const ext = path.extname(file).slice(1);
        const size = stats.size;
        console.log( `${name} - ${ext} - ${size/1000}Kb`);
    });
  })
});