import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule // router module ulaşabilmek için aynısını app-routing-module içinde de çağırdığımız için otomatik olarak bulacaktır.
  ],
  exports : [NavBarComponent]
})
export class CoreModule { }
