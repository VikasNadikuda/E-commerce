import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Order} from "../view-orders/order";
@Injectable({
  providedIn: "root",
})
export class BuyService {

  constructor(private http: HttpClient) { }
  public buyProd(orderdata, username): Observable<any> {
    // //console.log(orderdata);
    return this.http.put("http://localhost:2400/update" + "/" + username, orderdata);
  }
  public updateqty(orderdata): Observable<any> {
    // //console.log(orderdata);
    return this.http.put("http://localhost:2400/qty", orderdata);
  }
}
