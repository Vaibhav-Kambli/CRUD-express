const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8000;

const app = express();

// middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extented: false }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// members api route
app.use("/api/users", require("./routes/api/users"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
