import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'secure', component: SecureComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fixtures',
    component: FixturesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fixtures/:id',
    component: FixturesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
