require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketHandler = require('./config/socket');
const mongoose = require('mongoose');
const route = require('./route/routes');

const app = express();
const server = http.createServer(app);
// app.use(cors());

app.use(cors({
    origin: "*", // or better: ["http://your-s3-website-url"]
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.use(route)

socketHandler(server); // Socket.io logic

const PORT = process.env.PORT || 5000;
const DB = process.env.DB;

mongoose.connect(DB)
    .then(() => { console.log("Connected Database") })
    .catch((err) => { console.log(err) })

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

