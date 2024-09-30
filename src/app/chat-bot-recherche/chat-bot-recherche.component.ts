import { Component } from '@angular/core';

// Déclaration de webkitSpeechRecognition
declare var webkitSpeechRecognition: {
  new (): SpeechRecognition;
};

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionError) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

interface SpeechRecognitionError extends Event {
  readonly error: string;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
@Component({
  selector: 'app-chat-bot-recherche',
  templateUrl: './chat-bot-recherche.component.html',
  styleUrls: ['./chat-bot-recherche.component.scss']
})
export class ChatBotRechercheComponent {
  public recognizing: boolean = false;
  public recognition: any;
  public searchQuery: string = '';

  constructor() {
    // Initialisation de la reconnaissance vocale
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'fr-FR'; // Changer la langue si nécessaire
    this.recognition.onstart = () => this.recognizing = true;
    this.recognition.onend = () => this.recognizing = false;
    this.recognition.onerror = (event: SpeechRecognitionError) => console.error('Error during recognition: ', event.error);
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results;
      if (results.length > 0) {
        const firstResult = results.item(0); // Utilisation de la méthode item()
        if (firstResult && firstResult.length > 0) {
          const transcript = firstResult.item(0).transcript; // Utilisation de la méthode item()
          this.searchQuery = transcript;
          this.search();
        }
      }
    };
  }

  public startRecognition(): void {
    if (!this.recognizing) {
      this.recognition.start();
    }
  }

  public search(): void {
    if (this.searchQuery.trim() !== '') {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(this.searchQuery)}`;
    }
  }
}