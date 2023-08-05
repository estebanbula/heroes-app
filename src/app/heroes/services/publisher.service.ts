import {Injectable} from '@angular/core';
import {environments} from "../../../enviroments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publisher} from "../interfaces/publisher.interface";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getPublishers(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(`${this.baseUrl}/publisher`);
  }
}
