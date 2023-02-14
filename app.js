const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
  res.sendFile(__dirname +  "/index.html");
   
});

app.post("/", function(req, res) {

   
const query = req.body.cityName;
const apiKey = "8a7862d0ef012e7bf67a25795ee48045";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response) {
 console.log(response.statusCode);

 response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    console.log(temp);

    const description = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write (" <p>The Weather is currently " + description + "</p> ");
    res.write ("<h1>The Current Temperature in " + query + " is " + temp + " Degrees Celcius.</h1>");
    res.write ("<img src=" + imageURL + " >");
    res.send ();
 });
}); 
});



app.listen(3000, function(){
    console.log(" Server is running");
});