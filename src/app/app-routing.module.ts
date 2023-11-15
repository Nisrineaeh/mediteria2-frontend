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
import { AddMeditationComponent } from './components/add-meditation/add-meditation.component';
import { ModalDeconnexionComponent } from './components/modal-deconnexion/modal-deconnexion.component';
import { ForumDetailsComponent } from './components/forum-details/forum-details.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: "full" },
  {path: 'landing', component: LandingPageComponent},
  {path:'signin', component: SigninComponent},
  {path: 'home', component: AccueilComponent, canActivate:[authGuard]},
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] } ,
  { path: 'forum-detail/:id', component: ForumDetailsComponent, canActivate: [authGuard] } ,
  {path:'login', component: LoginComponent},
  { path: 'medtech', component: MeditationTechniqueComponent, canActivate: [authGuard] },
  { path: 'messaging', component: MessagingComponent, canActivate: [authGuard] },
  { path: 'profil', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'modify', component: ModifyInfosUserComponent, canActivate: [authGuard] },
  { path: 'meditation/:id', component: MeditationDetailsComponent, canActivate: [authGuard] },
  { path: 'add', component: AddMeditationComponent, canActivate: [authGuard] },
  { path: 'deconnexion', component: ModalDeconnexionComponent, canActivate: [authGuard] },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
