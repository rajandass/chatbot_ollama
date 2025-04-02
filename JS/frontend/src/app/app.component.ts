import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent],
  template: `
    <main>
      <h1>AI JavaScript Assistant</h1>
      <app-chat></app-chat>
    </main>
  `,
  styles: [`
    main {
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #1976d2;
    }
  `]
})
export class AppComponent {
  title = 'AI Chat';
}
