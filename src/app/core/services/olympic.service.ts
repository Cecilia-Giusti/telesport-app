import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  /**
   * Create an OlympicService.
   * @param {HttpClient} http - The Angular HTTP client service.
   * @param {ErrorService} errorService - The service for handling errors.
   */
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  /**
   * Load the initial data from `olympicUrl`.
   * @returns {Observable<Olympic[]>} The Observable that, when subscribed,
   * emits the current list of Olympics or an error.
   */
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

  /**
   * Get the list of Olympics.
   * @returns {Observable<Olympic[]>} The Observable that, when subscribed,
   * emits the current list of Olympics.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Get the details of an Olympic event by its ID.
   * @param {string} id - The ID of the Olympic event.
   * @returns {Observable<Olympic | undefined>} The Observable that, when subscribed,
   * emits the Olympic event or undefined if not found.
   */
  getDetailById(id: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.find((olympic) => olympic.id.toString() === id)
      )
    );
  }
}
