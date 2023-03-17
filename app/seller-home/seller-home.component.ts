import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  icon=faTrash;
  edit=faEdit;
  productList:undefined |Product[]
  productMessage:undefined|string;
constructor(private product :ProductService){

}
ngOnInit():void{
this.list();
}
deleteProduct(id:number){
 this.product.deleteProduct(id).subscribe((result)=>{
  if(result){
  this.productMessage="Product is delete";
    this.list();
  }
  setTimeout(() => {
    this.productMessage=undefined;
  },3000);
 })
}
list(){
 this.product.Product().subscribe((result)=>{

  if(result){
    this.productList=result;
  }
 })  
}
}
