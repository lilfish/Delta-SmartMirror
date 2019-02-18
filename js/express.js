const express = require('express');
const exp = express();
const port = 3000

exports.start_express = function() {
    exp.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

exp.get('/test', (req, res) => res.send('Hello World! - test XD'))

exp.post('/', function (req, res) {
    console.log('hoi');
    res.send('POST request to the homepage')
})

exp.get('/', function (req, res) {
    
})
