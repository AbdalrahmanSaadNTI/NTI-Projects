console.log("Hello, World!");
// create full html page in node
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const indexPath = path.join(__dirname, 'index.html');
const server = http.createServer((req, res) => {
  if (req .url === '/') {
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    }
});
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// create index.html file
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Node.js Server</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        h1 { color: #333; }
        p { color: #666; }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my Node.js server.</p>
    <p>Enjoy your stay!</p>
</body>
</html>`;
fs.writeFile(indexPath, indexHtmlContent, (err) => {
  if (err) {
    console.error('Error creating index.html:', err);
  } else {
    console.log('index.html created successfully.');
  }
});
// create a simple server that serves index.html
// and logs requests to the console
// This server will serve the index.html file when accessed at the root URL
// and will log any requests made to the console.
// Make sure to run this script with Node.js to see the server in action.
// You can test it by opening a web browser and navigating to http://localhost:3000
// or by using a tool like curl or Postman to make requests to the server.
// The server listens on port 3000 and serves the index.html file
// with a simple HTML structure that includes a heading and a paragraph.
// The server also handles errors gracefully, responding with appropriate status codes.
// If you want to stop the server, you can do so by pressing Ctrl+C in the
// terminal where the server is running.
// This code is a complete example of a simple Node.js server that serves an HTML page.
// It demonstrates how to read and write files, handle HTTP requests,
// and create a basic web server using the built-in http module in Node.js.
// You can expand this server by adding more routes, serving static files,
// or integrating with a front-end framework like React or Vue.js.
// This code is a basic setup for a Node.js server that serves an HTML page.
// You can modify the HTML content, add styles, or include scripts as needed.
// This setup is ideal for learning purposes and can be extended for more complex applications.
// Make sure to have Node.js installed on your machine to run this code.
// You can run this code by saving it to a file named index.js
// and executing it with the command `node index.js` in your terminal.
// After running the server, you can access it in your web browser
// at http://localhost:3000 to see the served HTML page.