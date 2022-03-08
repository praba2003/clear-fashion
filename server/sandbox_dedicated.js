/* eslint-disable no-console, no-process-exit */
const dedicated_brand = require('./sources/dedicatedbrand');

const url_dedicated = 'https://www.dedicatedbrand.com/en/men/news';

async function sandbox (eshop = url_dedicated) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicated_brand.scrape(eshop);

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
