const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * BRAND 3 - ADRESSE PARIS 
 * Parse webpage e-shop 
 * @param  {String} data - html response
 * @return {Array} products
 */

const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-container .right-block')
    .map((i, element) => {
      const brand = 'adresseparis';
      
      const name = $(element.children.at(1))
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');

      const description = $(element)
      .find('.product-desc')
      .text()
      .trim()
      .replace(/\s/g, ' ');

      const price = parseInt(
        $(element)
          .find('.prixright')
          .text()
      );

      return {brand, name, description, price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */

module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);
    return null;
    
  } catch (error) {
    console.error(error);
    return null;
  }
};
