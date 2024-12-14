import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TransactionResponseDTO } from '../dto/transaction-response.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient?: Client;
  private isConnected = false;
  private pendingSubscriptions: {
    topic: string;
    callback: (message: any) => void;
  }[] = [];

  connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      console.log('Already connected to WebSocket');
      return;
    }

    const jwt = localStorage.getItem('jwt');
    this.stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${environment.apiBaseUrl}/websocket?token=${jwt}`), // SockJS connection
      // debug: (msg: string) => console.log(msg),
      reconnectDelay: 0,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.isConnected = true;

      // process pending subscriptions
      this.pendingSubscriptions.forEach(({ topic, callback }) => {
        console.log(`processing pending subscription for ${topic}`);
        this.subscribeToTopic(topic, callback);
      });
      this.pendingSubscriptions = []; // Clear pending subscriptions
    };

    this.stompClient.onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      this.isConnected = false; // Reset state
    };

    this.stompClient.onStompError = (frame:any) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  subscribeToTopic(
    topic: string,
    onMessageReceived: (message: any) => void
  ) {
    console.log(`subscribing to ${topic}`);
    if (this.stompClient && this.isConnected) {
      this.stompClient.subscribe(topic, (message: IMessage) => {
        console.log(message);
        const body = JSON.parse(message.body);
        onMessageReceived(body as TransactionResponseDTO);
      });
    } else {
      console.error(
        'WebSocket not connected. Queuing subscription for:',
        topic
      );
      this.pendingSubscriptions.push({
        topic,
        callback: onMessageReceived,
      });
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.isConnected = false;
      this.stompClient = undefined; // Reset the client
      console.log('WebSocket client reset.');
      console.log('Disconnected from WebSocket');
    }
  }
}
