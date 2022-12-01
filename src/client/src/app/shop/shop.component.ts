import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { empty } from 'rxjs';
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
  
  @ViewChild('search',{static:true}) searchTerm! : ElementRef;

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
    var firstItem = {id:0,name:'Hepsi'};
    this.shopService.getBrands().subscribe(response=>{
      this.brands = [firstItem,...response];
    },err=>{
      console.log(err);
    });
  }

  getTypes(){

    var firstItem = {id:0,name:'Hepsi'};
    this.shopService.getTypes().subscribe(response=>{
      this.types = [firstItem,...response];
    },err=>{
      console.log(err);
    });
  }


  onBrandSelected(brandID:number){
    this.shopParams.brandID=brandID;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onTypeSelected(typeID:number){
    this.shopParams.typeID=typeID;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }


  onSortSelected(sort:string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber!==event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value='';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
