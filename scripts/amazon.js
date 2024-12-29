import {cart,  addToCart, updateCartQuantity} from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);
function renderProductsGrid(){
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
  let productHtml = '';
  products.forEach( (product) => {
    productHtml +=  `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
                  ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-select-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            ${product.extraInfoHtml()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-add-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-btn"  data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `;
  });
  document.querySelector('.js-product-grid').innerHTML = productHtml;
  function addedMessage(timer, productId){
    
        document.querySelector(`.js-add-to-cart-${productId}`).style.opacity = 1;
        if(timer){
          clearTimeout(timer);
        }
        timer =  setTimeout(() => {
        document.querySelector(`.js-add-to-cart-${productId}`).style.opacity = 0;
        }, 2000);
        return timer;
  }

  document.querySelectorAll('.js-add-to-cart-btn').forEach((button)=>{
        let timer;
        button.addEventListener('click',()=>{
        
        const productId = button.dataset.productId;
        const selectedQuantity = Number(document.querySelector(`.js-select-quantity-${productId}`).value);
        addToCart(productId,selectedQuantity);
        timer = addedMessage(timer,productId);
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
      });
  })

}
