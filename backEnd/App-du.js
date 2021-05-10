"use strict";
const express = require("express");
const path=require("path")

const app = express();
const PORT = 3001;

//let ticket = 0;
//const displayList = {};

const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors())
app.use(express.json());  //'modern way' - (replaces 'bodyParser')

let houses=[]

houses.push({price:27500,area:"Handsworth",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
houses.push({price:1450000,area:"Harbourne",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
houses.push({price:165000,area:"Edgbaston",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})

//var bodyParser = require('body-parser')
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '')));

app.get("/houses", (req, res) => {

  res.type('application/json')
  res.send(JSON.stringify( houses ));
});

app.post("/sms", (req, res) => { //request comes here
sendSMS(req.body.msg, req.body.tel)
res.type('application/json')
res.send(JSON.stringify( 'Ok'));
});

  



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function sendSMS(msg,phoneNumber){

  // Prerequisite: install the request package e.g. npm install request
  
  const request = require('request');
  const apiKey = 'YsgU1EBOeN88gQEiZr10vFTuVugiJww'; 
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
      'to' : '447402214822',
      'from' : 'Firetext',
      'message' : msg
  };
  
  sendApiMessage(endpoint, urlArgs, function(error, response, body){
      if (error) {
          return console.log(error);
      }
      console.log(body);
  });
  }

 //original code
  /* 
 "use strict";
 const express = require("express");
 const path=require("path")
 const app = express();
 const PORT = 3001;
 const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
 app.use(cors())
 app.use(express.json());  //'modern way' - (replaces 'bodyParser')
 let houses=[]
 houses.push({price:27500,area:"Handsworth",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
 houses.push({price:1450000,area:"Harbourne",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
 houses.push({price:165000,area:"Edgbaston",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})
 //app.use(express.static(path.join(__dirname, '')));
 app.get("/houses", (req, res) => {  
   res.type('application/json') 
   res.send(JSON.stringify( houses ));
 });
 app.post("/sms", (req, res) => {
   sendSMS(req.body.msg, req.body.tel)
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
*/

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
function Appointment(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsFormOpen] = useState(false);
    const [isBooked, setIsBooked] = useState({booked:false,});
    const sendSMS = () => {
        async function doSMS() {
            let payload={msg:document.getElementById("msg").value,tel:document.getElementById("tel").value}
            console.log (payload)
            let response = await fetch("http://localhost:3001/sms", {
                method: "POST", body: JSON.stringify(payload), headers: {
                     'Accept': 'application/json', 'Content-Type': 'application/json' 
                }                
            })
            let result = await response.json()
        }
        doSMS()
    }
    if (isOpen) {
        return (
            <div>
                <label>Preferred date:</label><DatePicker selected={startDate} onChange={date => setStartDate(date)} /><br />
                <label>Preferred time:</label><input id='time' type='text'></input><br />
                <label>Contact email:</label><input id='email' type='text'></input><br />
                <label>Contact phone:</label><input id='tel' type='text'></input><br />
                <label>Notes/comments:</label><br /><textarea id='msg' rows="5" cols="40"></textarea><br />
                <button onClick={() => { 
                  setIsFormOpen(false); 
                  setIsBooked(true); 
                  sendSMS()}}>Submit</button>
            </div>
        );
    }
    return (
        <button onClick={() => setIsFormOpen(true)}>{isBooked ? "Booked" : "Request viewing"}</button>
    )
}
export default Appointment;
  