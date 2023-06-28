import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup; 

  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private userStore:UserStoreService,private resetService:ResetPasswordService) {}
ngOnInit(): void {
  this.loginForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });
    
}
hideShowPass(){
this.isText=!this.isText;
this.isText ?this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash";
this.isText ?this.type="text" :this.type="password";
}
onLogin(){
  if(this.loginForm.valid){
console.log(this.loginForm.value)
this.auth.login(this.loginForm.value)
.subscribe({
    next:(res)=>{
      alert(res.message);
      this.loginForm.reset();
      this.auth.storeToken(res.token);
      const tokenPayload=this.auth.decodedToken();
      this.userStore.setFullNameForStore(tokenPayload.name);
      this.userStore.setRoleForStore(tokenPayload.role);
      this.router.navigate(['dashboard'])
    },
    error:(err)=>{
        alert(err?.error.message)
    }
})
  }
  else{
//console.log("Form is not vaild");
this.validateAllFormFields(this.loginForm);
alert("Your form is invalid")
  }
}
private validateAllFormFields(formGroup:FormGroup){
  Object.keys (formGroup.controls).forEach(field=>{
    const control=formGroup.get(field);
    if(control instanceof FormControl){
      control?.markAsDirty({onlySelf:true});
    }
    else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
    }
  })
}
checkValiedEmail(event:string){
  const value=event;
  const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail=pattern.test(value);
  return this.isValidEmail;

}
confirmToSend(){
  if(this.checkValiedEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
   
    this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
    .subscribe({
      next:(res)=>{
        this.resetPasswordEmail="";
        const closeButton=document.getElementById("close");
        closeButton?.click();
      },
      error:(err)=>{

      }
    })
  }
}
}
