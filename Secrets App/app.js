//jshint esversion:6
import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secrets_app",
    password: "password",
    port: 5432,
})
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("home.ejs");
})

// LOGIN ROUTES
app.get("/login", (req,res)=>{
    res.render("login.ejs");
})
app.post("/login", async (req,res)=>{
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [req.body.username]);
        if (user.rowCount>0) {
            user.rows[0].password === req.body.password
            ?res.render("secrets.ejs")
            :console.log("Password is incorrect"), res.redirect("/login");
        } else{
            console.log("user does not exist");
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Error: ", error.message);
    }
})


// REGISTER ROUTES
app.get("/register", (req,res)=>{
    res.render("register.ejs");
})
app.post("/register", async (req,res)=>{
    try {
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [req.body.username, req.body.password]);
        console.log("new user has been created");
        res.render("secrets.ejs");
    } catch (error) {
        console.error("Error:", error.message);
    }
})

app.listen(port, (req,res)=>{
    console.log(`Server is listening on port ${port}`);
})
