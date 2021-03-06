const electron = require('electron')
// Module to control application life.
const {app, globalShortcut} = require('electron')
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const {dialog} = require('electron') 
var fs = require('fs')

const {ipcMain} = require('electron')

var exports = module.exports = {};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=> {
  createWindow();
  const ret = globalShortcut.register('CommandOrControl+O', () => {
    console.log('CommandOrControl+O is pressed');
    loadFile();
  });
  const ret2 = globalShortcut.register('CommandOrControl+S', () => {
    console.log('CommandOrControl+S is pressed');
    mainWindow.webContents.send('file-save-request', 0);
  });
})

ipcMain.on('file-save-request', (event, arg) => {
  console.log("file-save-request");
  saveFile(arg);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function loadFile(which) {
  var error = 0;
  fs.readFile(dialog.showOpenDialog({properties: ['openFile']})[0], 'utf8', function (err, data) {
      if (err) {
        error = err;
        return console.log(err);
      };
      mainWindow.webContents.send('file-loaded', data);
      // data is the contents of the text file we just read
    });
  return error;
}
function saveFile(arg) {
  var error = 0;
  dialog.showSaveDialog(function (fileName) {
    if (fileName === undefined) return;
    fs.writeFile(fileName, arg, function (err) {   
    });
  }); 
  return error;
}

exports.loadFile = loadFile;
exports.saveFile = saveFile;