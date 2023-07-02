import { Component, OnInit } from '@angular/core';
interface IcarouselImage {
  imgSrc:string;
  imgAlt:string;
  imgHead: string;
  imgLoc: string;
  imgInfo: string;
  imgPrice: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{



 

  ngOnInit(): void {
   
  }



  

}
