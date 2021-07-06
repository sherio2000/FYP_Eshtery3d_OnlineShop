import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem, IBasketTotals } from 'src/app/shared/models/IBasket';
import { IBrand } from 'src/app/shared/models/IBrand';
import { IProduct } from 'src/app/shared/models/Iproduct';
import { IProductType } from 'src/app/shared/models/IProductType';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IUser } from 'src/app/shared/models/user';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private basketService: BasketService, private accountService: AccountService, private shopService: ShopService) {}

  private dropdownOptions = [];
  private basketTotal$: Observable<IBasketTotals>;
  private products: IProduct[];
  private brands: IBrand[];
  private productType: IProductType[];
  private shopParams = new ShopParams();


  private totalCount: number;
  // tslint:disable-next-line: ban-types
  private navbarCollapseStat: Boolean;
  public isMenuCollapsed = true;
  private basket$: Observable<IBasket>;
  private currentUser$: Observable<IUser>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  private logout() {
    this.accountService.logout();
  }
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

  private navbarCollapse() {
    if (this.navbarCollapseStat == null) {
      this.navbarCollapseStat = true;
    // tslint:disable-next-line: triple-equals
    } else if (this.navbarCollapseStat == true) {
      this.navbarCollapseStat = false;
    } else {
      this.navbarCollapseStat = true;
    }
  }

  private onSearch(event: any) {
    this.shopParams.search = event.target.value;
    this.shopParams.pageNumber = 1;
    // this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  private removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

}
