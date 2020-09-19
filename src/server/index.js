const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");


// Set up express app
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({"extended":"true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));


// Endpoints
const filepath = path.resolve(__dirname, "./data.json");

app.get("/data", function(req, res) {
    const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
    res.json(data);
});

app.post("/data", function(req, res) {
    const newData = JSON.stringify(req.body, null, 2);
    fs.writeFileSync(filepath, newData, "utf8");
    res.json({ message: "success" });
});


// Start listening
const port = 8080;
app.listen(port);
console.log(`Server listening to port ${port}`);