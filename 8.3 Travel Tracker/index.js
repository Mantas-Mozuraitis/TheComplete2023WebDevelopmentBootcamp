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
  const result = await db.query("SELECT * FROM visited_countries");
  const visited_countries = [];
  result.rows.forEach(row => {
    visited_countries.push(row.country_code);
  });
  console.log(visited_countries);
  res.render("index.ejs", {
    countries: visited_countries,
    total: result.rowCount,
  })
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
