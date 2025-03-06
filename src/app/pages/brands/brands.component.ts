import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

   private readonly brandsService = inject(BrandsService);

   brands: IBrand[] = [];

   getBrandsData(){

    this.brandsService.getAllBrands().subscribe({

      next:(res)=>{

        console.log(res.data)
        this.brands = res.data;

      },
      error:(err)=>{

        console.log(err)

      }

    })





   }

  ngOnInit(): void {

    this.getBrandsData();

      
  }

}
