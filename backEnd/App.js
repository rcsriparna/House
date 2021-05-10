"use strict";
const express = require("express");
const path=require("path")
const app = express();
const PORT = 3001;
const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors())
app.use(express.json());  //'modern way' - (replaces 'bodyParser')
let houses=[]

houses.push({id: 1,price:27500,area:"Handsworth",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
houses.push({id: 2,price:1450000,area:"Harbourne",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
houses.push({id: 3,price:165000,area:"Edgbaston",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})
houses.push({price:127500,area:"Sutton Coldfield",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
houses.push({price:1750000,area:"Aston",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
houses.push({price:265000,area:"Hamstead",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})
//app.use(express.static(path.join(__dirname, '')));
app.get("/houses", (req, res) => {  
  res.type('application/json') 
  res.send(JSON.stringify( houses ));
});
app.post("/sms", (req, res) => {

    let msg = `Hello ${req.body.name} want to see ${req.body.id} house on ${req.body.date} at ${req.body.time} and customer notes is ${req.body.msg}`
  sendSMS(msg, '447402214822' )//agent number

  let msgCustomer= `We have received you request${req.body.id}  `;
  sendSMS(msgCustomer, req.body.tel )// customer number
  
  res.type('application/json')
  res.send(JSON.stringify( "OK" ));
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
function sendSMS(msg,phoneNumber){
  // Prerequisite: install the request package e.g. npm install request
  const request = require('request');
  const apiKey = 'sgU1EBOeN88gQEiZr10vFTuVugiJww'; 
  const sendApiMessage = function(endpoint, messageArgs, callback) {
    return request.post(
        'https://www.firetext.co.uk/api/' + endpoint,
        { form: messageArgs },
        callback
    );
  };
  var endpoint = 'sendsms';
  var urlArgs = {
      'apiKey' : apiKey,
      'to' : phoneNumber, 
      'from' : 'Houses App',
      'message' : msg
  };
  sendApiMessage(endpoint, urlArgs, function(error, response, body){
    if (error) {
        return console.log(error);
    }
    console.log(body);
  });
}