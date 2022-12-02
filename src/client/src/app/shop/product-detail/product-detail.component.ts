import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  

  product!:IProduct;
  s = 0;
  deger!:number;

 constructor(private shopService:ShopService, private activeRoute: ActivatedRoute){} // dependecy injectionla shopservice'i aldık.
  
  ngOnInit(): void {
    this.loadProduct(); // fonk çağırıyoruz çalışması için.
  }

  // getproducta bir id veriyorum ve kaydolarak gelecek nesneye elimde olan product nesnesine atıyorum.
  loadProduct(){
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')!).subscribe(pro=>{
      this.product=pro;
    },error=>{
      console.log(error);
    })
  }
  
  artir(){
    this.deger = +document.getElementById("sayi")!;
    this.deger = this.s;
    this.s++;
 }

}
