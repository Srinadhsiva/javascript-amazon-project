import {cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let matchedItem;
let cartUpdate = '';
cart.forEach((cartItem) =>{
    products.forEach((product) =>{
        if(product.id === cartItem.productId){
            matchedItem = product;
        }
    });
    const deliveryOptionID = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionID)
            deliveryOption = option;
    });
    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
    );
    const dateString  = deliveryDate.format('dddd, MMMM D');  
    cartUpdate += `
        <div class="cart-item-container js-cart-item-container-${matchedItem.id}">
            <div class="delivery-date">
            Delivery On: ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchedItem.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchedItem.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchedItem.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchedItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchedItem.id}">
                    Update
                </span>
                <input type = "number" class="quantity-input js-quantity-input-${matchedItem.id}" min="1" max="1000">
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchedItem.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchedItem.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchedItem, cartItem)}
            </div>
            </div>
        </div>
    `;
    }
);
document.querySelector('.js-order-summary').innerHTML = cartUpdate;
function deliveryOptionsHtml(matchedItem, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) =>{
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const priceString = deliveryOption.priceCents ?  `$${formatCurrency(deliveryOption.priceCents)} -` : 'FREE';
        const dateString  = deliveryDate.format('dddd, MMMM D');  
        const isChecked   = deliveryOption.id === cartItem.deliveryOptionId;
        html +=`<div class="delivery-option js-delivery-option"
                   data-product-id='${matchedItem.id}' data-delivery-option-id='${deliveryOption.id}'>
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchedItem.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>
                `;
    })
    return html;

}
//delivery Options

document.querySelectorAll('.js-delivery-option').forEach((element) =>{
        element.addEventListener('click',() => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
        });
});
//cart delete-button
document.querySelector('.js-no-of-items').innerHTML = updateCartQuantity();
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    let deleteId = link.dataset.productId;
    link.addEventListener('click',()=>
    {
     removeFromCart(deleteId);
     const container = document.querySelector(`.js-cart-item-container-${deleteId}`);
     container.remove();
     document.querySelector('.js-no-of-items').innerHTML = updateCartQuantity();
    }
    )
});
//cart update button
document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
     link.addEventListener('click',()=>{
       const productid = link.dataset.productId;
       document.querySelector(`.js-cart-item-container-${productid}`).classList.add('is-updating');
     })
});
//save button
document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
     link.addEventListener('click',()=>{
        const productid = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productid}`).classList.remove('is-updating');
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productid}`).value);
        document.querySelector(`.js-quantity-label-${productid}`).innerHTML = newQuantity;
        updateQuantity(productid, newQuantity);
        document.querySelector('.js-no-of-items').innerHTML = updateCartQuantity();
     })
});
