import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
    constructor(private service:ProductService){

  }
addProduct(data:Product){
  this.service.addAllProduct(data).subscribe((result)=>{
 if(result){
  this.addProductMessage="Product  is successfully added ";
 }
 setTimeout(()=>{
  this.addProductMessage=undefined
 },3000)
  })
}
}
