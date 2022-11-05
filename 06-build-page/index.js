const fs = require('fs');
const path = require('path');

function createFolder() {
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if(err) throw err
  });
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));
  fs.appendFile(path.join(__dirname, 'project-dist/index.html'),'',(err) => {
    if(err) throw err
  });
}

function createHtml () {
  //читение template.html
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, dataTemplate) => {
    if(err) throw err
    let template = dataTemplate;
    // читение содержимого коталога
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, dataDir) => {
      if(err) throw err
      dataDir.forEach(file => {
        if (file.isFile() && path.parse(file.name).ext === '.html') {
          let nameHtml = path.parse(file.name).name;
          // чтение файлов
          fs.readFile(path.join(__dirname, `components/${file.name}`), 'utf-8', (err, dataFile) => {
            if(err) throw err;
            // меняю название шаблонного тега на дату из темпелейтов
            template = template.replace(`{{${nameHtml}}}`, `${dataFile}`);
            // запись
            const stream = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
            stream.write(template);
          });
        }
      });
    });
  });
}

function createCss() { 
  const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    if (err) {
      console.log('Error ' + err.name);
      return;
    }
    files.forEach(file => {
      if (path.extname(file) === '.css') {
        const stream = fs.createReadStream (
        path.resolve(__dirname, 'styles', file));
        let data = '';
        stream.on('data', partData => bundle.write(data += partData));
      }
    });
  });
}

function createAssets() { 
  fs.mkdir(path.join(__dirname, 'project-dist/assets'), {recursive: true}, (err) => { 
    if(err) throw err
  });
  fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
    files.forEach(elDir => {
      fs.mkdir(path.join(__dirname, `project-dist/assets/${elDir}`), {recursive: true}, (err) => {
        if(err) throw err
      });
      fs.readdir(path.join(__dirname, `assets/${elDir}`), (err, files) => {
        files.forEach(elFile => {
          fs.appendFile(path.join(__dirname, `project-dist/assets/${elDir}/${elFile}`),'', (err) => {
            if (err) throw err;
          });
          fs.copyFile(path.join(__dirname, `assets/${elDir}`, `${elFile}`), path.join(__dirname, `project-dist/assets/${elDir}`, `${elFile}`), (err) => {
            if(err) throw err
          });
        });
      });
    });
  }); 
}

createFolder ()
createHtml ()
createCss ()
createAssets()