import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any=[];
  public disconnectedSocket: boolean;

  constructor( private chatService: ChatService,
               private socketService: SocketService,
               private router: Router) {
                 this.receiverId = Cookie.get('receiverId');
                 this.receiverName = Cookie.get('receiverName');
                }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    console.log(this.authToken);
    this.userInfo = this.chatService.getUserInfoFromLocalStorage();
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
    console.log('rec id'+this.receiverId+ 'and' + 'recname'+this.receiverName);
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
  }

  public checkStatus = () =>{
    console.log(Cookie.get('authToken'));
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }

  public verifyUserConfirmation = () => {
    this.socketService.verifyUser().subscribe((data) => {
      this.disconnectedSocket = false;
      this.socketService.setUser(this.authToken);
      this.getOnlineUserList();
    })
  }

  public getOnlineUserList = () => {
    this.socketService.onLineUserList().subscribe((userlist) => {
      this.userList = [];
      for(let x in userlist){
        let temp = { 'userId': x, 'name': userlist[x], 'unread': 0, 'chatting': false};
        this.userList.push(temp);
      }
    })
  }

}
