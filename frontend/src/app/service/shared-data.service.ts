import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {

  private dataSubject: ReplaySubject<number> = new ReplaySubject<number>(1);

  setData(data: number): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<number> {
    return this.dataSubject.asObservable();
  }
}