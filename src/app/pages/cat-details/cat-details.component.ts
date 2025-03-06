import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-cat-details',
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);

  categoryDetails: ICategory | null = null;

  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
    
        const idCategory = params.get('id');
   
        if (idCategory) {
          this.categoriesService.getSpecificCategory(idCategory).subscribe({
            next: (res) => {
              console.log(res.data);
              this.categoryDetails = res.data;
            },
            error: (err) => {
              console.log(err);
            }
          });
        } else {
          console.error('Category ID is missing in route parameters');
        }
      }
    });
  }
  


  


}
