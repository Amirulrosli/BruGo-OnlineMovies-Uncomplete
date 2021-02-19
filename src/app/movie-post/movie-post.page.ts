import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-movie-post',
  templateUrl: './movie-post.page.html',
  styleUrls: ['./movie-post.page.scss'],
})
export class MoviePostPage implements OnInit {

  id: any;
  title: any;
  description: any;
  genre: any;
  rate: any;
  release: any;
  date: any;
  homecover: any;
  movie: any;
  trailer: any;
  pagecover: any;
  retrieve: any;
  upDate:any;
  uploadedDate:any;
  recommend:any;
  slideOptsFour:any;

  constructor(
    private afstore: AngularFirestore,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private domSanitizer: DomSanitizer,
    private location: Location,
    private router: Router,
    private statusbar: StatusBar
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
      this.recommend = data;
      console.log(this.recommend)
    })

    this.id = this.route.snapshot.paramMap.get('id');

    
    this.afstore.doc(`AllMovie/${this.id}`).valueChanges().subscribe(data=> {
      this.retrieve = data;
      this.title = this.retrieve.title;
      this.description = this.retrieve.description;
      this.genre = this.retrieve.genre;
      this.rate = this.retrieve.rate;
      this.homecover = this.retrieve.homecover;
      this.movie = this.retrieve.movie;
      this.trailer = this.retrieve.trailer;
      this.pagecover = this.retrieve.pagecover;
      try{
        this.upDate = this.retrieve.date;
        this.uploadedDate = this.datePipe.transform(this.date,"yyyy")


      } catch (error){

        this.upDate = "2020";
        this.uploadedDate = "2020";

      }

    })

    
  }


  sanitize(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
  }




  back(){
    this.location.back();
  }

  goToPost(id){

    var target = document.getElementById("myVid");
    
    this.router.navigate(['/movie/'+id])
  }




}
