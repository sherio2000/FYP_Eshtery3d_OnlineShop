import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IOrder } from 'src/app/shared/models/order';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  private order: IOrder;

  constructor(private accountService: AccountService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state) {
      this.order = state as IOrder;
    }
   }
  private currentUser$: Observable<IUser>;

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

}
