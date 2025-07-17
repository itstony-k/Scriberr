const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
let server;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  server = spawn('node', ['build/index.js'], {
    stdio: 'inherit',
  });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  if (server) server.kill();
});
