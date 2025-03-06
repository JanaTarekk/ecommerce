import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productsService = inject(ProductsService);

    private readonly cartService = inject(CartService);

     private readonly toastrService = inject(ToastrService);


  detailsProduct: IProduct | null = null;


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{

        let idProduct = p.get('id');

        this.productsService.getSpecificProducts( idProduct ).subscribe({
          next:(res)=>{

            console.log(res.data);
            this.detailsProduct = res.data;

          },
          error:(err)=>{
            console.log(err);
          }
        })

      }
    })
      
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

}
