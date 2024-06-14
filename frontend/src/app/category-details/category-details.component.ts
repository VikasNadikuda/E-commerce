import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {ViewproductsService} from "../dashboard/dashboard.service";
import {Products} from "../dashboard/proddata";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.css"],
})
export class CategoryDetailsComponent implements OnInit {
  public allprod: Products[];
  public temp = null;
  public viewall: boolean;
  public cards: boolean;
  public errorMessage;
  public searchitem: string;
  public item: string;
  public search = false;
  public imgurl = "../assets/";
  public para: string;
  public prodDetails: Products[];
  public searchDetails: Products[];
  public searchedprod;
  public categories: string[];
  public cat: any;
  public product;

  constructor(private prodserv: ViewproductsService, private router: Router, private r: ActivatedRoute) { }
  public ngOnInit() {
    sessionStorage.removeItem("day");
    this.r.params.subscribe((s) => {this.para = s["category"]; });
    this.cat = sessionStorage.getItem("Item");
    this.item = this.para;

    this.prodserv.viewproducts(this.para).subscribe(
      (success) => {this.prodDetails = success; },
      (error) => {this.errorMessage = error.error.message; },
    );
    this.categories = ["Electronics", "Furniture", "Clothing", "Shoes"];
  }

  public viewcategory(item) {
    this.item = item;
    this.searchitem = "";
    this.viewall = false;
    this.cards = true;
    this.search = false;
    this.prodserv.viewproducts(item).subscribe(
      (success) => {this.prodDetails = success; },
      (error) => {this.errorMessage = error.error.message; },
    );
    // this.router.navigate(['/dashboard',item])

    }
    public prodDesc(name) {
      const nam = name.pName;
      this.router.navigate(["home", name.pCategory, nam]);
    }

}
