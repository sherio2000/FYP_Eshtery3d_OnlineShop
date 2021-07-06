import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AccountService } from 'src/app/account/account.service';
import { IProduct } from 'src/app/shared/models/Iproduct';

@Component({
  selector: 'app-product-item-home',
  templateUrl: './product-item-home.component.html',
  styleUrls: ['./product-item-home.component.scss']
})
export class ProductItemHomeComponent implements OnInit {
  private ProductItemHomeSlider: OwlOptions = {
    margin: 20,
    autoplay: true,
    loop: false,
    nav: false,
    dots: false,
    rewind: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 500,
    items: 4,
    responsive: {
        0: {
            items: 3
        },
        480: {
            items: 3
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 4
        }
    }
  };
  private value = 4;
  @Input() private product: IProduct;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  private addItemToWishlist() {
    this.accountService.addItemToWishlist(this.product);
  }

}
