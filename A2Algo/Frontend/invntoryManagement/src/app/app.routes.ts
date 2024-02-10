import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'product', component: ProductsComponent },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

