const cart = {
    cartItems: undefined,
    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
        if(!this.cartItems){
        this.cartItems = [
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
    },

    updateCartQuantity(){
        cartQuantity = 0;
        this.cartItems.forEach((cartItem) =>
        {
          cartQuantity += cartItem.quantity;
        });
        return cartQuantity;  
    },

    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((cartItem)=>{
          if(productId == cartItem.productId) cartItem.quantity = newQuantity;
        });
        cart.saveToStorage();
    },

    saveToStorage(){
        localStorage.setItem('cart',JSON.stringify(cart));
    },

    addToCart(productId,selectedQuantity){
        let matched = false;
        this.cartItems.forEach((item) => {
          if(item.productId === productId){
            matched = true;
            item.quantity += selectedQuantity;
          }
          });
          if(!matched){
            this.cartItems.push({
              productId,
              quantity: selectedQuantity,
              deliveryOptionId: '1'
            });
          }    
          cart.saveToStorage();   
    },

    removeFromCart(deleteId){
    
        const newcart = [];
        this.cartItems.forEach((product) =>{
            if(product.productId != deleteId){
                newcart.push(product)
            }
        }
        );
        this.cartItems = newcart;
        cart.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((item) => {
          if(item.productId === productId){
            matchingItem = item;
          }
        }
        );
        matchingItem.deliveryOptionId = deliveryOptionId;
        cart.saveToStorage();
      }
}
cart.loadFromStorage();
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
console.log(cart);

