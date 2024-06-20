// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError } from 'rxjs';
// import { ErrorHandlerService } from '../services/error-handler.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class ErrorInterceptorService implements HttpInterceptor {




//     constructor(private errorService:ErrorHandlerService) { }
//     intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         return next.handle(req).pipe(
//             catchError(this.errorService.showErrorMessage)
//         );
//     }
// }
