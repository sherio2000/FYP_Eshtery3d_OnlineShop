import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IBasket, IBasketItem } from '../shared/models/IBasket';
import { IMeasurements } from '../shared/models/IMeasurements';
import { IProduct } from '../shared/models/Iproduct';
import { IRegister } from '../shared/models/IRegister';
import { IUser } from '../shared/models/user';
import { IWishlist, IWishlistItem, Wishlist } from '../shared/models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private wishlistSource = new BehaviorSubject<IWishlist>(null);
  wishlist$ = this.wishlistSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getWishlist(id: string) {
    return this.http.get(this.baseUrl + 'wishlist?id=' + id)
      .pipe(
        map((wishlist: IWishlist) => {
          this.wishlistSource.next(wishlist);
        })
      );
  }

  private setWishlist(wishlist: IWishlist) {
    return this.http.post(this.baseUrl + 'wishlist', wishlist).subscribe((response: IWishlist) => {
      this.wishlistSource.next(response);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  private getCurrentWishlistValue() {
    return this.wishlistSource.value;
  }

  addItemToWishlist(item: IProduct) {
    const itemToAdd: IWishlistItem = this.mapProductItemToWishlist(item);
    let wishlist = this.getCurrentWishlistValue();
    if (wishlist === null) {
      wishlist = this.createWishlist();
    }
    wishlist.items = this.addOrUpdateItem(wishlist.items, itemToAdd);
    this.setWishlist(wishlist);
  }

  removeItemFromWishlist(item: IWishlistItem) {
    const wishlist = this.getCurrentWishlistValue();
    if (wishlist.items.some(x => x.id === item.id)) {
      wishlist.items = wishlist.items.filter(i => i.id !== item.id);
      if (wishlist.items.length > 0) {
        this.setWishlist(wishlist);
      } else {
        this.deleteWishlist(wishlist);
      }
    }
  }
  private checkItemWishlistExists(name: string): boolean {
    const wishlist = this.getCurrentWishlistValue();
    if (wishlist.items.some(x => x.productName === name)) {
      return true;
    }
  }

  private deleteWishlist(wishlist: IWishlist) {
    return this.http.delete(this.baseUrl + 'wishlist?id=' + wishlist.id).subscribe(() => {
      this.wishlistSource.next(null);
      localStorage.removeItem('wishlist_id');
    }, error => {
      console.log(error);
    });
  }
  private addOrUpdateItem(items: IWishlistItem[], itemToAdd: IWishlistItem): IWishlistItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    items.push(itemToAdd);
    return items;
  }
  private createWishlist(): IWishlist {
    const wishlist = new Wishlist();
    localStorage.setItem('wishlist_id', wishlist.id);
    return wishlist;
  }
   private mapProductItemToWishlist(item: IProduct): IWishlistItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }


  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

    login(values: any) {
      return this.http.post(this.baseUrl + 'account/login', values).pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUserSource.next(user);
          }
        })
      );
    }

    register(newuser: IRegister) {
      return this.http.post(this.baseUrl + 'account/register', newuser).pipe(
        map((user: IUser) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
    }

    logout() {
      localStorage.removeItem('token');
      this.currentUserSource.next(null);
      this.router.navigateByUrl('/');
    }

    checkEmailExists(email: string) {
      return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
    }

    checkUserNameExists(username: string) {
      return this.http.get(this.baseUrl + 'account/userNamexists?username=' + username);
    }

    getUserAddress() {
      return this.http.get<IAddress>(this.baseUrl + 'account/address');
    }

    getUserMeasures() {
      return this.http.get<IMeasurements>(this.baseUrl + 'account/measurements');
    }

    updateUserAddress(address: IAddress) {
      return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
    }
}

