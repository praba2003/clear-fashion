const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * BRAND 1 - DEDICATED BRAND 
 * Parse webpage e-shop 
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

    return $('.productList-container .productList')
    .map((i, element) => {
      const brand = 'dedicated';

      const link = `https://www.dedicatedbrand.com${$(element)
        .find('.productList-link')
        .attr('href')}`;

      const material_info = $(element)
        .find('.productList-image-materialInfo')
        .text()
        .trim()
        .replace(/\s/g, ' ');

      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {brand, link, material_info, name, price};
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
