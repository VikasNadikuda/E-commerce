import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {ViewproductsService} from "./dashboard.service";
import {Products} from "./proddata";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public slideshow: boolean;
  public loggeduser;
  public allprod: Products[];
  public viewall: boolean;
  public cards: boolean;
  public errorMessage;
  public searchitem: string;
  public item: any;
  public search: boolean;
  public imgurl = "../assets/";
  public prodDetails: Products[];
  public searchDetails: Products[];
  public searchedprod;
  public categories: string[];
  public eventList = [
    {
      event: "Electronics",
      img: "../assets/electronics.png",
    },
     {
      event: "Furniture",
      img: "../assets/Furniture.jpg",
    },
     {
      event: "Clothing",
      img: "../assets/clothing.jpg",
    },
     {
      event: "Shoes",
      img: "../assets/shoe.jpg",
    },
  ];

  constructor(private prodserv: ViewproductsService, private router: Router) { }
  public ngOnInit() {
    this.cards = false;
    sessionStorage.removeItem("cat");
    sessionStorage.removeItem("product");
    sessionStorage.removeItem("Item");
    this.viewall = true;
    this.search = true;
    this.slideshow = true;

    // sessionStorage.clear()
    this.prodserv.viewallproducts().subscribe(
      (success) => {this.allprod = success; },
      (error) => {this.errorMessage = error.error.message; },
    );
    this.categories = ["Electronics", "Furniture", "Clothing", "Shoes"];
  }
  public viewcategory(item) {
    this.item = item;
    this.searchitem = "";
    this.viewall = false;
    this.cards = true;
    sessionStorage.setItem("Item", item);
    this.search = false;
    this.slideshow = false;
    this.router.navigate(["/home", item]);
    }
    searchItem(item) {
      this.errorMessage = null;
      this.item = null;
      this.viewall = false;
      this.search = false;
      sessionStorage.setItem("searched", "true");
      this.slideshow = false;
      this.searchedprod = item;
      this.prodserv.searchproducts(item).subscribe(
        (success) => {
          this.searchDetails = success;
        },
        (error) => {this.errorMessage = error.error.message; },
      );
      this.router.navigate(["searchdetails", item]);
  }
  public prodDesc(name) {
    sessionStorage.setItem("Item", name.pCategory);
    this.router.navigate(["home", name.pCategory, name.pName]);
  }
}
