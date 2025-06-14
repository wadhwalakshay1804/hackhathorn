import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Virtual Agri Coach. How can I help you with your farming needs today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your question! As your Virtual Agri Coach, I'm here to provide guidance on crop management, soil health, pest control, and sustainable farming practices. How can I assist you further?",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button - Fixed position, visible on all pages */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-semibold">Virtual Agri Coach</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your Virtual Agri Coach..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;