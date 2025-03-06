import { Component, inject, Input, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly cartService = inject(CartService)


 isLogin = input<boolean>(true);

 countCart!:number;

 ngOnInit(): void {
   this.cartService.cartNumber.subscribe({
    next:(value)=>{

      this.countCart = value

    }
   })

   this.cartService.getLoggedUserCart().subscribe({
    next:(res)=> {

      this.cartService.cartNumber.next(res.numOfCartItems)
        
    },
   })
 }

  readonly authService = inject(AuthService);

  

}



