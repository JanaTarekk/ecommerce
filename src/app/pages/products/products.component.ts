import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

   private readonly productsService = inject(ProductsService);
  
      private readonly cartService = inject(CartService);
    
      private readonly toastrService = inject(ToastrService);

        private readonly wishlistService = inject(WishlistService);
  
  
    products: IProduct[] = [];
 
  
    getProductsData():void {
  
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
             console.log(res.data);
             this.products = res.data;
        },
        error:(err)=>{
             console.log(err);
        },
      });
  
    }
  
    
  
    ngOnInit(): void {
  
      this.getProductsData();
     
      
    }


    addCartItem(id:string):void {

      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
  
          console.log(res);
  
          this.toastrService.success(res.message , 'FreshCart')

          this.cartService.cartNumber.next(res.numOfCartItems)
  
        },
        error:(err)=>{
  
          console.log(err);
  
        }
      })
  
    }


    addToWishList(id:string):void{

    
      this.wishlistService.addToWishlist(id).subscribe({
        next:(res)=>{
  
          console.log(res);
  
          this.toastrService.success(res.message , 'FreshCart')
  
  
        },
        error:(err)=>{
  
          console.log(err);
  
        }
      })
  
  
    }
  

}
