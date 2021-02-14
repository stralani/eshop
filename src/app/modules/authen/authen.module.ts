import { NgModule } from '@angular/core';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  imports: [MaterialModule, ReactiveFormsModule, AngularFireAuthModule,],
  providers: [AuthenticationService],
  declarations: [MenuTopComponent, LoginComponent, RegisterComponent,],
  exports: [],
  bootstrap: []
})
export class AuthenModule { }
