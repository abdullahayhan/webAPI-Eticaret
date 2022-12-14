import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptor/error.intector';
import { CommonModule } from '@angular/common';
import { BasketModule } from './basket/basket.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';

@NgModule({ 
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ShopModule,
    HomeModule,
    BasketModule,
    CheckoutModule,
    AccountModule,
    SharedModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},], 
    // interceptor olarak kullanabilmek için bunu burada class ismiyle belirtmemiz lazım, multi çoklu işlem için
  bootstrap: [AppComponent]
})
export class AppModule { }
