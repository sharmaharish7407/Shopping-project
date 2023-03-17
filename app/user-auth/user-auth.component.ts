import { Component, OnInit } from '@angular/core';
import { cart, Login, Product, Signup } from '../data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showData:boolean=true;
  authError:string=''
  constructor(private userSign:UserService,private product:ProductService){}
  ngOnInit(): void {
    this.userSign.userAuthReload();
  }
  signup(user:Signup){
  this.userSign.userSignup(user)
  }
  userLogin(data:Login){
    this.userSign.userLogin(data);
    this.userSign.invaliduserAuth.subscribe((result)=>{
      if(result){
        this.authError="please Enter Valid user details"
      }else{
        this.localCartToRemoveCart()
      }
    })
  }
  openSignup(){
  this.showData=false
  }
  openLogin(){
    this.showData=true;
  }
  localCartToRemoveCart(){
 let data=localStorage.getItem('localCart');
 let user=localStorage.getItem('user');
 let userId=user && JSON.parse(user).id;
 if(data){
 let  cartDataList:Product[]=JSON.parse(data)


  cartDataList.forEach((product:Product,index)=>{
  let cartData:cart={
    ...product,
    productId:product.id,
    userId,
  };
  delete cartData.id;
 setTimeout(() => {
  this.product.addToCart(cartData).subscribe((result)=>{
    if(result){
      
    }
  })
  
 }, 500);
  if(cartDataList.length===index+1){
    localStorage.removeItem('localCart');
  }
  })
 }
setTimeout(() => {
  this.product.getCartList(userId);
}, 2000);
  }
}
