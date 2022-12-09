import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  

  // farklı bir yöntem
  basket : IBasket;
  basket$ : Observable<IBasket>;
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
    this.basket$.subscribe(response=>{
      this.basket=response;
      console.log('sepet subscribe', this.basket);
    });
  }

}
