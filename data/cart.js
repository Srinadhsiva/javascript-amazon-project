export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];
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
 export function removeFromCart(deleteId){
    const newcart = [];
    cart.forEach((product) =>{
        if(product.productId != deleteId){
            newcart.push(product)
        }
    }
    );
    cart = newcart;
    
}