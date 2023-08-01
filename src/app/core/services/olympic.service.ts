import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Olympic } from '../models/Olympic';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.errorService.setError(error.status);
        this.olympics$.next([]);
        return throwError(() => error);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getCountryDetails(countryName: string): Observable<Olympic> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        const country = olympics.find(
          (olympic: Olympic) => olympic.country === countryName
        );
        if (country) {
          return country;
        } else {
          // TODO à améliorer
          throw new Error(`No country found with name ${countryName}`);
        }
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
