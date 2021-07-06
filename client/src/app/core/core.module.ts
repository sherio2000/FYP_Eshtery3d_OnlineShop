import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, BsDropdownToggleDirective } from 'ngx-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from '../admin/admin.module';



@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FormsModule,
    AdminModule
  ],
  exports: [NavBarComponent, SectionHeaderComponent, FooterComponent]
})
export class CoreModule { }
