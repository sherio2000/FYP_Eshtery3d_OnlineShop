import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlist, IWishlistItem } from 'src/app/shared/models/wishlist';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  private wishlist$: Observable<IWishlist>;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.wishlist$ = this.accountService.wishlist$;
  }

  private removeWishlistItem(item: IWishlistItem) {
    this.accountService.removeItemFromWishlist(item);
  }


}
