


import { useEffect, useRef, useState } from "react";
import ChatMessage from "./Components/ChatMessage";
import ChatbotIcon from './Components/ChatbotIcon';
import ChatForm from './Components/ChatForm';
import ChatIcon from "./Components/images/lm.png"

const App = () => {

  const [chatHistory,setChatHistory]=useState([]);
  const [showChatbot,setShowChatbot]=useState(false);

  const chatBodyRef=useRef();


const generateBotResponse =async (history)=>{

//helper function to update chat history

  const updateHistory=(text ,isError=false)=>{

    setChatHistory(prev=>[...prev.filter((msg)=>msg.text !=="Thinking..."),{role:"model",text,isError}])

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

updateHistory(error.message,true);

}
};

useEffect(()=>{

chatBodyRef.current.scrollTo({ top:chatBodyRef.current.scrollHeight,behavior:"smooth"});

},[chatHistory]);


  return (
    
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
          
      <img src={ ChatIcon } alt="icon" className="bot-icon" id="photo"/>

        <h1>🤝𝐖𝐄𝐋𝐂𝐎𝐌𝐄 TO MY CHATBOT</h1>

      <button onClick={()=> setShowChatbot((prev) => !prev)} id='chatbot-toggler'>

      <span className='material-symbols-rounded'>mode_comment</span>

      <span className='material-symbols-rounded'>close</span>
      </button>

      <div className='chatbot-popup'>
        {/* chat header */}

        <div className='chat-header'>

          <div className='header-info'>

            <ChatbotIcon />

            <h2 className='logo-text'>Chatbot</h2>


          </div>

          <button onClick={()=>setShowChatbot((prev) => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
          
        </div> 
        
        {/* ✅ Fixed: closed chat-header properly */}

        {/* chatbot body */}
        <div ref={chatBodyRef} className='chat-body'>

          <div className='message bot-message'>

            <ChatbotIcon />

            <p className='message-text'> 
              Hi 🖐 everyone, You Can ask my chatbot what you want...
              <br /> You Can Get Brief and Clear Information!!

            </p>

          </div>


          {chatHistory.map((chat,index)=>(

            <ChatMessage key={index} chat={chat}/> 

          ))}
          
        </div>

        {/* chatbot footer */}

        <div className='chat-footer'>

        <ChatForm setChatHistory={setChatHistory} chatHistory={chatHistory} generateBotResponse={generateBotResponse}   /> 

        
        </div>
      </div>
    </div>
  );
};

export default App;

