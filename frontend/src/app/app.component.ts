import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import { AuthService } from "./shared/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public title = "Hoopla";
  public loggedUser :any= null;

  constructor(private router: Router,private authfire:AuthService) {
  }
  public ngOnInit() {
    this.loggedUser = null;
    sessionStorage.clear();
    // //console.log("hi")
    // //console.log("app",this.loggedUser)
  }
  public ngDoCheck() {
    this.loggedUser = sessionStorage.getItem("email");
    //console.log(this.loggedUser)
  }
  public logout() {
    sessionStorage.clear();
    this.loggedUser = null;
    this.router.navigate(["/login"]);
    this.authfire.logout()
  }
  public login() {
    this.router.navigate(["/login"]);
  }
}
