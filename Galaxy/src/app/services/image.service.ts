import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private generic: GenericService) { }

  ConvertImage(form: FormData): Observable<string> {
    let Url:string = `Images/ConvertImage`;
    return this.generic.postRequest<any>(Url, form, { responseType: 'text' as 'json' });
  };

  ConvertListImage(form: FormData): Observable<string[]> {
    let Url:string = `Images/ConvertListImage`;
    return this.generic.postRequest<any>(Url, form);
  };

};