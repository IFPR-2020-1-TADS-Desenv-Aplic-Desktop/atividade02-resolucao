const { app, BrowserWindow } = require('electron');
const fs = require('fs');

const createWindow = () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });
  window.loadFile('renderer/index.html');
};

app.whenReady().then(createWindow);

console.log('Hello from Main Process');

// fs.readFile('/home/diego/test.txt', 'utf-8', (err, data) => {
//   console.log(data);
//   console.log(err);
// });
