from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage

# initiate the model
llm = ChatOllama(
    model="llama3.2:1b",
    temperature=1
)

# Initiate the  message object
message = [
    SystemMessage("Act like a Javascript Developer"),
    HumanMessage("Hi, How are you today")
]


# Execute teh model with messages
result = llm.invoke(message)

# Print Result
print(result.content)