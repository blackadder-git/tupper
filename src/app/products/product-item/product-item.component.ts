import { Component, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'tupper-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: Product;
}