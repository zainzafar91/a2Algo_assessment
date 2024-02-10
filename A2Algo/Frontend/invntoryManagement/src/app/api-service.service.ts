import {HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly apiUrl = 'https://localhost:7017/api/';
  constructor(private http: HttpClient) { }
  getproductList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products');
  }

  addProduct(product: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'products', product, httpOptions);
  }

  updateProduct(product: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'products/'+product.id, product, httpOptions);
  }

  deleteProduct(productId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'products/' + productId, httpOptions);
  }
}
