import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let visited_countries = [];
  const result = (await db.query("SELECT * FROM visited_countries"));

  result.rows.forEach(row => {
    visited_countries.push(row.country_code);
  });
  res.render("index.ejs", {
    countries: visited_countries,
    total: result.rowCount,
  })
});

app.post("/add", async (req,res)=>{
  const new_country = req.body.country;
  const countries = (await db.query("SELECT * FROM countries")).rows;
  
  let index = countries.findIndex((country) => country.country_name.toLowerCase()===new_country.toLowerCase());
  if (index > -1) {
    db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countries[index].country_code]);
    res.redirect("/");
  }else{
    console.error("Could not insert new data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
