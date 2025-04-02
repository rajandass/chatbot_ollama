import streamlit  as st
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

st.title("Chatbot")

# Initialize the chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

    st.session_state.messages.append(SystemMessage('Act like an Javascript Developer'))

# display the chat messages from history on app rerun
for message in st.session_state.messages:
    if isinstance(message, HumanMessage):
        with st.chat_message("user"):
            st.markdown(message.content)
    elif isinstance(message,AIMessage):
        with st.chat_message("assistant"):
            st.markdown(message.content)

# create the bar where we can type message
prompt = st.chat_input("how are you?")

# did the user submit a prompt?
if prompt:
    #add the message from the user (prompt)  to the screen with streamlit
    with st.chat_message("user"):
        st.markdown(prompt)
        st.session_state.messages.append(HumanMessage(prompt))

    # create the echo (response) and add it to the screen

    llm = ChatOllama(
        model="llama3.2:1b",
        temperature=2
    )
    result = llm.invoke(st.session_state.messages).content

    with st.chat_message("assistant"):
        st.markdown(result)
        st.session_state.messages.append(AIMessage(result))
        
    