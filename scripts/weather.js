var fs = require('fs');
var path = require('path'); 
var first_load = true;

const userAction = async () => {
    var city = "saint petersburg"
    const response = await fetch('http://openweathermap.org/data/2.5/weather?q='+city+'&appid=b6907d289e10d714a6e88b30761fae22');
    const myJson = await response.json(); //extract JSON from the http response
    
    var main = myJson.weather[0].main;
    var id = myJson.weather[0].id;
    var weather_icon = myJson.weather[0].icon;
    var description = myJson.weather[0].description;
    var temperature = myJson.main.temp;
    
    var icon_description = description.replace(" ", "_");

    var icon = "icons/"+main+"/"+id+".svg";

    if (checkImage(icon) == true){
        change_weather(icon, city, description, temperature);
    } else {
        icon = "icons/"+main+"/"+icon_description+".svg";
        if (checkImage(icon) == true){
            change_weather(icon, city, description, temperature);
        } else {
            icon = "icons/"+main+"/"+weather_icon+".svg";
            if (checkImage(icon) == true){
                change_weather(icon, city, description, temperature);
            }else{
                icon = "icons/"+main+"/default.svg";
                if (checkImage(icon) == true){
                    change_weather(icon, city, description, temperature);
                } else {
                    icon = "icons/unknown.svg";
                    change_weather(icon, city, description, temperature);
                }
            }
        }
    }
}



function checkImage(url) {
    if (fs.existsSync(url)) { 
        return true
    } else {
        return false;
    }
}

function change_weather(this_icon, city, description, temperature){
    document.getElementById("weather_icon").src = '../' + this_icon;
    document.getElementById("weather_temperature").innerHTML = temperature;
    document.getElementById("weather_description").innerHTML = description.capitalize();
    document.getElementById("weather_city").innerHTML = city.capitalize();
    if (first_load == true){
        document.getElementById("weer").classList.add('fadeInDown');
        first_load = false;
    }
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
userAction()  
setInterval(function(){
    userAction()  
},10000);
  