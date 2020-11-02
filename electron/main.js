// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require("path");

function createWindow () {
  // Start url
  const startUrl = "http://localhost:8080";

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    icon: path.join(__dirname, '../build", "kanbanboard-logo.ico')
  });

  // and load the app.
  mainWindow.loadURL(startUrl);

  // Maximize and show the window.
  mainWindow.maximize();
  mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Start Express app
const server = require(path.join(__dirname, "app"));