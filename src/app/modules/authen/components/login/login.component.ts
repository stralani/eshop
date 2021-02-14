import { AuthenticationService } from './../../services/authentication.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  route: any;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.authenticationService.firebaseLogin(this.form.value.username, this.form.value.password)
        .then(user => {
          console.log("LOGGED IN! User is admin : " + user.isAdmin);
          localStorage.setItem('user', JSON.stringify(user));
          // steile ton sto homepage
          this.router.navigate(['/']);

        }).catch(err => {
          console.log("Wrong credentials");
          // kati pige strava, deikse minima lathous gia tous kwdikous pou evale
          this.error = "ΔΕΝ ΥΠΑΡΧΕΙ ΤΕΤΟΙΟ username";
        })
    }
  }
  @Input() error: string | null = "";

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }

}
