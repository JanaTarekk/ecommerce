import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { enviroment } from '../../../shared/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  addProductToCart(id:string):Observable<any>
  {

    return this.httpClient.post(
        enviroment.baseUrl +'/api/v1/cart' ,

      {
        "productId": id
    },


    )


  }

  getLoggedUserCart():Observable<any>{

    return this.httpClient.get(
        enviroment.baseUrl + '/api/v1/cart' ,
    
    )

  }

  removeSpecificCartItem(id:string):Observable<any>
  {
   
    return this.httpClient.delete(
        enviroment.baseUrl + `/api/v1/cart/${id}` ,
     
    );


  }

  updateCartProduct( id:string , newCount:number ):Observable<any> {
    return this.httpClient.put(
        enviroment.baseUrl + `/api/v1/cart/${id}` ,

      {
        "count": newCount
    },
   


    )
  }

  clearCart():Observable<any> {

    return this.httpClient.delete( enviroment.baseUrl + '/api/v1/cart' , 
    
    )



  }





  
}
