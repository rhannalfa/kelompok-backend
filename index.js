const express = require('express')
const mysql   = require('mysql')
const cors    = require('cors')
global.app    = express()

global.knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test',
  },
});
 
app.use(cors());
app.use(express.json());

require("./module/user")
require("./module/login")

app.listen(4000)
