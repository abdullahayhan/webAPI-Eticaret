import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';



@NgModule({
  declarations: [NavBarComponent, NotFoundComponent, ServerErrorComponent, TestErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule, // router module ulaşabilmek için aynısını app-routing-module içinde de çağırdığımız için otomatik olarak bulacaktır.
    BreadcrumbModule,
    // Toastr kullanıcıya anlamlı bir mesaj vererek yaptığı işlemdeki durumu anlamasını sağlayan mesajlardır.
    // Bir kullanıcının; kullanıcı adı veya şifresini yanlış girdiğinde: Error mesajı olarak bir Toastr baloncuğu gösterirsiniz. 
    // İşlem hatalı değilse veya bilgilendirici bir işlem gerektiğinde Info baloncuğu göstermek isteyebilirsiniz.
    ToastrModule.forRoot({
      positionClass: 'toastr-bottom-right',
      preventDuplicates:true // çoklu gösterim için.
    })
  ],
  exports : [NavBarComponent,SectionHeaderComponent] // dışarıdan erişebilir olması için.
})
export class CoreModule { }
