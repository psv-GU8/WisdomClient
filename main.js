const {app, BrowserWindow} = require('electron');

let mainWindow;

function renderMainWindow () {
  //process.env.GOOGLE_API_KEY = AIzaSyAZXAXmJkLYOgBefNlNNCXlL6jSpaG9mxQ;
  process.env.GOOGLE_API_KEY = 'AIzaSyAWkXhleDF6SseAPElBOQn06pKvyWfsM9g';
  //process.env.GOOGLE_API_KEY = 'AIzaSyAWkXhleDF6SseAPElBOQn06pKvyWfsM9g'
  
  mainWindow = new BrowserWindow({show: false, frame: false,icon: __dirname + './templates/dependencies/img/logo/3.png'});
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('./templates/index.html');
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

app.on('ready', renderMainWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
