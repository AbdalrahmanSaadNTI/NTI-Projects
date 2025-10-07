console.log("hello, World!");

const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data.toString());
});

console.log("This runs after the file is being read.");