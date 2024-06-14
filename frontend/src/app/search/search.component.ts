import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewproductsService} from "../dashboard/dashboard.service";
import {Products} from "../dashboard/proddata";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  public searchedProduct;
  public searchDetails: Products[];
  public allprod: Products[];
  public errorMessage;
  public searched;

  constructor(private r: ActivatedRoute, private router: Router, private viewserv: ViewproductsService) { }
  public ngOnInit() {
    sessionStorage.setItem("searched", "true");
    this.r.params.subscribe((s) => {
      this.searchedProduct = s['search']; });
    this.viewserv.viewallproducts().subscribe(
      (success) => {this.allprod = success; },
      (error) => {this.errorMessage = error.error.message; },
    );
    this.viewserv.searchproducts(this.searchedProduct).subscribe(
      (success) => {
        this.searched = sessionStorage.getItem("searched");
        this.searchDetails = success;
      },
      (error) => {this.errorMessage = error.error.message; },
    );
  }
  public prodDesc(name) {
    this.router.navigate(["home", name.pCategory, name.pName]);
  }

}
