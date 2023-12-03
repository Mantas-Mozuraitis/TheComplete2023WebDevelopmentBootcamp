
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// API 
const APIURL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Server request handling
app.get("/", async (req,res)=>{
    try {
        const response = await axios.get(APIURL+'/random');
        console.log("API access succesfull");
        res.render("index.ejs",{secret:response.data.secret,user:response.data.username})
      } catch (error) {
        console.error(error);
      }
})

app.listen(port, (req,res)=>{
    console.log(`Listening to port ${port}`);
})