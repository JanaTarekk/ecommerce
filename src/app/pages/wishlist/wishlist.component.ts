import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  standalone: true, 
  imports: [CommonModule,RouterLink], 
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  constructor(private wishlistService: WishlistService) {}


  private readonly cartService = inject(CartService);

    private readonly toastrService = inject(ToastrService);

  

  wishlistDetails: IWishlist[] = [];

  ngOnInit(): void {
    this.getWishlistData();
  }

  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
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



  removeWishlistItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be removed from your wishlist!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishlistService.removeSpecificWishlistItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.wishlistDetails = this.wishlistDetails.filter(item => item.id !== id);
            Swal.fire('Removed!', 'The product has been removed from your wishlist.', 'success');
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
          }
        });
      }
    });
  }
  
  
}
