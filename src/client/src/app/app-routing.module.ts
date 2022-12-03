import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Ana Sayfa' } },
  {
    path: 'test-error',
    component: TestErrorComponent,
    data: { breadcrumb: 'Test Errors' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'Server Errors' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'Not Found' },
  },
  { path: 'shop', component: ShopComponent, data: { breadcrumb: 'shop' } },
  {
    path: 'shop/:id',
    component: ProductDetailComponent,
    data: { breadcrumb: { alias: 'shopDetail' } },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // herhangi bir root bulunamazsa.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
