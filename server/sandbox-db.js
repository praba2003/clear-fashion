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
     * WAY 1 : Scraping page by page
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

    // Method 1: 
    console.log('💽  Method 1 - Find Loom products only');
    const m1_loom_only = await db.find({'brand': 'loom'});
    console.log(`Method 1 - 👕 ${m1_loom_only.length} total of products found for Loom`); 
    m1_loom_only.forEach(product => {
      console.log(product)
    });
    
    // Method 2: 
    console.log('💽  Method 2 - Find Loom products only');
    const m2_loom_only = await db.aggregate(
      [
        {'$match':{'brand': 'loom'}}
      ]
    );;
    console.log(`Method 2 - 👕 ${m2_loom_only.length} total of products found for Loom`);
    m2_loom_only.forEach(product => {
      console.log(product)
    });


    /**
     * TODO 2 - Find all products less than a price
     */
    let price = 80;
    console.log('💽  Find all products less than a price, here ' + price);
    const m1_products_less_price = await db.find({'price': {"$lt": price}});
    console.log(`👕 ${m1_products_less_price.length} total of products found`);
    m1_products_less_price.forEach(product => {
      console.log(product)
    });
    

    /**
     * TODO 3 - Find all products sorted by price
     */

    // Method 1: 
    console.log('💽  Method 1 - Find all products sorted by price with sort');
    const m1_products_sorted_price = await db.sort({'price': 1});
    console.log(`Method 1 - 👕 ${m1_products_sorted_price.length} total of products found`);
    m1_products_sorted_price.forEach(product => {
      console.log(product)
    });
    
    // Method 2: 
    console.log('💽  Method 2 - Find all products sorted by price with aggregate');
    const m2_products_sorted_price_2 = await db.aggregate(
      [
        {'$sort':{'price': 1}}
      ]
    );
    console.log(`Method 2 - 👕 ${m2_products_sorted_price_2.length} total of products found`);
    m2_products_sorted_price_2.forEach(product => {
      console.log(product)
    });

    /**
     * TODO 4 - Find all products sorted by date
     */
    
    // Method 1: 
    console.log('💽  Method 1 - Find all products sorted by date');
    const m1_products_sorted_date = await db.sort({'date': 1});
    console.log(`Method 1 - 👕 ${m1_products_sorted_date.length} total of products found`);
    m1_products_sorted_date.forEach(product => {
      console.log(product)
    });
    
    // Method 2: 
    console.log('💽  Method 2 - Find all products sorted by date');
    const m2_products_sorted_date = await db.aggregate(
      [
        {'$sort':{'date': 1}}
      ]
    );
    console.log(`Method 2 - 👕 ${m2_products_sorted_date.length} total of products found`);
    m2_products_sorted_date.forEach(product => {
      console.log(product)
    });

    /**
     * TODO 5 - Find all products scraped less than 2 weeks
     */

    var current_date = Date.now();
    var before_date = current_date - 14;
    // Method 1: 
    console.log('💽  Method 1 - Find all products scraped less than 2 weeks');
   
    
    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
