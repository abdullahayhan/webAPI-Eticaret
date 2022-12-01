import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IPagination } from '../shared/models/IPagination';
import { IType } from '../shared/models/IType';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl="https://localhost:44379/api/"

  constructor(private http:HttpClient) { }

  getProducts(brandID?:number,typeID?:number,sort?:string){

    let params = new HttpParams();

    if(brandID){
        params = params.append('brandID',brandID?.toString());
    }
    if(typeID){
      params =params.append('typeID',typeID.toString());
    }

    if(sort){
      params = params.append('sort',sort);
    }
    return this.http.get<IPagination>(this.baseUrl+'Products',{observe:'response',params})
    .pipe(
      map(response=>{
        return response.body;
      })
    );
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands')
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types')
  }
}
