require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

const staticUserAuth = basicAuth({
  users: { admin: process.env.MYBIT_GO_ADMIN_PASSWORD },
  challenge: true,
});

app.use(staticUserAuth);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', staticUserAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);
