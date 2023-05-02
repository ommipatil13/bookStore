const express = require("express");

const mongoose = require("mongoose");

require('dotenv').config();

const bodyParser = require("body-parser");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");

const productRoutes = require("./routes/product");

const userRoutes = require("./routes/user");

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("DB CONNECTED");
});

const app = express();

const port = process.env.PORT;


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);


app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.get("/", (req, res) => {
    res.send("Hello");
})



app.listen(port, (req, res) => {
    console.log(`Server is Up and Running at localhost:${port}`);
});