import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent  implements OnInit{
  cartData:cart[]|undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
constructor(private product:ProductService,private route:Router){

}
ngOnInit(): void {
this.loadDetails();
}
loadDetails(){
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result
    let price=0
    result.forEach((item)=>{
      if(item.quantity){
      price=price+(+item.price*+item.quantity);
      }
    })
    this.priceSummary.price=price;
    this.priceSummary.discount=price/10;
    this.priceSummary.tax=price/10;
    this.priceSummary.delivery=100;
    this.priceSummary.total=price+(price/10)+100-(price/10);
   if(!this.cartData.length){
    this.route.navigate(['/']);
   }
  })
}
checkOut(){
  this.route.navigate(['/checkout'])
}
removeCart(cartId:number|undefined){
  cartId&& this.product.removeToCart(cartId).subscribe((result)=>{
             this.loadDetails()
  })
}
}
