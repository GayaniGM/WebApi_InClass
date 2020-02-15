const express = require("express");
const authentication = require("./middleware/authenticator");
const emailjob = require("./middleware/emailsender");
const mongoose = require("mongoose");
const heroes = require("./routes/heroes");
const home = require("./routes/home");

const app = express();

mongoose.connect("mongodb://localhost/herodb",{
userNewUrlParser:true
})
.then(() => console.log("Connected to database successfully!!!"))
.catch(ex => console.log(ex));

app.use(express.json());
app.use(emailjob);
app.use(authentication);
app.use("/", home);
app.use("/api/heroes", heroes); // custom middleware

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
