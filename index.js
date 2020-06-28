const { app, BrowserWindow } = require('electron');
const fs = require('fs');

const createWindow = () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
  });
  window.loadFile('renderer/index.html');
};

app.whenReady().then(createWindow);

console.log('Hello from Main Process');