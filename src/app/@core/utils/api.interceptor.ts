import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authObj = localStorage.getItem('auth_app_token');
        const accessToken = (authObj) ? JSON.parse(authObj).value : undefined;
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}
