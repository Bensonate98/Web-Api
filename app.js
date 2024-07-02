const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.get("/api/hello", (req, res)=>{
  const visitorName = req.query.visitor_name || "Mark";
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Updated to use req.socket
  // console.log(ip);

  let location = null;
  let temp = null;
    //Get location data
const getLocation = ()=>{
  return fetch(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.GEO_API_KEY}&${ip}`)
  .then(res=>res.json())
  .then(data=>{
    const city = data.location.region;
    // console.log(city)
    return city;
  })
  .catch(err=>console.log("error occured while fetching location: ", err))
}


getLocation().then(region=>{
  location = region;
  // console.log("here: ", location)
  
  if(location){
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`)
    .then(res=>res.json())
    .then(tempData=>{
      temp = tempData.current.temp_c
      
      const apiData = {
        "client_ip": ip,
        "location": location,
        "greeting": `Hello, ${visitorName}!, the temperature is ${temp} degrees in ${location}`
      }
      res.json(apiData)

      // console.log(apiData.greeting)
    })
    .catch(err=>console.log("error occured while fetching temperature: ", err))
    
  }

})
.catch(err=>console.log("an error occurred", err))

})

app.listen(port, ()=>{
  console.log(`server running at port ${port}`);
})
