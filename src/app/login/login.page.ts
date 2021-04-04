import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
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
    private alert: AlertController,
    private loadingCtrl: LoadingController
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

  showHideLoader(){

    this.loadingCtrl.create({  
      message: 'loading',  
      duration: 2000  
    }).then((res) => {   
      res.present();  
    res.onDidDismiss().then((dis) => {  
      console.log('Loading dismissed! after four Seconds');  
    });  
  });  

  }

  signup(){

    this.showHideLoader();

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
              uid: res.user.uid
            })

            this.afstore.doc(`user/${res.user.uid}`).set({
              username,
              email,
              uid: res.user.uid
            })

            this.afstore.doc(`profiles/${res.user.uid}`).set({
              username,
              email,
              uid: res.user.uid

            })

            this.afstore.doc(`watchlist/${res.user.uid}`).set({
              username,
              email,
              uid: res.user.uid
            })
            .then(data=> {
              Swal.fire('Registration Completed','Please verify your email address before proceed','success')
              this.auth.SendVerificationMail();
              this.router.navigate(['/verifyemail/'+email+"/"+username])
              return;
            })
          } catch (error){
            Swal.fire('Registration Failed','Please Check and try again','error')
            console.log(error)
          }
        }
      },error=> {
        Swal.fire('Registration Failed','Please Check and try again','error')
        console.log(error)
      })

    } else {
      Swal.fire('Registration Failed','Please Check and try again','error')
      

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
