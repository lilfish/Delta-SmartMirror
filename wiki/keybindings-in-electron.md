# keybindings.js
In the folder "scripts" there's a script called keybindings.js, in here you can add, remove or check which keybindings are there. The code looks as following:
```javascript
var electron = require("electron");
var ipc = electron.ipcRenderer;

document.addEventListener('keydown', function(e) {
    //q key
    if (e.keyCode == 113 || e.keyCode == 81){
        e.keypress = '1';
        ipc.send('closeAllWindows', 'now');
    }
    //left arrow key
    if (e.keyCode == 37){
        e.keypress = '1';
        left();
    }
    //right arrow key
    if (e.keyCode == 39){
        e.keypress = '1';
        right();
    }
});
```

As you can see it required electron and ipc for if you want to communicate with the **main.js**. This is being used to close all windows on key "**q**". You can, with this script, also navigate left or right using the arrow keys.

## Finding key codes
On this [website](https://keycode.info/) you can easilly type in a key and the website will show which code it is.