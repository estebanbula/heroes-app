import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private _authService: AuthService,
              private _route: Router) {
  }

  public onLogin(): void {
    this._authService.login("estebanbula@mail.com", "12345")
      .subscribe(user => this._route.navigate(["/"]));
  }
}
