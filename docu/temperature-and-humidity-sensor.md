# Temperature sensor
*  Connecting the sensor
*  Python script
*  Javascript

## Connecting the sensor
![alt text](https://i.imgur.com/iLsiT86.png "Connecting the AM2301 to the raspberry pi")

The temperature sensor has 3 cables: 
* 5V (red)
* GRD (black)
* Data (yellow)

The 5V (red cable) goes to the 5 volt pin of the raspberry pi
The Ground (black cable) goes to the ground pin of the raspberry pi
The Data (yellow cable) connects to pin 23 of the raspberry pi

Raspberry Pi 3B+ pin layout can be found [Here](https://i.imgur.com/ZUMdV8R.png)


## Python script

In the python script I include a few libraries. These are the Adafruit DHT library for the sensor. The Json library to convert the data to json so it's usefull in the Electron app. The System library (sys) to be able to stdout the data to electron.

The most interesting part is the loop in the python script.

In here I check if it's the first time it starts up or not. If it does start up for the first time the first values will be saved to the "last_" variable for temperature and humidity. Than the ``first_check`` variable will be set to false to skip this the next time it loops.

```python
if first_check is True:
        last_temp = temperature
        last_hum = humidity
        first_check = False
```

When first_check is set to false it will contineu with the next part:
 ```python
if first_check is False:
        if temperature < (last_temp+2) and temperature > (last_temp-2) and humidity < (last_hum+2) and humidity > (last_hum-2):
            # print("Temperature seems fine?")
            last_temp = temperature
            temp_list.append(temperature)
            # print("humidity seems fine?")
            last_hum = humidity
            hum_list.append(humidity)
        else:
            # print("Temperature or Humidity IS FUCKED ")
            temp_times_wrong = temp_times_wrong + 1
            if temp_times_wrong > 4:
                # print("something fucked up")
                temp_times_wrong = 0
                last_temp = temperature
                last_hum = humidity
```
In here I will check if the new variables I got from the sensor are less than the last temperature + 2 and more than the last temperature - 2. This will also be done with the humidity.

The reason I do this is because sometimes the sensor can give some really weird variables that can go up to 2000. When the first temperature I saved is wrong it will try to get a right value after 5 times.

After 5 correct values are added to the humidity list (``hum_list``) and temperature list (``temp_list``) the last part will be fired up.

```python
if len(hum_list) > 5 and len(temp_list) > 5:
            for x in hum_list:
                all_hump = all_hump + x
            for x in temp_list:
                all_temp = all_temp + x
            
            data['temperature'] = round(all_temp/len(temp_list), 1)
            data['humidity'] = round(all_hump/len(hum_list), 1)

            json_data = json.dumps(data)
            print(json_data)
            sys.stdout.flush()

            all_temp = 0
            all_hump = 0
```

In here I add up all the values and devide them by 5, since the list cannot be longer than 5 items. I round this number with one after the decimal and add it to a json data format. This json data will be send to electron using the ``print`` function and the ``sys.stdout.flush()`` function.

After this is done the variables are reset and the program can continue with the loop.

## JavaScript
In the JavaScript there is a variable that checks if there was already a reading. The purpose of this variable is pure animations. When there are no readings there is nothing to show and the div with the text of the temperature and humidity will be hidden.

Now the python script will be called with this script:
```javascript
document.getElementById("huis_temp").innerHTML = "testx";
    var smartmirror_temp = execFile('python3m', ['./plugins/temperature.py'], (error, stdout, stderr) => {
        if (error) {
            throw error;
            myConsole.log(error);               
        }
    })
```
If there is data and ``data_received`` is false the div is unhidden and animations start up.
```javascript
smartmirror_temp.stdout.on('data',function(data){
            if (data_received == false){
                document.getElementById("huis-temp-hum").classList.remove('hidden');
                document.getElementById("huis-temp-hum").classList.add('fadeIn');
                document.getElementById("huis-temp-hum").classList.add('slow');
                data_received = true;
            }
```
Than the data will be saved in the variable ``temp_hum`` which stands for temperature and humidity. This data will be converted to usable JSON and than the inner html of the temperature and humidity will be changed with the new values.

```javascript
var temp_hum = data;
            
            temp_hum = JSON.parse(temp_hum);

            document.getElementById("huis_temp").innerHTML = temp_hum["temperature"];
            document.getElementById("huis_hum").innerHTML = temp_hum["humidity"];

            // Check if face is unknown or not. it can try 5 times if unknown and 2 times if known. We do this to ensure the user is actually that user.
        
        
        });
```

This whole function can be found in ''scripts/temperature.js'' and is named and called using ``read_temperature()``.
