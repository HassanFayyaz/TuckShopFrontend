import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../Services/layout.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-product-listing",
  templateUrl: "./product-listing.component.html",
  styleUrls: ["./product-listing.component.scss"]
})
export class ProductListingComponent implements OnInit {
 
  productsArray = [];

  constructor(private layout: LayoutService, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params=>{
      console.log("Params", params['params'].category)
      this.getProduct(params['params'].category)
    })
    
  }
  getProduct(str:any) {
    this.layout.getProducts(str).subscribe(p => {
      console.log(p);
      this.productsArray =p;
    });
  }

  sendProducttoCheckout(obj: Object) {
    this.layout.sendProduct(obj);
  }
}
