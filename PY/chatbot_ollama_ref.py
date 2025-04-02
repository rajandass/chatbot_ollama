"""
A Streamlit-based chatbot application using Ollama and LangChain.

This module implements a chat interface where users can interact with an AI assistant
that behaves like a JavaScript developer. The chat history is maintained across sessions
using Streamlit's session state.
"""

import streamlit as st
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

# Constants
SYSTEM_PROMPT = 'Act like an Javascript Developer'
MODEL_NAME = "llama3.2:1b"
DEFAULT_TEMPERATURE = 2

def initialize_chat_history():
    """Initialize the chat history in session state if it doesn't exist."""
    if "messages" not in st.session_state:
        st.session_state.messages = []
        st.session_state.messages.append(SystemMessage(SYSTEM_PROMPT))

def display_chat_history():
    """Display all messages from the chat history."""
    for message in st.session_state.messages:
        if isinstance(message, HumanMessage):
            with st.chat_message("user"):
                st.markdown(message.content)
        elif isinstance(message, AIMessage):
            with st.chat_message("assistant"):
                st.markdown(message.content)

def get_ai_response(messages):
    """
    Get AI response using the Ollama model.
    
    Args:
        messages: List of chat messages
    
    Returns:
        str: AI generated response
    """
    llm = ChatOllama(
        model=MODEL_NAME,
        temperature=DEFAULT_TEMPERATURE
    )
    return llm.invoke(messages).content

def main():
    """Main function to run the chatbot application."""
    st.title("Chatbot")
    
    # Initialize chat history
    initialize_chat_history()
    
    # Display existing chat history
    display_chat_history()
    
    # Handle user input
    prompt = st.chat_input("How can I help you with JavaScript?")
    
    if prompt:
        # Display and store user message
        with st.chat_message("user"):
            st.markdown(prompt)
            st.session_state.messages.append(HumanMessage(prompt))
        
        # Generate and display AI response
        result = get_ai_response(st.session_state.messages)
        with st.chat_message("assistant"):
            st.markdown(result)
            st.session_state.messages.append(AIMessage(result))

if __name__ == "__main__":
    main()

