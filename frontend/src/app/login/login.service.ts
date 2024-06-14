import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public loginform(Data: any): Observable<any> {
    // make an http post call with the given url by passing the formData
    // //console.log(Data);

    return this.http.post("http://localhost:2400/login", Data);
  }
  public registerform(Data: any): Observable<any> {
    // make an http post call with the given url by passing the formData
    // //console.log(Data);

    return this.http.post("http://localhost:2400/register", Data);
  }
}
