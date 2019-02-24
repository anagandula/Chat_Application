import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ChatService } from 'src/app/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public email: any;
  public mobile: any;
  public password: any;
  public apiKey: any;

  constructor(private chatService: ChatService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  public goToSignIn(): any{
    this.router.navigate(['/']);
  }

  public chatRegister(): any{
    
    console.log("i am here")
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobile,
      email: this.email,
      password: this.password,
      apiKey: this.apiKey
    }
    console.log(data)
    this.chatService.signUpFunction(data).subscribe(
      data => {
        console.log(data)
        if(data.status === 200){
          this.toastr.success('SignUp Successful! Please login to Begin');
          setTimeout(()=> {
            this.goToSignIn();
          },2000)
        }
        else{
          this.toastr.error(data.message);
        }
      },
      err => {
        this.toastr.error('some error occured', err);
      }
    );
  }

}
