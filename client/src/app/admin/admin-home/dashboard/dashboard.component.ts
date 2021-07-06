import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { AdminService } from '../../admin.service';
import { AdminHomeComponent } from '../admin-home.component';

@Component({
  providers: [AdminHomeComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private productCount: number;
  private productTypesCount: number;
  private productBrandsCount: number;
  private productCategoriesCount: number;
  private pendingOrders: IOrder[];
  private recievedOrders: IOrder[];
  constructor(private adminService: AdminService, private adminComponent: AdminHomeComponent) { }

  ngOnInit() {
    this.getProductCount();
    this.getProductBrandsCount();
    this.getProductCategoriesCount();
    this.getProductTypesCount();
    this.getPendingOrders();
    this.getReceivedOrders();
  }

  private getPendingOrders() {
    this.adminService.getPendingOrders().subscribe((orders: IOrder[]) => {
      this.pendingOrders = orders;
    })
  }

  private getReceivedOrders() {
    this.adminService.getReceivedOrders().subscribe((orders: IOrder[]) => {
      this.recievedOrders = orders;
    })
  }

  private getProductCount() {
    this.adminService.getProductCount().subscribe((productcount: number) => {
      this.productCount = productcount;
    });
  }
  private getProductTypesCount() {
    this.adminService.getProductTypesCount().subscribe((productypescount: number) => {
      this.productTypesCount = productypescount;
    });
  }
  private getProductBrandsCount() {
    this.adminService.getProductBrandsCount().subscribe((productbrandscount: number) => {
      this.productBrandsCount = productbrandscount;
    });
  }
  private getProductCategoriesCount() {
    this.adminService.getProductCategoriesCount().subscribe((productcatcount: number) => {
      this.productCategoriesCount = productcatcount;
    });
  }

  private viewOrders() {
    this.adminComponent.dashboard = false;

    this.adminComponent.add_product = false;
    this.adminComponent.delete_product = false;

    this.adminComponent.add_product_category = false;
    this.adminComponent.delete_product_category = false;

    this.adminComponent.add_product_type = false;
    this.adminComponent.delete_product_category = false;

    this.adminComponent.add_product_type = false;
    this.adminComponent.delete_product_type = false;

    this.adminComponent.delete_orders = true;

    this.adminComponent.add_delivery_method = false;
    this.adminComponent.delete_delivery_method = false;

    this.adminComponent.add_product_brand = false;
    this.adminComponent.delete_product_brand = false;

    this.adminComponent.add_product_color = false;
    this.adminComponent.delete_product_color = false;
  }

}
