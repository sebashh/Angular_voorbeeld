import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@app/account/account.routing.module';
import { LayoutComponent } from '@app/account/layout/layout.component';
import { LoginComponent } from '@app/account/login/login.component';
import { RegisterComponent } from '@app/account/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AccountModule { }
