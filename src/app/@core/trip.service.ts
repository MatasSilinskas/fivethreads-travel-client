import { Trip } from './abstractions/trip';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from './api-service';
import { ApiResponse } from './abstractions/api-response';

@Injectable({
    providedIn: 'root',
})
export class TripService extends ApiService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getAll(): Observable<Trip[]> {
      return this.httpClient.get<Trip[]>(this.getUrl('allTrips'));
    }

    public create(trip: Trip, password: string): Observable<string> {
        return this.httpClient.post<any>(this.getUrl('trip/create'), {
            password,
            from : trip.from,
            to : trip.to,
            accommodation : trip.accommodation,
            persons : trip.persons,
            organizer : trip.organizer,
            status : trip.status,
        });
    }

  //  public update(trip: Trip): Observable<string> {
    //    return this.httpClient.put<any>(this.getUrl('admin/trip'), trip);
    //}

  //  public delete(tripId: string): Observable<string> {
    //    return this.httpClient.delete<any>(this.getUrl(`tripMember/flight/${tripId}`));
  //  }
}

export interface TripResponse extends ApiResponse {
    data: {
        token?: string;
        trip: TripResponse;
    };
}
