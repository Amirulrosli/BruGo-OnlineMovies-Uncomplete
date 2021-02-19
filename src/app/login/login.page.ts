import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { UserService } from '../user.sevice';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  check: any = false;
  username: any;
  password: any;
  email:any;
  myUID: any

  constructor(private router: Router,
    private user: UserService,
    private auth: AuthService,
    private afstore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alert: AlertController
    ) {
    this.check=false;
   }

  ngOnInit() {
    this.check=false;
  }

  agree(){
    this.check = !this.check;
    console.log(this.check)
  }

  goToLogin(){
    this.router.navigate(['/welcome'])
  }

  signup(){

    if (this.check == true){

      const email = this.email;
      const username = this.username;
      const password = this.password;

      this.afstore.firestore.doc(`Login/${this.email}`).get().then(async doc=> {
        if (doc.exists){
          this.showAlert("Email is existed","Please try with a different email")
          return;
        }

        else {

          try{

            const res = await this.afAuth.createUserWithEmailAndPassword(email,password)
            this.myUID = res.user.uid;

            this.afstore.doc(`Login/${email}`).set({
              username,
              email,
            })

            this.afstore.doc(`user/${res.user.uid}`).set({
              username,
              email
            })

            this.afstore.doc(`profiles/${res.user.uid}`).set({
              username,
              email
            })
            .then(data=> {
              this.showAlert("Registration Completed","You may login into your account")
              this.router.navigate(['/welcome'])
              return;
            })
          } catch (error){
            console.log(error)
          }
        }
      },error=> {
        console.log(error)
      })

    } else {

      this.showAlert("Signup Failed","Please Try Again!")
      

    }
  }


  async showAlert(header:string, message:string){
    const alert = await this.alert.create({

      header,
      message,
      buttons: ["Ok"]

    })

    await alert.present()
    

  }

  

}
