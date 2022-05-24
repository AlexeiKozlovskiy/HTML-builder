// модули: взаимодуйствия с файловой системой, работы с путями, чтения данных, стандартные потоки ввода/вывода
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = require('process');

const rl = readline.createInterface(stdin, stdout);
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));


console.log('Hello, enter text to write to the file. To exit the script type \"exit\" or press CTRL+C\n');

// Событие: 'SIGINT':
// /В 'SIGINT' событие генерируется всякий раз, когда input поток получает Ctrl + C ввод, обычно известный как SIGINT

rl.on('SIGINT', () => {
  console.log('Goodbye\n');
});

// Событие: 'line':
// В 'line' событие генерируется всякий раз, когда input поток получает ввод
// конца строки (\n, \r, или \r\n). Обычно это происходит, когда пользователь
// нажимает Входить или Возвращение.

rl.on('line', (line) => {
  if (line.toString().trim() === 'exit') {
    console.log('Goodbye\n');
    rl.close();
  } else {
    output.write(`${line.trim()}\n`);
  }
});