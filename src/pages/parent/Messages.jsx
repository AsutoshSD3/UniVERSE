import { useState } from 'react';
import { parentMessages } from '../../data/mockParentData';
import { MessageSquare, Send, EyeOff, ShieldCheck, User } from 'lucide-react';

export default function ParentMessages() {
  const [messages, setMessages] = useState(parentMessages);
  const [activeChat, setActiveChat] = useState(parentMessages[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages(prev => prev.map(chat => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          thread: [
            ...chat.thread,
            { sender: 'You', time: 'Just now', content: newMessage }
          ]
        };
      }
      return chat;
    }));
    setNewMessage('');
    
    // Update active chat reference for re-render
    setActiveChat(prev => ({
      ...prev,
      thread: [
        ...prev.thread,
        { sender: 'You', time: 'Just now', content: newMessage }
      ]
    }));
  };

  return (
    <div className="parent-messages-page animate-fade-in" style={{ height: 'calc(100vh - var(--topbar-height) - 40px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '16px' }}>
        <h1>Masked Parent-Teacher Communication</h1>
        <p>Secure, end-to-end encrypted messaging with faculty (Phone numbers hidden)</p>
      </div>

      <div className="glass-card" style={{ flex: 1, minHeight: 0, padding: 0, display: 'flex', overflow: 'hidden' }}>
        {/* Chat List (Sidebar) */}
        <div style={{ width: '320px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EyeOff size={16} className="text-orange" />
              Privacy Shield Active
            </h3>
            <p className="text-xs text-muted mt-1">Your contact details are masked.</p>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {messages.map(chat => (
              <div 
                key={chat.id}
                style={{ 
                  padding: '16px', 
                  borderBottom: '1px solid var(--border-color)', 
                  cursor: 'pointer',
                  background: activeChat.id === chat.id ? 'var(--bg-glass-hover)' : 'transparent',
                  borderLeft: activeChat.id === chat.id ? '4px solid var(--accent-blue)' : '4px solid transparent'
                }}
                onClick={() => setActiveChat(chat)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="font-bold text-sm">{chat.teacher}</span>
                  <span className="text-xs text-muted">{chat.date}</span>
                </div>
                <div className="text-xs text-muted mb-2">{chat.subject}</div>
                <div className="text-xs text-muted line-clamp-1">{chat.thread[chat.thread.length-1]?.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="avatar sm" style={{ background: 'var(--gradient-primary)' }}>
              <User size={16} color="white" />
            </div>
            <div>
              <div className="font-bold">{activeChat.teacher}</div>
              <div className="text-xs text-muted">{activeChat.subject} Faculty</div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-primary)' }}>
            {activeChat.thread.map((msg, idx) => {
              const isMe = msg.sender === 'You';
              return (
                <div key={idx} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start'
                }}>
                  <div className="text-xs text-muted mb-1" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {msg.sender} • {msg.time} {isMe && <ShieldCheck size={12} className="text-green" />}
                  </div>
                  <div style={{ 
                    padding: '10px 14px', 
                    borderRadius: 'var(--radius-md)',
                    background: isMe ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                    color: isMe ? 'white' : 'var(--text-primary)',
                    maxWidth: '80%',
                    borderBottomRightRadius: isMe ? 0 : 'var(--radius-md)',
                    borderBottomLeftRadius: isMe ? 'var(--radius-md)' : 0
                  }}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
            <form style={{ display: 'flex', gap: '8px' }} onSubmit={handleSend}>
              <input 
                type="text" 
                className="input-field" 
                style={{ flex: 1 }} 
                placeholder="Type your secure message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
