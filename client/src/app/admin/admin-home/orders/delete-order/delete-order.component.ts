import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IOrder } from 'src/app/shared/models/order';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  private orders: IOrder[];
  private user: IUser[];
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getOrders();
  }
  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }
  private openEditModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xs' };
    this.modalRef = this.modalService.show(template, config);
  }
  private getOrders() {
    this.adminService.getAllOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getPendingOrders() {
    this.adminService.getPendingOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getConfirmedOrders() {
    this.adminService.getConfirmedOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getPreparingOrders() {
    this.adminService.getPreparingOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getReceivedOrders() {
    this.adminService.getReceivedOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getCancelledOrders() {
    this.adminService.getCancelledOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private getOutForDeliveryOrders() {
    this.adminService.getOutForDeliveryOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }
  private ViewBy(view: string) {
    if (view === 'All') {
      this.getOrders();
    }
    if (view === 'Pending') {
      this.getPendingOrders();
    }
    if (view === 'Confirmed') {
      this.getConfirmedOrders();
    }
    if (view === 'Preparing') {
      this.getPreparingOrders();
    }
    if (view === 'OFD') {
      this.getOutForDeliveryOrders()
    }
    if (view === 'Received') {
      this.getReceivedOrders();
    }
    if (view === 'Cancelled') {
      this.getCancelledOrders();
    }
  }

  private closeModal() {
    this.modalRef.hide();
    this.getOrders();
  }

}
