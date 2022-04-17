// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];

// instantiate the selectors
const selectPrice = document.querySelector('#price-select');
const selectBrands = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');

/**
 * Set global value
 * @param {Array} result - products to display
 */
const setCurrentProducts = ({result}) => {
  currentProducts = result;
};

/**
 * Fetch products from api
 * @return {Object}
 */
const fetchProducts = async () => {
  try {
    const response = await fetch(`https://server-six-orcin.vercel.app/products`)
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      /**
      * Feature - Open product link
      */
      return `
      <div class="product" id="${product._id}">
        <div class="product-img">
          <img src = ${product.photo}>
        </div>
        <div class="product-body">
          <h2 href="${product.link}">${product.name}</h2>
          <p>${product.brand}<br>${product.price}€</p>
        </div>
        <div class="product-footer">
          <form action="${product.link}">
            <button type="submit">Read more</button>
          </form>
        </div>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2 style="font-family:Lucida Handwriting;"></h2>';
  sectionProducts.appendChild(fragment);
};

const render = (products) => {
  renderProducts(products);
};


/**
 * Declaration of all Listeners
 */


/**
 * Feature - Show products
 */

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts);
});

/**
 * Feature - Filter by brands
 */

 selectBrands.addEventListener('change', async (event) => {
  let brand = (event.target.value).toString()
  const products = await fetchProducts();
  setCurrentProducts(products);

  currentProducts = currentProducts.filter(currentProducts => currentProducts['brand'] == brand);
  render(currentProducts);
});

/**
 * Setting of the parameter Display by
 */

selectPrice.addEventListener('change', async (event) => {
  let price = parseInt(event.target.value)
  const products = await fetchProducts();
  setCurrentProducts(products);

  /**
  * Feature - Filter by price
  */
  currentProducts = currentProducts.filter(currentProducts => currentProducts['price'] < price);
  render(currentProducts);
});


/**
 * Setting of the parameter Sort
 */

function sort_by_price(product_1, product_2){
  return product_1['price'] - product_2['price']
};

selectSort.addEventListener('change', async (event) => {
  let sort = (event.target.value).toString()
  const products = await fetchProducts();
  setCurrentProducts(products);

  /**
  * Feature  - Sort by price
  */

  if(sort == 'price-asc')
  {
    currentProducts = currentProducts.sort(sort_by_price);
  }
  
  if(sort == 'price-desc')
  {
    currentProducts = currentProducts.sort(sort_by_price);
    currentProducts.reverse();
  }
  
  render(currentProducts);
});