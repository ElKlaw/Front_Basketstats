import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connect : boolean;
  username: string;

  constructor(
    private userService: UserService
  ) { }

    ngOnInit() {
      this.userService.isLoggedIn.subscribe(
        ((connected:boolean) =>{
          this.connect = connected;
          if(connected){
            this.userService.getCurrentUser().subscribe(
              user => {
                this.username = user.name;
              }
            );
          }
        }
      ));

    }

    deconnexion() {
      this.connect=false;
      this.userService.deconnectUser();
    }
}
