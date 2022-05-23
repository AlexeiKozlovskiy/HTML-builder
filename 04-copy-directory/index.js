const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

// fs.stat - сведения о каталоге. err если каталога нет.
fs.stat(path.join(__dirname, 'files-copy'), function(err) {
  if (err) {
    copyFile();
    console.log('Files copied');
  }
  else {
     // fs.rm - удаление файлов по указанному пути
     fs.rm(folderCopy, { recursive: true }, (err) => {
      if (err) throw err;
      copyFile();
      console.log('Files updated');
    });
  }
});

// fs.mkdir - асинх. создание каталога
function createFolder() {
  fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
    if(err) throw err;
  });
}
function copyFile() {
  createFolder();
  //fs.readdir -  чтение каталога
  fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
      // fs.copyFile() - асинхронное копирование файлов из исходного пути в целевой
      fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) throw err;
      });
  });
  });
}




  