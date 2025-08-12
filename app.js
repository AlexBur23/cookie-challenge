const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8080;

app.use(cookieParser());


app.get("/login/:name", (req, res) => {
  const name = req.params.name;
  res.cookie("name", name, 
    { 
    maxAge: 900000, 
    httpOnly: true 
    });
  res.send(`Welcome, ${name}! Your login cookie has been set.`);
  console.log(`Welcome, ${name}! Your login cookie has been set.`);
});

app.get("/hello", (req, res) => {
  const name = req.cookies.name;
  if (name) {
    res.send(`Welcome back, ${name}!`)
    console.log(`Welcome back, ${name}!`);
  } else {
    res.send("Please log in first using the /login/{name} route.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});