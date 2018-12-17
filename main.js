const electron  = require('electron');
const url       = require('url');
const path      = require('path');
const {ipcMain} = require('electron');

global.appRoot = path.resolve(__dirname);

console.log(appRoot);

const {app, BrowserWindow, Menu} = electron;

global.mainWindow;

//listen for app ready

app.on('ready', function () {
    mainWindow = new BrowserWindow({show: false, frame: false, backgroundColor: "#000000"});
    //load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./screens/mainWindow.html"),
        protocol: 'file:',
        slashes:  true,

    }));


    mainWindow.maximize();
    mainWindow.show();
    //build menu
    // const mainMenu = Menu.buildFromTemplate();
    // //set menu
    // Menu.setApplicationMenu(mainMenu);


});

ipcMain.on('newwindow', function (e, new_window) {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./screens/" + new_window),
        protocol: 'file:',
        slashes:  true,
    }));
});

const mainMenuTemplate = [
    {}
];