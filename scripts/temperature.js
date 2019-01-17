const { execFile } = require('child_process');

//read temperature function to get the temperature from the temperature sensor of the room
function read_temperature() {
    myConsole.log("started");
    var SmartMirror_Temperature = execFile('python3m', ['./plugins/temperature/py_script/temperature.py'], (error, stdout, stderr) => {
        if (error) {
                throw error;
            }
        })
        SmartMirror_Temperature.stdout.on('data',function(data){

            var temp_hum = data;
            var temp_hum = data.toString('utf8');
            
            temp_hum = temp_hum.replace(/'/g, '"');
            temp_hum = JSON.parse(temp_hum);

            document.getElementById("ditmoetaangepast").innerHTML = temp_hum[0];
            document.getElementById("ditmoetaangepast").innerHTML = temp_hum[1];

            // Check if face is unknown or not. it can try 5 times if unknown and 2 times if known. We do this to ensure the user is actually that user.
        
        
        });
}

read_temperature()
