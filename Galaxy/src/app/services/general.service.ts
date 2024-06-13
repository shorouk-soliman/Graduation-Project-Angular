import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class GeneralService {

constructor(
    public http:HttpClient,
    public location: Location,
    public router: Router,
) { }

public IsLogged = (): boolean => localStorage.getItem('jwt') !== null;
public API: string = 'https://localhost:7173/api/';

}
