import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatService, Message } from '../../services/chat.service';
import hljs from 'highlight.js';
import 'highlight.js/lib/common';  // This imports common languages

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80vh;
      background-color: #f0f2f5;
      padding: 1rem;
      box-sizing: border-box;
    }

    .chat-container {
      width: 70%;
      height: 55vh;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      max-width: 1200px;
      min-width: 320px;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .message {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 1rem;
      padding: 0.5rem;
      max-width: 85%;
      margin-right: auto;
    }

    .message-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user {
      .message-content {
        background-color: #e3f2fd;
        color: #1e1e1e;
      }

      .message-icon {
        background-color: #0084ff;
        color: white;
      }
    }

    .assistant {
      .message-content {
        background-color: #f0f2f5;
        color: #050505;
      }

      .message-icon {
        background-color: #e4e6eb;
      }

      mat-icon {
        color: #0084ff;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .message-content {
      ::ng-deep {
        .st-header {
          font-family: "Source Sans Pro", sans-serif;
          color: #262730;
          margin: 1em 0 0.5em;
        }

        h1.st-header {
          font-size: 2.25em;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        h2.st-header {
          font-size: 1.8em;
          font-weight: 600;
          letter-spacing: -0.005em;
        }

        h3.st-header {
          font-size: 1.4em;
          font-weight: 600;
  }

        .code-block {
          background: #0e1117;
          border-radius: 8px;
          margin: 1em 0;
          overflow: hidden;

          .code-header {
            background: rgba(255, 255, 255, 0.05);
            color: #e4e6eb;
            font-family: 'Fira Code', monospace;
            font-size: 12px;
            padding: 8px 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          pre {
            margin: 0;
            padding: 16px;
            overflow-x: auto;
            background: transparent;
          }

          code {
            font-family: 'Fira Code', monospace;
            font-size: 14px;
            line-height: 1.5;
            color: #e4e6eb;
            background: transparent;
            
            // Streamlit-like syntax colors
            .hljs-comment { color: #6B7280; }
            .hljs-string { color: #10B981; }
            .hljs-number { color: #F59E0B; }
            .hljs-boolean { color: #3B82F6; }
            .hljs-keyword { color: #8B5CF6; }
            .hljs-function { color: #60A5FA; }
            .hljs-class { color: #F472B6; }
            .hljs-operator { color: #9CA3AF; }
            .hljs-punctuation { color: #9CA3AF; }
            .hljs-property { color: #60A5FA; }
            .hljs-params { color: #F472B6; }
            .hljs-built_in { color: #3B82F6; }
            .hljs-variable { color: #F472B6; }
            .hljs-decorator { color: #F59E0B; }
          }
        }
      }
    }

    .input-container {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 12px;
      margin-top: auto;
    }

    input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e4e6eb;
      border-radius: 24px;
      font-size: 15px;
      background: white;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #0084ff;
        box-shadow: 0 0 0 2px rgba(0, 132, 255, 0.2);
      }

      &:disabled {
        background-color: #f0f2f5;
        cursor: not-allowed;
      }
    }

    button {
      padding: 12px 24px;
      background-color: #0084ff;
      color: white;
      border: none;
      border-radius: 24px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: #0073e6;
      }

      &:disabled {
        background-color: #e4e6eb;
        color: #bcc0c4;
        cursor: not-allowed;
  }
    }

    /* Custom scrollbar */
    .messages::-webkit-scrollbar {
      width: 6px;
    }

    .messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .messages::-webkit-scrollbar-thumb {
      background-color: #dadde1;
      border-radius: 3px;
    }
  `],
  template: `
    <div class="chat-container">
      <div class="messages">
        <div *ngFor="let message of messages" 
             class="message" 
             [ngClass]="message.role">
          <div class="message-icon">
            <mat-icon *ngIf="message.role === 'assistant'">smart_toy</mat-icon>
            <mat-icon *ngIf="message.role === 'user'">person</mat-icon>
          </div>
          <div class="message-content" [innerHTML]="message.formattedContent || message.content"></div>
        </div>
      </div>
      <div class="input-container">
        <input #messageInput
          [(ngModel)]="userInput" 
          (keyup.enter)="sendMessage()" 
          placeholder="Type your message..." 
          [disabled]="loading"
          autocomplete="off"
        >
        <button 
          (click)="sendMessage()" 
          [disabled]="loading || !userInput.trim()">
          {{loading ? 'Sending...' : 'Send'}}
        </button>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  messages: Message[] = [];
  userInput = '';
  loading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    hljs.configure({
      ignoreUnescapedHTML: true
    });
  }

  sendMessage() {
    if (!this.userInput.trim() || this.loading) return;

    const userMessage: Message = {
      role: 'user',
      content: this.userInput
    };

    this.messages.push(userMessage);
    this.loading = true;
    this.userInput = '';

    this.chatService.sendMessage(this.messages).subscribe({
      next: (response) => {
        this.messages.push(response);
        this.loading = false;
        setTimeout(() => this.messageInput.nativeElement.focus(), 0);
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, there was an error processing your message.'
        });
        this.loading = false;
        setTimeout(() => this.messageInput.nativeElement.focus(), 0);
      }
    });
  }
}