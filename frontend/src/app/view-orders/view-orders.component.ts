import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {Order} from "./order";
import {ViewOrdersService} from "./view-orders.service";
@Component({
  selector: "app-view-orders",
  templateUrl: "./view-orders.component.html",
  styleUrls: ["./view-orders.component.css"],
})
export class ViewOrdersComponent implements OnInit {
  public email;
  public orderId :any = null;
  public length :any= null;
  public errorMessage = null;
  public orders: Order[];

  constructor(private vieword: ViewOrdersService, private router: Router) { }

  public ngOnInit() {
    this.email = sessionStorage.getItem("email");
    this.vieword.order(this.email).subscribe(
      (success) => {
        this.orderId = 1001;
        this.orders = success;
        this.length = this.orders.length;
      },
      (error) => {this.errorMessage = error.error.message; },
    );
  }
  public prodDesc(name) {
    this.router.navigate(["home", name.pCategory, name.pname]);
  }

}
