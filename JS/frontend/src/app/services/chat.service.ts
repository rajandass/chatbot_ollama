import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { marked, Renderer } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
  formattedContent?: SafeHtml;
}

export interface ChatResponse {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';
  private renderer: Renderer;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.renderer = new Renderer();
    
    // Simple code renderer
    this.renderer.code = ({ text, lang }: { text: string, lang?: string }) => {
      return `<pre><code>${this.escapeHtml(text)}</code></pre>`;
    };

    // Update inline code renderer with correct types
    this.renderer.codespan = ({ text }: { text: string }) => {
      return `<code class="inline-code">${this.escapeHtml(text)}</code>`;
    };

    marked.setOptions({
      renderer: this.renderer,
      gfm: true,
      breaks: true
    });
  }

  private formatMessage(content: string): SafeHtml {
    // Convert markdown to HTML and ensure it returns a string
    const htmlContent = marked(content).toString();
    // Sanitize the HTML and return
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  sendMessage(messages: Message[]): Observable<Message> {
    return this.http.post<ChatResponse>(this.apiUrl, { messages })
      .pipe(
        map(response => ({
          role: 'assistant' as const,
          content: response.content,
          formattedContent: this.formatMessage(response.content)
        }))
      );
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}