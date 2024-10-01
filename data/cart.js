let cartQuantity = 0;
export let cart;
loadFromStorage();
export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
      cart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '3'
            }
    ];
    }
}
export function updateCartQuantity(){
  cartQuantity = 0;
  cart.forEach((cartItem) =>
  {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;  
}
export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem)=>{
    if(productId == cartItem.productId) cartItem.quantity = newQuantity;
  });
  saveToStorage();
}
function saveToStorage(){
   localStorage.setItem('cart',JSON.stringify(cart));
}
//Adding new products
export function addToCart(productId,selectedQuantity){
    let matched = false;
    cart.forEach((item) => {
      if(item.productId === productId){
        matched = true;
        item.quantity += selectedQuantity;
      }
      });
      if(!matched){
        cart.push({
          productId,
          quantity: selectedQuantity,
          deliveryOptionId: '1'
        });
      }    
      saveToStorage();   
  }
 export function removeFromCart(deleteId){
    
    const newcart = [];
    cart.forEach((product) =>{
        if(product.productId != deleteId){
            newcart.push(product)
        }
    }
    );
    cart = newcart;
    saveToStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((item) => {
    if(item.productId === productId){
      matchingItem = item;
    }
  }
  );
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}