import { Component } from '@angular/core';
import { ChatMessage } from '../models/chat-message';
import { ChatService } from '../services/chat.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-chat-componentss',
  templateUrl: './chat-componentss.component.html',
  styleUrls: ['./chat-componentss.component.scss']
})
export class ChatComponentssComponent {
  
  messages: ChatMessage[] = [];
  username!: string;
  usernameInput: string = '';
  roomDescInput: string = '';
  roomDesc: string = '';
  logoUrl: string = 'assets/what.png';

  constructor(private chatService: ChatService) {}

  loadMessagesByUsername() {
    if (this.usernameInput) {
      this.username = this.usernameInput;
      this.chatService.getMessagesByUser(this.username).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  loadMessagesByRoomDesc() {
    if (this.roomDescInput) {
      this.roomDesc = this.roomDescInput;
      this.chatService.getMessagesByRoomDesc(this.roomDesc).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  extractPdf() {
    const doc = new jsPDF();
  
    // Draw a border around the page
    doc.setDrawColor(0); // Border color (black)
    doc.setLineWidth(1); // Border width (1 point)
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10); // Border rectangle
  
    // Add logo
    const imgWidth = 50; // Adjust image width as needed
    const imgHeight = 50; // Adjust image height as needed
    doc.addImage(this.logoUrl, 'PNG', doc.internal.pageSize.width - imgWidth - 10, 10, imgWidth, imgHeight);
  
    // Title
    doc.setTextColor(31, 73, 125); // Dark blue color for the title
    doc.setFontSize(30);
    doc.setFont('times', 'bold');
    doc.text(`Chat Messages for Room: ${this.roomDesc}`, 15, 30);
  
    // Define a map to store user-color pairs
    const userColors = new Map<string, string>();
    let colorIndex = 0;
    this.messages.forEach((message) => {
      if (!userColors.has(message.user)) {
        // Assign a color based on the index of the unique user
        const color = this.getRandomColor(colorIndex);
        userColors.set(message.user, color);
        colorIndex++;
      }
    });
  
    // Messages
    let y = 60; // Initial vertical position
    this.messages.forEach((message) => {
      const color = userColors.get(message.user); // Get color based on user
      if (color) {
        doc.setTextColor(color); // Set text color if color is defined
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      const xPosition = 15; // Always align to the left
      const align = 'left'; // Text alignment
      doc.text(`${message.user}: ${message.message}`, xPosition, y, { align });
      y += 10; // Adjust vertical position for the next message
    });
  
    // Footer with date
    const currentDate = new Date().toLocaleDateString();
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 15, doc.internal.pageSize.height - 10);
  
    // Save the PDF file
    doc.save(`chat_messages_${this.roomDesc}.pdf`);
  }
  
  getRandomColor(index: number): string {
    const colors = ['#000000', '#0d00ff', '#0dba35', '#f50a0a']; // Define your four colors here
    return colors[index % colors.length]; // Use modulo to cycle through the colors
  }
}
