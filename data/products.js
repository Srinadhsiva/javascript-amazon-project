import { formatCurrency } from "../scripts/utils/money.js";
export let products;

class Products{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(Details){
    this.id = Details.id;
    this.image = Details.image;
    this.name = Details.name;
    this.rating = Details.rating;
    this.priceCents = Details.priceCents;
    this.keywords = Details.keywords;
  }
  getStarsUrl(){
      return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
      return `${formatCurrency(this.priceCents)}`;
  }
  extraInfoHtml(){
      return '';
  }
}
class Clothing extends Products{
  sizeChartLink;
  constructor(Details){
    super(Details);
    this.sizeChartLink = Details.sizeChartLink;
  }
  extraInfoHtml(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">
    Size Chart
    </a>
    `;
  }
}
export function getProduct(productId){
  let matchedItem;
  products.forEach((product) =>{
    if(product.id === productId){
        matchedItem = product;
    }
});
  return matchedItem;
}


// This is loading products using fetch which returns a promise
export function loadProductsFromFetch(){
  const promise = fetch('https://supersimplebackend.dev/products').then((response)=>{
      return response.json();
  }).then((product) =>{
      products = product.map((productDetails) =>{
      if(productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Products(productDetails);
    });
  });
  return promise;
}
// This is a way of loading products using callback function 
export function loadProducts(callBackFun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
        products = JSON.parse(xhr.response).map((productDetails) =>{
        if(productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Products(productDetails);
    });
    console.log(products);
    callBackFun(); 
  });
  xhr.addEventListener('error',(error)=>{
    console.log("an error occured");
  })
  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
}
