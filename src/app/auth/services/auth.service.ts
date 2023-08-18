import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../enviroments/environments";
import {User} from "../interfaces/user.interface";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private _http: HttpClient) { }

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

  public logout() {
    this.user = undefined;
    localStorage.removeItem("token");
  }
}
