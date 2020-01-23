import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../Services/layout.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  categoriesArray = [];
  CollapsedNav = true;

  constructor(private layout: LayoutService, activateRoute: ActivatedRoute, private router:Router) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.layout.getCategories().subscribe(d => {
      console.log(d);
      this.categoriesArray = d;
    });
  }
  
  addCategoryToUrl(urlFilterWithCategoryName){
  this.router.navigate(['categories/'+ urlFilterWithCategoryName]);
  }
}
