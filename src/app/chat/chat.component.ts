import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { MatDialog, MatList, MatListItem } from '@angular/material';

import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';

import {Message} from './shared/model/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private apiAiClient: ApiAiClient;
  private isListening = false;

  messages: Message[] = [];
  messageContent: string;

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor() { }

  ngOnInit() {
    const accessToken = '6cc610f8989b4d4bb7822bf628482eb7';
    this.apiAiClient = new ApiAiClient({accessToken: accessToken});
  }

  sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.apiAiClient.textRequest('오토에버').then((response) => {
      console.log(response);
    });
  }
}
