const electron = require('electron');
const url = require('url');
const path = require('path');
const { execFile } = require('child_process');
const { spawn } = require('child_process');


global.appRoot = path.resolve(__dirname);

const { app, BrowserWindow, Menu, ipcMain} = electron;

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
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('test','This is a test');
    })
})

var can_hand = false;

ipcMain.on('login', function (e, user_name) {
    
    const ls = spawn('python',  ['./plugins/hand_gesture.py']);
    ls.stdout.on('data', (data) => {

            if (data.includes("left")){
                console.log("left");
                can_hand = false;
                mainWindow.webContents.send("navigation", "left");
                
                
            } else if (data.includes("right")){
                console.log("right");
                can_hand = false;
                mainWindow.webContents.send("navigation", "right");
            }

    });
    
    ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    });

})


const mainMenuTemplate = [
    {
    }
]