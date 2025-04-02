const express = require('express');
const cors = require('cors');
const { ChatOllama } = require('@langchain/ollama');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const MODEL_NAME = "llama3.2:1b";  // Changed to a more commonly available model
const DEFAULT_TEMPERATURE = 2;  // Adjusted for better responses
const SYSTEM_PROMPT = 'You are a helpful JavaScript Developer assistant.';

// Initialize Ollama chat model
const chatModel = new ChatOllama({
    baseUrl: ollamaBaseUrl,
    model: MODEL_NAME,
    temperature: DEFAULT_TEMPERATURE
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        // Add system prompt if not present
        if (!messages.find(m => m.role === 'system')) {
            messages.unshift({ role: 'system', content: SYSTEM_PROMPT });
        }
        
        // Convert messages to LangChain format
        const formattedMessages = messages.map(msg => {
            if (msg.role === 'user') {
                return new HumanMessage(msg.content);
            } else if (msg.role === 'system') {
                return new SystemMessage(msg.content);
            }
            return msg;
        });

        // Get AI response
        const response = await chatModel.invoke(formattedMessages);

        res.json({ content: response.content });
    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Using Ollama at: ${ollamaBaseUrl}`);
});