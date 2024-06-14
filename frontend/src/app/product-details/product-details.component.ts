import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewproductsService } from "../dashboard/dashboard.service";
import { Products } from "../dashboard/proddata";
import {Order} from "../view-orders/order";
import {BuyService} from "./buy.service";

@Component({
  selector: "app-products-detail",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  // day="yes";
  public pname;
  public category;
  public pdetails: Products[];
  public catt = null;
  public errorMessage = null;
  public successMessage:any ;
  public notificationMessage:any ;
  public email:any = null;
  public ordarray;
  public quantity;

  constructor( private viewserv: ViewproductsService,
               private router: ActivatedRoute,
               private r: Router ,
               private buyserv: BuyService) { }

  public ngOnInit() {
    this.catt = null;
    // if(sessionStorage.getItem("day")){
    //   this.r.navigate(['/dashboard',sessionStorage.getItem("Item")])
    // }
    let product;
    this.router.params.subscribe((s) => {product = s["name"]; });
    sessionStorage.setItem("product", product);
    this.email = sessionStorage.getItem("email");
    this.router.params.subscribe((s) => {
      this.pname = s["name"]; });
    // //console.log(this.pname)
    this.viewserv.searchproducts(this.pname).subscribe(
      (success) => {this.pdetails = success ; this.quantity = this.pdetails[0].pSeller.pQuantity; },
      (error) => {this.errorMessage = error.error.message; },
    );
  }
  public buy() {
    this.successMessage = null;
    this.errorMessage = null;
    const od = new Order();
    const date = new Date();
    const price = (this.pdetails[0].price * (1 - this.pdetails[0].pSeller.pDiscount));
    od.date = date;
    od.price = price;
    od.pname = this.pdetails[0].pName;
    od.pCategory = this.pdetails[0].pCategory;
    this.buyserv.buyProd(od, this.email).subscribe(
      (success) => {
        this.ordarray = success;
        this.successMessage = "Your order is placed!";
      },
      (error) => {this.errorMessage = error.error.message; },
    );
    this.buyserv.updateqty(od).subscribe(
      (success) => {
        // //console.log("jihihi")
        // this.category=sessionStorage.getItem("Item")
        // this.r.navigate(['/home',this.category,this.pdetails[0].pName])
      },
    );
  }
  public goback() {
    // this.catt=sessionStorage.getItem("cat")
    // sessionStorage.setItem("day",this.day)
    // if(this.catt==null){
      this.r.navigate(["/home"]);
    // }
    // else{
    //   this.r.navigate(['/dashboard',this.catt])
    // }

  }
  public notify() {
    this.notificationMessage = "You will receive an email if product is available";
  }

}
