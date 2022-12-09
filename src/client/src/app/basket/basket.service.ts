import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;

  // behaviorSubject : vermiş oldugumuz nesne üzerinden url ile 
  // observable ve login bilgilerine tek bi şekilde ulaşabilmemizi sağlıyor.
  
  private basketSource = new BehaviorSubject<IBasket>(null);

  // breadcrumb üzerinden ulaşabilmek için.
  basket$ = this.basketSource.asObservable();


  constructor(private http:HttpClient) {}

  getBasket(id:string){
      return this.http.get(this.baseUrl+'basket?id='+id)
      .pipe(
        map((basket : IBasket)=>{
          // hem yayın yapabilen hem de onu dinleyen kullanıcılara istedikleri zaman dataları next ile ulaştırıyor.
          this.basketSource.next(basket);
        })
      );
  }


  setBasket(basket : IBasket){
    // subscribe olarak gelen değeri response olarak kabul edip bu response değerini basket source atıyoruz. böylelikle
    // kullanıcı bir ürün eklediğinde bu ürünü sepetinde gösterebileceğiz.
    return this.http.post(this.baseUrl+'basket',basket).subscribe((response : IBasket)=>{
      this.basketSource.next(response);
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

  // mevcuttaki sepet varsa bana gönder demek.
  getCurrentBasketValue(){
    return this.basketSource.value;
  }


  // sepete ekleme
  // burada bize bir product ve quantity değerleri gelecek ama bizim bunları IBasketItem yapmalıyız bunu yapmak için de 
  // mapProductItemToBasketItem() adlı bir fonk. ihtiyacımız var.
  addItemToBasket(item:IProduct,quantity=1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item,quantity);
    console.log('itemToAdd',itemToAdd);
    // soru işareti this.getCurrentBasketValue() bir değeri var ise onu al yoksa this.createBasket() bunu al.
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log('addItemToBasket : ',basket);
    // burada böyle bir ürün sepette var mı varsa bir tane daha ekle şeklinde bir fonk yazıyoruz.
    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);
  }

  // index itemlerimde bana verilen item var mı yoksa direkt ekle varsa kaç tane varsa quantityi ona ekle
  // misal 3 tane saç boyam varsa 3 tane daha eklendi 6 oldu easy math baby
  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    console.log('addOrUpdateItem=>', items);
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      items.push(itemToAdd);
      console.log("yeni bir ürün sepete eklendi");
    } else {
      items[index].quantity += quantity;
      console.log("var olan ürüne ekleme yaptık.",items[index].quantity);
    }
    return items;
  }


  // mevcutta bir sepet yoksa bunu oluştur.
  private  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }


  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return{
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      brand:item.productBrand,
      type:item.productType,
      quantity
    }
  }

}
