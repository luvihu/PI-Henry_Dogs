
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');

require("./db.js");

const server = express();
server.use(cors());

server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(router);

server.use('*', (req,res)=>{
  res.status(404).json({error: 'Not found'});
});

module.exports = server;