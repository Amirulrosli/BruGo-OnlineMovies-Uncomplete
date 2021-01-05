import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  explore: any;

  constructor(
    private afstore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.afstore.collection(`Newest`).valueChanges().subscribe(data=> {
      this.explore = data;
    })
  }


  goToSearch(){

    this.router.navigate(["/search"])

  }

}
