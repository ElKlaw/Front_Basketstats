import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/service/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css']
})
export class ProfilUtilisateurComponent {
  user: User;
  loading = true;

  userEmailForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(
    public userService: UserService
  ) {
    this.getUser();
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      (user: User)=> {
        this.user = user;
        this.loading = false;
        console.log(user);
      }
    )
  }



}
