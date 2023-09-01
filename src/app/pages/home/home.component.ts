import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';
import { CountryPies } from 'src/app/core/models/CountryPie';
import { getMedals } from 'src/utils/getMedals';

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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
