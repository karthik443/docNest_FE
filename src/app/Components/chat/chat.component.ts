import { Component, OnInit, Input } from '@angular/core';
import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
   public userName!:string;
  public userId:any;
  public user:any;
  public recipientId:any;
  public reciptantName!:string;
constructor(private route: ActivatedRoute) {}
  messageToSend: string = '';
  messages: Array<{ sentBy: string, message: string, time: string }> = [];
  socket: any;

  ngOnInit(): void {
    this.socket = io('http://localhost:9000');
    this.user = localStorage.getItem('User')
    this.user= JSON.parse(this.user)
    this.socket.emit('register', this.user._id); // Change to your backend URL
this.route.params.subscribe(params => {
      this.recipientId = params['id'];
      this.reciptantName = params['name'];
    });
    // Listen for incoming chat messages
    this.socket.on('chatMessage', (data: { 'sentBy': string, 'message': string, 'time': string }) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    const messageData = {
      userId:this.user._id,
      userName:this.user.userName,
      message: this.messageToSend,
      'recipientId': this.recipientId,
      time: new Date().toLocaleTimeString(),
    };
    // alert(JSON.stringify(messageData))
   
    // Emit the chat message to the server
    this.socket.emit('chatMessage', messageData);

    // Clear the message input
    this.messageToSend = '';
  }
}
