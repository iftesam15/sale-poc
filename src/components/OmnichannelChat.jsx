import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  Sparkles, 
  ShoppingCart, 
  Check, 
  Phone, 
  Clock, 
  Package, 
  ShieldCheck, 
  ExternalLink,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OmnichannelChat({ 
  chatThreads, 
  setChatThreads, 
  inventory, 
  customers, 
  onConvertChatToOrder 
}) {
  const [selectedThreadId, setSelectedThreadId] = useState(chatThreads[0]?.id || 'thread-01');
  const [channelFilter, setChannelFilter] = useState('all');
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const filteredThreads = chatThreads.filter(thread => {
    if (channelFilter === 'all') return true;
    return thread.channel === channelFilter;
  });

  const activeThread = chatThreads.find(t => t.id === selectedThreadId) || chatThreads[0];
  const targetCustomer = customers.find(c => c.id === activeThread?.customer_id) || {
    name: activeThread?.customer_name,
    phone: activeThread?.phone,
    tier: 'Regular Customer',
    total_spent_bdt: 0,
    orders_count: 0,
  };

  const detectedVariant = inventory.find(i => i.variant_id === activeThread?.detected_variant) || inventory[0];

  // Send a merchant/agent manual message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'merchant',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          messages: [...t.messages, newMsg],
          last_message_time: 'Just now',
        };
      }
      return t;
    }));

    setInputMessage('');
  };

  // Trigger 24/7 AI Smart Responder
  const triggerAiResponse = () => {
    setIsAiTyping(true);

    setTimeout(() => {
      let aiText = '';
      if (detectedVariant) {
        aiText = `Assalamu Alaikum! ${detectedVariant.product_name} (${detectedVariant.color || 'Standard'}) ekhon amader warehouse-e stock ache (${detectedVariant.stock_qty} pieces available). Price ৳${detectedVariant.price_bdt.toLocaleString()} BDT. Cash on Delivery ba bKash payment e order confirm korte chaile kindly apnar delivery address & contact number din!`;
      } else {
        aiText = 'Thank you for reaching out! Amader sales team apnar message ti receive koreche. Kivabe help korte pari janaben please?';
      }

      const aiMsg = {
        id: `msg-${Date.now()}`,
        sender: 'ai_copilot',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_automated: true,
      };

      setChatThreads(prev => prev.map(t => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            unread: 0,
            messages: [...t.messages, aiMsg],
            last_message_time: 'Just now',
          };
        }
        return t;
      }));

      setIsAiTyping(false);
    }, 600);
  };

  // Simulate customer replying back
  const simulateCustomerInquiry = () => {
    const customerReplies = [
      'Ami ektar order confirm korchi. Cash on Delivery te pathiye din please. Address: House 12, Road 4, Dhanmondi.',
      'Panjabi ta size 42 ki ache? Emergency deliver kora jabe ajke sham e?',
      'bKash payment number ta ektu pathaben please? Advance payment kore dibo.',
      'Saree ta ki original Dhakai Jamdani? Blouse piece ki shathe thakbe?',
    ];

    const randomReply = customerReplies[Math.floor(Math.random() * customerReplies.length)];

    const incoming = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text: randomReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unread: t.unread + 1,
          messages: [...t.messages, incoming],
          last_message_time: 'Just now',
          intent: 'READY_TO_BUY',
        };
      }
      return t;
    }));
  };

  const handleCreateOrderFromChat = () => {
    onConvertChatToOrder({
      customer: targetCustomer,
      variant: detectedVariant,
      channel: activeThread.channel,
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="inbox-layout">
      {/* 1. Left Column: Multi-channel threads list */}
      <div className="thread-list-pane">
        <div className="thread-list-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={17} color="var(--cyan-primary)" />
              Omnichannel Inbox
            </h3>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={simulateCustomerInquiry}
              title="Simulate incoming customer message"
            >
              <Plus size={13} />
              <span>Simulate Lead</span>
            </button>
          </div>

          <div className="channel-filter-pills">
            <button 
              className={`filter-pill ${channelFilter === 'all' ? 'active' : ''}`}
              onClick={() => setChannelFilter('all')}
            >
              All Channels ({chatThreads.length})
            </button>
            <button 
              className={`filter-pill ${channelFilter === 'whatsapp' ? 'active' : ''}`}
              onClick={() => setChannelFilter('whatsapp')}
            >
              WhatsApp
            </button>
            <button 
              className={`filter-pill ${channelFilter === 'messenger' ? 'active' : ''}`}
              onClick={() => setChannelFilter('messenger')}
            >
              FB Messenger
            </button>
          </div>
        </div>

        <div className="thread-items-container">
          {filteredThreads.map((thread) => {
            const isActive = thread.id === activeThread?.id;
            const lastMsg = thread.messages[thread.messages.length - 1];

            return (
              <div 
                key={thread.id}
                className={`thread-item-row ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedThreadId(thread.id);
                  // Mark read
                  setChatThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: 0 } : t));
                }}
              >
                <img 
                  src={thread.avatar} 
                  alt={thread.customer_name} 
                  className="thread-avatar" 
                />

                <div className="thread-meta">
                  <div className="thread-top-line">
                    <span className="thread-name">{thread.customer_name}</span>
                    <span className="thread-time">{thread.last_message_time}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className={`channel-tag-icon ${thread.channel}`}>
                      {thread.channel === 'whatsapp' ? '● WhatsApp' : '● Messenger'}
                    </span>
                    <span className="thread-preview-text">
                      {lastMsg?.text || 'No messages yet'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <span className="sku-badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                      {thread.detected_variant}
                    </span>
                    {thread.unread > 0 && (
                      <span style={{ 
                        background: 'var(--cyan-primary)', 
                        color: '#000', 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        borderRadius: '999px', 
                        padding: '0.1rem 0.4rem' 
                      }}>
                        {thread.unread} new
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Column: Active Chat Stream & AI Copilot Responder */}
      <div className="chat-conversation-pane">
        <div className="chat-header-bar">
          <div className="chat-header-left">
            <img 
              src={activeThread?.avatar} 
              alt={activeThread?.customer_name} 
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {activeThread?.customer_name}
                <span className={`channel-tag-icon ${activeThread?.channel}`}>
                  {activeThread?.channel === 'whatsapp' ? 'WhatsApp' : 'Messenger'}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {activeThread?.phone} • {targetCustomer.city || 'Dhaka'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="status-badge in-stock">
              <Bot size={13} />
              <span>24/7 AI Responder ON</span>
            </span>
          </div>
        </div>

        {/* Message bubbles */}
        <div className="chat-bubble-stream">
          {activeThread?.messages.map((msg) => {
            const isCustomer = msg.sender === 'customer';
            const isAi = msg.sender === 'ai_copilot';

            return (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {isAi && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--cyan-hover)' }}>
                    <Sparkles size={13} />
                    <strong>Telesto 24/7 AI Copilot</strong>
                  </div>
                )}
                <div>{msg.text}</div>
                <div className="chat-bubble-footer">
                  <span>{msg.time}</span>
                  {isAi && <span>• Automated 140ms</span>}
                </div>
              </div>
            );
          })}

          {isAiTyping && (
            <div className="chat-bubble ai_copilot" style={{ width: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <span className="pulse-dot"></span>
                <span>Telesto AI is drafting intelligent response...</span>
              </div>
            </div>
          )}
        </div>

        {/* AI Copilot Suggestion Bar */}
        <div className="ai-copilot-assist-bar">
          <div className="ai-copilot-prompt-preview">
            <Sparkles size={15} />
            <span>AI Suggestion: Send verified stock quote for <strong>{detectedVariant?.variant_id}</strong> (৳{detectedVariant?.price_bdt.toLocaleString()})</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={triggerAiResponse}>
              <Bot size={14} />
              <span>1-Click AI Reply</span>
            </button>
            <button className="btn btn-success btn-sm" onClick={handleCreateOrderFromChat}>
              <ShoppingCart size={14} />
              <span>Create Order</span>
            </button>
          </div>
        </div>

        {/* Message Input */}
        <div className="chat-input-bar">
          <input 
            type="text" 
            className="chat-text-input"
            placeholder="Type a manual reply or ask AI to answer..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button className="btn btn-primary" onClick={handleSendMessage} style={{ padding: '0.65rem 1rem' }}>
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* 3. Right Column: TBOP Live Context Inspector */}
      <div className="inbox-side-drawer">
        {/* Customer CRM Profile card */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Customer CRM Profile
            </span>
            <span className="status-badge in-stock">{targetCustomer.tier || 'Frequent'}</span>
          </div>

          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem' 
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{targetCustomer.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{targetCustomer.phone}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{targetCustomer.city}</div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.5rem', 
              marginTop: '0.5rem', 
              borderTop: '1px solid var(--border-subtle)', 
              paddingTop: '0.5rem',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Orders: </span>
                <strong>{targetCustomer.orders_count || 1}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Spent: </span>
                <strong style={{ color: 'var(--cyan-primary)' }}>৳{(targetCustomer.total_spent_bdt || 0).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time SKU Variant Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Detected SKU In Conversation
            </span>
            <span className="sku-badge">{detectedVariant?.variant_id}</span>
          </div>

          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem' 
          }}>
            {detectedVariant?.image_url && (
              <img 
                src={detectedVariant.image_url} 
                alt={detectedVariant.product_name} 
                style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
              />
            )}

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{detectedVariant?.product_name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {detectedVariant?.size} • {detectedVariant?.color}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan-primary)' }}>
                ৳{detectedVariant?.price_bdt.toLocaleString()}
              </span>

              <span className={`status-badge ${
                detectedVariant?.stock_qty <= detectedVariant?.safety_threshold ? 'low-stock' : 'in-stock'
              }`}>
                {detectedVariant?.stock_qty} in stock
              </span>
            </div>

            <button 
              className="btn btn-primary btn-sm" 
              style={{ width: '100%', marginTop: '0.25rem' }}
              onClick={handleCreateOrderFromChat}
            >
              <ShoppingCart size={14} />
              <span>Instant Digital Order (COD / bKash)</span>
            </button>
          </div>
        </div>

        {/* Payment & Logistics Methods */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)', 
          padding: '0.85rem',
          fontSize: '0.78rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          color: 'var(--text-dim)'
        }}>
          <div style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Integrated Payment & Couriers</div>
          <div>• COD (Cash on Delivery) Dhaka / Nationwide</div>
          <div>• bKash Merchant / Personal with TrxID check</div>
          <div>• Courier API: Steadfast, Pathao, RedX</div>
        </div>
      </div>
    </div>
  );
}
