import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { TagsComponent } from './tags/tags.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsFilterPipe } from './products/products-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    TagsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductsFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
