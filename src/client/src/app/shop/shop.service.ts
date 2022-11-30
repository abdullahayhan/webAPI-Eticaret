import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IPagination } from '../shared/models/IPagination';
import { IType } from '../shared/models/IType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl="https://localhost:44379/api/"

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<IPagination>(this.baseUrl+'Products')
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands')
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'products/types')
  }
}
