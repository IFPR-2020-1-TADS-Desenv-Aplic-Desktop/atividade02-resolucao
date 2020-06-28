const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true },
  });
  window.loadFile('renderer/index.html');
};

app.whenReady().then(createWindow);

console.log('Hello from Main Process');