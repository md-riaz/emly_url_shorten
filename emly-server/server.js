require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;
const emly = require('emly-nodejs')(process.env.KEY);

//Body-Parser
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
//handel cors
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
   next();
});
app.use(
   cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
   })
);

app.get('/links', (req, res) => {
   emly.link
      .list()
      .then(function (body) {
         res.send(body);
      })
      .catch(function (error) {
         res.send(error);
      });
});
app.post('/create', (req, res) => {
   const { url } = req.body;
   emly.link
      .create({
         url: url,
      })
      .then(function (error, body) {
         res.send(error);
         res.send(body);
      });
});

app.listen(port, () => {
   console.log(`Server is listening at ${port}`);
});
