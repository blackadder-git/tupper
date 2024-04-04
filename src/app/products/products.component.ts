import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'tupper-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService]
})
export class ProductsComponent {

  selectedProduct: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // listen for the productSelectedEvent to happen
    // when it does, set selectedProduct to the product passed by the event
    this.productService.productSelectedEvent
      .subscribe(
        (product: Product) => {
          this.selectedProduct = product;
        }
      );
  }
}