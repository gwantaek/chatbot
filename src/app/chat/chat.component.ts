import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatList, MatListItem } from '@angular/material';

import { User } from './shared/model/user';
import { MessageService } from './shared/services/message.service';

const DEFAULT_CONTENTS_SRC = 'assets/images/CI.jpg';
const SLOGAN = '>>디지털로 밝히는 HMG 미래!!<<';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [
    './chat.component.css'
  ]
})
export class ChatComponent implements OnInit, AfterViewInit {

  messageContent: string;

  contentsSrc = DEFAULT_CONTENTS_SRC;
  contentsReadyMessage = SLOGAN;

  private bot: User;
  private user: User;

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    // Create Bot & User
    this.bot = this.getUser('Skynet', 'assets/images/bot.png');
    this.user = this.getUser('John Connor', 'assets/images/user.png');
  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  private getUser(name: string, imageUrl: string): User {
    return {
      id: Math.round(Math.random() * 100000),
      name: name,
      imageUrl: imageUrl
    };
  }

  private scrollToBottom(): void {
    this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
  }

  sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.messageService.add(message, this.user);
    this.messageService.query(message).then(response => {
      this.messageService.add(response.result.fulfillment.speech, this.bot);
    });

    this.messageContent = null;
  }


}
