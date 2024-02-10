import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {

  @Input()product: Product;
  @Output() close: EventEmitter<any> = new EventEmitter();


  constructor(private service: ApiServiceService) { }



  ngOnInit(): void {
   
  }
  deleteClick(id: any) {
    this.service.deleteProduct(id).subscribe(data => {
      this.close.emit("Product deleted");

    })
  
}
 
}
