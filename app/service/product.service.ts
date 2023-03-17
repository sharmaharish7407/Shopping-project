import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<Product[]|[]>();
  constructor(private http:HttpClient) {
    
   }
   addAllProduct(data:Product){
   return  this.http.post("http://localhost:3000/product",data);
   }
   Product(){
    return this.http.get<Product[]>("http://localhost:3000/product");
   }
   deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/product/${id}`)
   }
   getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/product/${id}`)
  
   }
   updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/product/${product.id}`,product)   
   }
   popularProducts(){
    return this.http.get<Product[]>("http://localhost:3000/product?_limit=3");
   }

trendyProducts(){
  return this.http.get<Product[]>("http://localhost:3000/product?_limit=8");
  
}
searchProducts(query:string){
  return this.http.get<Product[]>(`http://localhost:3000/product?q=${query}`)
}
localAddtoCart(data:Product){
  let cartData=[];
  let localCart=localStorage.getItem('localCart');
  if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
  }
  else{
    cartData=JSON.parse(localCart);
    cartData.push(data)
    localStorage.setItem('localCart',JSON.stringify(cartData));
    this.cartData.emit(cartData);
  }
  
 
}
removeItemFormCart(productId:number){
  let cartData=localStorage.getItem('localCart');
  if(cartData){
    let item:Product[]=JSON.parse(cartData);
    item=item.filter((item:Product)=>productId!==item.id)
    localStorage.setItem('localCart',JSON.stringify(item));
    
  this.cartData.emit(item);
  }
  
}
addToCart(cartData:cart){
  return  this.http.post("http://localhost:3000/cart",cartData);
  
}
getCartList(userId:number){
return this.http.get<Product[]>("http://localhost:3000/cart?userId="+userId,
{observe:"response"}).subscribe((result)=>{
  if(result && result.body){
    this.cartData.emit(result.body);
  }
})

}
removeToCart(cartId:number){
  return  this.http.delete("http://localhost:3000/cart/"+cartId);
}
currentCart(){
  let userStore=localStorage.getItem('user');
  let userData=userStore && JSON.parse(userStore);
  return this.http.get<cart[]>("http://localhost:3000/cart?userId/="+userData.id)
}
orderNow(data:order){
 return this.http.post("http://localhost:3000/orders",data)
}
orderList(){
  let userStore=localStorage.getItem('user');
  let userData=userStore && JSON.parse(userStore);
  return this.http.get<order[]>("http://localhost:3000/orders?userId ="+userData.id)
}
deleteCartItem(cartId:number){
  return  this.http.delete("http://localhost:3000/cart/"+cartId,{observe:'response'}).subscribe((result)=>{
  if(result){
  this.cartData.emit([]);
  }  
});   
}
deleteOrder(orderId:number){
  return  this.http.delete("http://localhost:3000/orders/"+orderId)
}
}