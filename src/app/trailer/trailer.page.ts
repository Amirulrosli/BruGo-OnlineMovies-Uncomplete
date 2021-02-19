import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.page.html',
  styleUrls: ['./trailer.page.scss'],
})
export class TrailerPage implements OnInit {

  id: any;
  next: any;
  previous: any;
  trailer: any;
  data:any;
  title:any;
  target: any;
  newFrame:any;


  constructor(private afstore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
    ) { 

    }

  ngOnInit(){

  }

  ionViewDidEnter() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.next = parseInt(this.id) + 1;
    this.previous = parseInt(this.id) - 1;
    console.log(this.next)

    this.afstore.doc(`AllMovie/${this.id}`).valueChanges().subscribe(data=> {
      try{

         this.data= data;

        if (this.data == undefined) {
          this.router.navigate(['/tabs/home'])
          return;
        }
        console.log(data)
        this.trailer = this.data.trailer+"?autoplay=1";
        this.title = this.data.title;
        console.log(this.trailer)

      }catch(error){
        console.log(error)
      }
     
      // this.createFrame(this.trailer)
    })




  }

  goForward(id){

    this.router.navigate(['/trailer/'+id])
    // window.location.href="/trailer/"+id;
  }

  goBackward(id){
    this.router.navigate(['/trailer/'+id])
  }


  sanitize(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
  }


  createFrame(url){
    console.log("haha")

  this.target = document.getElementById("iframeParent");
  this.newFrame = document.createElement("iframe");
    
    this.newFrame.setAttribute("src", url);
    this.newFrame.height="260";
    this.newFrame.width="100%";
    this.newFrame.setAttribute("allow","autoplay");
    this.newFrame.id="iframeView";
    this.newFrame.setAttribute("frameBorder", "0");
    this.target.appendChild(this.newFrame);
    
  }


  gotoHome(){
    this.router.navigate(['/tabs/home'])
  }

}
