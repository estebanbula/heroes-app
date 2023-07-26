import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SingUpPageComponent} from './pages/singup-page/sing-up-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    SingUpPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
