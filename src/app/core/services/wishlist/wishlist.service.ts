import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient : HttpClient) { }

  addToWishlist(id:string):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist'  ,


      {
        "productId": id
      },
      {
        headers:{
          token:localStorage.getItem('userToken') !
        }
      }



    )
  }


  getLoggedUserWishlist():Observable<any>{

    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist'   ,   

      {
        headers:{
          token:localStorage.getItem('userToken') !
        }
      }

    )

  }


  removeSpecificWishlistItem(id:string):Observable<any>{

    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`  ,

      {
        headers:{

          token:localStorage.getItem('userToken') !

        }
      }
    )


  }


}
