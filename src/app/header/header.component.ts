import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { ModalService } from 'src/app/shared/modal.service';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { UserConnection } from 'src/app/shared/userConnection';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    connect : boolean;
    username: string;
    
    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    
    constructor(
        public userService: UserService,
        public modalService: ModalService
    ) { }

    ngOnInit() {
        this.userService.isLoggedIn.subscribe(
            data=> {
                this.connect = data;
                if(this.connect) {
                    const token = jwt_decode(localStorage.getItem("id_token"));
                    this.username =  token.username;
                }
            }
        );
    }
    
    deconnexion() {
        this.userService.deconnectUser();
    }
    
    onSubmit() {
        const user = new UserConnection();
        user.username = this.loginForm.value.username;
        user.password = this.loginForm.value.password;
        this.userService.connectUser(user).subscribe(
            success => {},
            error => alert(error)
        );
    }
}
