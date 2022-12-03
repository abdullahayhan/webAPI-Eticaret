import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  

  product!:IProduct;

 constructor(private shopService:ShopService, private activeRoute: ActivatedRoute
   ,private breadCrumbService : BreadcrumbService){} // dependecy injectionla shopservice'i aldık.
  
  ngOnInit(): void {
    this.loadProduct(); // fonk çağırıyoruz çalışması için.
  }

  // getproducta bir id veriyorum ve kaydolarak gelecek nesneye elimde olan product nesnesine atıyorum.
  loadProduct(){
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')!).subscribe(pro=>{
      this.product=pro;
      this.breadCrumbService.set('@shopDetail', 'shop/' + this.product.name);
    },error=>{
      console.log(error);
    })
  }
  
 

}
