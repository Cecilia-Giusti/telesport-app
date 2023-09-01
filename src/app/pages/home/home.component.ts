import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';
import { CountryPies } from 'src/app/core/models/CountryPie';
import { getMedals } from 'src/utils/getMedals';

/**
 * @component
 * @description
 * HomeComponent is the home page component.
 * It contains logic for initializing, selecting, and destroying the home component of the application.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$!: Subject<boolean>;
  public errorStatus$: Observable<number | null> = of();

  public olympics: Olympic[] = [];
  public countries: CountryPies[] = [];
  public countryCount: number = 0;
  public yearCount: number = 0;

  // graphic options
  gradient: boolean = true;
  istooltipDisabled: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  /**
   * @constructor
   * @param {OlympicService} olympicService - The service to interact with the Olympic Games data.
   * @param {Router} router - The Angular service for interacting with the router.
   * @param {ErrorService} errorService - The service to interact with the error status.
   */
  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private errorService: ErrorService
  ) {
    Object.assign(this);
  }

  /**
   * - Initializes `destroy$`.
   * - Calls `loadInitialData` of `olympicService` to load the initial data.
   */
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympicService
      .getOlympics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((olympics: Olympic[]) => {
        this.olympics = olympics;

        this.countries = olympics.map((olympic: Olympic) => {
          let totalMedals = getMedals(olympic.participations);
          return new CountryPies(olympic.country, totalMedals);
        });

        this.countryCount = olympics.length;

        const allYears = olympics.flatMap((olympic) =>
          olympic.participations.map((participation) => participation.year)
        );
        this.yearCount = Array.from(new Set(allYears)).length;
      });

    this.errorService.errorStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          this.destroy$.next(true);
          this.router.navigate(['/not-found']);
        }
      });
  }

  /**
   * @description Handles the selection of a country pie chart slice.
   * Navigates to the detail page of the selected country or to the 'not-found' page if the country is not found.
   *
   * @param {CountryPies} data - The selected country pie.
   */
  onSelect(data: CountryPies): void {
    let id;
    for (let i = 0; i < this.olympics.length; i++) {
      if (data.name === this.olympics[i].country) {
        id = this.olympics[i].id;
      }
    }
    id !== undefined
      ? this.router.navigate(['/detail', id])
      : this.router.navigate(['/not-found']);
  }

  /**
   * Sends a true value to `destroy$` to indicate that the component is about to be destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
