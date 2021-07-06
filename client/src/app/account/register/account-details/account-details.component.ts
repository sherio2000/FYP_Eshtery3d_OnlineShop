import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  private bsValue = new Date();
  @Input() private registerForm: FormGroup;
  private emailExist = false;
  constructor(private accountService: AccountService) {
    this.bsValue.getDate();
   }

  ngOnInit() {
  }

  private checkEmailExist() {
    if (!this.registerForm.get('UserAccountForm').get('Email').invalid) {
      const email = this.accountService.checkEmailExists(this.registerForm.get('UserAccountForm').get('Email').value).subscribe();
      if(email) {
        this.emailExist = true;
      }
    }
  }
}
