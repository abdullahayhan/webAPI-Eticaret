import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';



@NgModule({
  declarations: [NavBarComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule // router module ulaşabilmek için aynısını app-routing-module içinde de çağırdığımız için otomatik olarak bulacaktır.
  ],
  exports : [NavBarComponent]
})
export class CoreModule { }
