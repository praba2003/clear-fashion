/* eslint-disable no-console, no-process-exit */
const adresseparis_brand = require('./sources/adresseparisbrand'); 

const url_adresseparis = "https://adresse.paris/583-manteaux-et-blousons";

async function sandbox (eshop = url_adresseparis) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresseparis_brand.scrape(eshop);

    products.forEach(product => {
      console.log(product)
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