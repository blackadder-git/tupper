import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from './product.model';// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  productSelectedEvent = new EventEmitter<Product>();  
  productListChangedEvent = new Subject<Product[]>();
  prodURI = "http://localhost:3000/products";

  constructor(private http: HttpClient) { 
    this.initializeData();
  }

  // ********************************
  // load products
  // ********************************
  initializeData() {
    console.log("get products in init ...");

    // send get request to Express
    this.http.get<{message: string, products: Product[]}>(this.prodURI)
      .subscribe((productData) => {
        this.products = productData.products;
        // this.sortProducts();
        // pass a copy of products
        this.productListChangedEvent.next([...this.products]);
      });

    /*    
      this.products = [
        {
          id: '1',
          name: 'Product 1',
          description: 'desc 1',
          imageUrl: '',
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'desc 2',
          imageUrl: '',
        },
        {
          id: '3',
          name: 'Product 3',
          description: 'desc 3',
          imageUrl: '',
        },
      ];
    */

    // console.log([...this.products]);
    // add to observable in future
    // this.productListChangedEvent.next([...this.products]);
  }

  // ********************************
  // Sort products in ascending order by name (title)
  // ********************************
  sortProducts() {


  }

  // ********************************
  // Return all products
  // ********************************
  getProducts() {
    console.log("get products in getProducts ...");
    //console.log("get products from MongoDB in services ...");

    this.initializeData();
  }

  // ********************************
  // Return prduct matching id or, if not found, return null
  // ********************************
  getProduct(id: string) {
    console.log("getProduct() Lookup: ", id)
    
    // Using return inside a forEach loop exits the loop, not the function
    // Instead, use find to return the product or null if not found
    return this.products.find(product => product.id === id);
  }

  // ********************************
  // Add a new product
  // ********************************
  addProduct(newProduct: Product) {
    console.log("Request new product in services:", newProduct.name);
    if (!newProduct) {
      // Abort if product wasn't passed
      return;
    }
    
    // make sure new Product id is empty
    newProduct.id = '';

    // send post request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, product: Product }>(this.prodURI, newProduct, { headers: headers })
    .subscribe(
      (responseData) => {
        // add new product to products
        this.products.push(responseData.product);
        //this.sortProducts();
        this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
      }
    );

    // Add _id
    // newProduct._id = "" + this.maxProductId + 5;
    

    // Push a new product onto the list and emit change
    // this.maxProductId++;
    // newProduct.id = "" + this.maxProductId;
    // newProduct.id = "" + 10;
    // this.products.push(newProduct);

    // Save changes to Firebase
    // this.storeProducts();
    // let productsListClone = this.products.slice();
    // this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
  }

  // ********************************
  // Update an existing product
  // ********************************
  updateProduct(originalProduct: Product, newProduct: Product) {
    console.log("Update existing product:", originalProduct.id, originalProduct.name);
    
    if (!originalProduct || !newProduct) {
      // Abort if either product is undefined
      return;
    }

    let pos = this.products.indexOf(originalProduct);
    if (pos < 0) {
      // Abort if original product can't be found
      return;
    }

    // send update request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
     this.http.put(this.prodURI + "/" + originalProduct.id, newProduct, { headers: headers })
      .subscribe(
        (responseData) => {
          // replace updated product in products
          this.products[pos] = newProduct;
          // this.sortProducts();
          this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
        }
      );

    // Set id of new product and replace in list
    // newProduct.id = originalProduct.id;
    // this.products[pos] = newProduct;

    // Save changes to Firebase
    // this.storeProducts();
    // let productsListClone = this.products.slice();
    // this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
  }

  // ********************************
  // Delete a product from products
  // ********************************
  deleteProduct(product: Product) {
    console.log("Delete existing product:", product.id, product.name);

    if (!product) {
      // Abort if product wasn't passed
      return;
    }

    const pos = this.products.indexOf(product);
    if (pos < 0) {
      // Abort if product doesn't exist
      return;
    }

    // send delete request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.delete(this.prodURI + product.id, { headers: headers })
      .subscribe(
        (responseData) => {
          // Remove contact from list
          this.products.splice(pos, 1);
          this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
        }
      );

    // Remove product from list
    // this.products.splice(pos, 1);
    //this.productChangedEvent.emit(this.products.slice());
    
    // Save changes to Firebase
    // this.storeContacts();
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone); // pass event to any subscribers
    // this.productListChangedEvent.next(this.products.slice()); // pass event to any subscribers
  }
}