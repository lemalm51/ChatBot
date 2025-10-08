import {  useRef } from "react";

const ChatForm = ({chatHistory, setChatHistory , generateBotResponse}) => {

    const inputRef=useRef();

    const handleFormSubmit=(e)=>{

        e.preventDefault();

        const userMessage=inputRef.current.value.trim();

        if(!userMessage)return;

        inputRef.current.value="";
        
// update chat history with the user's message

    setChatHistory(history=>[...history,{ role:"user",text:userMessage}]);


    //add athinking response
       setTimeout(() => {
        setChatHistory((history)=>[...history,{role:"model",text:"Thinking..."}]);
      }, 600); 

       generateBotResponse([...chatHistory,{ role:"user",text:userMessage}]);

    }
    return (
          <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
            <input ref={ inputRef} type='text' placeholder='message...' className='message-input' required />
            <button className="material-symbols-rounded">arrow_upward</button>
          </form>
    )
}



export default ChatForm;