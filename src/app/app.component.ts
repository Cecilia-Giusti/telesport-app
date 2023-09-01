import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Olympic } from './core/models/Olympic';

/**
 * @component
 * @description
 * - AppComponent is the root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  Olympics!: Olympic[];
  private destroy$!: Subject<boolean>;

  /**
   * @constructor
   * @param {OlympicService} olympicService - The service to interact with the Olympic Games data.
   */
  constructor(private olympicService: OlympicService) {}

  /**
   * - Initializes `destroy$`.
   * - Calls `loadInitialData` of `olympicService` to load the initial data.
   */
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympicService
      .loadInitialData()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error(
            'Erreur lors du chargement des données initiales',
            error
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  /**
   * Sends a true value to `destroy$` to indicate that the component is about to be destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
