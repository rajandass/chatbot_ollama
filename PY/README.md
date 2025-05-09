# JavaScript Developer Chatbot

A Streamlit-based chatbot application that acts as a JavaScript development assistant using Ollama and LangChain.

## Features

- Interactive chat interface built with Streamlit
- AI-powered responses using Ollama LLM
- Persistent chat history across sessions
- JavaScript development-focused assistance
- Configurable model parameters
- 
## 🏗️ System Architecture

### Mermaid Diagram
```mermaid
flowchart TD
    User[User] <-->|Interacts with| UI[Streamlit UI]
    UI -->|Sends query| App[Chatbot Application]
    App -->|Stores/Retrieves| History[Chat History]
    
    subgraph Backend
        App -->|Formats messages| LangChain[LangChain]
        LangChain -->|API call| Ollama[Ollama]
        Ollama -->|Returns response| LangChain
    end

    LangChain -->|Processes response| App
    App -->|Displays response| UI
    
    style User fill:#f9f9f9,stroke:#333,stroke-width:2px
    style UI fill:#d4f1f9,stroke:#333,stroke-width:2px
    style App fill:#d5e8d4,stroke:#82b366,stroke-width:2px
    style History fill:#ffe6cc,stroke:#d79b00,stroke-width:2px
    style Backend fill:#f5f5f5,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
    style LangChain fill:#e1d5e7,stroke:#9673a6,stroke-width:2px
    style Ollama fill:#fff2cc,stroke:#d6b656,stroke-width:2px
```
## Prerequisites

- Python 3.8 or higher
- [Ollama](https://ollama.ai/) installed on your system
- Available disk space for LLM model (approximately 4GB)
- Minimum 8GB RAM recommended

## Installation

1. **Install Ollama**
   - Visit [Ollama.ai](https://ollama.ai/)
   - Download the appropriate version for your OS
   - Install and start the Ollama service

2. **Download the LLM Model**
   ```bash
   ollama pull llama3.2:1b
   ```

3. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd localchat
   ```

4. **Set up Python environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

5. **Verify Ollama Setup**
   ```bash
   ollama list  # Should show llama3.2:1b in the list
   ```

## Usage

Run the chatbot using Streamlit:
```bash
streamlit run chatbot_ollama_ref.py
```

The application will start and open in your default web browser. You can then interact with the chatbot by typing your JavaScript-related questions in the chat input.

## Configuration

The chatbot uses the following default settings:
- Model: llama3.2:1b
- Temperature: 2
- System Prompt: Acts as a JavaScript Developer

## Project Structure

- `chatbot_ollama_ref.py`: Main application file with refactored code
- `chatbot_ollama.py`: Original implementation
- `requirements.txt`: Project dependencies

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT License](LICENSE)
