const { execFile } = require('child_process');



// var unknown_counter = 0;
// var known_name;
// var known_counter = 0;

function read_temperature() {
    myConsole.log("started");
    var SmartMirror_Temperature = execFile('python', ['./plugins/temperature/py_script/temperature.py'], (error, stdout, stderr) => {
        if (error) {
                throw error;
            }
        })
        SmartMirror_Temperature.stdout.on('data',function(data){

        // var face_name = data.toString('utf8');
        //
        // face_name = face_name.replace(/'/g, '"');
        // face_name = JSON.parse(face_name);


        // Check if face is unknown or not. it can try 5 times if unknown and 2 times if known. We do this to ensure the user is actually that user.
        if (face_name[0].includes("Unknown")){
            unknown_counter++;
            if (unknown_counter > 4){
                unknown_counter = 0;
                SmartMirror_FaceRecognition.kill();
                document.getElementById("name").innerHTML = "unknown person";
                document.getElementById('save_new').disabled = false;
                document.getElementById("bericht").classList.add('fadeInUp');
                document.getElementById("new_user_box").classList.add('fadeInUp');
            }

        } else {

            if (face_name [0] == known_name){
                known_counter++
                if (known_counter > 2){
                    known_counter = 0;
                    SmartMirror_FaceRecognition.kill();
                    document.getElementById("name").innerHTML = face_name[0];
                    document.getElementById("bericht").classList.add('fadeInUp');
                    hand_gesture();
                }
            } else {
                known_name = face_name[0];
                known_counter = 0;
            }
        }
    });
}

function save_new_user() {
    myConsole.log("started");
    var newName = document.getElementById("new_username").value;
    if (newName != ("")){
        var newFacePython = execFile('python', ['./plugins/new_face.py', newName], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            myConsole.log(stdout);
        })
        newFacePython.stdout.on('data',function(data){
            if (data.includes("done")){
                document.getElementById('save_new').disabled = true;
                start_facial()
            } else if(data.includes("No_face")){
                alert("Ga voor de spiegel staan, over 5 seconden proberen we het opnieuw");
                setTimeout(function () {
                        save_new_user();
                }, 5000);
            }
        })
    } else {
        alert("Vul iets in als naam");
    }
}
start_facial()