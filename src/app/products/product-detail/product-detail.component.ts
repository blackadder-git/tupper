import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'tupper-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductService, 
              private router: Router, 
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.product = this.productService.getProduct(params["id"]);
    });
  }

  onDelete() {
    this.productService.deleteProduct(this.product);
    this.router.navigateByUrl("/products");
  }
}