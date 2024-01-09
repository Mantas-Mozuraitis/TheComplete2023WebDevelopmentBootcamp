
import dotenv from "dotenv"
const env = dotenv;
env.config();

import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import bcrypt from "bcrypt"
import GooglePassport from "passport-google-oauth20"
import FacebookPassport from "passport-facebook"

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

app.use(session({
    secret: "ThisIsSecret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function verify(username, password, done) {
        db.query('SELECT * FROM users WHERE username = $1', [username], function (error, user){
            if (error) {return done(error);}
            if (user.rows.length === 0) {return done(null, false, {message: 'User does not exist'});}
            user = user.rows[0];
            bcrypt.compare(password, user.password, function(error, passwordMatch){
                if (error) {return done(error);}
                if (!passwordMatch) {return done(null, false, {message: 'User password incorrect'});}
                return done(null, user);
            })
        })
    }
))

passport.serializeUser(function(user, done) {
    process.nextTick(function() {
      done(null, { id: user.id, username: user.username });
    });
  });
  
passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
      return done(null, user);
    });
  });

const GoogleStrategy = GooglePassport.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    db.query("SELECT * FROM users WHERE google_id = $1", [profile.id], (error,result)=>{
        console.log(result.rows.length);
        if(error){ 
            return cb(error);
        }
        if (result.rows.length > 0) {
            return cb(null, result.rows[0]);
        }else{
            db.query("INSERT INTO users (google_id) VALUES ($1)", [profile.id], (error, insertResult)=>{
                if (error) {
                    return cb(error);
                }
                return cb(null,insertResult.rows[0]);
            })
        }
    })
  }
));

const FacebookStrategy = FacebookPassport.Strategy; 



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    req.isAuthenticated()?res.redirect("/secrets"):res.render("home.ejs");
})

// LOGIN ROUTES
app.get("/login", (req,res)=>{
    res.render("login.ejs");
})
app.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
(req, res)=>{
  res.redirect("/secrets");
})

app.get("/auth/google", (req, res) => {
    passport.authenticate("google", { scope: ["profile"] })(req, res);
});
app.get("/auth/google/secrets", 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


// REGISTER ROUTES
app.get("/register", (req,res)=>{
    res.render("register.ejs");
})
app.post("/register", (req,res)=>{
    bcrypt.hash(req.body.password, 10, async function(err,hash){
        try {
            await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hash]);
            console.log("new user has been created");
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        } catch (error) {
            console.error("Error:", error.message);
            res.redirect("/register");
        }
    })
})

// LOGOUT ROUTE
app.get('/logout', (req, res, next)=>{
    req.logout((err)=>{
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

// SECRETES ROUTE FOR AUTHENTICATED USERS
app.get("/secrets", (req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets.ejs");
    }else{
        res.redirect("/login");
    }
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})

