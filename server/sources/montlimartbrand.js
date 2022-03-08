const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * BRAND 2 - MONLIMART BRAND 
 * Parse webpage e-shop 
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products .item')
  .map((i, element) => {
      const brand = 'montlimart';

      const link = `${$(element)
        .find('a')
        .attr('href')}`;

      const name = $(element)
      .find('.product-name a')
      .attr('title');

      const price = parseInt(
        $(element)
          .find('.price')
          .text()
      );

      return {brand, link, name, price};
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
