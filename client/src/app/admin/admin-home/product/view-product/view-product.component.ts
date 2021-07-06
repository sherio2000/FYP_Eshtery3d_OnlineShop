import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { IProduct } from 'src/app/shared/models/Iproduct';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  private product: IProduct;
  @Input() private id: number;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    // tslint:disable-next-line: deprecation
    this.adminService.getProduct(this.id).subscribe(product => {
      this.product = product;
    }, error => {
      console.log(error);
    });
  }

}
