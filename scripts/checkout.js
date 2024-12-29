import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFromFetch,products } from "../data/products.js";                     
async function loadPage() {
   await loadProductsFromFetch();
   console.log(products);
   
    renderPaymentSummary();
    renderOrderSummary();
}
loadPage();
// Loading products using callback function.
// loadProducts(() =>{
//     renderPaymentSummary();
//     renderOrderSummary();
// });
