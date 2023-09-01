import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { CountryLine, DataPoint } from 'src/app/core/models/CountryLine';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { getAthletes } from 'src/utils/getAthletes';
import { getMedals } from 'src/utils/getMedals';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  id?: string | null;
  country?: string;
  entries?: number;
  medals?: number;
  athletes?: number;
  olympicSeries: DataPoint[] = [];
  olympicDetail?: CountryLine[] = [];

  private destroy$!: Subject<boolean>;

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {
    Object.assign(this);
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === null || this.id === undefined) {
      this.router.navigate(['/not-found']);
    } else {
      this.olympicService
        .getDetailById(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((olympic) => {
          if (olympic) {
            for (let i = 0; i < olympic.participations.length; i++) {
              this.olympicSeries.push(
                new DataPoint(
                  olympic.participations[i].year.toString(),
                  olympic.participations[i].medalsCount
                )
              );
            }
            this.olympicDetail?.push(
              new CountryLine(olympic.country, this.olympicSeries)
            );
            this.country = olympic.country;
            this.entries = olympic.participations.length;
            this.medals = getMedals(olympic.participations);
            this.athletes = getAthletes(olympic.participations);
          } else {
            this.router.navigate(['/not-found']);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
