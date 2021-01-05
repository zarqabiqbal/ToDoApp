import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  storage = window.sessionStorage

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    this.storage.setItem('fname','')
          this.storage.setItem('lname','')
          this.storage.setItem('email','')
          this.storage.setItem('age','')
          this.storage.setItem('userId','')
          this.storage.setItem('password','')
          this.storage.setItem('isLogIn','false')
  }

}
