import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "mozmantas";
const yourPassword = "Lokys";
const yourAPIKey = "3a96870c-2cf6-4d68-a591-00f6170d00ba";
const yourBearerToken = "fb57a557-3b7a-44b7-9dfd-bded1f74e148";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  axios.get(`${API_URL}random`)
  .then(function (response) {
      res.render("index.ejs", {
        content: JSON.stringify(response.data)
      })
  })
  .catch(function (error) {
    console.log(error);
    res.render("index.ejs", {
      content: error
    })
  })
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  axios.get(`${API_URL}all?page=2`, {
    auth:{
      username: yourUsername,
      password: yourPassword
    }
  })
  .then(function (response) {
      res.render("index.ejs", {
        content: JSON.stringify(response.data)
      })
  })
  .catch(function (error) {
    console.log(error);
    res.render("index.ejs", {
      content: error
    })
  })

});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`)
  .then(function (response) {
      res.render("index.ejs", {
        content: JSON.stringify(response.data)
      })
  })
  .catch(function (error) {
    console.log(error);
    res.render("index.ejs", {
      content: error
    })
  })
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  axios.get(`${API_URL}secrets/42`, {
    headers:{'Authorization':`Bearer ${yourBearerToken}`}
  })
  .then(function (response) {
      res.render("index.ejs", {
        content: JSON.stringify(response.data)
      })
  })
  .catch(function (error) {
    console.log(error);
    res.render("index.ejs", {
      content: error
    })
  })

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
