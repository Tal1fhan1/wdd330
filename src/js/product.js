import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import { ProductDetails } from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(products) {
  setLocalStorage("so-cart", products);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const products = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(products);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
