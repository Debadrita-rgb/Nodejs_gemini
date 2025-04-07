import { useState } from "react";
import axios from "axios";
import "./GeminiChat.css";
const GeminiChat = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post("http://localhost:3000/api/content", { question });
            setResponse(res.data.result);
        } catch (error) {
            setResponse("Error: Unable to fetch response");
            console.error("API Error:", error);
        }
        
        setLoading(false);
    };

    return (
        <div className="container">
  <div className="chat-box">
    <h1 className="title">💬 Gemini Chat</h1>
    <h2 className="subtitle">Ask AI Anything</h2>

    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        required
        className="input"
      />
      <button type="submit" className="btn" disabled={loading}>
        {loading ? (
          <span className="spinner-text">
            <span className="spinner" /> Thinking...
          </span>
        ) : (
          "Ask"
        )}
      </button>
    </form>

    {response && (
      <div className="response">
        <h3 className="response-title">📌 Response:</h3>
        <p className="response-text">{response}</p>
      </div>
    )}
  </div>
</div>


      



    );
};

export default GeminiChat;
