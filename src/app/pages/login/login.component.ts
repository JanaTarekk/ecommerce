import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
  
  
    isLoading:boolean = false;
    msgError:String = "";
    isSucess:string = "";
  
    LoginForm: FormGroup = new FormGroup({
      
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
     
    } );
  
    submitForm(): void {
  
     if(this.LoginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.LoginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
  
           setTimeout(() => {

            localStorage.setItem('userToken' , res.token);

            this.authService.saveUserData();
  
            this.router.navigate(['/home']);
            
           }, 1000);
  
            this.isSucess = res.message;
  
  
          }
  
          this.isLoading = false;
  
        },
        error:(err:HttpErrorResponse)=>{
  
          console.log(err);
  
         this.msgError = err.error.message;
  
          this.isLoading = false;
  
        }
      })
     } else {
      this.LoginForm.markAllAsTouched();
     }
      
  
    }
  
   

}
