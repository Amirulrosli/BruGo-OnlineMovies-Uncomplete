import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.page.html',
  styleUrls: ['./verifyemail.page.scss'],
})
export class VerifyemailPage implements OnInit {

  email: any;
  username: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.email = this.route.snapshot.paramMap.get('email')
    this.username = this.route.snapshot.paramMap.get('username');


  }

  goToLogin(){
    this.router.navigate(['/info/'+this.email])
  }

}
