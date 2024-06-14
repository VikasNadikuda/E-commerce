import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfire:AngularFireAuth,private router : Router,private logserv: LoginService
  ) {

   }

  login (email:string,password:string)
  {
    let loginForm:any={
      userName:email,
      password:password
    }
    //console.log(email,password)
    this.authfire.signInWithEmailAndPassword(email,password).then((res)=>{
      sessionStorage.setItem('token','true');
      sessionStorage.setItem("email", email);
      //console.log(res)
      const firstAndLastName= res.user?.displayName
      if (firstAndLastName) {
        sessionStorage.setItem('username', firstAndLastName);
      } 
      // this.router.navigate(['dashboard'])
    }, err =>{
      alert(err.message)
    })
  }
    // // register method

    register(email : string, password : string, firstName, lastName) {
      this.authfire.createUserWithEmailAndPassword(email, password).then( res => {
        this.router.navigate(['/login']);

        alert('Registration Successful');
        // this.sendEmailForVarification(res.user);
        res.user?.updateProfile({
          displayName:firstName + ',' +lastName,

        })
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }
  
    // sign out
    logout() {
      this.authfire.signOut().then( () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
    }
    googleSignIn() {
      return this.authfire.signInWithPopup(new GoogleAuthProvider).then(res => {
        const user:any = res.user
        console.log(user)
        sessionStorage.setItem('username',user?.displayName)
        sessionStorage.setItem('email',user?.email)
        //console.log(user)
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('token',JSON.stringify(res.user?.uid));
        const registerForm={
          userName:user?.email,
          password:user?.email,
          firstName:user?.displayName,
          lastName:null
        }
        this.logserv.registerform(registerForm).subscribe(
          (success) => {
            
            sessionStorage.setItem("FirstName", success.userdetails.fname);
            sessionStorage.setItem("email", success.userdetails.userName);
   
          },
          (error) => {
            // alert(error.message);
          },
        );
        
      }, err => {
        alert(err.message);
      })
    }
}
