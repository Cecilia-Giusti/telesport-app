import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  error$!: number | null;
  private destroy$!: Subject<boolean>;

  constructor(private errorService: ErrorService, private router: Router) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.errorService.errorStatus$.subscribe((status) => {
      this.error$ = status;
    });

    if (this.error$ === null) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  getErrorMessage(errorStatus: number | null): string {
    if (errorStatus?.toString().startsWith('4')) {
      return 'No corresponding page found';
    }
    if (errorStatus?.toString().startsWith('5')) {
      return 'An error has occurred, please try again later';
    }
    return 'No corresponding page found';
  }
}
