import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.sevice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileName: String
  userName: String

  constructor(
    private user: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.profileName = this.user.getUsername();
    this.userName = this.user.getEmail();




  }

  signOut(){
    this.auth.SignOut();
  }

}
