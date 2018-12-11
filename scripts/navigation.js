
const {ipcRenderer} = require('electron')



// commando to go to a new window: ipcRenderer.send('newwindow', 'testwindow.html')


function hand_gesture() {
    var handGesture = execFile('python', ['./plugins/hand_gesture.py'], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    })
    handGesture.stdout.on('data',function(data){
        console.log(data);
        if (data.includes("LEFT")){
            left();
        } else if(data.includes("Right")){
            right();
        }
    })
}

document.getElementById('hidden_button_left').onclick = function() {left();};
document.getElementById('hidden_button_right').onclick = function() {right();};

function left() {
    document.getElementById('content').classList.add('fadeOutRight');
    setTimeout(function(){ 
        ipcRenderer.send('newwindow', 'settingsWindow.html')
    }, 1000);
}

function right() {
    document.getElementById('content').classList.add('fadeOutLeft');
    setTimeout(function(){ 
        ipcRenderer.send('newwindow', 'mainWindow.html')
    }, 1000);
}