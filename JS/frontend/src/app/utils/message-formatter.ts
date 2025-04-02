export class MessageFormatter {
  static formatCodeBlocks(content: string): string {
    // Replace code blocks with proper HTML
    return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || '';
      return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
    });
  }

  static formatLineBreaks(content: string): string {
    // Replace single line breaks with <br> tags
    return content.replace(/\n/g, '<br>');
  }
}