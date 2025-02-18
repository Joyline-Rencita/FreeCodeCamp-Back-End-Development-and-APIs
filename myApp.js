let express = require('express');
let app = express();

require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require("body-parser")

// Challenge 7: Implement Root-Level Request Logger Middleware (Place it at the top)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Challenge 3: Serve an HTML file
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Challenge 4: Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// challenge 11 : Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}))

// Challenge 5: Serve JSON on a Specific Route
app.get("/json", (req, res) => {
    let response = { message: "Hello json" };

    // Challenge 6: Use the .env File
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response.message = response.message.toUpperCase();
    }

    res.json(response);
});

// challenge 8 : Chain Middleware to Create a Time Server

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time})
})

// challenge 9 : Get Route Parameter Input from the Client

app.get("/:word/echo", (req, res) => {
    res.json( {echo : req.params.word})
})

module.exports = app;

// challenge 10 : Get Query Parameter Input from the Client

app.get("/name", (req, res) => {
    res.json({name: req.query.first + " " + req.query.last})
})

// challenge 12 : Get Data from POST Requests

app.post("/name", (req, res) => {
    res.json( {name : req.body.first + " " + req.body.last} )
})


































 module.exports = app;
