import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import {
  IBasket,
  IBasketItem,
  Basket,
  IBasketTotals,
} from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/IProduct';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$=this.basketTotalSource.asObservable();


  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
      })
    );
  }


  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
        if (localStorage.getItem('basket_id') === 'undefined') {
          localStorage.setItem('basket_id', response.id);
        }
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getCurrentBasketValue() {
    return this.basketSource.value;
  }



  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log('addItemToBasket=>', basket);
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }



  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ): IBasketItem[] {
    console.log('addOrUpdateItem=>', items);
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }


  
  incrementItemQuantity(item : IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundIndexOfProduct = basket.items.findIndex(x=>x.id===item.id);
    basket.items[foundIndexOfProduct].quantity++;
    this.setBasket(basket);
  }



   decrementItemQuantity(item : IBasketItem){
   const basket = this.getCurrentBasketValue();
   const foundIndexOfProduct = basket.items.findIndex(x=>x.id===item.id);
   if (basket.items[foundIndexOfProduct].quantity>1) {
    basket.items[foundIndexOfProduct].quantity--;
   }
   else {
    this.removeItemFromBasket(item);
   }
   this.setBasket(basket);
  }


  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x=>x.id===item.id)) {
      basket.items = basket.items.filter(x=>x.id !== item.id);
      if (basket.items.length>0) {
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }


  deleteBasket(basket : IBasket) {
    return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe(()=>
    {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },error=>{
      console.log(error);
    });
  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }


  private calculateTotals(){
    const basket=this.getCurrentBasketValue();
    const shipping = 0;
    // tüm itemleri 0. indexten başlayarak dolaş ve price ve quantityleri çarp bunu da a değerine ata 
    // a = b+2 olarak düşünebiliriz.
    const subTotal = basket.items.reduce((a , b) => (b.price * b.quantity) + a,0);
    const total = subTotal+ shipping;
    // next data aktarım metotudur.
    this.basketTotalSource.next({shipping,subTotal,total});
  }
}
