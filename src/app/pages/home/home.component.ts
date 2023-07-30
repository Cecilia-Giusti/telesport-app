import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';
import { map } from 'rxjs/operators';
import { Country } from 'src/app/core/models/Country.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  private unsubscribe$ = new Subject<void>();
  public errorStatus$: Observable<number | null> = of();
  public countries$: Observable<Country[]> = of([]);
  public countryCount$: Observable<number> = of(0);
  public yearCount$: Observable<number> = of(0);

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  istooltipDisabled: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private errorService: ErrorService
  ) {
    Object.assign(this);
  }

  ngOnInit(): void {
    this.countries$ = this.olympicService.getOlympics().pipe(
      map((olympics: Olympic[]) =>
        olympics.map((olympic: Olympic) => {
          let totalMedals = olympic.participations.reduce(
            (sum, participation) => sum + participation.medalsCount,
            0
          );
          return new Country(olympic.country, totalMedals);
        })
      )
    );

    this.countryCount$ = this.olympicService
      .getOlympics()
      .pipe(map((olympics: Olympic[]) => olympics.length));

    this.yearCount$ = this.olympicService.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        const allYears = olympics.flatMap((olympic) =>
          olympic.participations.map((participation) => participation.year)
        );
        const uniqueYears = Array.from(new Set(allYears));
        return uniqueYears.length;
      })
    );

    this.olympics$.pipe(takeUntil(this.unsubscribe$)).subscribe();

    this.errorService.errorStatus$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((error) => {
        if (error) {
          this.unsubscribe$.next();
          this.router.navigate(['/not-found']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
