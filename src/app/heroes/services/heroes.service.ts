import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Hero} from "../interfaces/hero.interface";
import {environments} from "../../../enviroments/environments";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(err => of(undefined))
      );
  }

  public saveNewHero(hero: Hero): Observable<Hero> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero, {headers});
  }

  public updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error("Hero id is required");
    return this.httpClient.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

}
