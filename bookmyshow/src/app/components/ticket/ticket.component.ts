import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

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
  Status="Approved";
  a:any;
  searchMovie='';
  activeButton: string | null = null;
  public fullName:string="";
  constructor(private api:ApiService,private auth:AuthService,private userStore:UserStoreService,private http:HttpClient){}
  ngOnInit() {
    
      this.refreshTicket()
     
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
 
  refreshTicket(){
    this.http.get<any>('https://localhost:7039/api/v1.0/moviebooking/tickets/all')
    .subscribe(data=>{
      this.tickets=data;
    })
  }
  
  
  addTicket(){
    this.modalTitle="Add Ticket"
  
    this.MovieName="";
    this.TheatreName="";
    this.NumberOfTicketsBooked=0;
    this.TicketStatus="";
    
    
  }
  
  editTicket(film:any){
    this.modalTitle="Update Ticket"
    this.TicketId=film.TicketId;
    this.MovieName=film.MovieName;
    this.TheatreName=film.TheatreName;
    
    this.NumberOfTicketsBooked=film.NumberOfTicketsBooked;
    this.TicketStatus=film.TicketStatus;
  }
 
  updateTicket(){
    var val={
      TIcketId:this.TicketId,
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      NumberOfTicketsBooked:this.NumberOfTicketsBooked,
    
      TicketStatus:this.TicketStatus };
    this.http.put('https://localhost:7039/api/v1.0/moviebooking/update',val)
    .subscribe(res=>{
      if(this.TicketStatus=="cancelled") {
        alert("You have successfully cancelled the ticket.");
        this.refreshTicket();
      }
      else{
        alert("Ticket has been successuly updated");
        this.refreshTicket();
      }
      this.refreshTicket();
    });
  }
  
  bookTicket(){
    var val={
      MovieName:this.MovieName,
      TheatreName:this.TheatreName,
      NumberOfTicketsBooked:this.NumberOfTicketsBooked,
      TicketStatus:this.TicketStatus
  
    };
    this.http.post('https://localhost:7039/api/v1.0/moviebooking/addTicket',val)
    .subscribe(res=>{
      alert("Ticket has been booked successfully!");
      this.refreshTicket();
    });
  }
  
    deleteTicket(id:any){
      if(confirm('Are you sure?')){
        this.http.delete('https://localhost:7039/api/v1.0/moviebooking/deleteticket/'+id)
        .subscribe(res=>{
          alert("Ticket has been successfully deleted.");
        
          this.refreshTicket();
        });
      }
      }
  logout(){
    this.auth.signOut();
  }
 
}
