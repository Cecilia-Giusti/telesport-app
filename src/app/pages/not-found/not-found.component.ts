import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';

/**
 * @component
 * @description
 * Component for the Error page.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  error$!: number | null;
  private destroy$!: Subject<boolean>;

  /**
   * Creates a NotFoundComponent.
   * @param {ErrorService} errorService - Service for handling errors.
   * @param {Router} router - Angular Router.
   */
  constructor(private errorService: ErrorService, private router: Router) {}

  /**
   * Initializes `destroy$` and subscribes to `errorStatus$`.
   * Redirects to home if `error$` is null.
   */
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.errorService.errorStatus$.subscribe((status) => {
      this.error$ = status;
    });

    if (this.error$ === null) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Sends a true value to `destroy$` to indicate that the component is about to be destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  /**
   * Returns an error message based on the error status.
   * @param {number | null} errorStatus - The error status code.
   * @return {string} The corresponding error message.
   */
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
