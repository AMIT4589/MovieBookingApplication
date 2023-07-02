import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users:any=[];
  public ticketsAll:any=[];
  public role!:string;
  movies:any=[];
  tickets:any=[];
  TicketId="";
  modalTitle="";
  MovieName="";
  TheatreName="";
  TicketStatus="Approved"
  TotalTicketsAlloted=0;
  NumberOfTicketsBooked=0;
  Status="Available";
  a:any;
  searchMovie='';
  activeButton: string | null = null;
  public fullName:string="";
  constructor(private api:ApiService,private auth:AuthService,private userStore:UserStoreService,private http:HttpClient){}
  ngOnInit() {
    this.refreshMovie()
      this.api.getUsers()
      .subscribe(res=>{
        this.users=res;
      });
      this.refreshMovie()
     
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
  refreshMovie(){
    this.http.get<any>('https://localhost:7039/api/v1.0/moviebooking/all')
    .subscribe(data=>{
      this.movies=data;
    })
  }
 
  addMovie(){
    this.modalTitle="Add Movie"
  
    this.MovieName="";
    this.TheatreName="";
    this.TotalTicketsAlloted=0;
    
  }

  editMovie(film:any){
    this.modalTitle="Update Movie"
    this.MovieName=film.MovieName;
    this.TheatreName=film.TheatreName;
    this.TotalTicketsAlloted=film.TotalTicketsAlloted;
    this.Status=film.Status;
  }
  
  updateMovie(){
    var val={
        
        MovieName:this.MovieName,
        TheatreName:this.TheatreName,
        TotalTicketsAlloted:this.TotalTicketsAlloted,
        Status:this.Status };
    this.http.put('https://localhost:7039/api/v1.0/moviebooking/updatemoviebyadmin',val)
    .subscribe(res=>{
      alert("Movie has been successfully updated!");
      this.refreshMovie();
    });
  }
 
  createMovie(){
    var val={
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      TotalTicketsAlloted:this.TotalTicketsAlloted
  
    };
    this.http.post('https://localhost:7039/api/v1.0/moviebooking/add',val)
    .subscribe(res=>{
      this.refreshMovie(); 
      alert("Movie has been successfully added!");
     
    });
  }
  
  deleteMovie(id:any){
    if(confirm('Are you sure?')){
      this.http.delete('https://localhost:7039/api/v1.0/moviebooking/delete/'+id)
      .subscribe(res=>{
        alert("Movie has been deleted successfully.");
      
        this.refreshMovie();
       
      });
   
    }
  
    }
 
  logout(){
    this.auth.signOut();
  }
  

}
