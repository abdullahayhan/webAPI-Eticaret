import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/IProduct';
import { IType } from '../shared/models/IType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'], 
})
export class ShopComponent implements OnInit{
  

  products! : IProduct[];
  brands!:IBrand[];
  types!:IType[];
  brandIDSelected = 0;
  typeIDSelected = 0;
  sortSelected ='name';
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High To Low',value:'priceDesc'}
  ];

  constructor(private shopService : ShopService){}
  
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.brandIDSelected,this.typeIDSelected,this.sortSelected).subscribe(response=>{
      this.products = response!.data;
      console.log(this.products);
    },err=>{
      console.log(err);
    });
  }

  getBrands(){
    var firstItem = {id:0,name:'All'};
    this.shopService.getBrands().subscribe(response=>{
      this.brands = [firstItem,...response];
    },err=>{
      console.log(err);
    });
  }

  getTypes(){

    var firstItem = {id:0,name:'All'};
    this.shopService.getTypes().subscribe(response=>{
      this.types = [firstItem,...response];
    },err=>{
      console.log(err);
    });
  }


  onBrandSelected(brandID:number){
    this.brandIDSelected=brandID;
    this.getProducts();
  }

  onTypeSelected(typeID:number){
    this.typeIDSelected=typeID;
    this.getProducts();
  }


  onSortSelected(sort:string){
    this.sortSelected = sort;
    this.getProducts();
  }
}
