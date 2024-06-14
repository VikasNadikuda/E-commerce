import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import { AuthService } from "../shared/auth.service";
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public loggedIn: boolean;
  public errorMessage: any;
  public data :any = null;
  public successMessage: any;
  public registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private logserv: LoginService,
    private router: Router,
    private r: ActivatedRoute,
    private auth : AuthService) {  }
    public ngOnInit() {
      // sessionStorage.clear()
      this.data = sessionStorage.getItem("FirstName");
      this.loggedIn = false;
      const search = sessionStorage.getItem("searched");
      this.registerForm = this.fb.group({
        firstName:  ["", [Validators.required]],
        lastName:  ["", [Validators.required]],
        userName: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
        password: ["", [Validators.required]],
      });
      if (this.data) {
        this.router.navigate(["/"]);
      }
      
    }
    public register() {
      // //console.log(this.registerForm.value);
      const product = sessionStorage.getItem("product");
      const item = sessionStorage.getItem("Item");
      this.errorMessage = null;
      this.successMessage = null;
      this.logserv.registerform(this.registerForm.value).subscribe(
        (success) => {
          console.log(success)
          this.loggedIn = true;
          sessionStorage.setItem("FirstName", success.userdetails.fname);
          sessionStorage.setItem("email", success.userdetails.userName);
          if(this.registerForm.value.userName == '') {
            alert('Please enter email');
            return;
          }
      
          if(this.registerForm.value.password == '') {
            alert('Please enter password');
            return;
          }
          if(this.registerForm.value.firstName == '') {
            alert('Please enter first Name');
            return;
          }
      
          if(this.registerForm.value.lastName == '') {
            alert('Please enter last Name');
            return;
          }
      
          this.auth.register(this.registerForm.value.userName,this.registerForm.value.password,this.registerForm.value.firstName,this.registerForm.value.lastName);
          // this.loggedIn=sessionStorage.getItem("FirstName")
        },
        (error) => {
          this.errorMessage = error.error.message; },
      );
      
      
      // this.registerForm.value.userName = '';
      // this.registerForm.value.password = '';
    }
}
