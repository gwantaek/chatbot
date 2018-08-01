import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Message } from '../model/message';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiAiClient: ApiAiClient;
  messages: Message[] = [];

  constructor() {
    const accessToken = 'e2ad17b2acf14222b0faace761627008';
    this.apiAiClient = new ApiAiClient({ accessToken: accessToken });
  }

  add(message: string, user: User): void {
    this.messages.push({
      from: user,
      content: message
    });
  }

  query(message: string): Promise<any> {
    return this.apiAiClient.textRequest(message);
    // this.apiAiClient.textRequest(message).then(response => {
    //   console.log(response.result.fulfillment.speech);
    // });
  }

  clear(): void {
    this.messages = [];
  }
}
