// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectPrice = document.querySelector('#price-select');
const selectBrands = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbRecentProducts = document.querySelector('#nbRecentProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanLastReleasedDate= document.querySelector('#lastReleasedDate');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
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
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};


/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};


const renderBrands = pagination => {
  const { currentPage, pageCount } = pagination;
  var brands = ['adresse', 'loom', 'aatise', '1083', 'dedicated', 'coteleparis'];
  const options = Array.from(
    { 'length': brands.length },
    (value, index) => `<option value="${brands[index]}">${brands[index]}</option>`
  ).join('');

  selectBrands.innerHTML = options;
  selectBrands.selectedIndex = currentPage - 1;
};


/**
 * Render page selector
 * @param  {Object} pagination
 */

const renderIndicators = pagination => {

  // Feature 8 - Number of products indicator
  //const {count} = pagination;
  spanNbProducts.innerHTML = pagination.count;

  // Feature 9 - Number of recent products indicator
  spanNbRecentProducts.innerHTML = 0;

  // Feature 10 - p50, p90 and p95 price value indicator
  spanp50.innerHTML = 0;
  spanp90.innerHTML = 0;
  spanp95.innerHTML = 0;

  // Feature 11 - Last released date 
  spanLastReleasedDate.innerHTML = 0;
};


const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderBrands(pagination);
  renderIndicators(pagination);
};


/**
 * Declaration of all Listeners
 */


/**
 * Feature 0 - Show more
 */


let size = 12;
selectShow.addEventListener('change', async (event) => {
  size = parseInt(event.target.value)
  const products = await fetchProducts(currentPagination.currentPage, size);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


/**
 * Feature 1 - Browse pages
 */


let page = 1;
selectPage.addEventListener('change', async (event) => {
  page = parseInt(event.target.value)
  const products = await fetchProducts(page, size);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


/**
 * Feature 2 - Filter by brands
 */


 selectBrands.addEventListener('change', async (event) => {
  let brand = (event.target.value).toString()
  const products = await fetchProducts(page, size);
  setCurrentProducts(products);
  currentProducts = currentProducts.filter(currentProducts => currentProducts['brand'] == brand);
  render(currentProducts, currentPagination);
});


/**
 * Setting of the parameter Display by
 */

selectPrice.addEventListener('change', async (event) => {
  let display_by = (event.target.value).toString()
  const products = await fetchProducts(page, size);
  setCurrentProducts(products);


  // Feature 3 - Filter by recent products
  if(display_by == 'price-recently')
  {
    var today = new Date()
    currentProducts = currentProducts.filter(currentProducts => new Date(currentProducts['released']) - today.getDate() < 14);
  }


  // Feature 4 - Filter by reasonable price
  if(display_by == 'price-reasonnable')
  {
    currentProducts = currentProducts.filter(currentProducts => currentProducts['price'] <50);
  }

  render(currentProducts, currentPagination);
});


/**
 * Setting of the parameter Sort
 */

function sort_by_price(product_1, product_2){
  return product_1['price'] - product_2['price']
};

function sort_by_date(product_1, product_2){
  return new Date(product_1['released']) - new Date(product_2['released'])
};

selectSort.addEventListener('change', async (event) => {
  let sort = (event.target.value).toString()
  const products = await fetchProducts(page, size);
  setCurrentProducts(products);


  // Feature 5 - Sort by price
  if(sort == 'price-asc')
  {
    currentProducts = currentProducts.sort(sort_by_price);
  }
  
  if(sort == 'price-desc')
  {
    currentProducts = currentProducts.sort(sort_by_price);
    currentProducts.reverse();
  }

  
  // Feature 6 - Sort by date
  if(sort == 'date-asc')
  {
    currentProducts = currentProducts.sort(sort_by_date);
  }
  
  if(sort == 'date-desc')
  {
    currentProducts = currentProducts.sort(sort_by_date);
    currentProducts.reverse();
  }
  
  render(currentProducts, currentPagination);
});