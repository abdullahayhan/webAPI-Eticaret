import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/IProduct';
import { IType } from '../shared/models/IType';
import { ShopParams } from '../shared/models/ShopParams';
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
  shopParams = new ShopParams();
  totalCount!:number;
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
    this.shopService.getProducts(this.shopParams).subscribe(response=>{
      this.products = response!.data;
      this.shopParams.pageNumber = response!.pageIndex;
      this.shopParams.pageSize=response!.pageSize;
      this.totalCount= response!.count;
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
    this.shopParams.brandID=brandID;
    this.getProducts();
  }

  onTypeSelected(typeID:number){
    this.shopParams.typeID=typeID;
    this.getProducts();
  }


  onSortSelected(sort:string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
}
