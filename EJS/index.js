import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) =>{
    const currentDate = new Date();
    var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    res.render("index.ejs",{
        dayOfWeek:dayNames[currentDate.getDay()-1]
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
