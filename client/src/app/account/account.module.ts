import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';
import { AccountDetailsComponent } from './register/account-details/account-details.component';
import { AddressDetailsComponent } from './register/address-details/address-details.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MeasurementsDetailsComponent } from './register/measurements-details/measurements-details.component';
import { FemaleMeasureHowComponent } from './register/measurements-details/female-measure-how/female-measure-how.component';
import { MaleMeasureHowComponent } from './register/measurements-details/male-measure-how/male-measure-how.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LoginComponent, RegisterComponent, WishlistComponent, AccountDetailsComponent, AddressDetailsComponent, MeasurementsDetailsComponent, FemaleMeasureHowComponent, MaleMeasureHowComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
    CoreModule,
    CdkStepperModule,
    BsDatepickerModule.forRoot(),
    SelectDropDownModule
  ]
})
export class AccountModule { }
