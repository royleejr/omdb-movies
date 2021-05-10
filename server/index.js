const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

const searchRoute = require("./routes/search.js");
const nominationsRoute = require("./routes/nominations.js");
const categoryRoute = require("./routes/category.js");

app.use(cors());
app.use(express.json());

app.use("/nominations", nominationsRoute);
app.use("/search", searchRoute);
app.use("/category", categoryRoute);

app.listen(port, () => {
  console.log("The server is running");
});
