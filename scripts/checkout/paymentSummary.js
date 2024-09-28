import { getProduct } from "../../data/products.js";
import {cart} from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
console.log(cart);
export function renderPaymentSummary(){
     let productPriceCents = 0,shippingCost = 0;
     let deliveryOption;
     cart.forEach((item)=>{
        const matchedItem = getProduct(item.productId);
        productPriceCents += matchedItem.priceCents * item.quantity;
        deliveryOption = getDeliveryOption(item.deliveryOptionId);
        shippingCost += deliveryOption.priceCents;
     });    
     const totalPrice = productPriceCents + shippingCost;
     const estimatedTax = (10 * totalPrice)/100;
     const totalPriceAfterTax = totalPrice + estimatedTax;
     const html = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
     `;
     document.querySelector('.js-payment-summary').innerHTML = html;
}