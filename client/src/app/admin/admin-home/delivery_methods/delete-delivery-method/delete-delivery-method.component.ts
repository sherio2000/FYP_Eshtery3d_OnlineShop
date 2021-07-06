import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-delivery-method',
  templateUrl: './delete-delivery-method.component.html',
  styleUrls: ['./delete-delivery-method.component.scss']
})
export class DeleteDeliveryMethodComponent implements OnInit {

  private deliveryMethods: IDeliveryMethod[];
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getDeliveryMethods();
  }

  private getDeliveryMethods() {
    this.adminService.getDeliveryMethods().subscribe(Response => {
      this.deliveryMethods = [...Response];
    });
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }

  private deleteMethod(id: number) {
    this.adminService.deleteDeliveryMethod(id).subscribe(Response => {
      this.getDeliveryMethods();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getDeliveryMethods();
  }

}
