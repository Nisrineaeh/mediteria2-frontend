import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) { }

  @ViewChild('navbarCheck') navbarCheck!: ElementRef;

  navigateToModal(): void {
    this.router.navigate(['/deconnexion']);
  }

  get isUserLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // navStyle = {
  //   top: '-80px'
  // };

  // move() {
  //   this.navStyle.top = this.navStyle.top === '-180px' ? '0' : '-180px';
  //   console.log('click')
  // }

  closeMenu(){
    this.navbarCheck.nativeElement.checked = false;
  }

  
}
