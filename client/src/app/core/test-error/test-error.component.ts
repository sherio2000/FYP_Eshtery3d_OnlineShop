import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  private baseUrl = environment.apiUrl;
  private validationErrors: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  private get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe(Response => {
      console.log(Response);
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }
    private get500Error() {
      this.http.get(this.baseUrl + 'buggy/servererror').subscribe(Response => {
        console.log(Response);
      // tslint:disable-next-line: no-shadowed-variable
    }, error => {
        console.log(error);
    });
  }
    private get400Error() {
      this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(Response => {
        console.log(Response);        // tslint:disable-next-line: no-shadowed-variable
    }, error => {
        console.log(error);
    });
  }
    private get400ValidationError() {
       this.http.get(this.baseUrl + 'products/fortytwo').subscribe(Response => {
        console.log(Response);
      // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        console.log(error);
        this.validationErrors = error.errors;
      });
    }

}
