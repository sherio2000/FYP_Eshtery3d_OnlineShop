import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductItemHomeComponent } from '../shop/product-item-home/product-item-home.component';
import { ShopRoutingModule } from '../shop/shop-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RatingModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [HomeComponent, ProductItemHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    CoreModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
