import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { ICategories } from 'src/app/shared/models/ICategories';
import { ModalService } from 'src/app/shop/modal-service/modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.scss']
})
export class DeleteProductCategoryComponent implements OnInit {

  private categories: ICategories[];
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.adminService.getCategories().subscribe(Response => {
      this.categories = [...Response];
    });
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }

  private deleteCategory(id: number) {
    this.adminService.deleteCategory(id).subscribe(Response => {
      this.getCategories();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getCategories();
  }

}
