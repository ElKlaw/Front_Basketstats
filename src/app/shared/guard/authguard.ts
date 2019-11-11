import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ModalService } from 'src/app/shared/modal.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate{
    constructor(
        public userService: UserService,
        public modalService: ModalService
    ) {}
    
    canActivate() {
        if (!this.userService.isLoggedInValue) {
            this.modalService.openInscriptionModal();
            return false;
        }
        return true;
    }
}