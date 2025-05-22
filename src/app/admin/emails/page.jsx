'use client';
import React, { useState, useEffect } from 'react';
import './EmailUI.css';
import {
  MdInbox, MdSend, MdDrafts, MdReport, MdDelete, MdLabel, MdStar,
  MdSecurity, MdOutlineReply, MdForward
} from 'react-icons/md';
import { AiFillFilePdf, AiOutlineFileZip } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';

const emailData = [
  {
    id: 1,
    name: 'James Smith',
    subject: 'Kindly check this latest updated',
    time: '04:00pm',
    label: 'Promotional',
    content: `Hello Andrew,\n\nLorem ipsum dolor sit amet...`,
    attachments: [
      { name: 'service-task.pdf', type: 'pdf', size: '2 MB', date: '2 Dec 2024' },
      { name: 'work-project.zip', type: 'zip', size: '2 MB', date: '2 Dec 2024' }
    ]
  },
  {
    id: 2,
    name: 'Katherine Flintoff',
    subject: 'Newsletter from AdminMart Team',
    time: '04:00pm',
    label: 'Social'
  },
  {
    id: 3,
    name: 'Bianca Macdowells',
    subject: 'Kindly check this latest updated',
    time: '04:00pm',
    label: 'Health'
  },
  {
    id: 4,
    name: 'Michael Knight',
    subject: 'Developer Community needs help',
    time: '04:00pm',
    label: 'Social'
  }
];

const EmailUI = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'content'

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setViewMode('all');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const handleEmailSelect = (id) => {
    setSelectedId(id);
    if (isMobile) setViewMode('content');
  };
  const handleBack = () => setViewMode('list');

  const allSelected = selectedEmails.length === emailData.length;
  const toggleSelectAll = () => {
    setSelectedEmails(allSelected ? [] : emailData.map(email => email.id));
  };
  const toggleEmailSelection = (id) => {
    setSelectedEmails(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const selectedEmail = emailData.find(email => email.id === selectedId);

  return (
    <div className="email-ui">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header-email">
          <GiHamburgerMenu onClick={toggleSidebar} size={24} style={{ cursor: 'pointer' }} />
          <h2>Inbox</h2>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
  {isMobile && (
       <FaTimes onClick={toggleSidebar} size={24} style={{ cursor: 'pointer' }} />
  )}
        <button className="compose-btn">Compose</button>
        <nav>
          <ul>
            <li><MdInbox /> Inbox</li>
            <li><MdSend /> Sent</li>
            <li><MdDrafts /> Draft</li>
            <li><MdReport /> Spam</li>
            <li><MdDelete /> Trash</li>
          </ul>
          <h4>IMPORTANT</h4>
          <ul>
            <li><MdStar /> Starred</li>
            <li><MdSecurity /> Important</li>
          </ul>
          <h4>LABELS</h4>
          <ul>
            <li className="label label-promo"><MdLabel /> Promotional</li>
          </ul>
        </nav>
      </aside>

      {/* Email List */}
      {(viewMode === 'list' || viewMode === 'all') && (
        <section className="email-list">
          <div className="select-all">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} /> Select All
          </div>
          {emailData.map(email => (
            <div
              key={email.id}
              className={`email-item ${selectedId === email.id ? 'active' : ''}`}
              onClick={() => handleEmailSelect(email.id)}
            >
              <input
                type="checkbox"
                checked={selectedEmails.includes(email.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleEmailSelection(email.id);
                }}
              />
              <div>
                <strong>{email.name}</strong>
              </div>
              <span className={`label label-${email.label.toLowerCase()}`}>{email.label}</span>
              <span>{email.time}</span>
            </div>
          ))}
        </section>
      )}

      {/* Email Content */}
      {(viewMode === 'content' || viewMode === 'all') && selectedEmail && (
        <section className="email-content">
          {isMobile && <button className="back-btn" onClick={handleBack}>← Back</button>}
          <header>
            <h2>{selectedEmail.subject}</h2>
            <div className="sender">
              <img src="/assets/myimg.jpg" alt="avatar" className="avatar" />
              <div>
                <strong>{selectedEmail.name}</strong>
                <p>hello@loremipsum.com</p>
              </div>
              <span className={`label label-${selectedEmail.label.toLowerCase()}`}>{selectedEmail.label}</span>
            </div>
          </header>
          <pre>{selectedEmail.content}</pre>
          {selectedEmail.attachments?.length > 0 && (
            <footer>
              <h4>Attachments</h4>
              <div className="attachments">
                {selectedEmail.attachments.map((file, idx) => (
                  <div key={idx} className="attachment">
                    <div className="file-icon">
                      {file.type === 'pdf' ? <AiFillFilePdf size={32} /> : <AiOutlineFileZip size={32} />}
                    </div>
                    <div>
                      <p>{file.name}</p>
                      <small>{file.size} • {file.date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </footer>
          )}
          <div className="actions">
            <button><MdOutlineReply /> Reply</button>
            <button><MdForward /> Forward</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default EmailUI;
