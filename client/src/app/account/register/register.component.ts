import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IAddress } from 'src/app/shared/models/address';
import { IMeasurements } from 'src/app/shared/models/IMeasurements';
import { IRegister } from 'src/app/shared/models/IRegister';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private UserRegisterationForm: FormGroup;
  private step: any = 1;
  private errors: string[];
  private modelDate: string;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.createUserDetailsForm();
  }

  private createUserDetailsForm() {
    this.UserRegisterationForm = this.fb.group({
      UserAccountForm: this.fb.group({
        FirstName: [null, Validators.required],
        LastName: [null, Validators.required],
        DisplayName: [null, Validators.required, [this.validateUserNameNotTaken()]],
        Gender: [null, Validators.required],
        BirthDate: [null, [Validators.required]],
        Email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]],
        Password: [null, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$')]],
        PhoneNumber1: [null, [Validators.required, Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')]],
        PhoneNumber2: [null, [Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')]]
      }),
      UserAddressForm: this.fb.group({
        Country: [null, Validators.required],
        City: [null, Validators.required],
        Address1: [null, Validators.required],
        Address2: [null],
        StreetName: [null, Validators.required]
      }),
      UserMeasurementsForm: this.fb.group({
        Neck: [0],
        Chest: [0],
        Waist: [0],
        Arm: [0],
        Bust: [0],
        Hip: [0],
        Height: [0],
        Weight: [0],
      })
    });
  }


  onSubmit() {
    const bdValue = this.UserRegisterationForm.get('UserAccountForm').get('BirthDate').value; 
    this.UserRegisterationForm.get('UserAccountForm').patchValue({ BirthDate: moment(bdValue).format('DD/MM/YYYY')});
    const newaddress: IAddress = {
      streetName: this.UserRegisterationForm.get('UserAddressForm').get('StreetName').value,
      city: this.UserRegisterationForm.get('UserAddressForm').get('City').value,
      address1: this.UserRegisterationForm.get('UserAddressForm').get('Address1').value,
      address2: this.UserRegisterationForm.get('UserAddressForm').get('Address2').value,
      country: this.UserRegisterationForm.get('UserAddressForm').get('Country').value
    };
    const newmeasurse: IMeasurements = {
      hip: this.UserRegisterationForm.get('UserMeasurementsForm').get('Hip').value,
      neck: this.UserRegisterationForm.get('UserMeasurementsForm').get('Neck').value,
      chest: this.UserRegisterationForm.get('UserMeasurementsForm').get('Chest').value,
      height: this.UserRegisterationForm.get('UserMeasurementsForm').get('Height').value,
      weight: this.UserRegisterationForm.get('UserMeasurementsForm').get('Weight').value,
      bust: this.UserRegisterationForm.get('UserMeasurementsForm').get('Bust').value,
      arm: this.UserRegisterationForm.get('UserMeasurementsForm').get('Arm').value,
      waist: this.UserRegisterationForm.get('UserMeasurementsForm').get('Waist').value
    };
    const user: IRegister = {
      displayName: this.UserRegisterationForm.get('UserAccountForm').get('DisplayName').value,
      userName: this.UserRegisterationForm.get('UserAccountForm').get('DisplayName').value,
      firstName: this.UserRegisterationForm.get('UserAccountForm').get('FirstName').value,
      lastName: this.UserRegisterationForm.get('UserAccountForm').get('LastName').value,
      gender: this.UserRegisterationForm.get('UserAccountForm').get('Gender').value,
      birthDate: this.UserRegisterationForm.get('UserAccountForm').get('BirthDate').value,
      email: this.UserRegisterationForm.get('UserAccountForm').get('Email').value,
      password: this.UserRegisterationForm.get('UserAccountForm').get('Password').value,
      phoneNumber1: this.UserRegisterationForm.get('UserAccountForm').get('PhoneNumber1').value,
      phoneNumber2: this.UserRegisterationForm.get('UserAccountForm').get('PhoneNumber2').value,
      addressDetails: newaddress,
      measurements: newmeasurse
    };
    this.accountService.register(user).subscribe(Response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
      console.log(user);
    });
    console.log(user);
  }

  private validateEmailNotTaken() : AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return  of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

  private validateUserNameNotTaken() : AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return  of(null);
          }
          return this.accountService.checkUserNameExists(control.value).pipe(
            map(res => {
              return res ? {userNameExists: true} : null;
            })
          );
        })
      );
    };
  }



}
