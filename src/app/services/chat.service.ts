import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3000/api/messages'; // URL de votre API Spring
  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  userId!: string;

  constructor(private http: HttpClient) {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }
  getMessagesByRoomDesc(roomDesc: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/room/${roomDesc}`);
  }
  getMessagesByUser(username: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/user/${username}`);
  }

  joinRoom(roomId: string): StompSubscription {
    return this.stompClient.connect({}, () => {
      return this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent: ChatMessage = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);
      });
    });
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  sendAudioMessage(roomId: string, audioData: ArrayBuffer) {
    // Créez un tableau d'octets à partir des données audio ArrayBuffer
    const bytes = new Uint8Array(audioData);
  
    // Convertissez Uint8Array en tableau JavaScript ordinaire
    const byteNumbers = Array.from(bytes);
    
    // Convertissez les octets en une chaîne Base64
    const audioBase64 = btoa(String.fromCharCode.apply(null, byteNumbers));
    
    // Créez un objet de message contenant les données audio
    const message = {
      user: this.userId,
      roomDesc: roomId,
      audioMessage: audioBase64
    };
  
    // Envoyez le message via WebSocket
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message));
  }
}
