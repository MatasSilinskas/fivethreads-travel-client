import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router) {
    }

    canActivate() {
        return this.authService.isAuthenticated()
            .pipe(
                tap((loggedIn) => {
                    if (loggedIn) {
                        this.router.navigate(['pages/users']);
                    }
                }),
                map(loggedIn => !loggedIn)
            );
    }
}
