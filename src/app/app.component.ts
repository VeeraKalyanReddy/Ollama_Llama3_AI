import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OllamaService } from './ollama.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [OllamaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  model: string = 'llama3'; // or another model if needed
  userMessage: string = ''; // This will be the prompt message from the user
  stream: boolean = false;
  response: any;
  formattedResponse: string[] = [];
  showLoader = false;
  sendMessageMethod = false;
  copyButtonText = 'Copy';
  isCopied = false;

  constructor(private ollamaService: OllamaService) { }

  sendMessage() {
    this.formattedResponse = []
    this.sendMessageMethod = true
    this.showLoader = true;
    this.ollamaService.sendMessage(this.model, this.userMessage, this.stream).subscribe(
      (data) => {
        if (data && this.sendMessageMethod) {
          this.response = data;
          this.formatResponse(data.response);
          this.showLoader = false;
        }
      },
      (error) => {
        console.error('Error:', error);
        this.sendMessageMethod = false
      }
    );
  }

  clearMessage() {
    this.userMessage = '';
    this.formattedResponse = [];
    this.showLoader = false;
    this.sendMessageMethod = false;
    this.copyButtonText = 'Copy';
  }

  formatResponse(responseText: string) {
    const regex = /(?:\*\s|\d+\.\s)/;
    const parts = responseText.split(regex).filter(part => part.trim() !== '');
    const header = responseText.includes('Response:') ? ['Response:'] : [];
    this.formattedResponse = [...header, ...parts];
  }

  copyToClipboard() {
    const responseText = this.formattedResponse.join('\n');
    navigator.clipboard.writeText(responseText).then(() => {
      this.copyButtonText = 'Copied!';
      this.isCopied = true;
      setTimeout(() => {
        this.copyButtonText = 'Copy';
        this.isCopied = false;
      }, 10000);
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  }

}
