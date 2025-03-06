import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be removed from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this.cartService.cartNumber.next(res.numOfCartItems)
            Swal.fire('Removed!', 'The product has been removed from your cart.', 'success');
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
          }
        });
      }
    });
  }

  updateItem(id: string, count: number): void {
    if (count <= 0) {
      this.removeItem(id);
    } else {
      this.cartService.updateCartProduct(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
          this.cartService.cartNumber.next(res.numOfCartItems); 
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  

  clearCart(): Observable<any> {
    return this.cartService.clearCart();
  }

  confirmClearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove all items from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearCart().subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.cartDetails = {} as ICart;
              this.cartService.cartNumber.next(0);
              Swal.fire('Cleared!', 'Your cart has been emptied.', 'success');
            } else {
              Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            }
          },
          error: (error: any) => {
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            console.error(error);
          }
        });
      }
    });
  }
}