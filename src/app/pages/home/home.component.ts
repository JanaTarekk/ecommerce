import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';



@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);

  private readonly categoriesService = inject(CategoriesService);

  private readonly cartService = inject(CartService);

  private readonly wishlistService = inject(WishlistService);

  private readonly toastrService = inject(ToastrService);




  
    customMainSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      autoplay:true,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: false,
    }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  products: IProduct[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {

    this.getProductsData();
    this.getCategoryData();
    
  }

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

  getCategoryData():void {

 


    this.categoriesService.getAllCategories().subscribe({

      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;


      },
      error:(err)=>{
         console.log(err);
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
