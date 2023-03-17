import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Login, Signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellService {
isSellerLoggedIn=new BehaviorSubject<boolean>(false);
isLoginError=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private route:Router) { }
  userSignup(data:Signup){
    this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.route.navigate(["seller-home"])
    console.log('result', result)
   })
   
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home'])
    }
  }
  userLogin(data:Login){
    console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
     if(result && result.body && result.body.length){
      console.log("user login");
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.route.navigate(["seller-home"])
     
     }
     else{
       console.log("login failed")
       this.isLoginError.emit(true);
     }
   })
     }
     
}
