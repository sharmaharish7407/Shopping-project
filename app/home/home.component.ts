import { Component, OnInit} from '@angular/core';
import { Product } from '../data-type';

import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProducts:undefined|Product[]
  trendyProducts:undefined|Product[]
  constructor(private sevice:ProductService) {}
   

  ngOnInit(): void {
    this.sevice.popularProducts().subscribe((result)=>{
 
  this.popularProducts=result;
    })
    this.sevice.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}
