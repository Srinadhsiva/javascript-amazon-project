import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, loadProductsFromFetch } from "./products.js";
import { addToCart } from "./cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}
function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
let html='';
async function generateOrdersHtml(orders) {
  const promises = orders.map(async (order) => {
      const orderProductsHtml = await ordersList(order.products);
      return `
          <div class="order-container">
              <div class="order-header">
                  <div class="order-header-left-section">
                      <div class="order-date">
                          <div class="order-header-label">Order Placed:</div>
                          <div>${getDate(order.orderTime)}</div>
                      </div>
                      <div class="order-total">
                          <div class="order-header-label">Total:</div>
                          <div>${formatCurrency(order.totalCostCents)}</div>
                      </div>
                  </div>
                  <div class="order-header-right-section">
                      <div class="order-header-label">Order ID:</div>
                      <div>${order.id}</div>
                  </div>
              </div>
              <div class="order-details-grid">
                  ${orderProductsHtml}
              </div>
          </div>
      `;
  });

  const htmlArray = await Promise.all(promises);
  return htmlArray.join('');
}

const element = document.querySelector('.js-order-grid');
if (element) {
  let orderedProductId;
  generateOrdersHtml(orders).then(html => {
      element.innerHTML = html;
      document.querySelectorAll('.js-buy-again-btn').forEach(button =>{
        console.log("hi");
        button.addEventListener('click',()=>{
            orderedProductId = button.dataset.productId;
            console.log(orderedProductId);
            addToCart(orderedProductId,1);
        });
    });
    
  }).catch(error => {
      console.error("Error generating orders HTML:", error);
  });
}

// const element = document.querySelector('.js-order-grid');
if(element) element.innerHTML = html;
async function ordersList(orderProducts){
    let html1='',product;
    await loadProductsFromFetch();
    orderProducts.forEach((orderProduct)=>{
        product = getProduct(orderProduct.productId)
                html1 += `<div class="product-image-container">
                    <img src="${product.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${getDate(orderProduct.estimatedDeliveryTime)}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderProduct.quantity}
                    </div>
                    <a href="checkout.html" style="text-decoration: none">
                    <button class="buy-again-button button-primary js-buy-again-btn" data-product-id="${product.id}">
                       
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </a>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html?orderDeliveryDate=${getDate(orderProduct.estimatedDeliveryTime)}&productName=${product.name}&quantity=${orderProduct.quantity}&productImage=${product.image}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
                `;
    });
    return  html1;
}
function getDate(date){
    const Date = dayjs(date);
    const formattedDate = Date.format('MMMM-DD');
    const weekDay = Date.format('dddd');
    const res = (formattedDate + " " + weekDay);
    return res;
}

