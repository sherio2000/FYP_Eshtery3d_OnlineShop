import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IColors } from 'src/app/shared/models/IColor';
import { IProductType } from 'src/app/shared/models/IProductType';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-type',
  templateUrl: './delete-product-type.component.html',
  styleUrls: ['./delete-product-type.component.scss']
})
export class DeleteProductTypeComponent implements OnInit {
  private types: IProductType[];
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getTypes();
  }

  private getTypes() {
    this.adminService.getProductTypes().subscribe(Response => {
      this.types = [...Response];
    });
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }

  private deleteType(id: number) {
    this.adminService.deleteType(id).subscribe(Response => {
      this.getTypes();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getTypes();
  }

}
