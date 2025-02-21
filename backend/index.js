const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');


app.use(cors());

require("dotenv").config;

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// connecting with database mongodb
require("./config/database").connect();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const document = require("./route/documents");
app.use("/api", document);

const dashboardRoutes = require("./route/dashboardRoute")
app.use("/api/dashboard", dashboardRoutes);

const userRoutes = require("./route/userRoute")
app.use("/api/user", userRoutes);

const authRoute = require("./route/authRoute")
app.use("/api", authRoute);

app.get("/", (req,res) => {
    res.send("Hello World");
});

// const Port = 3000;

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});
