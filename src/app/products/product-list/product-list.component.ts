import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tupper-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription: Subscription;
  term: string = "";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    // listen for the productListChangedEvent, when it happens, get a list of products
    this.subscription = this.productService.productListChangedEvent
    .subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log("All Products in list", this.products);
      }
    );

    // load products
    this.productService.getProducts();
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("destroy the subscription");
      this.subscription.unsubscribe();
    }
  }

}
