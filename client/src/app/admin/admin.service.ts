import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IAddProduct } from '../shared/models/IaddProduct';
import { IAdmin } from '../shared/models/IAdmin';
import { IBrand } from '../shared/models/IBrand';
import { ICategories } from '../shared/models/ICategories';
import { IColors } from '../shared/models/IColor';
import { IPagination } from '../shared/models/Ipagination';
import { IProduct } from '../shared/models/Iproduct';
import { IProductType } from '../shared/models/IProductType';
import { IOrder } from '../shared/models/order';
import { ShopParams } from '../shared/models/shopParams';
import { IUser } from '../shared/models/user';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.apiUrl;
  private currentAdminUserSource = new ReplaySubject<IAdmin>(1);
  currentAdminUser$ = this.currentAdminUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { } 

  login(values: any) {
    return this.http.post(this.baseUrl + 'admin/login', values).pipe(
      map((admin: IAdmin) => {
        if (admin) {
          localStorage.setItem('admin_token', admin.token);
          this.currentAdminUserSource.next(admin);
        }
      })
    );
  }

  private logout() {
    localStorage.removeItem('admin_token');
    this.currentAdminUserSource.next(null);
    this.router.navigateByUrl('admin/login');
  }

  loadCurrentAdminUser(token: string) {
    if (token == null) {
      this.currentAdminUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'admin', {headers}).pipe(
      map((admin: IAdmin) => {
        if (admin) {
          localStorage.setItem('admin_token', admin.token);
          this.currentAdminUserSource.next(admin);
        }
      })
    );
  }

  getUserName(email: string) {
    return this.http.get<IUser>(this.baseUrl + 'account/user?email=' + email);
  }

  updateProduct(produ: IAddProduct) {
    return this.http.put(this.baseUrl + 'products', produ);
  }

  updateProductCategory(category: ICategories) {
    return this.http.put(this.baseUrl + 'products/category', category);
  }

  updateProductBrand(brand: IBrand) {
    return this.http.put(this.baseUrl + 'products/brand', brand);
  }

  updateProductColor(color: IColors) {
    return this.http.put(this.baseUrl + 'products/color', color);
  }
  updateProductType(type: IProductType) {
    return this.http.put(this.baseUrl + 'products/type', type);
  }
  updateDeliveryMethod(method: IDeliveryMethod) {
    return this.http.put(this.baseUrl + 'orders/deliveryMethod', method);
  }
  editOrderStatus(order: IOrder) {
    return this.http.put(this.baseUrl + 'orders/status', order);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods');
  }
  getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
  getColors() {
    return this.http.get<IColors[]>(this.baseUrl + 'products/colors');
  }
  getCategories() {
    return this.http.get<ICategories[]>(this.baseUrl + 'products/categories');
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'products/category?id=' + id);
  }

  deleteDeliveryMethod(id: number) {
    return this.http.delete(this.baseUrl + 'orders/deliveryMethod?id=' + id);
  }

  deleteType(id: number) {
    return this.http.delete(this.baseUrl + 'products/type?id=' + id);
  }
  deleteBrand(id: number) {
    return this.http.delete(this.baseUrl + 'products/brand?id=' + id);
  }
  deleteColor(id: number) {
    return this.http.delete(this.baseUrl + 'products/color?id=' + id);
  }

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

  addProduct(product: IAddProduct) {
    return this.http.post(this.baseUrl + 'products/add', product);
  }

  addCategory(category: ICategories) {
    return this.http.post(this.baseUrl + 'products/productCategory', category);
  }

  addDeliveryMethod(method: IDeliveryMethod) {
    return this.http.post(this.baseUrl +  'orders/deliveryMethod', method);
  }

  addColor(color: IColors) {
    return this.http.post(this.baseUrl + 'products/productColor', color);
  }

  addBrand(brand: IBrand) {
    return this.http.post(this.baseUrl + 'products/productBrand', brand);
  }

  addType(type: IProductType) {
    return this.http.post(this.baseUrl + 'products/productType', type);
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrand(id: number) {
    return this.http.get<IBrand>(this.baseUrl + 'products/brand/' + id);
  }

  getDeliveryMethod(id: number) {
    return this.http.get<IDeliveryMethod>(this.baseUrl + 'Orders/deliveryMethod/' + id);
  }


  getCategory(id: number) {
    return this.http.get<ICategories>(this.baseUrl + 'products/category/' + id);
  }
  getColor(id: number) {
    return this.http.get<IColors>(this.baseUrl + 'products/color/' + id);
  }
  getType(id: number) {
    return this.http.get<IProductType>(this.baseUrl + 'products/type/' + id);
  }
  getAllOrders() {
    return this.http.get(this.baseUrl + 'orders/allOrders');
  }
  getPendingOrders() {
    return this.http.get(this.baseUrl + 'orders/pendingOrders');
  }
  getConfirmedOrders() {
    return this.http.get(this.baseUrl + 'orders/confirmedOrders');
  }
  getPreparingOrders() {
    return this.http.get(this.baseUrl + 'orders/preparingOrders');
  }
  getOutForDeliveryOrders() {
    return this.http.get(this.baseUrl + 'orders/outForDeliveryOrders');
  }
  getReceivedOrders() {
    return this.http.get(this.baseUrl + 'orders/receivedOrders');
  }
  getCancelledOrders() {
    return this.http.get(this.baseUrl + 'orders/cancelledOrders');
  }
  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'orders/orderDetail/' + id);
  }
  getProductCount() {
    return this.http.get(this.baseUrl + 'products/product_count');
  }
  getProductTypesCount() {
    return this.http.get(this.baseUrl + 'products/productTypes_count');
  }
  getProductBrandsCount() {
    return this.http.get(this.baseUrl + 'products/productBrands_count');
  }
  getProductCategoriesCount() {
    return this.http.get(this.baseUrl + 'products/productCategories_count');
  }
}
