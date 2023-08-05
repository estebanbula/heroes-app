import {Component, OnInit} from '@angular/core';
import {switchMap, tap} from "rxjs";
import {PublisherService} from "../../services/publisher.service";
import {Publisher} from "../../interfaces/publisher.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {Hero} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hero-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styles: []
})
export class AddHeroPageComponent implements OnInit {

  public publishers: Publisher[] = [];

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    superhero: new FormControl<string>("", {nonNullable: true}),
    publisher: new FormControl<Publisher>(this.publishers[0]),
    alterEgo: new FormControl<string>("", {nonNullable: true}),
    firstAppearance: new FormControl(""),
    characters: new FormControl(""),
    altImage: new FormControl(""),
    description: new FormControl(""),
  })

  constructor(private _publisherService: PublisherService,
              private _heroService: HeroesService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _snackBar: MatSnackBar) {
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  ngOnInit(): void {
    this.gotPublishers();

    if (!this._router.url.includes("edit")) return;

    this._activatedRoute.params
      .pipe(
        switchMap(({id}) => this._heroService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) return this._router.navigateByUrl("/");
        this.heroForm.reset(hero);
        return;
    });
  }

  public gotPublishers(): void {
    this._publisherService.getPublishers()
      .pipe(
        tap(response => this.publishers = response)
      )
      .subscribe();
  }

  public onSubmit(): void {
    if (!this.heroForm.valid) return;

    if (this.currentHero.id) {
      this._heroService.updateHero(this.currentHero)
        .subscribe(hero => this.showSnackBar(`${hero.superhero} updated!`));
    }

    this.currentHero.publisher = this.publishers
      .filter(pub => pub.id === this.heroForm.value["publisher"])[0];
    this._heroService.saveNewHero(this.currentHero)
      .subscribe( hero => {
        this._router.navigate(["heroes/edit", hero.id])
        this.showSnackBar(`${hero.superhero} created!`)
      });
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, "done", {
      duration: 2500
    })
  }
}
