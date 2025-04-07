import React from 'react'
import { Link } from 'react-router';
const Home = () => {
  return (
    <div>
      <Link to="/gemini_chat"><h4>Gemini Chat</h4></Link>
      <Link to="/chatbot"><h4>Chatbot</h4></Link>
    </div>
  )
}

export default Home
