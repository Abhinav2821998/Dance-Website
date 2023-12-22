//VVI Important steps
const express = require("express"); //Importing express module.
//var mongoose = require('mongoose');
const path = require("path"); //Importing path module.
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express(); //Creating an express application.

//Step1--> Establish a connection string
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DanceWebsite', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//Step2--> Define mongoose schema
var ContactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String,
});


//Step3--> schema converted to model i.e. 
var Contact = mongoose.model('Contact',ContactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//serving static files in nodejs through Express.
app.use(express.urlencoded()) // HTML form ka submitted and saved data Express m laane k liye.

//PUG SPECIFIC STAFF/CONFIGURATION
app.set('view engine','pug') //Set the template engine as pug. Now I can create . pug file. Konsa view engine use krna chahte ho ye batao.
app.set('views', path.join(__dirname,'views'))  //Set the views directory. Konsi directory se aap read krna chahte hain apni saare template files ko.

//ENDPOINTS

app.get('/', (req, res) => { /*app.get ka end point*/
    const params = {};
    //res.status(200).render('index.pug',params);
    res.status(200).render('home.pug',params); /*ab home.pug serve hogi*/
})

app.get('/contact', (req, res) => { /*app.get ka end point*/
    const params = {};
    //res.status(200).render('index.pug',params);
    res.status(200).render('contact.pug',params); /*ab contact.pug serve hogi*/
})


app.post('/contact', (req, res) => { /*app.post ka end point.Agar post request karoge to parameters iss endpoint pr aayega. Params. menubar m display na ho.*/
    var conData = new Contact(req.body);
    conData.save().then(()=>{res.send("The data has been saved successfully to the backend.")})
    .catch(()=>{res.status(400).send("The data failed to save in backend")});
    //res.status(200).render('index.pug');
})


//START THE SERVER
app.listen(port, ()=>{ //ye btao ki aap konse port pe listen krna chahte hain
console.log(`The app has been successfully started on port ${port}`);
})