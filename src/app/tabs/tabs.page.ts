import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  buttonColor1 = "white";
  buttonColor2 = "rgba(189, 189, 189, 0.486)";
  buttonColor3 = "rgba(189, 189, 189, 0.486)";
  buttonColor4 = "rgba(189, 189, 189, 0.486)";

  constructor() { }

  ngOnInit() {
  }

  home(){

    this.buttonColor1 = "white";
    this.buttonColor2 ="rgba(189, 189, 189, 0.486)";
    this.buttonColor3 = "rgba(189, 189, 189, 0.486)";
    this.buttonColor4 = "rgb(189, 189, 189, 0.486)";

  }

  explore(){

    this.buttonColor2 = "white";
    this.buttonColor1 = "rgb(189, 189, 189, 0.486)";
    this.buttonColor3 = "rgb(189, 189, 189, 0.486)";
    this.buttonColor4 = "rgb(189, 189, 189, 0.486)";

  }

  history(){

    this.buttonColor3 = "white";
    this.buttonColor1 = "rgb(189, 189, 189, 0.486)";
    this.buttonColor2 = "rgb(189, 189, 189, 0.486)";
    this.buttonColor4 = "rgb(189, 189, 189, 0.486)";

  }

  profile(){

    this.buttonColor4 = "white";
    this.buttonColor1 = "rgb(189, 189, 189)";
    this.buttonColor2 = "rgb(189, 189, 189)";
    this.buttonColor3 = "rgb(189, 189, 189)";

  }

}
