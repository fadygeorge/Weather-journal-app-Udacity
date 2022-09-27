// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
// instialize the server
const server = app.listen(port, ()=>console.log(`Server is running on localhost: ${port}`));

//get function to send the data to client
app.get("/getData", (req, res)=>{res.send(projectData)});

//post function to get the data from client and add it to database
app.post("/postData", (req, res)=>{
    
    projectData["date"] = req.body.date;
    projectData["temperature"] = req.body.temperature;
    projectData["user_response"] = req.body.user_response;

    console.log(projectData);
    res.send(projectData);
   
});
