import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, Signup } from '../data-type';
import { SellService } from '../services/sell.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent  implements OnInit{
  isshow=false;
  authError:string='';

  constructor(private seller:SellService,private route:Router){}
  
 
  
  ngOnInit():void{
    this.seller.reloadSeller();
  }
  signup(data:Signup):void{
 
    this.seller.userSignup(data)
  }   
  openLogin(){
    this.isshow=true
  }
  login(data:Login):void{
    this.authError="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((iserror)=>{
      if(iserror){
    this.authError="Email or password is not correct";
      }
    })
  }
  opensignup(){
    this.isshow=false
  }
}
