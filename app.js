const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

require("./app/routes/post.routes.js")(app);

const PORT = 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
