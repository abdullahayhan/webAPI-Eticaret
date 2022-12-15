import { Component,HostListener,OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private basketService : BasketService, private accountService:AccountService){}


  // sepet nesnemize locastroge üzerinden id ile ulaşıyoruz.
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }


  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(()=>{
        console.log('user loaded');
      },error=>{
        console.log(error);
      });
    }
  }

 

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    const token = localStorage.getItem('token');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('sepete ulaşıldı.')
      },error=>{
        console.log(error);
      });
    }
  }
}
