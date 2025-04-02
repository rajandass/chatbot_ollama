# Local JavaScript Developer Chatbot

A Streamlit-based chatbot that acts as a JavaScript developer using Ollama's local LLM.

## Prerequisites

- Python 3.8+
- [Ollama](https://ollama.ai/)

## Setup Instructions

1. **Install Ollama**
   - Visit [Ollama.ai](https://ollama.ai/)
   - Download and install Ollama for your operating system
   - Start the Ollama service

2. **Download the LLM Model**
   ```bash
   ollama pull llama3.2:1b
   ```

3. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install Dependencies**
   ```bash
   pip install streamlit langchain-ollama
   ```

## Running the Application

1. **Start Ollama Service**
   Make sure the Ollama service is running in the background

2. **Launch the Chatbot**
   ```bash
   streamlit run chatbot_ollama.py
   ```

3. **Access the Application**
   Open your browser and navigate to `http://localhost:8501`

## Configuration

The chatbot is configured with:
- Model: llama3.2:1b
- Temperature: 2
- System Prompt: JavaScript Developer persona

## Troubleshooting

- Ensure Ollama service is running before starting the application
- Check if the model is properly downloaded using `ollama list`
- Verify your Python environment has all required dependencies
