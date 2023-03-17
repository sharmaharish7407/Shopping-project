import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, Signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invaliduserAuth=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }
  userSignup(user:Signup){
 this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
if(result){
  localStorage.setItem("user",JSON.stringify(result.body))
this.route.navigate(['/'])
}
 })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }
  userLogin(data:Login){
    this.http.get<Signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
      if(result &&result.body?.length){
        localStorage.setItem("user",JSON.stringify(result.body[0]))
        this.invaliduserAuth.emit(false)
        this.route.navigate(['/'])
      } 
      else{
    this.invaliduserAuth.emit(true)
      } 
    })
  }
}
