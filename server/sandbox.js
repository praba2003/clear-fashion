/* eslint-disable no-console, no-process-exit */
const dedicated_brand = require('./sources/dedicatedbrand');
const montlimart_brand = require('./sources/montlimartbrand'); 
const adresseparis_brand = require('./sources/adresseparisbrand'); 

const url_dedicated = 'https://www.dedicatedbrand.com/en/men/news';
const url_montlimart = "https://www.montlimart.com/fabrique-en-france.html?gclid=EAIaIQobChMI9OaIrNKv9gIVSQOLCh2C8gvkEAAYASAAEgLl1PD_BwE";
const url_adresseparis = "https://adresse.paris/583-manteaux-et-blousons";

async function sandbox (eshop = url_montlimart) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //const products = await dedicatedbrand.scrape(eshop);
    const products = await montlimart_brand.scrape(eshop);
    //const products = await adresseparis_brand.scrape(eshop);

    products.forEach(product => {
      console.log(product)
      //console.log("The title of the product is : " + product.name);
      //console.log("The price of the product is: " + product.price + "€")
    })

    console.log('done');
    process.exit(0);
  
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
