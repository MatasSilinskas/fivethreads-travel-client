import { Apartament } from './abstractions/apartament';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from './api-service';

@Injectable({
    providedIn: 'root',
})
export class ApartamentService extends ApiService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getAll(): Observable<Apartament[]> {
      return this.httpClient.get<Apartament[]>(this.getUrl('apartments'));
    }

    public create(apartament: Apartament): Observable<string> {
        return this.httpClient.post<any>(this.getUrl('admin/apartments/create'), apartament);
    }

    public update(apartament: Apartament): Observable<string> {
        return this.httpClient.put<any>(this.getUrl('apartments/apartment'), apartament);
    }

    public delete(apartamentId: string): Observable<string> {
        return this.httpClient.delete<any>(this.getUrl(`admin/apartments/${apartamentId}`));
    }
}
