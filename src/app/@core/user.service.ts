import { User } from './abstractions/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ApiService } from './api-service';
import { ApiResponse } from './abstractions/api-response';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ApiService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getAll(): Observable<User[]> {
      return this.httpClient.get<User[]>(this.getUrl('admin/user'));
    }

    public create(user: User, password: string): Observable<string> {
        return this.httpClient.post<any>(this.getUrl('admin/user/create'), {
            password,
            email: user.email,
            phone: user.phone,
            name: user.firstname,
            surname: user.lastname,
            role: user.role
        });
    }

    public update(user: User): Observable<string> {
        return this.httpClient.put<any>(this.getUrl('admin/user'), user);
    }

    public delete(userId: string): Observable<string> {
        return this.httpClient.delete<any>(this.getUrl(`admin/user/${userId}`));
    }
}

export interface UserResponse extends ApiResponse {
    data: {
        token?: string;
        user: UserResponse;
    };
}
