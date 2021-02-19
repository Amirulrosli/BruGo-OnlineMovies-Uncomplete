import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  slideOptsFour: any;
  allMovieData: any;

  constructor(
    private afstore: AngularFirestore,
    private router: Router
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

    this.afstore.collection('AllMovie').valueChanges().subscribe(data=> {

      this.allMovieData = data;

    })


  }

  goToSearch(){

    this.router.navigate(["/search"])

  }



}
