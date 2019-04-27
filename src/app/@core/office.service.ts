import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from './api-service';
import { Office } from './abstractions/office';

@Injectable({
    providedIn: 'root',
})
export class OfficeService extends ApiService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getAll(): Observable<Office[]> {
      return this.httpClient.get<Office[]>(this.getUrl('offices'));
    }

    // public create(apartament: Office, password: string): Observable<string> {
    //     return this.httpClient.post<any>(this.getUrl('admin/apartments/create'), {
    //         password,
    //         name: apartament.name,
    //         office: apartament.office,
    //         adress: apartament.adress,
    //         places: apartament.places,
    //     });
    // }

    // public update(apartament: Office): Observable<string> {
    //     return this.httpClient.put<any>(this.getUrl('apartments/apartment'), apartament);
    // }

    // public delete(apartamentId: string): Observable<string> {
    //     return this.httpClient.delete<any>(this.getUrl(`admin/apartments/${apartamentId}`));
    // }
}
