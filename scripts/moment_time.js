var moment = require('moment');
// moment.locale(); 

function updateTime() {
    document.getElementById('uren_minuten').innerHTML  = moment().format('H:mm');
    document.getElementById('dag_datum').innerHTML  = moment().format('dddd, MMMM Do');
    document.getElementById("tijd").classList.add('fadeInDown');
}
updateTime();
setInterval(function(){
    updateTime();
},1000);