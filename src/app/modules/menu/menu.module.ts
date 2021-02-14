import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-ui.module';
import { NgModule } from '@angular/core';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  imports: [
    MaterialModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  declarations: [MenuTopComponent, HomeComponent, AboutComponent],
  exports: [MenuTopComponent],
  bootstrap: []
})
export class MenuModule { }
