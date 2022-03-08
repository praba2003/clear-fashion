/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');

async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    /**
     * Way 1 with for of: we scrape page by page
     */
    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }
    
    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    /**
     * TODO 1 - Find all products related to a given brands
     */
    console.log('💽  Find Loom products only');

    const loom_only = await db.find({'brand': 'loom'});

    console.log(`👕 ${loom_only.length} total of products found for Loom`);
    //console.log(loom_only);

    loom_only.forEach(product => {
      console.log(product)
    });


    /**
     * TODO 2 - Find all products less than a price
     */
    let price = 80;
    console.log('💽  Find all products less than a price, here ' + price);
    const loom_less_price = await db.find({'brand': 'loom', 'price': {"$lt": price}});

    console.log(`👕 ${loom_less_price.length} total of products found for Loom`);
    //console.log(loom_less_price);

    loom_less_price.forEach(product => {
      console.log(product)
    });

    /**
     * TODO 3 - Find all products sorted by price
     */
    console.log('💽  Find all products sorted by price');
    

    /**
     * TODO 4 - Find all products sorted by date
     */

    

    /**
     * TODO 5 - Find all products scraped less than 2 weeks
     */



    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
