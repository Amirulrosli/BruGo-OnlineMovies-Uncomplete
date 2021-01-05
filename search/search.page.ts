import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  items: any;
  datas:any;
  list: boolean=false

  constructor(
    private location: Location,
    private afstore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {

    this.getAllMovie().subscribe(data=> {
      this.items = data;
      this.datas = data;
      console.log(data)
    })

  }

  getAllMovie(){
    return this.afstore.collection('AllMovie').valueChanges();
  }

  Back(){
    this.router.navigate(['tabs/home'])
  }

  initializeItems(): void {
  
    this.items = this.datas;  // category & location
  }

  filterList(evt){

    this.list = true;
    this.initializeItems();
    this.list = true;

    const searchTerm = evt.srcElement.value;

    if (!searchTerm){
      this.list = false;
      return;
    }

    this.items = this.items.filter(currentData=> {
      if (currentData.title && searchTerm) {
        if(currentData.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
  
          return true;
        }
  
        return false
        
      }
    })



  }

}
