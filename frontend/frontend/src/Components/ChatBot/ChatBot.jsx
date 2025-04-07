import React, { useState } from 'react'
import './ChatBot.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


const ChatBot = () => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'How can I help you?' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        // Add user message
        const userMsg = { sender: 'user', text: question };
        setMessages((prev) => [...prev, userMsg]);
        setQuestion('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:3000/api/content', { question });
            const aiReply = { sender: 'ai', text: res.data.result || "Sorry, I couldn't understand." };
            setMessages((prev) => [...prev, aiReply]);
        } catch (error) {
            console.error("API Error:", error);
            const errorMsg = { sender: 'ai', text: '⚠️ Error: Unable to fetch response.' };
            setMessages((prev) => [...prev, errorMsg]);
        }

        setLoading(false);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">ChatBot</div>
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.sender}`}>
                            {msg.sender === 'ai' ? (
                                <div className="markdown">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            ) : (
                                <span>{msg.text}</span>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="message ai">
                            <em>Typing...</em>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="chat-input"
                        disabled={loading}
                    />
                    <button type="submit" className="chat-send-btn" disabled={loading}>
                        {loading ? '...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatBot
