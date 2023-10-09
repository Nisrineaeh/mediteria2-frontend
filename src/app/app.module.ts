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
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ChatComponent } from './components/chat/chat.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ArticleComponent } from './components/article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ScreenComponent } from './components/screen/screen.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

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
    FavoriteComponent,
    ChatComponent,
    AccueilComponent,
    ArticleComponent,
    ScreenComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
