import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../enviroments/environments";
import {User} from "../interfaces/user.interface";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private _http: HttpClient,
              private _router: Router) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/users/64cebaf19ee10e30bb846de0`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem("token", user.id))
      );
  }

  public checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token')

    return this._http.get<User>(`${this.baseUrl}/users/64cebaf19ee10e30bb846de0`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )
  }

  public checkAccess(): boolean {
    let hasAccess: boolean = true;
    this.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            hasAccess = isAuthenticated;
            this._router.navigate(["./auth/login"]);
          }
        })
      ).subscribe();
    return hasAccess;
  }

  public checkAccessPublic(): boolean {
    let hasAccess: boolean = true;
    this.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            hasAccess = isAuthenticated;
            this._router.navigate(["./"]);
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      ).subscribe();
    return hasAccess;
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
