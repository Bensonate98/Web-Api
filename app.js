const express = require("express");
// const dotenv = require("dotenv");
const port = 1000;

// dotenv.config();

const app = express();

app.get("/api", (req, res)=>{
  const ip = req.ip;

  
  fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_FctlM4bUga9PByPjV0vusCyVDmXvD&ipAddress=${ip}`)
  .then(res=>res.json())
  .then(data=>res.send(data))
  .catch(err=>console(err))
})


app.listen(port, ()=>{
  console.log(`server running at port ${port}`);
})
