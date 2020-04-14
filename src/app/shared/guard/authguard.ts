import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
import { UserService } from '../service/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate{

  constructor(
      public modalService: ModalService,
      public userService: UserService
  ) {}

  canActivate() {
    if (!this.userService.isLoggedInValue) {
      this.modalService.openInscriptionModal();
      return false;
    }
    return true;
  }
}
