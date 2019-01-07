const electron = require('electron');
const url = require('url');
const path = require('path');
const { execFile } = require('child_process');
const { ipcMain } = require('electron');

global.appRoot = path.resolve(__dirname);

const { app, BrowserWindow, Menu} = electron;

global.mainWindow;
global.window = "mainWindow.html";
//listen for app ready
global.user = {name: null};

app.on('ready', function(){
    
    mainWindow = new BrowserWindow({ show: false, frame: false,  backgroundColor: "#000000" });
    //load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./screens/mainWindow.html"),
        protocol:'file:',
        slashes: true,
    }));
    mainWindow.maximize()
    mainWindow.show();
    
});

// Show new window if needed
ipcMain.on('newwindow', function (e, new_window) {
    global.window = new_window;
    console.log(new_window);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./screens/"+new_window),
        protocol:'file:',
        slashes: true,
    }));
})

// ipcMain.on('login', function (e, user_name) {

// })



const mainMenuTemplate = [
    {
    }
]