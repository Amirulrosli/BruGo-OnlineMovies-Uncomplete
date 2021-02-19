import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.sevice'

import { AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'

@Injectable()
export class AuthService implements CanActivate {
    
    userData:any

   
 

    constructor(private router: Router, 
        private ngFireAuth: AngularFireAuth,
        private user: UserService,
        private alert: AlertController,
        private afstore: AngularFirestore
        ){

          var auth = firebase.auth();
           
            this.ngFireAuth.authState.subscribe(user => {
                if (user) {
                  this.userData = user;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user'));
                } else {
                  localStorage.setItem('user', JSON.stringify(false));
                  JSON.parse(localStorage.getItem('user'));
                }
              })


        }

        async showAlert(header:string,message:string){
            const alert = await this.alert.create({
        
              header,
              message,
              buttons: ["Ok"]
        
        
            })
        
        
            await alert.present()
          }

    async canActivate(route){
        if (await this.user.isAuthenticated()){
            return true
        }

        this.router.navigate(['/login'])
        return false
    }



    // SendVerificationMail() {
    //     return this.ngFireAuth.currentUser.sendEmailVerification()
    //     .then(() => {
    //       this.router.navigate(['verifyemail']);
    //     })
    //   }

    
    // get isLoggedIn(): boolean {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     return (user !== null && user.emailVerified !== false) ? true : false;
    // }


    // get isEmailVerified(): boolean {
    //     const users = JSON.parse(localStorage.getItem('user'));
    //     let verified = (users.emailVerified !== false)? true: false;
       
    //     return verified;
    // }

    // PasswordRecover(passwordResetEmail) {
    //     return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    //     .then(() => {
    //       this.showAlert("Password reset email has been sent", "please check your inbox.");
    //     }).catch((error) => {
    //       this.showAlert("Please Try Again!", error)
    //     })  
    //   }

    // DeleteAcc(){
    //   return this.ngFireAuth.auth.currentUser.delete()
    //   .then(()=>{
    //     localStorage.removeItem('uid')
    //     localStorage.removeItem('user')
    //     this.router.navigate(['/login']);
    //   }).catch((error)=> {
    //     console.log(error);
    //   })
    // }

    // SignOut() {
    //     return this.ngFireAuth.auth.signOut().then(() => {
    //         localStorage.removeItem('uid')
    //         localStorage.removeItem('user')
    //         this.router.navigate(['/welcome'])
            
    //     })
    // }
}