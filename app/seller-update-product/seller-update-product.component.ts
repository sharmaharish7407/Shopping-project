import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|Product
  productMessage:undefined|string
  constructor(private route:ActivatedRoute,private product: ProductService){}

  editProduct(data:Product){
   
   if(this.productData){
    data.id=this.productData.id
   }
   this.product.updateProduct(data).subscribe((result)=>{
    if(result){
    this.productMessage="Update product successfully";

    }
  setTimeout(() => {
    this.productMessage=undefined;
  },3000);  })
  }
  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id')
  
    productId&&this.product.getProduct(productId).subscribe((data)=>{
    this.productData=data;
    })




    
  }

}
