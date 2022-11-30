import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/IProduct';
import { IType } from '../shared/models/IType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  

  products! : IProduct[];
  brands!:IBrand[];
  types!:IType[];

  constructor(private shopService : ShopService){}
  
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts().subscribe(response=>{
      this.products = response.data;
      console.log(this.products);
    },err=>{
      console.log(err);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response=>{
      this.brands = response;
    },err=>{
      console.log(err);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response=>{
      this.types = response;
    },err=>{
      console.log(err);
    });
  }

}
