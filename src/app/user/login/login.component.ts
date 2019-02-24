import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(private chatService: ChatService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  public userLogin(): any{
    let data = {
      email: this.email,
      password: this.password
    }

    console.log(data);
    this.chatService.login(data).subscribe(
      apiResponse => {
        if(apiResponse.status === 200){
        console.log(apiResponse);
        Cookie.set('authToken', apiResponse.data.authToken);
        Cookie.set('receiverId', apiResponse.data.userDetails.userId);
        Cookie.set('receiverName', apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName);
        this.chatService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
        console.log('aim here')
        this.router.navigate(['/chat']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  

}
