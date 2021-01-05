import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

export class Password{
  public newPassword:String;
  public confirmPassword:String;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordModel=new Password();
  error_color='';
  error_text='';
  isSubmitDisable=true;
  isLengthCorrect=false;
  submit='Blocked';
  storage=window.sessionStorage;
  admin_name=this.storage.getItem("email");
  admin_pass=this.storage.getItem("password");

  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
  }

  checkLength(event){
    if(event.target.value==''){
      this.error_text='';
      this.error_color='';
      this.isLengthCorrect=false;
      this.submit="Blocked"
    }
    else if(event.target.value.length<6){
      this.error_text='Password must greater than 6';
      this.error_color='red';
      this.isLengthCorrect=false;
      this.submit='Blocked';
    }
    else{
      this.error_text='';
      this.error_color='';
      this.isLengthCorrect=true;
      this.submit='Blocked';
    }
  }

  checkPass(event){
    if(event.target.value==''){
      this.error_text='';
      this.error_color='';
      this.submit='Blocked';
      this.isSubmitDisable=true;
    }
    else if(event.target.value==this.passwordModel.newPassword){
      this.error_text='Password Matched';
      this.error_color='green'
      this.isSubmitDisable=false;
      this.submit='Submit';
    }
    else{
      this.error_text='Password not Matched';
      this.error_color='red'
      this.submit="Blocked"
      this.isSubmitDisable=true;
    }
  }

  onPassSubmit(form:NgForm){
    this.submit="Wait";
    var newPass=form.value.confirmPassword
    console.log(form.value)
    this.httpService.change_pass(this.admin_name,this.admin_pass,newPass).subscribe(
      data => {
          if('error' in data){
            this.error_text="Wrong Username or Password";
            this.error_color='red';
            this.isSubmitDisable=false;
            this.submit='Submit'
          }
          else if ('success' in data){
            form.resetForm();
            this.submit='Block'
            this.isSubmitDisable=true;
            this.error_text=data["success"];
            this.error_color='green';
            this.storage.setItem("password",newPass)
          }
      },
      error => {
        this.error_text='Error Occured Try Again'
        this.error_color='red'
        this.isSubmitDisable=false;

      }
    );
  }

}
