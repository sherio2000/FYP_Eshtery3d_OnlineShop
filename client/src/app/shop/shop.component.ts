import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IProduct } from '../shared/models/Iproduct';
import { IProductType } from '../shared/models/IProductType';
import { ShopService } from './shop.service';
import {ShopParams} from '../shared/models/shopParams';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @Input() private product: IProduct;

  @ViewChild('search', {static: true}) private searchTerm: ElementRef;
  private products: IProduct[];
  private brands: IBrand[];
  private productType: IProductType[];
  private shopParams = new ShopParams();
  private totalCount: number;
  private sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService, private basketService: BasketService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getProductType();
  }

  private addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
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
  private getBrands() {
    this.shopService.getBrands().subscribe(Response => {
      this.brands = [{id: 0, name: 'All'}, ...Response];
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
  private getProductType() {
    this.shopService.getProductTypes().subscribe(Response => {
      this.productType = [{id: 0, name: 'All'}, ...Response];
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  private OnBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  private OnProductTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  private onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }
  private onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  private onSearch(event: any) {
    this.shopParams.search = event.target.value;
    this.shopParams.pageNumber = 1;
    // this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  private onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
