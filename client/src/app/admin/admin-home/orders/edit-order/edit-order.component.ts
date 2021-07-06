import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { AdminService } from 'src/app/admin/admin.service';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  private updateOrderStatus: FormGroup;
  @Input() private id: number;
  private updated: true;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.createUpdateFormGroup();
  }

  private createUpdateFormGroup() {
    this.updateOrderStatus = new FormGroup ({
      Status: new FormControl('', [Validators.required])
    });
  }

  private OnSubmit() {
    const updateStatus: IOrder = {
      id: this.id,
      status: this.updateOrderStatus.get('Status').value,
      deliveryMethod: null,
      buyerEmail: null,
      shipToAddress: null,
      shippingPrice: 0,
      subtotal: 0.0,
      orderDate: '2021-06-08T22:35:19.834Z',
      orderItems: null,
      total: 0
    };
    this.adminService.editOrderStatus(updateStatus).subscribe((order: IOrder) => {
      this.updated = true;
    });
  }

}
