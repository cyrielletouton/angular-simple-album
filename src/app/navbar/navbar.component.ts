import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Valeur qui va être modifiée par la suite, via le subscriber de currentUserSubject
  public currentUser: User | null = null;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue)

    this.authenticationService.currentUserSubject.subscribe((user: User |null) => {
      console.log('cuurentUserSubject subscriber receives value : ', user)
      this.currentUser = user;
    })
  }

  logout(){
    this.authenticationService.logout();
  }
}
