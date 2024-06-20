import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class GenericService {

    constructor(
        public http: HttpClient,
        public location: Location,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) { }

    public IsLogged = (): boolean => localStorage.getItem('jwt') !== null;
    public API: string = 'https://localhost:7173/api/';

    getRequest<T>(requestUrl: string) {
        let Url = `${this.API}${requestUrl}`;
        return this.http.get<T>(Url);
    };

    postRequest<T>(requestUrl: string, addObject: T, headers?:object):Observable<any> {
        let Url = `${this.API}${requestUrl}`;
        return this.http.post(Url, addObject,headers);
    };

    putRequest<T>(requestUrl: string, addObject: T) {
        let getUrl = `${this.API}${requestUrl}`;
        return this.http.put(getUrl, addObject);
    };

    deleteRequest<T>(requestUrl: string) {
        let getUrl = `${this.API}${requestUrl}`;
        return this.http.delete(getUrl);
    };
    
};