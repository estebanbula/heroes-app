import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from "./shared/pages/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule)
  },
  {
    path: "heroes",
    loadChildren: () => import("./heroes/heroes.module").then(module => module.HeroesModule)
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
