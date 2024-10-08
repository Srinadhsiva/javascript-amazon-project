import { formatCurrency } from "../scripts/utils/money.js";
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
export let products;
export function loadProducts(renderProductsGrid){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
        products = JSON.parse(xhr.response).map((productDetails) =>{
        if(productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Products(productDetails);
    });
    renderProductsGrid(); 
    console.log(products);
  });
  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
  
}
