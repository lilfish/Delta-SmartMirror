# Navigation.js

There is a navigation.js under the folder "scripts". In here you can see two functions called "left" and "right". Above these functions there's a piece of code that starts with ipc.

If a command is send trough IPC (internalprocess communication) with the command "navigate" this script will be fired up. The function requires an argument to be passed trough such as left or right. This command will than call the corresponding function.

The moment left is fired up it will check what screen it's currently on and what screen should come after going left. Since the last screen on the left side is the settingswindow, it won't go further than that. The same is applied on right, but than the last screen is appwindow.

# In Main.js
There is a function to change the mainWindow with a new window. Down here is how it looks like:
```javascript
// if the IPC commmand newwindow is triggered with the new screen name as argument, Change window
ipcMain.on('newwindow', function (e, new_window) {
    global.window = new_window;
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "./screens/"+new_window),
        protocol:'file:',
        slashes: true,
    }));
    //when a new window is loaded the "did-finish-load" commands fires up. 
    mainWindow.webContents.on('did-finish-load', () => {
        //mainWindow.webContents.send('test','This is a test');
    })
})

```
# Adding a screen
To add a new screen you first have to make the .html in the folder "screens". Don't forget to include the navigation.js from the folder "scripts" in this newly made html. Now you can add the screen to the navigation.js like this:
```javascript
if (remote.getGlobal('window') == "settingsWindow.html"){
        new_window = 'mainWindow.html';
    } else if (remote.getGlobal('window') == "mainWindow.html"){
        new_window = 'newsWindow.html';
    } else if (remote.getGlobal('window') == "newsWindow.html"){
        new_window = 'trainWindow.html';
    } else if (remote.getGlobal('window') == "trainWindow.html"){
        new_window = 'MYNEWSCREEN.html';
    } else if (remote.getGlobal('window') == "MYNEWSCREEN.html"){
        new_window = 'appWindow.html';
    } else if (remote.getGlobal('window') == "appWindow.html"){
        new_window = null;
    }
```
In the example above **MYNEWSCREEN**.html is the new .html you have made in the folder "screens"