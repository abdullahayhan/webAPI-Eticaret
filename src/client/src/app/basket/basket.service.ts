import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/models/basket';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();


  constructor(private http:HttpClient) {}

  getBasket(id:string){
      return this.http.get(this.baseUrl+'basket?id='+id)
      .pipe(
        map((basket : IBasket)=>{
          this.basketSource.next(basket);
        })
      );
  }
}
