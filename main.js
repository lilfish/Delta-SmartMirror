const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;


var ping;

//listen for app ready

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    //load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol:'file:',
        slashes: true
    }));

    //build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //set menu
    Menu.setApplicationMenu(mainMenu);

});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
            label: 'Quit',
            click(){
                app.quit();
            }
            }
        ]
    }
]