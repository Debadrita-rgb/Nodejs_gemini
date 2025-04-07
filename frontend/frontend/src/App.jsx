import { BrowserRouter, Routes, Route } from "react-router-dom";

import GeminiChat from "./Components/GeminiChat/GeminiChat";
import ChatBot from "./Components/ChatBot/ChatBot";
import Home from "./Components/Home/Home";

function App() {
    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-200">
            // <h1 className="text-5xl font-bold text-gray-900">Gemini Chat</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gemini_chat" element={<GeminiChat />} />
                    <Route path="/chatbot" element={<ChatBot />} />
                </Routes>
            </BrowserRouter>

        // </div>
    );
}

export default App;
