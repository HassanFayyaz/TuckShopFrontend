import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../Services/layout.service";
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {Checkout} from "src/app/checkout/Checkout";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  
  checkoutProductsArray = [];
  total=0;
  isVisible = false;
  quantity=0;
  isVisibleRequest = false;
  isOkLoading = false;


  cols:{header:string;}[];
  
  checkoutobj: Checkout = new Checkout();

  constructor(private interactionService: LayoutService,
     private modalService: NzModalService,
     private message: NzMessageService) {}

  ngOnInit() {

    this.populateCols(); 

    this.interactionService.productMessage$.subscribe(d => {
      console.log(d);
      let found = this.checkoutProductsArray.findIndex(
        p => p.productTitle == d["productTitle"]
      );
      if (found > -1) {
        this.checkoutProductsArray[found].productPrice += d["productPrice"];
        this.total= this.total+d["productPrice"];
        this.checkoutProductsArray[found].productQuantity=this.checkoutProductsArray[found].productQuantity+1;
      } else {
        this.checkoutProductsArray.push({
         id:d["id"],
         productTitle:d["productTitle"],
         productPrice:d["productPrice"],
         productImage:d["productImage"],
         productQuantity:this.quantity=1,
         printProductPrice:d["productPrice"],

        });
        this.total = this.total+=d["productPrice"];
      }
    });

  }
//for deleting a product
   removeProductFromCheckout(data:Object){
     let index = this.checkoutProductsArray.findIndex(p=>p.id == data['id']);
     console.log(index);
     this.total= this.total-this.checkoutProductsArray[index].productPrice;
     this.checkoutProductsArray.splice(index,1);

   }

   //Modal for checkout
   showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
    // this.checkoutProductsArray = [];
    // this.total = 0;
  }

//modal for request a product
  showRequest(): void {
    this.isVisibleRequest = true;
  }
  handleOkButton(): void {
   
    this.submitData();
    this.isOkLoading = true;
    setTimeout(() => {
    this.isVisibleRequest = false;
    this.isOkLoading = false;
    }, 3000);
  }
  handleCancelButton(): void {
    this.isVisibleRequest = false;
  }
  submitData(){
    this.interactionService.post(this.checkoutobj).subscribe(Response=>{
      this.message.success('Product Successfully Saved', {
        nzDuration: 3000
      });
      console.log(Response);
    });
    this.checkoutobj.name="";
  }
     
  //diable button function in requesting a product
  disableButton(){
    if(this.checkoutobj.name)
    {
      return false;
    }
    else{
      return true;
    }
  }

  //for plus and minus button
  plusProducts(obj:Object){
    let index = this.checkoutProductsArray.findIndex(p=>p.id == obj["id"]);
    let price = this.checkoutProductsArray[index].productPrice/this.checkoutProductsArray[index].productQuantity;
    this.total = this.total+price;
    this.checkoutProductsArray[index].productPrice+=price;
    this.checkoutProductsArray[index].productQuantity=this.checkoutProductsArray[index].productQuantity+1;
  }

  minusProducts(obj:Object){
   let index = this.checkoutProductsArray.findIndex(p=>p.id== obj['id']);
   let price = this.checkoutProductsArray[index].productPrice/this.checkoutProductsArray[index].productQuantity;
   this.total = this.total-price;
   this.checkoutProductsArray[index].productPrice-=price;
   if(this.checkoutProductsArray[index]['productQuantity']<=1){
    this.checkoutProductsArray.splice(index,1);
   }
   else{
     this.checkoutProductsArray[index]["productQuantity"]=this.checkoutProductsArray[index]["productQuantity"]-1;
   }
  }

  //For Print work
  Print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0 , left=0 , height=100% , width=auto ');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
          </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );

    this.checkoutProductsArray = [];
    this.total = 0;

    popupWin.window.Print();
    popupWin.document.close(); 
}

populateCols(){
  this.cols = [
    {  header: "Product Name" },
    { header: "Product Price" },
    {  header: "Product Quantity" },
    {  header: "Price" },
    
  ];
}

}
