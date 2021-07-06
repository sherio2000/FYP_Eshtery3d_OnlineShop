import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  private products: IProduct[];
  private shopParams = new ShopParams();
  private totalCount: number;
  private baseUrl = environment.apiUrl;
  private modalRef: BsModalRef;
  constructor(private adminService: AdminService, private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    // tslint:disable-next-line: deprecation
    this.adminService.getProducts(this.shopParams).subscribe(Response => {
      this.products = Response.data;
      this.shopParams.pageNumber = Response.pageIndex;
      this.shopParams.pageSize = Response.pageSize;
      this.totalCount = Response.count;
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  private deleteProduct(id: number) {
    this.http.delete(this.baseUrl + 'products?id=' + id).subscribe(Response => {
      this.getProducts();
    });
  }
  private closeModal() {
    this.modalRef.hide();
    this.getProducts();
  }

  private onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  private openModal(template: TemplateRef<any>) {
    const config: ModalOptions = {class: 'modal-xl' };
    this.modalRef = this.modalService.show(template, config);
  }
}
