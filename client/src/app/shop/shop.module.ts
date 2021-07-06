import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {RatingModule } from 'ngx-bootstrap';
import { CoreModule } from '../core/core.module';
import { ModalServiceComponent } from './modal-service/modal-service.component';
import { ProductCompareComponent } from './product-details/product-compare/product-compare.component';


@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent, ModalServiceComponent, ProductCompareComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FormsModule,
    CarouselModule,
    RatingModule,
    CoreModule,
    ],
  exports: [ShopComponent, ModalServiceComponent]
})
export class ShopModule { }
