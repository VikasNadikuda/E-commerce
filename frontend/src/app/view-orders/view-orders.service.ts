import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Order} from "./order";
@Injectable({
  providedIn: "root",
})
export class ViewOrdersService {

  constructor(private http: HttpClient) { }
  public order(username): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:2400/getorders/" + username);
  }

}
