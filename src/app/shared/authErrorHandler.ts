import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './service/user.service';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(
        private injector : Injector,
        private zone: NgZone,
        private userService: UserService
    ) {
    }

    handleError(error) {
      console.log(error);
      const router = this.injector.get(Router);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.zone.run(
            () => {
              this.userService.deconnectUser();
              router.navigate(['/login'])
            }
          );
        } else if ( error.status === 403) {
          alert('Pas autorisé')
        }
      }
    }
}
