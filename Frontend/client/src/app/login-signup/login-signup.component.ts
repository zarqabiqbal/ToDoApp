import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { from } from 'rxjs';
import { HttpService } from '../http.service';


export class Password{
  public user_pass1 :String;
  public user_password : String;
}
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  storage=window.sessionStorage
  login_color = "bg-light";
  signup_color=""
  login = true ;
  error_messege= "";
  email_error_messege = ""
  password_error_messege = ""
  passwordcheck_error_messege = ""
  isLoginDisable = false ;
  isSignUpDisabled = false;
  pass :Password;
  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
  }

  rebootErrorMessegese(){
  this.error_messege= "";
  this.email_error_messege = ""
  this.password_error_messege = ""
  }

  emailValidator(event){
    var email=event.target.value
    if(email==''){
      this.email_error_messege=''
    }
    else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      this.email_error_messege=''
    }
    else{
      this.email_error_messege='Invalid Email'
    }
  }

  passwordValidator(event){
    var pass = event.target.value
    if(pass.length<1 || pass.length >=8){
      this.password_error_messege = ""
    }
    else if(pass.length<8){
      this.password_error_messege = "Password greater than or equal to 8 character"
    }
    else{
      this.password_error_messege=""
    }
  }

  passwordChecker(){
    console.log(this.pass.user_pass1,this.pass.user_password)
    if(this.pass.user_password.length<1){
      this.passwordcheck_error_messege=""
      this.isSignUpDisabled = true
    }
    else if(this.pass.user_password === this.pass.user_pass1){
      this.passwordcheck_error_messege=""
      this.isSignUpDisabled = false
    }
    else{
      this.passwordcheck_error_messege="Password not matched"
      this.isSignUpDisabled = true
      
    }
  }

  switchlogin(mode){
    if(mode=='login'){
      this.rebootErrorMessegese()
      this.login = true  
      this.login_color="bg-light";
      this.signup_color="";
    }
    else if (mode=='signup'){
      this.pass=new Password()
      this.rebootErrorMessegese()
      this.login = false 
      this.login_color="";
      this.signup_color="bg-light";
    }
  }

  onLogin(form:NgForm){
    this.error_messege=''
    this.isLoginDisable=true
    var email = form.value.lemail
    var pass = form.value.lpass
    this.httpService.user_login(email,pass).subscribe(
      data => {
        this.isLoginDisable=false;
        if('error' in data){
          this.error_messege=data['error']
        }
        else{
          this.storage.setItem('fname',data['user_firstname'])
          this.storage.setItem('lname',data['user_lastname'])
          this.storage.setItem('email',data['user_email'])
          this.storage.setItem('userId',data['userId'])
          this.storage.setItem('password',pass)
          this.storage.setItem('isLogIn','true')
        }
        // console.log(data)
      },
      error => {
        this.isLoginDisable=false
      }
    );    
  }
  onSignUp(form:NgForm){
    this.error_messege=''
    this.isSignUpDisabled=true
    let userData = JSON.parse(JSON.stringify(form.value))
    delete userData['user_pass1']
    this.httpService.user_add(userData).subscribe(
      data => {
        this.isSignUpDisabled=false
        if('error' in data){
          this.error_messege=data['error']
        }
        else{
          this.storage.setItem('fname',data['user_firstname'])
          this.storage.setItem('lname',data['user_lastname'])
          this.storage.setItem('email',data['user_email'])
          this.storage.setItem('userId',data['userId'])
          this.storage.setItem('password',userData['user_password'])
          this.storage.setItem('isLogIn','true')
        }
        // console.log(data)
      },
      error => {
        this.isSignUpDisabled=false
      }
    );    
  }
}
