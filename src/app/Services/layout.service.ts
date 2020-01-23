import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  private productSource = new Subject<Object>();
  productMessage$ = this.productSource.asObservable();

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get("http://localhost:3000/category");
  }

  public getProducts(urlFilter:String): Observable<any> {
    return this.http.get("http://localhost:3000/products?category="+urlFilter);
  }

  public post(obj: any):Observable<any>{
    return this.http.post("http://localhost:8080/api/products/postreqproduct",obj);
  }

  public sendProduct(obj: Object) {
    this.productSource.next(Object.create(obj));
  }
}
