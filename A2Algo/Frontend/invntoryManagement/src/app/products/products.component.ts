import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { AddProductComponent } from '../add-product/add-product.component';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../Interfaces/product';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ModalDirective,ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import * as bootstrap from "bootstrap";
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';

import $ from "jquery";
import { faBell, faFilm } from '@fortawesome/free-solid-svg-icons';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule ,ModalModule,FontAwesomeModule,ToastrModule,
    AddProductComponent,DeleteProductComponent,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  
    alertIcon = faBell;
    alertMessage=""
  
    constructor(private service: ApiServiceService,private toastr: ToastrService) { }
  
    ProductList: any = [];
    ModalTitle = "";
    ActivateAddEditProductComp: boolean = false;
    product: Product;
  
    ProductIdFilter = "";
    ProductNameFilter = "";
    ProductListWithoutFilter: any = [];
    @ViewChild('editModal') public editModal:ModalDirective;
    @ViewChild('deleteModal') public deleteModal:ModalDirective;
    @ViewChild('closebuttonEdit') closebuttonEdit:any;
    @ViewChild('closebuttonDelete') closebuttonDelete:any;

  
    ngOnInit(): void {
      this.refreshProductList();
      this.product = {
        id: 0,
        name: "",
        description:"",
        quantity:0,
        price:0
      }
    }
    onCloseSave(message:any)
    {
      this.toastr.success(message);
      this.closebuttonEdit.nativeElement.click();

    }
    onCloseDelete(message:any)
    {
      this.toastr.warning("Deleted successfuly");
      this.closebuttonDelete.nativeElement.click();

    }
    addClick() {
      this.product = {
        id: 0,
        name: "",
        description:"",
        quantity:0,
        price:0
      }
      this.ModalTitle = "Add Product";
      this.ActivateAddEditProductComp = true;
    }
  
    editClick(item: any) {
      this.product = item;
      this.ModalTitle = "Edit Product";
      this.ActivateAddEditProductComp = true;
    }
  
    deleteClick(item: any)
  {
      this.product = item;
    
  }
    closeClick() {
      this.ActivateAddEditProductComp = false;
      this.refreshProductList();
    }
  
  
    refreshProductList() {
      this.service.getproductList().subscribe(data => {
        this.ProductList = data;
        this.ProductListWithoutFilter = data;
      });
    }
  
   
  }

  