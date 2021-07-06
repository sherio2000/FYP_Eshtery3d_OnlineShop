import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { IWishlist } from 'src/app/shared/models/wishlist';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  private value = 4;
  private customOptions: OwlOptions = {
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
  @Input() private product: IProduct;

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit() {
  }

  private addItemToWishlist() {
    this.accountService.addItemToWishlist(this.product);
  }

  private addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

}
