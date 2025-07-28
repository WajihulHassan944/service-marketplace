'use client';
import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import {
  FaPaperclip, FaPaperPlane, FaVideo, FaFilePdf, FaFileWord, FaFileArchive, FaFileAlt, FaDownload
} from 'react-icons/fa';
import './Messages.css';
import ZoomPopup from './ZoomPopup/ZoomPopup';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';
import LoadingPopup from './LoadingPopup/LoadingPopup';
import { FiCheckCircle } from "react-icons/fi";
import toast from 'react-hot-toast';
import CustomOfferPopup from './OrderPopup/CustomOfferPopup';
import OrderPopup from './OrderPopup/OrderPopup';
import { useRouter } from 'next/navigation';

const getFileIcon = (type) => {
  if (type.includes('pdf')) return <FaFilePdf />;
  if (type.includes('word')) return <FaFileWord />;
  if (type.includes('zip')) return <FaFileArchive />;
  return <FaFileAlt />;
};

const MessageChats = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showZoomPopup, setShowZoomPopup] = useState(false);
  const [chatLoading, setChatLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [inputError, setInputError] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
 const router = useRouter();
const [customOfferData, setCustomOfferData] = useState(null);

  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Creating a meeting...");
  const [successIcon, setSuccessIcon] = useState(null);

  useEffect(() => {
  const chatContainer = document.querySelector('.chat-messages');
  if (!chatContainer) return;

  const attachHandlers = () => {
    const offerButtons = chatContainer.querySelectorAll('.accept-offer-btn');
    const deleteButtons = chatContainer.querySelectorAll('.delete-offer-btn');
    const viewOrderButtons = chatContainer.querySelectorAll('.view-order-btn'); // NEW

    // Accept Offer Buttons
    offerButtons.forEach(btn => {
      if (user?.currentDashboard === 'seller') {
        btn.style.display = 'none';
      } else {
        btn.onclick = (e) => {
          console.log('Accept Offer clicked!');
          handleOfferClick(e);
        };
      }
    });

    // Delete Buttons
    deleteButtons.forEach(btn => {
      if (user?.currentDashboard !== 'seller') {
        btn.style.display = 'none';
      } else {
        btn.onclick = async (e) => {
          const messageElement = btn.closest('.message');
          const messageId = messageElement?.getAttribute('data-messageid');
          const senderId = messageElement?.getAttribute('data-senderid');

          console.log('Delete clicked for messageId:', messageId, 'senderId:', senderId);

          try {
            const res = await fetch(`${baseUrl}/messages/delete`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messageId, userId: senderId }),
            });

            const result = await res.json();

            if (res.ok) {
              toast.success('Offer deleted successfully');
              // Will be removed via Pusher
            } else {
              console.error('Failed to delete message:', result.message);
            }
          } catch (error) {
            console.error('Error deleting message:', error);
          }
        };
      }
    });

    // 🔗 View Order Buttons
    viewOrderButtons.forEach(btn => {
      const orderId = btn.getAttribute('data-orderid');
      if (!orderId) return;

      btn.onclick = () => {
        console.log('Navigating to order:', orderId);
        router.push(`/order-details?id=${orderId}`);
      };
    });
  };

  attachHandlers();

  const observer = new MutationObserver(() => {
    attachHandlers();
  });

  observer.observe(chatContainer, { childList: true, subtree: true });

  return () => observer.disconnect();
}, [user]);









const handleOfferClick = (e) => {
  const btn = e.currentTarget;
  const messageElement = btn.closest('.message');
  const messageId = messageElement?.getAttribute('data-messageid');

  const gigId = btn.getAttribute('data-gigid');
  const amount = btn.getAttribute('data-amount');
  const description = btn.getAttribute('data-description');
  const deliveryTime = btn.getAttribute('data-deliverytime');

  setCustomOfferData(null);
  setTimeout(() => {
    setCustomOfferData({
      gigId,
      amount,
      description,
      deliveryTime,
      buyerId: user?._id,
      sellerId: senderId,
      messageId,
     
    });
  }, 0);
};



  useEffect(() => {
    const fetchConversation = async () => {
      setChatLoading(true);
      try {
        const convRes = await fetch(`${baseUrl}/messages/user-conversations/${senderId}`);
        const convData = await convRes.json();
        const existingConv = convData.data.find(conv => conv.participant._id === receiverId);
        const convId = existingConv?.conversationId;
        const idToUse = convId || `${senderId}${receiverId}`;
        setConversationId(idToUse);
        const res = await fetch(`${baseUrl}/messages/conversation/${idToUse}`);
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error('Error loading messages:', err);
      } finally {
        setChatLoading(false);
      }
    };

    if (senderId && receiverId) fetchConversation();
  }, [senderId, receiverId]);

useEffect(() => {
  if (!conversationId) return;

  const pusher = new Pusher('810871192b5e575039f8', { cluster: 'us2' });
  const channel = pusher.subscribe('marketplace');

  channel.bind('new-message', (data) => {
    setMessages(prev => [...prev, data.message]);
  });

  channel.bind('delete-message', (data) => {
    const { messageId } = data;
    setMessages(prev => prev.filter(msg => msg._id !== messageId));
  });
channel.bind('message-updated', (data) => {
  console.log("📥 Pusher received message-updated event", data);

  const { message } = data;
  if (!message || !message._id) {
    console.warn("⚠️ Invalid message object:", message);
    return;
  }

  setMessages(prev => prev.map(m => (m._id === message._id ? message : m)));
});



  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, [conversationId]);

  const handleSend = async () => {
    if (!message.trim() && attachments.length === 0) return;

// Block messages containing links or email addresses
const linkOrEmailRegex = /((https?:\/\/)|(www\.)|[^\s]+@[^\s]+\.[^\s]+)/gi;
if (linkOrEmailRegex.test(message)) {
  toast.error("Links and email addresses are not allowed.");
  setInputError(true);
  return;
}
setInputError(false);

    const formData = new FormData();
    formData.append('senderId', senderId);
    formData.append('receiverId', receiverId);
    formData.append('message', message);

    attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    setIsSending(true);
    try {
      const res = await fetch(`${baseUrl}/messages/add`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        setMessage('');
        setAttachments([]);
      }
    } catch (err) {
      console.error('Send failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(file => file.size <= 5 * 1024 * 1024); // 5MB
    if (attachments.length + validFiles.length > 3) {
      toast.error("Max 3 files allowed.");
      return;
    }
    setAttachments(prev => [...prev, ...validFiles]);
    e.target.value = null;
  };

  const handleZoomSubmit = async ({ topic, duration }) => {
    if (!topic || !duration || !user?._id || !receiverId) {
      toast.error("Missing required fields.");
      return;
    }

    setLoadingMessage("Creating a meeting...");
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/zoom/create-meeting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, duration, userId: user._id, participantId: receiverId })
      });

      const data = await res.json();
      if (res.ok && data) {
        const zoomMessage = `<div><strong>Zoom Meeting:</strong> <a href="${data.join_url}" target="_blank">${data.topic}</a></div>`;
        await fetch(`${baseUrl}/messages/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senderId, receiverId, message: zoomMessage })
        });
        setLoadingMessage("Meeting created successfully!");
        setSuccessIcon(<FiCheckCircle />);
        setTimeout(() => {
          setShowZoomPopup(false);
          setIsLoading(false);
          setSuccessIcon(null);
        }, 2000);
      } else {
        setLoadingMessage("❌ Failed to create Zoom meeting.");
        setTimeout(() => setIsLoading(false), 2000);
      }
    } catch (err) {
      console.error(err);
      setLoadingMessage("❌ An error occurred.");
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-title"><h3>Chat</h3></div>
        <div className="chat-actions"><FaVideo className="video-icon" onClick={() => setShowZoomPopup(true)} /></div>
      </div>

      <div className="chat-messages">
        {chatLoading ? (
          <div className="dot-loader"><span></span><span></span><span></span></div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`message ${msg.senderId._id === senderId ? 'outgoing' : 'incoming'}`} data-messageid={msg._id}
             data-senderid={msg.senderId._id}>
              <img src={msg.senderId.profileUrl || '/assets/users/placeholder.png'} alt={msg.senderId.firstName} />
              <div>
                <div>
                  <span className="sender">{msg.senderId.firstName}</span>
                  <span className="time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: msg.message }} />
                {msg.attachments?.length > 0 && (
                  <div className="attachment-preview">
                    {msg.attachments.map((file, i) =>
                      file.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img key={i} src={file.url} alt="attachment" className="chat-img-preview" />
                      ) : (
                        <div key={i} className="file-chip">
                          {getFileIcon(file.url)}
                          <span>{file.url.split('/').pop()}</span>
                          <a href={file.url} download><FaDownload /></a>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {attachments.length > 0 && (
        <div className="attachment-preview-top">
          {attachments.map((file, index) =>
            file.type.startsWith('image') ? (
              <img key={index} src={URL.createObjectURL(file)} alt="preview" className="chat-img-preview" />
            ) : (
              <div key={index} className="file-chip">
                {getFileIcon(file.type)}
                <span>{file.name}</span>
              </div>
            )
          )}
        </div>
      )}

      <div className="chat-input">
  <div className="input-wrapper">
<input
  type="text"
  placeholder="Send a message..."
  value={message}
  onChange={(e) => {
    setMessage(e.target.value);
    if (inputError) setInputError(false);
  }}
  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
  style={inputError ? { border: '1px solid red' } : {}}
/>
<div>
{user.currentDashboard === "seller" && (<p className='customOfferBtn' onClick={() => setShowPopup(true)}>Create custom offer</p>)}
    <FaPaperclip
      className="attach-icon"
      onClick={() => fileInputRef.current.click()}
    /></div>
  </div>

  <input
    type="file"
    ref={fileInputRef}
    style={{ display: 'none' }}
    onChange={handleFileChange}
    multiple
    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip"
  />

  <div className="input-actions">
    <button className="send-btn" onClick={handleSend} disabled={isSending}>
      {isSending ? <div className="spinner" /> : <FaPaperPlane />}
    </button>
  </div>
</div>

{showPopup && (
  <CustomOfferPopup
    sellerId={senderId}
    buyerId={receiverId}
    onClose={async () => {
      setShowPopup(false);
      try {
        const res = await fetch(`${baseUrl}/messages/conversation/${conversationId}`);
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error('Error refreshing messages:', err);
      }
    }}
  />
)}
{customOfferData && (
  <OrderPopup
    buyer={user}
    gigId={customOfferData.gigId}
    amount={customOfferData.amount}
    description={customOfferData.description}
    deliveryTime={customOfferData.deliveryTime}
    buyerId={customOfferData.buyerId}
    sellerId={customOfferData.sellerId}
    messageId={customOfferData.messageId}
    setShowPopup={() => setCustomOfferData(null)}
  />
)}

      {showZoomPopup && (
        isLoading ? (
          <LoadingPopup message={loadingMessage} icon={successIcon} onClose={() => setIsLoading(false)} />
        ) : (
          <ZoomPopup onClose={() => setShowZoomPopup(false)} onSubmit={handleZoomSubmit} />
        )
      )}
    </div>
  );
};

export default MessageChats;
