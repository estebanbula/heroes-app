import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from "./shared/pages/not-found-page/not-found-page.component";
import {canMatchGuard} from "./auth/guards/can-match.guard";
import {canActivateGuard} from "./auth/guards/can-activate.guard";
import {publicCanActivateGuard} from "./auth/guards/public-can-activate.guard";
import {publicCanMatchGuard} from "./auth/guards/public-can-match.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule),
    canActivate: [publicCanActivateGuard],
    canMatch: [publicCanMatchGuard]
  },
  {
    path: "heroes",
    loadChildren: () => import("./heroes/heroes.module").then(module => module.HeroesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: "not-found",
    component: NotFoundPageComponent
  },
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
