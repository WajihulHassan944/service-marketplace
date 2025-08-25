'use client';

import React, { useState, useEffect } from 'react';
import './EmailUI.css';
import {
  MdInbox, MdSend, MdDrafts, MdDelete, MdStar,
  MdSecurity, MdOutlineReply, MdMoreVert
} from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { baseUrl } from '@/const';
import withAdminAuth from '@/hooks/withAdminAuth';

const EmailUI = () => {
  const [emails, setEmails] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isComposeMode, setIsComposeMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [composeForm, setComposeForm] = useState({ subject: '', body: '' });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchEmails(selectedFolder);
  }, [selectedFolder]);

  useEffect(() => {
    fetch(`${baseUrl}/users/all`)
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

const markAsImportant = async (emailId) => {
  await fetch(`${baseUrl}/email/important/${emailId}`, {
    method: 'PATCH'
  });
  fetchEmails(selectedFolder);
};

const markAsStarred = async (emailId) => {
  await fetch(`${baseUrl}/email/starred/${emailId}`, {
    method: 'PATCH'
  });
  fetchEmails(selectedFolder);
};


const fetchEmails = async (folder) => {
  let res;
  let data;

  if (folder === 'Starred' || folder === 'Important') {
    // Get all emails for custom filters
    res = await fetch(`${baseUrl}/email`);
    data = await res.json();

    if (folder === 'Starred') {
      data = data.filter(email => email.isStarred);
    } else if (folder === 'Important') {
      data = data.filter(email => email.isImportant);
    }
  } else {
    // Built-in folders: Inbox, Sent, Trash, Draft
    res = await fetch(`${baseUrl}/email?folder=${folder}`);
    data = await res.json();
  }

  setEmails(data);
  setSelectedEmail(data[0] || null);
};

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setIsComposeMode(false);
    setIsReplyMode(false);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setIsComposeMode(false);
    setIsReplyMode(false);
  };

  const toggleUserSelect = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    // Determine whether it's a reply or a new message
    if (isReplyMode && selectedEmail) {
      const extractedEmail = selectedEmail.isContactForm
        ? selectedEmail.body.match(/\(([^)]+)\)/)?.[1] || ''
        : selectedEmail.sender?.email;

      await fetch(`${baseUrl}/email/reply/${extractedEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: "6836a8ab3503274446274b32",
          message: composeForm.body || 'Thanks for contacting us!'
        })
      });
    } else {
      await fetch(`${baseUrl}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: "6836a8ab3503274446274b32",
          recipientIds: selectedUsers,
          subject: composeForm.subject,
          body: composeForm.body
        })
      });
    }

    setComposeForm({ subject: '', body: '' });
    setIsComposeMode(false);
    setIsReplyMode(false);
    fetchEmails('Sent');
  };

  const handleReply = () => {
    setIsComposeMode(true);
    setIsReplyMode(true);
    setComposeForm({ subject: `Re: ${selectedEmail.subject}`, body: '' });
  };

  const moveToTrash = async (emailId) => {
    await fetch(`${baseUrl}/email/trash/${emailId}`, { method: 'PATCH' });
    fetchEmails(selectedFolder);
  };

  const renderEmailList = () => (
    <section className="email-list">
      {isComposeMode && !isReplyMode ? (
        <>
          <div className="select-all">
            <input
              type="checkbox"
              checked={selectedUsers.length === users.length}
              onChange={() =>
                setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))
              }
            /> Select All
          </div>
          {users.map(user => (
            <div key={user._id} className="email-item">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => toggleUserSelect(user._id)}
              />
              <strong>{user.firstName}</strong>
              <span>{user.email}</span>
            </div>
          ))}
        </>
      ) : emails.length ? (
        emails.map(email => (
          <div
            key={email._id}
            className={`email-item ${selectedEmail?._id === email._id ? 'active' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <strong>{email.isContactForm ? email.body.split('(')[0] : email.sender?.firstName || 'Anonymous'}</strong>
            <span>{new Date(email.createdAt).toLocaleTimeString()}</span>
          </div>
        ))
      ) : (
        <p className="empty-folder">No messages found in {selectedFolder}</p>
      )}
    </section>
  );

  const renderEmailContent = () => (
    <section className="email-content">
      <header>
        <h2>{selectedEmail.subject}</h2>
        <div className="sender">
          <img src={selectedEmail.sender?.profileUrl || '/assets/myimg.jpg'} alt="avatar" className="avatar" />
          <div>
            <strong>{selectedEmail.isContactForm ? selectedEmail.body.split('(')[0] : selectedEmail.sender?.firstName}</strong>
            <p>{selectedEmail.isContactForm
              ? selectedEmail.body.match(/\(([^)]+)\)/)?.[1]
              : selectedEmail.sender?.email}</p>
          </div>
        </div>
        <div className="dropdown">
  <MdMoreVert onClick={() => setDropdownOpen(!dropdownOpen)} />
  {dropdownOpen && selectedEmail && (
    <div className="dropdown-menu-emails">
      <button onClick={() => moveToTrash(selectedEmail._id)} className='email-button'>Move to Trash</button>
      <button onClick={() => markAsImportant(selectedEmail._id)} className='email-button'>Mark as Important</button>
      <button onClick={() => markAsStarred(selectedEmail._id)} className='email-button'>Mark as Starred</button>
    </div>
  )}
</div>
 </header>
      <pre>{selectedEmail.body}</pre>
      <div className="actions">
        <button onClick={handleReply}><MdOutlineReply /> Reply</button>
      </div>
    </section>
  );

  const renderCompose = () => (
    <section className="email-content">
      <h2>{isReplyMode ? 'Reply to Message' : 'Compose Email'}</h2>
      {!isReplyMode && (
        <input
          type="text"
          placeholder="Subject"
          value={composeForm.subject}
          onChange={e => setComposeForm({ ...composeForm, subject: e.target.value })}
        />
      )}
      <textarea
        placeholder="Message"
        value={composeForm.body}
        onChange={e => setComposeForm({ ...composeForm, body: e.target.value })}
      ></textarea>
      <button className="btn-primary" onClick={handleSend}>Send</button>
    </section>
  );

  return (
    <div className="email-ui">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {isMobile && (
          <FaTimes onClick={toggleSidebar} size={24} style={{ cursor: 'pointer' }} />
        )}
        <button className="compose-btn" onClick={() => {
          setIsComposeMode(true);
          setIsReplyMode(false);
          setComposeForm({ subject: '', body: '' });
        }}>
          Compose
        </button>
        <nav>
          <ul>
            <li onClick={() => handleFolderClick('Inbox')}><MdInbox /> Inbox</li>
            <li onClick={() => handleFolderClick('Sent')}><MdSend /> Sent</li>
            <li onClick={() => handleFolderClick('Trash')}><MdDelete /> Trash</li>
          </ul>
          <h4>IMPORTANT</h4>
          <ul>
            <li onClick={() => handleFolderClick('Starred')}><MdStar /> Starred</li>
            <li onClick={() => handleFolderClick('Important')}><MdSecurity /> Important</li>
          </ul>
        </nav>
      </aside>

      {renderEmailList()}
      {isComposeMode ? renderCompose() : selectedEmail && renderEmailContent()}
    </div>
  );
};

export default withAdminAuth(EmailUI);
