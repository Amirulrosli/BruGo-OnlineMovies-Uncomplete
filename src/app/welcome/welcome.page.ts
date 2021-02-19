import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../user.sevice';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  slideOptsOne
  username: any;
  email: any;

  constructor( private router: Router,
    private afstore: AngularFirestore,
    private auth: AngularFireAuth,
    private loading: LoadingController,
    private userService: UserService
    ) { 
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

  async openLoader() {
    const loading = await this.loading.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }

  async closeLoading() {
    return await this.loading.dismiss();
  }

  goToSignup(){
    this.router.navigate(['/login'])
  }
  register(){
    this.router.navigate(['/register'])
  }

  Anonymous(){
    this.openLoader();
    
    return new Promise<any>((resolve,reject)=> {
      this.auth.signInAnonymously().then((data)=> {
        resolve(data)

        var number = (Math.random()*1000);
        var random = (Math.ceil(number))
        console.log(random)
        this.username = "guest"+random;
        const username = this.username;
        this.email = "guest"+random+"@guest.com";
        const email = this.email;

        this.userService.setUser({
          username,
          uid: data.user.uid,
          email: email

        })
        this.afstore.doc(`anonymous/${data.user.uid}`).set({
          uid: data.user.uid,
          name: this.username,
          email: this.email
        }).then(res=> {
          console.log("login true")
          this.router.navigate(['/tabs/home'])
        })

        
      }).catch(error=> {
        const errorCode = error.message
        reject(`login failed ${error.message}`)
        this.closeLoading();
      }).then(data=> {
        this.closeLoading();
        console.log(data)
      })
    })
    

  }


   

}
