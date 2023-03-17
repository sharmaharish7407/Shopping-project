import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
 totalPrice:number|undefined; 
 cartData:cart[]|undefined;
 orderMessage:string|undefined;
  constructor(private product:ProductService,private route:Router){}
  ngOnInit(): void { 
    this.product.currentCart().subscribe((result)=>{
      let price=0;
      this.cartData=result;
       result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.price*+item.quantity);
        }
      })
    this.totalPrice=price+(price/10)+100-(price/10);
       })
  }
  checkOut(data:{email:string,address:string,contact:string}){
  let user =localStorage.getItem('user');
  let userId=user&& JSON.parse(user).id;
  if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id:undefined
      }
      this.cartData?.forEach((item)=>{
      setTimeout(() => {
     item.id  &&  this.product.deleteCartItem(item.id) 
     
      }, 700);  
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMessage="your order hass been placed"
          setTimeout(() => {
            this.route.navigate(['/my-order'])
            this.orderMessage=undefined;
          }, 4000);
        
      }
      })
    }
   
  }
    }

