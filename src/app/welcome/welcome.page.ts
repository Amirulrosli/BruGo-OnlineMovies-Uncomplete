import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';
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
  password: any;
 mydata: any;

  constructor( private router: Router,
    private afstore: AngularFirestore,
    private auth: AngularFireAuth,
    private loading: LoadingController,
    private userService: UserService,
    private alert: AlertController
    
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

  showHideLoader(){

    this.loading.create({  
      message: 'loading',  
      duration: 2000  
    }).then((res) => {   
      res.present();  
    res.onDidDismiss().then((dis) => {  
      console.log('Loading dismissed! after four Seconds');  
    });  
  });  

  }

  async Login(){

    this.showHideLoader();
    
    try{
      const email = this.email;
      const password = this.password;
      const res = await this.auth.signInWithEmailAndPassword(email,password)
      .then(async (res)=> {

        this.afstore.doc(`Login/${email}`).valueChanges().subscribe(data=> {
          this.mydata = data;

          if (res.user) {
            this.userService.setUser({
              username: this.mydata.username,
              email: email,
              uid: res.user.uid
            })

            localStorage.setItem('uid',res.user.uid);

          }
          Swal.fire('Login Successful','Welcome Back,'+email,'success')
          
          this.router.navigate(['/tabs/home'])

        },error=> {
          Swal.fire('Login Failed','Invalid Email or Password','error')
          
        })

      
      },error=> {
        console.log(error)
        Swal.fire('Login Failed','Invalid Email or Password','error')
       
        return;
      })
    } catch (error){
      Swal.fire('Login Failed','Invalid Email or Password','error')
   
      return;
      console.log(error)
    }
  }


  
  async showAlert(header:string,message:string){
    const alert = await this.alert.create({

      header,
      message,
      buttons: ["Ok"]


    })


    await alert.present()
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
