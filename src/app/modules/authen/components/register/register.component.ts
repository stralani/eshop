import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.authenticationService
        .signup(this.form.value.email, this.form.value.password)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
        });

      // steile ton xristi sto homepage
      this.router.navigate(['/']);
    }
  }
  @Input() error: string | null = '';

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void { }
}
