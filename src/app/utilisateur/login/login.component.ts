import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UserConnection } from 'src/app/shared/userConnection';

import { UserService } from 'src/app/shared/service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      const token = params['token'];
      const error = params['error'];
      if(token) {
        localStorage.setItem('token', token);
        this.userService.updateUser();
        this.router.navigate(['/']);
      } else if (error) {
        localStorage.removeItem('token');
        this.userService.updateUser();
        this.error=true;
      }
    });
  }

  onSubmit() {
    const user = new UserConnection();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    this.userService.connectUser(user).subscribe(
        token => {
          this.error=false;
          localStorage.setItem('token', token.value);
          this.userService.updateUser();
          if(this.route.snapshot.queryParams.returnUrl) {
              this.router.navigate([this.route.snapshot.queryParams.returnUrl]);
          }else {
              this.router.navigate(['/']);
          }
        },
        (error : HttpErrorResponse) => {
          this.error=true;
        }
    );
  }
}
