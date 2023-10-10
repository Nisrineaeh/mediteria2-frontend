import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ForumComponent } from './pages/forum/forum.component';
import { LoginComponent } from './pages/login/login.component';
import { MeditationTechniqueComponent } from './pages/meditation-technique/meditation-technique.component';
import { MessagingComponent } from './pages/messaging/messaging.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ModifyInfosUserComponent } from './components/modify-infos-user/modify-infos-user.component';
import { MeditationDetailsComponent } from './components/meditation-details/meditation-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: "full" },
  {path: 'first', component: LandingPageComponent},
  {path:'signin', component: SigninComponent},
  {path: 'home', component: AccueilComponent},
  {path:'forum', component: ForumComponent},
  {path:'login', component: LoginComponent},
  {path: 'medtech', component: MeditationTechniqueComponent},
  {path: 'messaging', component: MessagingComponent},
  {path: 'profil', component: ProfileComponent},
  {path:'modify', component: ModifyInfosUserComponent},
  {path: 'meditation/:id', component: MeditationDetailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
