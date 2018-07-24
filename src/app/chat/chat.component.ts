import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { MatDialog, MatList, MatListItem } from '@angular/material';

import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';

import {Message} from './shared/model/message';
import {Action} from './shared/model/action';
import {User} from './shared/model/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  private apiAiClient: ApiAiClient;
  private isListening = false;

  messages: Message[] = [];
  messageContent: string;

  private bot: User;
  private user: User;

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor() { }

  ngOnInit() {
    const accessToken = 'e2ad17b2acf14222b0faace761627008';
    this.apiAiClient = new ApiAiClient({accessToken: accessToken});

    this.bot = {
      id: this.getRandomId(),
      name: 'Autoever',
      avatar: 'assets/images/autoever.png'
    };
    this.user = {
      id: this.getRandomId(),
      name: '튜브',
      avatar: 'assets/images/tube.png'
    };
  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.messages.push({
      from: this.user,
      content: message
    });

    this.apiAiClient.textRequest(this.messageContent).then(response => {
      console.log(response.result.fulfillment);
      this.messages.push({
        from: this.bot,
        content: response.result.fulfillment.speech
      });
    });

    this.messageContent = null;
  }


}
