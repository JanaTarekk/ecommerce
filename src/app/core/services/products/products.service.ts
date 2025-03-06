import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient:HttpClient ) { }


  getAllProducts():Observable<any>
  {
   return this.httpClient.get(
     enviroment.baseUrl + '/api/v1/products')
  }

  getSpecificProducts(id:string | null):Observable<any>
  {
   return this.httpClient.get(
      enviroment.baseUrl + `/api/v1/products/${id}`)
  }
}
