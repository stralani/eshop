import { HomeComponent } from './modules/menu/components/home/home.component';
import { AuthenticationService } from './modules/authen/services/authentication.service';
import { ShoppingCartComponent } from './modules/shopping-cart/shopping-cart.component';
import { AdminGuard } from './admin.guard';
import { AdminItemsComponent } from './modules/admin/components/admin-items/admin-items.component';
import { RegisterComponent } from './modules/authen/components/register/register.component';
import { AboutComponent } from './modules/menu/components/about/about.component';
import { LoginComponent } from './modules/authen/components/login/login.component';
import { ItemsComponent } from './modules/items/components/items/items.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent},
  { path: 'about', component: AboutComponent },
  { path: 'admin-items', component: AdminItemsComponent, canActivate: [AdminGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
