import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {

  private dataSubject: ReplaySubject<number> = new ReplaySubject<number>(1);
  private myUserIdSubject: ReplaySubject<number> = new ReplaySubject<number>(1);


  setData(data: number ): void {
    if (data) {
      this.dataSubject.next(data);
    }
  }

  getData$(): Observable<number> {
    return this.dataSubject.asObservable();
  }

  setMyUserId(userId: number): void {
    if (userId) {
      this.myUserIdSubject.next(userId);
    }
  }

  getMyUserId$(): Observable<number> {
    return this.myUserIdSubject.asObservable();
  }
}