import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IColors } from 'src/app/shared/models/IColor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-color',
  templateUrl: './delete-product-color.component.html',
  styleUrls: ['./delete-product-color.component.scss']
})
export class DeleteProductColorComponent implements OnInit {

  private colors: IColors[];
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getColors();
  }

  private getColors() {
    this.adminService.getColors().subscribe(Response => {
      this.colors = [...Response];
    });
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }

  private deleteColor(id: number) {
    this.adminService.deleteColor(id).subscribe(Response => {
      this.getColors();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getColors();
  }

}
