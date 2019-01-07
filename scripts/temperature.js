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

            var temp_hum = data;
            var temp_hum = data.toString('utf8');
            
            temp_hum = temp_hum.replace(/'/g, '"');
            temp_hum = JSON.parse(temp_hum);

            document.getElementById("ditmoetaangepast").innerHTML = temp[0];
            document.getElementById("ditmoetaangepast").innerHTML = temp[1];

            // Check if face is unknown or not. it can try 5 times if unknown and 2 times if known. We do this to ensure the user is actually that user.
        
        
        });
}

read_temperature()
