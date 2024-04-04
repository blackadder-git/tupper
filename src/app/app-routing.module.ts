import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductsComponent, children: [
    { path: "new", component: ProductEditComponent },
    { path: ":id", component: ProductDetailComponent },
    { path: ":id/edit", component: ProductEditComponent },
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes) // register the routes defined above
  ],
  exports: [
    RouterModule
  ]  
})

export class AppRoutingModule { }