import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){

  }
  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ?this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash";
    this.isText ?this.type="text" :this.type="password";
    }
  onSignUp(){
    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signUpForm.reset();
          //routing to another component
          this.router.navigate( ['login'])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
      

    }
    else{
      this.validateAllFormFields(this.signUpForm)
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
}
