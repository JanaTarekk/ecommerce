import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;
  isLoading: boolean = false;
  msgError: string = "";
  

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  });

  verifyEmailSubmit(): void {

   let emailvalue = this.verifyEmail.get('email')?.value;

   this.resetPassword.get('email')?.patchValue(emailvalue)


    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.step = 2;
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.verifyEmail.markAllAsTouched();
    }
  }

  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.step = 3;
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.verifyCode.markAllAsTouched();
    }
  }

  ResetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this.authService.setResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.resetPassword.markAllAsTouched();
    }
  }
}