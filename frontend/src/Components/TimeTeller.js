

import React, { useState, useEffect, useRef } from 'react';

// Main App Component
const TimeTeller = () => {
    // Now showing the user's actual, current time based on their machine clock
    const location = "Your Local Time"; 
    
    // State for the live current date object
    const [date, setDate] = useState(new Date());

    // State for messages, input, and typing indicator
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            text: `Hello! I'm a Time Teller Chatbot showing the live time for ${location}. Ask me about the current time, date, or day.`, 
            sender: 'bot' 
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    // Function to update the date state every second
    const tick = () => {
        setDate(new Date());
    };

    // Effect to update the time every second (Live Clock)
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timerID);
    }, []);

    // Effect to scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /**
     * Calculates the current time based on the user's local machine clock.
     */
    const getCurrentTime = () => {
        // Use default locale/timezone for the current time
        return date.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric', // Added seconds since it's a live clock
            hour12: true,
            timeZoneName: 'short',
        });
    };
    
    /**
     * Calculates the current date based on the user's local machine clock.
     */
    const getCurrentDate = () => {
        // Use default locale/timezone for the current date
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    /**
     * Calculates the current day of the week.
     */
    const getCurrentDay = () => {
        return date.toLocaleDateString(undefined, { weekday: 'long' });
    };

    // Main logic to handle user messages and generate bot responses
    const handleSendMessage = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput === '') return;

        // Add user's message to the chat
        const newUserMessage = { id: Date.now(), text: trimmedInput, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Process the input and generate a response after a short delay
        setTimeout(() => {
            const lowerCaseInput = trimmedInput.toLowerCase();
            let botResponse = `I'm not sure how to answer that. Please ask about the time, date, or day for ${location}.`;

            if (lowerCaseInput.includes('time')) {
                botResponse = `The current time according to your machine is ${getCurrentTime()}.`;
            } else if (lowerCaseInput.includes('date')) {
                botResponse = `Today's date is ${getCurrentDate()}.`;
            } else if (lowerCaseInput.includes('day')) {
                botResponse = `Today is ${getCurrentDay()}.`;
            } else if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
                botResponse = `Hello there! I tell the live local time. How can I help you?`;
            }

            const newBotMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, newBotMessage]);
            setIsTyping(false);
        }, 1200); // Simulate bot thinking time
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isTyping) {
            handleSendMessage();
        }
    };

    // Render the component
    return (
        <div className="">
            {/* Custom CSS for the typing indicator animation since Tailwind doesn't provide these keyframes */}
           
            
                {/* Chat Header */}

                <div className="">
                  
                    <div>
                        <h1 className="">Time Teller Bot (Live)</h1>
                        <p className="">{location}</p>
                    </div>
                </div>



                {/* Messages Area */}

                    <div className="">
                        {messages.map((message) => (
                                <div className={` ${
                                    message.sender === 'user' 
                         }`}>
                                    <p className="">{message.text}</p>
                                </div>
                        ))}

                        {isTyping && (
                             <div className="">
                                 <div className="">

                                     {/* Typing indicator */}
                                     
                                 </div>
                             </div>
                        )}


                        <div ref={messagesEndRef} />
                    </div>

                {/* Input Area */}

                <div className="">

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Ask about time, date, or day...`}disabled={isTyping}
                    />
                    <button
                        onClick={handleSendMessage}
                        // className={`  ${isTyping || inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        // aria-label="Send message"
                        disabled={isTyping || inputValue.trim() === ''}
                    >
                      
                    </button>
                </div>
        </div>
    );
};

export default  TimeTeller ;
