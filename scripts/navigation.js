
var electron = require("electron");
var ipc = electron.ipcRenderer;
var remote = require('electron').remote;  

document.ready = function(){
    console.log("ready");
    
}


ipc.on("navigation", function(e, arg) {
    console.log(e);
    console.log(arg);
    if (arg == "left"){
        left();
    }
    if (arg == "right"){
        right();
    }
    // ipc.removeAllListeners('navigation')
});




var new_window;

document.getElementById('hidden_button_left').onclick = function() {left();};
document.getElementById('hidden_button_right').onclick = function() {right();};

function left() {
    if (remote.getGlobal('window') == "mainWindow.html"){
        new_window = 'settingsWindow.html'
    } else if (remote.getGlobal('window') == "newsWindow.html"){
        new_window = 'mainWindow.html'
    } else if (remote.getGlobal('window') == "trainWindow.html"){
        new_window = 'newsWindow.html'
    } else if (remote.getGlobal('window') == "appWindow.html"){
        new_window = 'trainWindow.html'
    }
    if (new_window != null){
        document.getElementById('content').classList.add('fadeOutRight');
        document.getElementById('topIcon').classList.add('fadeOut');
        setTimeout(function(){ 
                ipc.send('newwindow', new_window)
        }, 1000);
    }
}

function right() {
    if (remote.getGlobal('window') == "settingsWindow.html"){
        new_window = 'mainWindow.html';
    } else if (remote.getGlobal('window') == "mainWindow.html"){
        new_window = 'newsWindow.html';
    } else if (remote.getGlobal('window') == "newsWindow.html"){
        new_window = 'trainWindow.html';
    } else if (remote.getGlobal('window') == "trainWindow.html"){
        new_window = 'appWindow.html';
    } else if (remote.getGlobal('window') == "appWindow.html"){
        new_window = null;
    }

    if (new_window != null){
        document.getElementById('content').classList.add('fadeOutLeft');
        document.getElementById('topIcon').classList.add('fadeOut');
        setTimeout(function(){ 
            ipc.send('newwindow', new_window)
        }, 1000);
    }
}