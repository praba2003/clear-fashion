/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const montlimart_brand = require('./sources/montlimartbrand');  

const url_montlimart = "https://www.montlimart.com/fabrique-en-france.html?gclid=EAIaIQobChMI9OaIrNKv9gIVSQOLCh2C8gvkEAAYASAAEgLl1PD_BwE";

async function sandbox (eshop = url_montlimart) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart_brand.scrape(eshop);

    products.forEach(product => {
      console.log(product)
    })

    console.log('done');

    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync('products_for_montlimart_brand.json', data);
    process.exit(0); 
  
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
