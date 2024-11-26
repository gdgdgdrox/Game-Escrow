import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TransactionResponseDTO } from '../dto/transaction-response.dto';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private stompClient!: Client;

  connect(transactionID: string, onMessageReceived: (message: any) => void): void {
    if (this.stompClient && this.stompClient.connected) {
      console.log('Already connected to WebSocket');
      return;
    }
    const jwt = localStorage.getItem('jwt'); 
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8080/websocket?token=${jwt}`), // SockJS connection
      debug: (msg: string) => console.log(msg),
      reconnectDelay: 0,
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      // Subscribe to the transaction-specific topic
      const topic = `/topic/transaction/${transactionID}`;
      this.stompClient.subscribe(topic, (message: IMessage) => {
        console.log('message received');
        console.log(message);
        const body = JSON.parse(message.body);
        console.log(body);
        onMessageReceived(body as TransactionResponseDTO);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Details: ' + frame.body);
    };

    this.stompClient.activate(); // Activate the connection
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }

}
