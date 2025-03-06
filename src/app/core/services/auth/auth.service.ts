import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { enviroment } from '../../../shared/enviroment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  private readonly router = inject(Router);

  userData:any = null;

  sendRegisterForm(data:object):Observable<any> {

   return this.httpClient.post(
      enviroment.baseUrl + '/api/v1/auth/signup', data )

  }

  sendLoginForm(data:object):Observable<any> {

    return this.httpClient.post(
      enviroment.baseUrl +  '/api/v1/auth/signin', data )
 
   }

   saveUserData():void {
    if(  localStorage.getItem('userToken') !== null ) {

    this.userData = jwtDecode( localStorage.getItem('userToken') ! );

    console.log('userData' , this.userData )

     
     
    }
   }

   logOut():void {
    localStorage.removeItem('userToken');
    this.userData = null;

    this.router.navigate(['/login']);
   }


   setEmailVerify(data:object):Observable<any> {
    return this.httpClient.post(
      enviroment.baseUrl +  '/api/v1/auth/forgotPasswords' , data )
   }

   setCodeVerify(data:object):Observable<any> {
    return this.httpClient.post(
       enviroment.baseUrl + '/api/v1/auth/verifyResetCode' , data )
   }


   setResetPassword(data:object):Observable<any> {
    return this.httpClient.put(
       enviroment.baseUrl + '/api/v1/auth/resetPassword' , data )
   }
}
