import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../user.sevice';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  slideOptsFour: any;
  allMovieData: any;
  uid: any;
  libraryMovie: any = [];
  

  constructor(
    private afstore: AngularFirestore,
    private router: Router,
    private user: UserService
  ) { 


    this.slideOptsFour = {
      initialSlide: 0,
      slidesPerView: 3.25,
      autoplay: {
        delay:5000
      }
    };
  }

  ngOnInit() {
    this.libraryMovie = [];

    this.afstore.collection('AllMovie').valueChanges().subscribe(data=> {

      this.allMovieData = data;

    })

    // this.uid = this.user.getUID();
  
    this.uid = localStorage.getItem('uid')
    console.log(this.uid)

    this.afstore.collection(`library/${this.uid}/store`).valueChanges().subscribe(data=> {
      this.libraryMovie = data;
      console.log(data)
    })


  }

  goToSearch(){

    this.router.navigate(["/search"])

  }



}
