import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost", 
  database: "permalist",
  password: "password",
  port: 5432,
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//retrieve permalist from database
async function getPermalist(){
  const res = await db.query("SELECT * FROM items ORDER BY id ASC");
  return res.rows;
}

//add new item to permalist
async function addItemToPermalist(item){
  await db.query("INSERT INTO items (title) VALUES ($1)", [item])
}

//update existing item form permalist
async function updateItemFromPermalist(id, title){
  await db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id])
}

//delete existing item form permalist
async function deleteItemFromPermalist(id){
  await db.query("DELETE FROM items WHERE id = $1", [id]);
}

app.get("/", async (req, res) => {
  const items = await getPermalist();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  addItemToPermalist(item);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const i = req.body;
  updateItemFromPermalist(req.body.updatedItemId, req.body.updatedItemTitle);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  deleteItemFromPermalist(req.body.deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
