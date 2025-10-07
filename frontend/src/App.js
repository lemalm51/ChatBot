import './App.css';
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./Components/ChatMessage";
import ChatbotIcon from './Components/ChatbotIcon';
import ChatForm from './Components/ChatForm';

const App = () => {

  const [chatHistory,setChatHistory]=useState([]);
  const chatBodyRef=useRef();

const generateBotResponse =async (history)=>{
//helper function to update chat history
  const updateHistory=(text)=>{
    setChatHistory(prev=>[...prev.filter((msg)=>msg.text !=="Thinking..."),{role:"model",text}])
  };
//format chat history for API request
history=history.map(({role,text}) =>({role,parts:[{text}]}));

const requestOptions={

  method:"POST",
  headers:{ "Content-Type":"application/json"},

  body:JSON.stringify({contents:history}),
}

try{
  //Make the API call to get the bot's response
const response =await fetch(process.env.REACT_APP_API_URL,requestOptions);
const data =await response.json();

if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
updateHistory(apiResponseText);

} catch(error) {

console.log(error);

}
};

useEffect(()=>{
chatBodyRef.current.scrollTo({ top:chatBodyRef.current.scrollHeight,behavior:"smooth"});
},[chatHistory]);


  return (
    <div className="container">
      <div className='chatbot-popup'>
        {/* chat header */}
        <div className='chat-header'>
          <div className='header-info'>
            <ChatbotIcon />
            <h2 className='logo-text'>Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div> {/* ✅ Fixed: closed chat-header properly */}

        {/* chatbot body */}
        <div ref={chatBodyRef} className='chat-body'>
          <div className='message bot-message'>
            <ChatbotIcon />
            <p className='message-text'>
              Hey there 🖐 <br /> How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat,index)=>(
            <ChatMessage key={index} chat={chat}/>
          ))}
          
        </div>

        {/* chatbot footer */}
        <div className='chat-footer'>
        <ChatForm setChatHistory={setChatHistory} chatHistory={chatHistory} generateBotResponse={generateBotResponse} 
        /> 
        </div>
      </div>
    </div>
  );
};

export default App;

