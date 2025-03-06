import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private httpClient : HttpClient) { }
 


  checkOutPayment(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${enviroment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, 
      {
        "shippingAddress": data
      },
      
    );
  }
  
}


