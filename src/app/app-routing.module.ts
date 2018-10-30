import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { AuthGuard } from './services/auth.guard';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddGlucoComponent } from './components/add-gluco/add-gluco.component';
import { ViewGlucosComponent } from './components/view-glucos/view-glucos.component';
import { EditGlucoComponent } from './components/edit-gluco/edit-gluco.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new', component: AddGlucoComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ViewGlucosComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditGlucoComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
