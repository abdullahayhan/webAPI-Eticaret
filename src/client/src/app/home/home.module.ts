import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule // eklediğimiz Carousel kullanmak için shared modulu import ediyoz hafız.
  ],
  exports:[
    HomeComponent // dışarıya aktarmak için. app.module.ts e gidip orada da HomeModule olarak karşılamalısın.
  ]
})
export class HomeModule { }
