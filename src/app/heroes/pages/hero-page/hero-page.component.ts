import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap, tap} from "rxjs";
import {Hero} from "../../interfaces/hero.interface";

@Component({
  selector: 'hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(private _heroesService: HeroesService,
              private _activatedRoute: ActivatedRoute,
              private _route: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({id}) => this._heroesService.getHeroById(id))
      ).subscribe(hero => this.setHero(hero));
  }

  public goBack(): void {
    this._route.navigate(["/heroes/list"]);
  }

  private setHero(hero: Hero | undefined): void {
    if (!hero) this._route.navigate(["/heroes/list"]);
    this.hero = hero;
  }
}
