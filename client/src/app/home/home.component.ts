import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/Iproduct';
import { IProductType } from '../shared/models/IProductType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: false } }
 ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  // tslint:disable-next-line: no-shadowed-variable
  constructor(private shopService: ShopService) { }

  private products: IProduct[];
  private brands: IBrand[];
  private productType: IProductType[];
  private shopParams = new ShopParams();
  private totalCount: number;

  private getProducts() {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(this.shopParams).subscribe(Response => {
      this.products = Response.data;
      this.shopParams.pageNumber = Response.pageIndex;
      this.shopParams.pageSize = Response.pageSize;
      this.totalCount = Response.count;
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getProducts();
  }
  // tslint:disable-next-line: member-ordering
  private sliderOptions: OwlOptions = {
    margin: 20,
    autoplay: true,
    loop: true,
    nav: false,
    dots: true,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 1000,
    autoplayTimeout: 7000,
    items: 3,
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 1
        },
        1200: {
            items: 1
        }
    }

  }
  private headerSliderOptions: OwlOptions = {
    margin: 20,
    autoplay: true,
    loop: true,
    nav: false,
    dots: true,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    autoplayTimeout: 5000,
    navSpeed: 1000,
    items: 3,
    navText: ['<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"'],
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 1
        },
        1200: {
            items: 1
        }
    }

  }
}
