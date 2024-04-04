import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'tupper-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  originalProduct: Product;
  product: Product;
  editMode: boolean = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe ((params: Params) => {
        // Get the id from the currently active route
        const id = params["id"];
        if (id === undefined || id === null) {
          // No id was found therefore a new product is being added
          this.editMode = false;
          return;
        }

        // Get existing product
        this.originalProduct = this.productService.getProduct(id);

        if (this.originalProduct === undefined || this.originalProduct === null) {
          // The requested document does not exist
          return;
        }

        // Product was found and is set to edit
        this.editMode = true;
        // Clone an object: https://www.freecodecamp.org/news/clone-an-object-in-javascript/
        // this.product = { ...this.originalProduct }
        this.product = JSON.parse(JSON.stringify(this.originalProduct));
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let value = form.value;
    let newProduct = new Product("", value.name, value.description, value.imageUrl );

    if (this.editMode == true) {
      // Update takes care of assigning the new id
      this.productService.updateProduct(this.originalProduct, newProduct);
    }
    else {
      // Add a new product
      this.productService.addProduct(newProduct)
    }

    this.router.navigate(["/products"]);
  }

  onCancel() {
    this.router.navigate(["/products"]);
  }
}