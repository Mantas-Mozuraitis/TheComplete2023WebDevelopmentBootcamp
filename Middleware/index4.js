import express from "express";
import bodyParser from "body-parser";
// find local directory 
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your bands name is</h1><h2>${req.body.street}${req.body.pet}</h2>`)
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
