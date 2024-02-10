import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Product} from '../Interfaces/product'
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,ProductsComponent,FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})

export class AddProductComponent implements OnInit {
  reactiveForm!: FormGroup;

  @Input()product: Product;
  @Output() close: EventEmitter<any> = new EventEmitter();



  constructor(private service: ApiServiceService) { }



  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      id: new FormControl(this.product.id, [
        Validators.required,
       
      ]),
      name: new FormControl(this.product.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
      ]),
      description: new FormControl(this.product.description, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      quantity: new FormControl(this.product.quantity, [
        Validators.required,
        
      ]),
      price: new FormControl(this.product.price, [
        Validators.required,
        
      ]),
    });
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get id() {
    return this.reactiveForm.get('id')!;
  }

  get description() {
    return this.reactiveForm.get('description')!;
  }

  get quantity() {
    return this.reactiveForm.get('quantity')!;
  }
  get price() {
    return this.reactiveForm.get('price')!;
  }
  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    this.product = this.reactiveForm.value;
    if(this.product.id==0)
    {
    this.addProduct();
    }
    else
    {
      this.updateProduct();
    }
  }

  addProduct() {
   
    this.service.addProduct(this.product).subscribe(res => {
      this.close.emit("Product added");
    });
  }

  updateProduct() {
   
    this.service.updateProduct(this.product).subscribe(res => {
      this.close.emit("Product updated");

    });
  }
}