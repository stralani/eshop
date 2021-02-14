import { AdminModule } from './modules/admin/admin.module';
import { ItemsModule } from './modules/items/items.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-ui.module';
import { MenuModule } from './modules/menu/menu.module';
import { AuthenModule } from './modules/authen/authen.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AdminModule,
    ItemsModule,
    MenuModule,
    AuthenModule,
    MaterialModule,
    ReactiveFormsModule,
    ShoppingCartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
