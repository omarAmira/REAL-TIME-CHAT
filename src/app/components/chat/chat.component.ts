import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat-message'; // Assurez-vous que l'importation pointe vers le bon chemin
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageInput: string = '';
  userId: string = "";
  messageList: ChatMessage[] = []; // Utilisez le type ChatMessage
  roomDesc: string = '';
  showEmojiPanel: boolean = false;
  emojis: string[] = ['😊', '😂', '😍', '😎', '👍', '👋'];
  recording: boolean = false;
  audioChunks: any[] = [];
  mediaRecorder!: MediaRecorder;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.roomDesc = this.route.snapshot.params["roomDesc"];
    this.chatService.joinRoom("ABC");
    this.lisenerMessage();
  }

  sendMessage() {
    if (this.messageInput.trim() !== '' || this.recording) {
      const chatMessage: ChatMessage = {
        message: this.messageInput.trim(),
        user: this.userId,
        roomDesc: this.roomDesc,
        isVoice: false // Ajoutez isVoice si nécessaire
        ,
        message_side: undefined
      };
  
      this.chatService.sendMessage("ABC", chatMessage);
  
      this.messageInput = '';
    }
  }

  lisenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: ChatMessage[]) => {
      this.messageList = messages.map((item: ChatMessage) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    });
  }

  toggleEmojiPanel() {
    this.showEmojiPanel = !this.showEmojiPanel;
  }

  addEmojiToMessage(emoji: string) {
    this.messageInput += emoji;
  }

  recordAudio() {
    if (!this.recording) {
      // Démarrer l'enregistrement
      this.startRecording();
      this.recording = true;
    } else {
      // Arrêter l'enregistrement
      this.stopRecording();
      this.recording = false;
    }
  }
  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.mediaRecorder.addEventListener('dataavailable', event => {
          this.audioChunks.push(event.data);
        });
        this.mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.sendVoiceMessage(audioBlob);
          this.audioChunks = [];
        });
      })
      .catch(err => {
        console.error('Error recording audio:', err);
      });
  }
  
  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  sendVoiceMessage(audioData: Blob) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        this.chatService.sendAudioMessage("ABC", arrayBuffer);
    };
    fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
    };
    fileReader.readAsArrayBuffer(audioData);
  }

  playVoiceMessage(message: ChatMessage) {
    const audio = new Audio(URL.createObjectURL(new Blob([new Uint8Array(message.fileData as unknown as ArrayBuffer)])));
    audio.play();
  }
}
