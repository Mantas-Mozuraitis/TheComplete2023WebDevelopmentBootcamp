//jshint esversion:6
import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("home.ejs");
})

app.get("/login", (req,res)=>{
    res.render("login.ejs");
})

app.get("/register", (req,res)=>{
    res.render("register.ejs");
})

app.listen(port, (req,res)=>{
    console.log(`Server is listening on port ${port}`);
})
