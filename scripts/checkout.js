import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFromFetch } from "../data/products.js";
async function loadPage() {
   await loadProductsFromFetch();
   
    renderPaymentSummary();
    renderOrderSummary();
}
loadPage();
// Loading products using callback function.
// loadProducts(() =>{
//     renderPaymentSummary();
//     renderOrderSummary();
// });
