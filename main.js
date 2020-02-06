const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 670,
    icon: `file://${__dirname}/src/assets/icons/logo.ico`
  })

  win.loadURL(`file://${__dirname}/backend/Libms/index.html`)

  // uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })

const isWindows = process.platform === 'win32';
let needsFocusFix = false;
let triggeringProgrammaticBlur = false;

win.on('blur', (event) => {
  if(!triggeringProgrammaticBlur) {
    needsFocusFix = true;
  }
})

win.on('focus', (event) => {
  if(isWindows && needsFocusFix) {
    needsFocusFix = false;
    triggeringProgrammaticBlur = true;
    setTimeout(function () {
      win.blur();
      win.focus();
      setTimeout(function () {
        triggeringProgrammaticBlur = false;
      }, 100);
    }, 100);
  }
})

}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
