import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeComponent // dışarıya aktarmak için. app.module.ts e gidip orada da HomeModule olarak karşılamalısın.
  ]
})
export class HomeModule { }
