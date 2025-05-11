import React from 'react'
import { FaPaperclip, FaRegSmile, FaSun, FaBold, FaPaperPlane, FaVideo } from 'react-icons/fa';
import './Messages.css';
const MessageChats = () => {
  return (
   <div className="chat-area">
           <div className="chat-header">
             <div className="chat-title">
               <h3>Amina Okonkwo</h3>
               <span>Data Analyst – E-commerce Insights</span>
             </div>
             <div className="chat-actions">
               <FaVideo className='video-icon' />
             </div>
           </div>
   
           <div className="chat-messages">
             <div className="message incoming">
               <img src="/assets/users/one.png" alt="Amina" />
               <div>
                 <div><span className="sender">Amina Okonkwo</span> <span className="time">11:52 AM</span></div>
                 <p>Absolutely! I anticipate I will primarily work with customer transaction data...</p>
               </div>
             </div>
             <div className="message outgoing">
               <img src="/assets/users/two.png" alt="Jayson" />
               <div>
                 <div><span className="sender">Jayson Kuhick</span> <span className="time">11:52 AM</span></div>
                 <p>That covers the main bases. We also have periodic market research data...</p>
               </div>
             </div>
           </div>
   
           <div className="chat-input">
             <input type="text" placeholder="Send a message..." />
             <div className="input-actions">
               <FaBold />
               <FaPaperclip />
               <FaSun />
               <FaRegSmile />
               <button className="send-btn"><FaPaperPlane /></button>
             </div>
           </div>
         </div>
   
  )
}

export default MessageChats
