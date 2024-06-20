import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

constructor() { }
  showErrorMessage(errorResponse:HttpErrorResponse):Observable<any>{
    alert(errorResponse.error);
    return throwError(() => null)
  }
}
