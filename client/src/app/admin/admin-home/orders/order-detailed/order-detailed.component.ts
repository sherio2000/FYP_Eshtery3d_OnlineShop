import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { IOrder } from 'src/app/shared/models/order';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  @Input() private Id;
  @Input() private Email;
  private order: IOrder;
  private user: IUser;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getOrderDetailed(this.Id)
      .subscribe((order: IOrder) => {
        this.order = order;
      }, error => {
        console.log(error);
    });
    this.adminService.getUserName(this.Email)
    .subscribe((user: IUser) => {
      this.user = user;
    }, error => {
      console.log(error);
    })
  }
}
