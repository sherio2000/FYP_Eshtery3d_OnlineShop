import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { AdminService } from './admin/admin.service';
import { BasketService } from './basket/basket.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private title = 'Eshtery3D';
  private isadmin: boolean;
  private url: string;

  // tslint:disable-next-line: max-line-length
  constructor(private basketService: BasketService, private accountService: AccountService, private adminService: AdminService, private location: Location) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    this.loadCurrentAdminUser();
    this.loadWishlist();
    this.isadmin = this.getisAdmin();
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line: deprecation
    this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
  }

  private loadCurrentAdminUser() {
    const token = localStorage.getItem('admin_token');
    // tslint:disable-next-line: deprecation
    this.adminService.loadCurrentAdminUser(token).subscribe(() => {
        console.log('loaded admin user');
      }, error => {
        console.log(error);
      });
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      // tslint:disable-next-line: deprecation
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }

  private getisAdmin(): boolean {
    const url1 = '/admin';
    const url2 = '/admin/login';
    const url3 = '/admin/home';
    const url4 = '/admin/login?returnUrl=%2Fadmin';
    if (localStorage.getItem('admin_token')) {
      return true;
    }
    if (this.location.path() === url1 || this.location.path() === url2 || this.location.path() === url3 || this.location.path() === url4) {
      console.log(this.location.path());
      return true;
    } else {
      console.log(this.location.path());
      return false;
    }
  }

  private loadWishlist() {
    const wishlistId = localStorage.getItem('wishlist_id');
    if (wishlistId) {
      // tslint:disable-next-line: deprecation
      this.accountService.getWishlist(wishlistId).subscribe(() => {
        console.log('initialised Wishlist');
      }, error => {
        console.log(error);
      });
    }
  }
}
