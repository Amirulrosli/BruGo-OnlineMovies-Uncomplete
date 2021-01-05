import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  slideOptsOne

  constructor( private router: Router) { 
    this.slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: {
        delay:3000
      }
    };
  }

  ngOnInit() {
  }

  sign(){
    this.router.navigate(['/login'])
  }
  register(){
    this.router.navigate(['/register'])
  }

}
