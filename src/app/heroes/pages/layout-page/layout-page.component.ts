import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'hero-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: "Hero list", icon: "label", url: "./list"},
    { label: "Add hero", icon: "add", url: "./add-hero"},
    { label: "Search", icon: "search", url: "./search"},
  ]

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  get user(): User | undefined {
    return this._authService.currentUser;
  }

  public onLogout() {
    this._authService.logout();
    this._router.navigate(["/auth/login"])
  }

}
