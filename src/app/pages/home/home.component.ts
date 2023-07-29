import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error.service';
import { single } from '../../../assets/single';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  private unsubscribe$ = new Subject<void>();
  public errorStatus$: Observable<number | null> = of();

  single: any;
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  istooltipDisabled: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private errorService: ErrorService
  ) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
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
