const path = require('path');
const fs = require('fs');

// readdir() - метод для чтения содержимого дериктории

// basename() - возвращает конечную часть пути, первым параметром принимает путь, 
// вторым необязательным аргументом - расширение файла, которое нужно убрать из возвращаемого результата, убираю.

// extname() - возвращает расширение файла переданного пути, c точкой.

// fs.stat() - сведения о файле или каталоге. 

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    if(err) throw err;
    files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if(err) throw err;
        if (stats.isFile()) {
          const name = path.basename(file, path.extname(file));
          const extension = path.extname(file).slice(1);
          const size = stats.size;
          console.log( `${name} - ${extension} - ${size/1000} kb`);
        }
    });
  })
});



// let folder = path.join(__dirname, 'secret-folder');
// fs.readdir(folder, (err, files) => {

//   if (err) {
//     console.log('EROR !!! ' + err.name);
//     return;
//   }

//   files.forEach(file => {
//     //расширение файла (вырезаем точку впереди)
//     let ext = path.extname(file).slice(1);
//     fs.stat(folder + '/' + file, function (err, stats) {
//       if (stats.isFile()) {
//         // название фала до запятой
//         file = file.slice(0, file.lastIndexOf('.'));
//         console.log(`${file} - ${ext} - ${stats.size / 1000} kb`);
//       }
//     });
//   });
// });