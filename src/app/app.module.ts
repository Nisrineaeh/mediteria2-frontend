import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForumComponent } from './pages/forum/forum.component';
import { MeditationTechniqueComponent } from './pages/meditation-technique/meditation-technique.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessagingComponent } from './pages/messaging/messaging.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ArticleComponent } from './components/article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ScreenComponent } from './components/screen/screen.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ModifyInfosUserComponent } from './components/modify-infos-user/modify-infos-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminMeditationComponent } from './components/admin-meditation/admin-meditation.component';
import { MeditationDetailsComponent } from './components/meditation-details/meditation-details.component';
import { AddMeditationComponent } from './components/add-meditation/add-meditation.component';
import { MyTechComponent } from './components/my-tech/my-tech.component';
import { HeartComponent } from './components/heart/heart.component';
import { MyFavoriteComponent } from './components/my-favorite/my-favorite.component';
import { ModalDeconnexionComponent } from './components/modal-deconnexion/modal-deconnexion.component';
import { SocketIoModule } from 'ngx-socket-io';
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { ForumDetailsComponent } from './components/forum-details/forum-details.component';
import { LegalMentionsComponent } from './pages/legal-mentions/legal-mentions.component';
import { AuthInterceptor } from './auth.interceptor';
import { FavoritesComponent } from './pages/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProfileComponent,
    ForumComponent,
    MeditationTechniqueComponent,
    LoginComponent,
    SigninComponent,
    NotFoundComponent,
    MessagingComponent,
    NavBarComponent,
    FooterBarComponent,
    AccueilComponent,
    ArticleComponent,
    ScreenComponent,
    UserProfileComponent,
    ModifyInfosUserComponent,
    AdminMeditationComponent,
    MeditationDetailsComponent,
    AddMeditationComponent,
    MyTechComponent,
    HeartComponent,
    MyFavoriteComponent,
    ModalDeconnexionComponent,
    ChatModalComponent,
    ForumListComponent,
    ForumDetailsComponent,
    LegalMentionsComponent,
    FavoritesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
