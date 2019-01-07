
const {ipcRenderer} = require('electron')
var remote = require('electron').remote;  


// commando to go to a new window: ipcRenderer.send('newwindow', 'testwindow.html')


function hand_gesture() {
    // var handGesture = execFile('python', ['./plugins/hand_gesture.py'], (error, stdout, stderr) => {
    //     if (error) {
    //         throw error;
    //     }
    //     console.log(stdout);
    // })
    // handGesture.stdout.on('data',function(data){
    //     console.log(data);
    //     if (data.includes("LEFT")){
    //         left();
    //     } else if(data.includes("Right")){
    //         right();
    //     }
    // })
}

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
            ipcRenderer.send('newwindow', new_window)
        }, 1000);
    }
}

function right() {
    if (remote.getGlobal('window') == "settingsWindow.html"){
        new_window = 'mainWindow.html'
    } else if (remote.getGlobal('window') == "mainWindow.html"){
        new_window = 'newsWindow.html'
    } else if (remote.getGlobal('window') == "newsWindow.html"){
        new_window = 'trainWindow.html'
    } else if (remote.getGlobal('window') == "trainWindow.html"){
        new_window = 'appWindow.html'
    }

    if (new_window != null){
        document.getElementById('content').classList.add('fadeOutLeft');
        document.getElementById('topIcon').classList.add('fadeOut');
        setTimeout(function(){ 
            ipcRenderer.send('newwindow', new_window)
        }, 1000);
    }
}