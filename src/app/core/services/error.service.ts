import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorStatus$ = new BehaviorSubject<number | null>(null);

  /**
   * Create an ErrorService.
   */
  constructor() {}

  /**
   * Set the error status.
   * @param {number} status - The error status code.
   */
  setError(status: number) {
    this.errorStatus$.next(status);
  }

  /**
   * Clear the error status.
   */
  clearError() {
    this.errorStatus$.next(null);
  }
}
