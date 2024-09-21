export const cart = [];
export function addToCart(productName,selectedQuantity){
    let matched = false;
    cart.forEach((item) => {
      if(item.productname === productName){
        matched = true;
        item.quantity += selectedQuantity;
      }
      });
      if(!matched){
        cart.push({
          productname: productName,
          quantity: selectedQuantity
        });
      }       
  }