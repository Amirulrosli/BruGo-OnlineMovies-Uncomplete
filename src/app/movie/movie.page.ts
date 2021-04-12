import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { UserService } from '../user.sevice';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

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
  youVid: SafeResourceUrl;
  newMovies:any;
  uploadedDate:any;
  upDate:any;
  slideOptsThree:any;
  category: any;
  


  constructor(private location: Location,
    private route: ActivatedRoute,
    private afstore: AngularFirestore,
    private domSanitizer: DomSanitizer,
    private streamingmedia: StreamingMedia,
    private router: Router,
    private alert: AlertController,
    private datePipe: DatePipe,
    private user: UserService,
   
    ) {


          this.slideOptsThree = {
      initialSlide: 0,
      slidesPerView: 1.5,
    };

      this.date = new Date();
     }

    // ngOnInit(){

    //  }

  ngOnInit() {


      this.id = this.route.snapshot.paramMap.get('id');

    this.afstore.doc(`AllMovie/${this.id}`).valueChanges().subscribe(data=> {
      console.log(data)
      this.retrieve = data;
      this.title = this.retrieve.title;
      this.description = this.retrieve.description;
      this.genre = this.retrieve.genre;
      this.rate = this.retrieve.rate;
      this.homecover = this.retrieve.homecover;
      this.movie = this.retrieve.movie;
      this.trailer = this.retrieve.trailer;
      this.pagecover = this.retrieve.pagecover;
      this.category = this.retrieve.category;
      try{
        this.upDate = this.retrieve.date;
        this.uploadedDate = this.datePipe.transform(this.date,"yyyy")


      } catch (error){

        this.upDate = "2020";
        this.uploadedDate = "2020";

      }
   
      this.createFrame(this.trailer)


    })

    this.getAllmovies().subscribe(data=> {
      this.newMovies = data;
    })


    console.log(this.trailer)
   

  }

  createFrame(url){
    var target = document.getElementById("iframeParent");
    var newFrame = document.createElement("iframe");
    newFrame.setAttribute("src", url);
    newFrame.height="260";
    newFrame.width="100%";
    newFrame.id="iframeView";
    newFrame.setAttribute("frameBorder", "0");
    if (target !== null) {
      target.appendChild(newFrame);
    }
  }

  goToHome(){
    this.location.back()
  }

  play(){

    console.log(this.movie)
    try{

      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { this.showAlert("Error:",e) },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: true,
      };
  
  
      this.streamingmedia.playVideo(this.movie,options);

    } catch (error){
      this.showAlert("Error:",error)
    }
 
    

  }

  getAllmovies(){
    return this.afstore.collection('Newest').valueChanges();
  }

  sanitize(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
  }

  back(){
    var target = document.getElementById("iframeParent");
    // if (target !==null){
    //   target.remove();
    // }

    this.location.back()

    
  }

  async showAlert(header:string, message:string){
    const alert = await this.alert.create({

      header,
      message,
      buttons: ["Ok"]

    })

    await alert.present()
    

  }


  goToMovie(){

    this.router.navigate(['/movie-post/'+this.id])

  }


  
  goToSearch(){
    this.router.navigate(['/search'])
  }

  addToLibrary(){

    const title = this.title
    const description = this.description
    const genre = this.genre
    const rate = this.rate
    const homecover = this.homecover
    const movie = this.movie
    const trailer = this.trailer
    const pagecover = this.pagecover
    const category = this.category
    const id = this.id
    const uid = this.user.getUID();

    try{
      this.afstore.doc(`library/${uid}/store/${id}`).set({
        title,
        description,
        genre,
        rate,
        homecover,
        movie,
        trailer,
        pagecover,
        category,
        id,
        uid
      }).then(resp=> {
        Swal.fire('Added to the Library','Successfully added to the library','info')
      })
    } catch (error) {

      console.log(error)

      Swal.fire('Unsuccessful process','please check and try again','error')

    }
  }


}
