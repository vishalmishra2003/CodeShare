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
const allowedOrigins = [
  'http://localhost:5173',
  'http://codeshare-frontend.s3-website-us-east-1.amazonaws.com'
];

app.use(
  cors({
    origin: "http://codeshare-frontend.s3-website-us-east-1.amazonaws.com",//process.env.CLIENT_V2
    credentials: true,
    methods: ['GET', 'POST'],
  }));
// app.use(cors({
//     origin: "*", // or better: ["http://your-s3-website-url"]
//     credentials: true
// }));

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

