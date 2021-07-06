import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IBrand } from 'src/app/shared/models/IBrand';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-brand',
  templateUrl: './delete-product-brand.component.html',
  styleUrls: ['./delete-product-brand.component.scss']
})
export class DeleteProductBrandComponent implements OnInit {

  private brands: IBrand[];
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getBrands();
  }

  private getBrands() {
    this.adminService.getBrands().subscribe(Response => {
      this.brands = [...Response];
    });
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }

  private deleteBrand(id: number) {
    this.adminService.deleteBrand(id).subscribe(Response => {
      this.getBrands();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getBrands();
  }
}
