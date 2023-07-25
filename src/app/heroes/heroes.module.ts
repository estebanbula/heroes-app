import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeroesRoutingModule} from './heroes-routing.module';
import {HeroPageComponent} from './pages/hero-page/hero-page.component';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {ListPageComponent} from './pages/list-page/list-page.component';
import {AddHeroPageComponent} from './pages/add-hero-page/add-hero-page.component';
import {SearchHeroPageComponent} from './pages/search-hero-page/search-hero-page.component';
import {MaterialModule} from "../material/material.module";
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    AddHeroPageComponent,
    SearchHeroPageComponent,
    HeroCardComponent,
    HeroImagePipe
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }