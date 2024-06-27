import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { UnitService } from '../services/unit.service';

@Injectable({
   providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private unitService: UnitService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set loading to true before the request is sent
    this.unitService.isloading = true;

    return next.handle(req).pipe(
      // Handle successful and error responses (optional)
      tap(() => {
        // Handle successful response (if needed)
      }, (error) => {
        // Handle error response (if needed)
      }),
      // Set loading to false after the request completes
      finalize(() => this.unitService.isloading = false)
    );
  }
}