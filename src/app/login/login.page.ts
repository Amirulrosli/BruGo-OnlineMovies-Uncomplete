import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  check: any = false;

  constructor() {
    this.check=false;
   }

  ngOnInit() {
    this.check=false;
  }

  agree(){
    this.check = !this.check;
    console.log(this.check)
  }

  

}
