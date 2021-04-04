
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) content: IonContent
  toolbar_color: string
  slideOptsOne: any;
  slideOptstwo: any;
  slideOptsFour: any;
  newest: any;
  newMovie:any;
  movies: any;
  moviesData:any;
  contents="NEW RELEASE";
  move="MOVIES";
  series="SERIES";
  cartoons="CARTOONS";
  release="NEW RELEASE";
  allMovie: any;
  allMovieData:any;
  premier: any;
  premierData: any;
  slideOptsThree: any;
  @ViewChild(IonContent)
  scrollContent:IonContent;


  constructor(
    private router: Router,
    private afstore: AngularFirestore,
    private ref: ChangeDetectorRef
  ) {

    this.toolbar_color = "#fff";

    this.slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: {
        delay:5000
      }
    };

    this.slideOptstwo = {
      initialSlide: 0,
      slidesPerView: 1.5,
      speed: 2000,
    };

    this.slideOptsThree = {
      initialSlide: 0,
      slidesPerView: 3.15,
      speed: 2000,
    };

    this.slideOptsFour = {
      initialSlide: 0,
      slidesPerView: 3.25,
      autoplay: {
        delay:5000
      }
    };


  }

  changeColor(){
    this.toolbar_color="#000"
    this.ref.detectChanges();
  }

  ionViewDidLoad(){

    this.content.ionScrollEnd.subscribe(()=> {
      this.changeColor();
    })
  }


  ngOnInit(){

    this.newest = this.afstore.collection(`Newest`).valueChanges().subscribe(data=> {
      this.newMovie = data;
    })

    this.movies = this.afstore.collection('Movies').valueChanges().subscribe(data=> {
      this.moviesData = data;
    })

    this.allMovie = this.afstore.collection('AllMovie').valueChanges().subscribe(data=> {
      this.allMovieData = data;
    })
    
    this.premier = this.afstore.collection('Premiere').valueChanges().subscribe(data=> {
      this.premierData = data;
    })

  //   if (this.scrollContent){
  //   this.scrollContent.ionScrollStart.subscribe(data=> {
  //     console.log("ionic scroll")
  //   });

  // }
    
  }



  tabs(change){
    this.contents = change;
  }

  goToSearch(){
    this.router.navigate(['/search'])
  }


  goToMovie(){

    this.router.navigate(['/movie'])

  }

  gotoTrailer(id){
    this.router.navigate(['trailer/'+id])
  }

  onScroll(evt){
    console.log("scrolling")
  }

}
