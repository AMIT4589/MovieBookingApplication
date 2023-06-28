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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bookmyshow';
  constructor() { }
  
  selectedIndex=0;
  indicators=true;
  controls=true;
  autoSlide=true;
  slideInterval=3000;

  selectImage(index:number):void{
    this.selectedIndex=index;
  }
  

  onPrevClick():void{
    if(this.selectedIndex ===0 ){
      this.selectedIndex = this.images.length-1;
    }else{
      this.selectedIndex--;
    }

  }

  onNextClick():void{
    if(this.selectedIndex === this.images.length-1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }

  }

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

autoSlideImages():void{
  setInterval(() =>{
    this.onNextClick();
  },this.slideInterval);
}

  images:IcarouselImage[] = [
    {
      imgSrc: './assets/images/Pathaan-4.jpg',
      imgAlt: 'vehicle1',
      imgHead: '4077 Boston Rd, The Bronx',
      imgLoc: ', NY 10466, United State',
      imgPrice: 12500000,
      imgInfo: 'A 2018 Audi R8 Spyder with 3000 miles only.The vehicle is well-maintained and well within the warrenty.The vehicle has only benn in single-oownership.'
    },
    {
      imgSrc:'./assets/images/wp4102535.jpg',
      imgAlt: 'vehicle22',
      imgHead: '1010 Cadillac Way, Burlingame',
      imgLoc: ', CA 94010, United States',
      imgPrice: 11000000,
      imgInfo: 'A 2019 Bentley flying spur with mint condition.The vehicle has only 1500 miles on it and is well within the warranty period.The vehicle is only available in certain regions.'
    },
    
    
  ];

}
