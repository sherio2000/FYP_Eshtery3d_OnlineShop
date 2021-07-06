import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, NgSelectOption, ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './admin-home/product/add-product/add-product.component';
import { UpdateProductComponent } from './admin-home/product/update-product/update-product.component';
import { DeleteProductComponent } from './admin-home/product/delete-product/delete-product.component';
import { DeleteProductColorComponent } from './admin-home/product_color/delete-product-color/delete-product-color.component';
import { AddProductColorComponent } from './admin-home/product_color/add-product-color/add-product-color.component';
import { UpdateProductColorComponent } from './admin-home/product_color/update-product-color/update-product-color.component';
import { UpdateProductCategoryComponent } from './admin-home/product_category/update-product-category/update-product-category.component';
import { AddProductCategoryComponent } from './admin-home/product_category/add-product-category/add-product-category.component';
import { DeleteProductCategoryComponent } from './admin-home/product_category/delete-product-category/delete-product-category.component';
import { DeleteProductTypeComponent } from './admin-home/product_type/delete-product-type/delete-product-type.component';
import { AddProductTypeComponent } from './admin-home/product_type/add-product-type/add-product-type.component';
import { UpdateProductTypeComponent } from './admin-home/product_type/update-product-type/update-product-type.component';
import { DashboardComponent } from './admin-home/dashboard/dashboard.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { ViewProductComponent } from './admin-home/product/view-product/view-product.component';
import { ShopModule } from '../shop/shop.module';
import { ThreeDModelComponent } from './admin-home/product/view-product/three-dmodel/three-dmodel.component';
import { AddProductBeandComponent } from './admin-home/product_brand/add-product-beand/add-product-beand.component';
import { DeleteProductBrandComponent } from './admin-home/product_brand/delete-product-brand/delete-product-brand.component';
import { UpdateProductBrandComponent } from './admin-home/product_brand/update-product-brand/update-product-brand.component';
import { AddDeliveryMethodComponent } from './admin-home/delivery_methods/add-delivery-method/add-delivery-method.component';
import { UpdateDeliveryMethodComponent } from './admin-home/delivery_methods/update-delivery-method/update-delivery-method.component';
import { DeleteDeliveryMethodComponent } from './admin-home/delivery_methods/delete-delivery-method/delete-delivery-method.component';
import { DeleteOrderComponent } from './admin-home/orders/delete-order/delete-order.component';
import { OrderDetailedComponent } from './admin-home/orders/order-detailed/order-detailed.component';
import { EditOrderComponent } from './admin-home/orders/edit-order/edit-order.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LoginComponent, AdminHomeComponent, AddProductComponent, UpdateProductComponent, DeleteProductComponent, DeleteProductColorComponent, AddProductColorComponent, UpdateProductColorComponent, UpdateProductCategoryComponent, AddProductCategoryComponent, DeleteProductCategoryComponent, DeleteProductTypeComponent, AddProductTypeComponent, UpdateProductTypeComponent, DashboardComponent, ViewProductComponent, ThreeDModelComponent, AddProductBeandComponent, DeleteProductBrandComponent, UpdateProductBrandComponent, AddDeliveryMethodComponent, UpdateDeliveryMethodComponent, DeleteDeliveryMethodComponent, DeleteOrderComponent, OrderDetailedComponent, EditOrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule
  ],
  providers: [BsModalService],
})
export class AdminModule { }
