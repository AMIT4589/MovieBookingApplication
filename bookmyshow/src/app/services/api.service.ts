import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{
  private baseUrl:string='https://localhost:7039/api/User/'
 
  constructor(private http:HttpClient) {}
   
  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
   
   ngOnInit(): void {
      
   }
}
