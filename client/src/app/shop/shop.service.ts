import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/IBrand';
import { IPagination } from '../shared/models/Ipagination';
import { IProductType } from '../shared/models/IProductType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/Iproduct';
import { IReviews } from '../shared/models/IReviews';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(Response => {
        return Response.body;
      })
    );
  }
  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
  getProductReviews(productId: number) {
    return this.http.get<IReviews[]>(this.baseUrl + 'reviews/' + productId);
  }
  getReviewed(productId: number) {
    return this.http.get<number>(this.baseUrl + 'reviews/reviewed/' + productId);
  }
  getProductRating(productId: number) {
    return this.http.get<number>(this.baseUrl + 'reviews/rate/' + productId);
  }
  getReviewsCount(productId: number) {
    return this.http.get<number>(this.baseUrl + 'reviews/reviewCount/' + productId);
  }
  addProductReview(review: IReviews) {
    return this.http.post(this.baseUrl + 'reviews', review);
  }
}
