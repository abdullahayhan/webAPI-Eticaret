import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IPagination } from '../shared/models/IPagination';
import { IType } from '../shared/models/IType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/ShopParams';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl="https://localhost:44379/api/"

  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams){

    let params = new HttpParams();

    if(shopParams.brandID!==0){
        params = params.append('brandID',shopParams.brandID?.toString());
    }
    if(shopParams.typeID!==0){
      params =params.append('typeID',shopParams.typeID.toString());
    }

    if(shopParams.search){
      params=params.append('search',shopParams.search);
    }


      params = params.append('sort',shopParams.sort);
      params= params.append('pageIndex',shopParams.pageNumber.toString());
      params = params.append('pageSize',shopParams.pageSize.toString());

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
