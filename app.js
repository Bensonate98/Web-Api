const express = require("express");
// const dotenv = require("dotenv");
const port = 3000;

// dotenv.config();

const app = express();

app.get("/api/hello", (req, res)=>{
  const visitorName = req.query.visitor_name || "Mark";
  const ip = req.ip;
  let location = null;
  let temp = null;
    //Get location data
const getLocation = ()=>{
  return fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_FctlM4bUga9PByPjV0vusCyVDmXvD&ipAddress=${ip}`)
  .then(res=>res.json())
  .then(data=>{
    const city = data.location.region;
    return city;
    // console.log(city)
  })
  .catch(err=>console.log("error occured while fetching location: ", err))
}

getLocation().then(region=>{
  location = region;
  
  if(location){
    fetch(`https://api.weatherapi.com/v1/current.json?key=198edff59c2d4ed5ba202639240107&q=${location}`)
    .then(res=>res.json())
    .then(tempData=>{
      temp = tempData.current.temp_c
      
      const apiData = {
        "client_ip": ip,
        "location": location,
        "greeting": `Hello, ${visitorName}!, the temperature is ${temp} degrees in ${location}`
      }
      res.json(apiData)

      console.log(apiData.greeting)
    })
    .catch(err=>console.log("error occured while fetching temperature: ", err))
    
  }

})

})

app.listen(port, ()=>{
  console.log(`server running at port ${port}`);
})
