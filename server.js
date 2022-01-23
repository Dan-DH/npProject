//setting the server
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
//const passport = require("passport");
//require("./backend/config/passport")(passport);
const path = require("path");

//setting middleware
//app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const secretCat = process.env.secret || require("./backend/config/keys").secret;
// app.use(
//   session({
//     name: "session",
//     keys: [secretCat],1
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// //setting passport
// app.use(passport.initialize());
// app.use(passport.session());

//setting authentication route (no router)
// app.get("/authentication", function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   req.user ? res.send("Authenticated") : res.send("Login needed");
// });

//setting routes
const users = require("./backend/routes/users");
app.use("/users", users);
const comments = require("./backend/routes/events");
app.use("/events", comments);

//serving static files on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

//mongo config and connection
const db = process.env.MONGODB_URI || require("./backend/config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//starting server
app.listen(port, () => {
  console.log(`Catbook backend listening at http://localhost:${port}`);
});
