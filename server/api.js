const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const PORT = 8092;
const app = express();
const db = require('./db');

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

/**
* ENDPOINT 1 - GET /products
*/

app.get('/products', (request, response) => 
{
  db.getDB();
  db.find().then(elmt => response.send(elmt));
});

// To test : http://localhost:8092/products

/**
* ENDPOINT 2 - GET /products/:id
*/
app.get('/products/:id', (request, response) => 
{
  db.getDB();

  //let url = request.url;
  //let elements = url.split('/');
  //let id = elements[elements.length - 1];

  let id = request.params.id
  db.find({'_id': id}).then(elmt => response.send(elmt[0]));
});
// To test : http://localhost:8092/products/89f2dc10-a334-5e29-a5f5-3773d819c195

/**
* ENDPOINT 3 - GET /products/search
*/
app.get('/products//search', (request, response) => 
{
  let limit = request.query.limit;
  let brand = request.query.brand;
  let price = request.query.price;
  
  db.aggregate(
    [
      {'$match': { '$and': [ {'brand': brand}, {'price': {'$lte':parseInt(price)}}]}},
      {'$sort': {'price': 1}},
      {'$limit': parseInt(limit)}
    ]
  ).then(elmt => response.send(
    {'limit': limit, 
     'found':elmt.length, 
     'results':elmt
  }));
  
});
// To test : http://localhost:8092/products//search?limit=5&brand=loom&price=50

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);