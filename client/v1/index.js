// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

//console.table(MY_FAVORITE_BRANDS);
//console.log(MY_FAVORITE_BRANDS[0]);
//console.log(MY_FAVORITE_BRANDS[1]);
//console.log(MY_FAVORITE_BRANDS[2]);

/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

const {marketplace} = require('./data.js')
//console.table(marketplace);


// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var number_products = marketplace.length;
//console.log(number_products);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brands_name = [];
marketplace.forEach(element => brands_name.push(element['brand']));
brands_name = [...new Set(brands_name)];
//console.log(brands_name);
//console.log(brands_name.length);


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function sort_by_price(product_1, product_2){
  return product_1['price'] - product_2['price']
};
var marketplace_sortedByPrice = marketplace.sort(sort_by_price);
//console.table(marketplace_sortedByPrice);


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function sort_by_date(product_1, product_2){
  return new Date(product_1['date']) - new Date(product_2['date'])
};
var marketplace_sortedByDate = marketplace.sort(sort_by_date);
//console.table(marketplace_sortedByDate);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

var marketplace_filtered = marketplace.filter(product => 50 <= product['price'] <= 100);
//console.table(marketplace_filtered);
//console.log(marketplace_filtered.length);


// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

function average(list_products){
  let average_price = 0;
  marketplace.forEach(element => average_price = average_price + element['price']);
  average_price = average_price / marketplace.length;
  return average_price;
}
//console.log(average(marketplace));


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

let marketplace_1083 = marketplace.filter(marketplace => marketplace['brand'] == '1083');
let marketplace_dedicated = marketplace.filter(marketplace => marketplace['brand']== 'dedicated');
let marketplace_aatise = marketplace.filter(marketplace => marketplace['brand'] == 'aatise');
let marketplace_loom = marketplace.filter(marketplace => marketplace['brand'] == 'loom');
let marketplace_adresse = marketplace.filter(marketplace => marketplace['brand'] == 'adresse');

const brands = {
  '1083': marketplace_1083,
  'dedicated': marketplace_dedicated,
  'aatise': marketplace_aatise,
  'loom': marketplace_loom,
  'adresse': marketplace_adresse,
};

console.log(marketplace_1083);
//console.log(brands.aatise.length);
//console.log(brands.adresse.length);
//console.log(brands.dedicated.length);
//console.log(brands.loom.length);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

const brands_sortedByPrice = {...brands};
for(var element in brands_sortedByPrice){
  brands_sortedByPrice[element].sort(sort_by_price);
};
//console.log(brands_sortedByPrice);


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
const brands_sortedByDate = {...brands};
for(var element in brands_sortedByDate){
  brands_sortedByDate[element].sort(sort_by_date);
};
//console.log(brands_sortedByDate);


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
var p90 = 0;
for(var key in brands_sortedByPrice){
  p90 = Math.floor(brands_sortedByPrice[key].length *(9/10));
  console.log(brands_sortedByPrice[key][p90].price);
}

/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.


function new_released_products(products){
  products.forEach(element => {

    if(new Date(element.Date) - Date.now() < 14){
      console.log(element);
    }
  });
}


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

function reasonable_price(products){
  var price = 0;
  products.forEach(element => price += element["price"]);
  //console.log(price);
  return price<100
}
// console.log(reasonable_price(COTELE_PARIS));


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

function find_product(product_uuid, products){
  var elmt = "Not found !";
  products.forEach(element => {
    if(element["uuid"] == product_uuid){
      elmt = element;
    }
  });
  return elmt;
};
//console.log(find_product('f48810f1-a822-5ee3-b41a-be15e9a97e3f',COTELE_PARIS));
//console.log(find_product('b56c6d88-749a-5b4c-b571-e5b5c6483131',COTELE_PARIS));


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

function delete_product(product_uuid, products){
  products.forEach(element => {
    if(element["uuid"] == product_uuid){
      delete element["uuid"];
    }
  });
};
delete_product('b56c6d88-749a-5b4c-b571-e5b5c6483131',COTELE_PARIS);
//console.table(COTELE_PARIS);


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
// console.log(blueJacket);
// console.log(jacket);
// When we update the property favorite for the element named 'jacket'. The property of the element 'blueJacket' is also modified

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket = {... blueJacket};
jacket.favorite = true;
//console.log(blueJacket.favorite);
//console.log(jacket.favorite);

/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

//new_released_products(COTELE_PARIS);