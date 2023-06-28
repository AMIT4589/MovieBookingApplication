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
    this.refreshList()
      this.api.getUsers()
      .subscribe(res=>{
        this.users=res;
      });
      this.refreshList2()
     
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
  refreshList2(){
    this.http.get<any>('https://localhost:7039/api/v1.0/moviebooking/tickets/all')
    .subscribe(data=>{
      this.tickets=data;
    })
  }
  
  addClick(){
    this.modalTitle="Add Movie"
  
    this.MovieName="";
    this.TheatreName="";
    this.TotalTicketsAlloted=0;
    
  }
  addClick2(){
    this.modalTitle="Add Ticket"
  
    this.MovieName="";
    this.TheatreName="";
    this.NumberOfTicketsBooked=0;
    this.TicketStatus="";
    
  }
  editClick(film:any){
    this.modalTitle="Update Movie"
    this.MovieName=film.MovieName;
    this.TheatreName=film.TheatreName;
    this.TotalTicketsAlloted=film.TotalTicketsAlloted;
    this.Status=film.Status;
  }
  editClick2(film:any){
    this.modalTitle="Update Ticket"
    this.TicketId=film.TicketId;
    this.MovieName=film.MovieName;
    this.TheatreName=film.TheatreName;
    
    this.NumberOfTicketsBooked=film.NumberOfTicketsBooked;
    this.TicketStatus=film.TicketStatus;
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
  updateClick2(){
    var val={
      TIcketId:this.TicketId,
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      NumberOfTicketsBooked:this.NumberOfTicketsBooked,
    
      TicketStatus:this.TicketStatus };
    this.http.put('https://localhost:7039/api/v1.0/moviebooking/update',val)
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
  createClick2(){
    var val={
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      NumberOfTicketsBooked:this.NumberOfTicketsBooked,
      TicketStatus:this.TicketStatus
  
    };
    this.http.post('https://localhost:7039/api/v1.0/moviebooking/addTicket',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList2();
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
 
    deleteClick2(id:any){
      if(confirm('Are you sure?')){
        this.http.delete('https://localhost:7039/api/v1.0/moviebooking/deleteticket/'+id)
        .subscribe(res=>{
          alert(res.toString());
        
          this.refreshList2();
        });
      }
      }
  logout(){
    this.auth.signOut();
  }
  handleButtonClick(buttonName: string) {
    this.activeButton = buttonName;
  }

}
