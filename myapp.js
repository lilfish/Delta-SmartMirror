function start_facial() {
var SmartMirror_FaceRecognition = require('child_process').spawn b('python', ['./facial.py'], {detached: true});
    SmartMirror_FaceRecognition.stdout.on('data',function(data){
    face_name = data.toString('utf8');

    face_name = face_name.replace(/'/g, '"');
    face_name = JSON.parse(face_name);
    
    document.getElementById("name").innerHTML = face_name[0];

    if (face_name[0] == "Unknown"){
        document.getElementById('save_new').disabled = false;
        SmartMirror_FaceRecognition.kill();
    }
});
}

function save_new_user() {
    var newName = document.getElementById("new_username").value;
    if (newName != ("")){
          // finally cleanup
            
            SmartMirror_FaceRecognition = null;
        // var newFacePython = require('child_process').spawn('python', ['./new_face.py', newName.toString('utf8')]);
        // newFacePython.stdout.on('data',function(data){
        //     responce = data.toString('utf8');
        //     if (responce[0] == "done"){
        //         alert("image saved");
        //         start_facial()
        //     }
        // })
    } else {
        alert("Vul iets in als naam");
    }
}
start_facial()