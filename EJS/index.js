import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) =>{
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let type = dayNames[currentDay];
    let adv;
    if(type ==="Saturday" || type === "Sunday"){
        adv = "it's time to party hard!"
    }else{
        adv = "it's time to work hard!"
    }
    res.render("index.ejs",{
        dayType: type,
        advice: adv,
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
