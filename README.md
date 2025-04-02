# JavaScript Developer Chatbot

A Streamlit-based chatbot application that acts as a JavaScript development assistant using Ollama and LangChain.

## Features

- Interactive chat interface built with Streamlit
- AI-powered responses using Ollama LLM
- Persistent chat history across sessions
- JavaScript development-focused assistance
- Configurable model parameters

## Prerequisites

- Python 3.8 or higher
- Ollama installed and running
- Required Python packages (see requirements.txt)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd localchat
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
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