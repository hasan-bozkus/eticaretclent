import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: ProductsComponent}
    ])
  ]
})
export class ProductsModule { }
