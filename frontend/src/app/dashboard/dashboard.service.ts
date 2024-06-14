import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Products} from "./proddata";

@Injectable({
  providedIn: "root",
})
export class ViewproductsService {

  constructor(private http: HttpClient) { }
  public viewallproducts(): Observable<Products[]> {
    return this.http.get<Products[]>("http://localhost:2400/getAll");
  }

  public viewproducts(item): Observable<Products[]> {
    return this.http.get<Products[]>("http://localhost:2400/fetchdetails" + "/" + item);
  }

  public searchproducts(searchitem): Observable<Products[]> {
    return this.http.get<Products[]>("http://localhost:2400/searchdetails" + "/" + searchitem);
  }
}
