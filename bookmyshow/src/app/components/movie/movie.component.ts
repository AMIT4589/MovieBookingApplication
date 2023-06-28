import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  public users:any=[];
  public role!:string;
  movies:any=[];

  modalTitle="";
  MovieName="";
  TheatreName="";
  TotalTicketsAlloted=0;
  NumberOfTicketsBooked=0;
  Status="Available";
  a:any;
  public fullName:string="";
  constructor(private api:ApiService,private auth:AuthService,private userStore:UserStoreService,private http:HttpClient){}
  ngOnInit() {
    this.refreshList()
      this.api.getUsers()
      .subscribe(res=>{
        this.users=res;
      });
      this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFromToken();
        this.fullName=val||fullNameFromToken
      });
      this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }
  refreshList(){
    this.http.get<any>('https://localhost:7039/api/v1.0/moviebooking/all')
    .subscribe(data=>{
      this.movies=data;
    })
  }
  addClick(){
    this.modalTitle="Add Movie"
  
    this.MovieName="";
    this.TheatreName="";
    this.TotalTicketsAlloted=0;
    
  }
  editClick(film:any){
    this.modalTitle="Update Movie"
    this.MovieName=film.MovieName;
    this.TheatreName=film.TheatreName;
    this.TotalTicketsAlloted=film.TotalTicketsAlloted;
    this.Status=film.Status;
  }
  updateClick(){
    var val={
        MovieName:this.MovieName,
        TheatreName:this.TheatreName,
        TotalTicketsAlloted:this.TotalTicketsAlloted,
        Status:this.Status };
    this.http.put('https://localhost:7039/api/v1.0/moviebooking/updatemoviebyadmin',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }
  createClick(){
    var val={
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      TotalTicketsAlloted:this.TotalTicketsAlloted
  
    };
    this.http.post('https://localhost:7039/api/v1.0/moviebooking/add',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }
  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete('https://localhost:7039/api/v1.0/moviebooking/delete/'+id)
      .subscribe(res=>{
        alert(res.toString());
      
        this.refreshList();
      });
    }
    }
  
  
  logout(){
    this.auth.signOut();
  }
}
