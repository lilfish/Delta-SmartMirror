# Express

We added express to the project to be able to send API calls and use a mobile phone app which will be made in react-native. The express.js file can be found in the folder './js' and is added to the project on top of main.js with this line: ``const myExpress = require('./js/express');`` 

## Starting

Express is started when the app is ready in the main.js file.
This is done with this line of code: ``myExpress.start_express();``. When Express is started it will console log on what port it started, which is port 3000.

## The code

The express code is fairly simple. It starts express on port 3000 and console logs this. Than there are simple ``get`` and ``post`` functions in javascript. 

#### Start code
We export the start_express function to be able to use this in the main.js
```javascript
exports.start_express = function() {
    exp.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
```

#### Get function
A simple get function looks like this:
```javascript
exp.get('/test', (req, res) => res.send('Hello World!'))
```

#### Post function
A simple post function looks like this:
```javascript
exp.post('/', function (req, res) {
    res.send('POST request to the homepage')
})
```

In the examples above ``req`` stands for request, which is the request you can send using a API call.
``Res`` stands for response, which is the response you can send back the moment the function is called.
