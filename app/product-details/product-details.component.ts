import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  ProductQuantity: number = 1;
  removeCart = false;
  cartData:Product|undefined;
  constructor(private activeRoutes: ActivatedRoute, private productService: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.activeRoutes.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let item = JSON.parse(cartData);
        item = item.filter((item: Product) => productId == item.id.toString())
        if (item.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);

        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.ProductQuantity < 20 && val === 'plus') {
      this.ProductQuantity += 1;
    }
    else if (this.ProductQuantity > 1 && val === 'min') {
      this.ProductQuantity -= 1
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.ProductQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddtoCart(this.productData)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productData, userId,
          productId: this.productData.id,
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeCard(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFormCart(productId);
      
    } else {
       this.cartData&& this.productService.removeToCart(this.cartData.id).subscribe((result)=>{
             
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id
          this.productService.getCartList(userId)
  })
  this.removeCart = false;
    }
  }
}
