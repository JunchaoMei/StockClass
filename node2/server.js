// server.js
// Create 1/23/2019
// Stock Class

let x = 0;

let uuid = require('uuid');
let events = require('events');
let express = require('express');
let bodyParser = require('body-parser');

let request = require('request');

let app = express();

x++;

var analyticsEventEmitter = new events.EventEmitter();

app.set("analyticsEventEmitter", analyticsEventEmitter);

analyticsEventEmitter.on('analytic', function(info) {
    console.log('analytic Received. ' + JSON.stringify(info));
 });


 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


x++;


require("./routes/customers.js")(app);
require("./routes/things.js")(app);

// Default route if no other is defined, this a 404 route
app.use(function(req, res, next) {

    console.log("Running 404 code");

    res.status(404);
    res.setHeader("Content-Type", "application/json");
    res.end("{\"status\":\"Failed\"}");
});

app.use(function(err, req, res, next) {

    console.log("Running 500 code");

    console.log(err.stack);

    res.status(500);
    res.setHeader("Content-Type", "application/json");
    res.end("{\"status\":\"Something went really bad\"}");
});

x++;

app.listen(4040, "127.0.0.1", function(err) {

    if (err) {
       // console.log("Faileds to started successfully");
      //  console.log(err);
    }
    else {
        console.log("Server started successfully");
    }
});

request.get("http://httpbin.org/ip", (error, response, body) => {

    if (error) {
        console.log(error);
    }
    else {
        console.log("Got data " + body);

        let info = JSON.parse(body);

        console.log("origin=" + info.origin);
    }

});

x++;

