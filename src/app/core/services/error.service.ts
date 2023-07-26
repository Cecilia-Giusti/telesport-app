import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorStatus$ = new BehaviorSubject<number | null>(null);

  constructor() {}

  setError(status: number) {
    this.errorStatus$.next(status);
  }

  clearError() {
    this.errorStatus$.next(null);
  }
}
