import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Globe, 
  Send, 
  BookOpen, 
  Tag, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { MARKETING_PRESETS } from '../data/mockData';

export default function MarketingStudio({ selectedSector, inventory }) {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [campaignPosts, setCampaignPosts] = useState(() => MARKETING_PRESETS[selectedSector] || MARKETING_PRESETS['boutique']);

  // Sync campaigns whenever the sector changes
  useEffect(() => {
    const updated = MARKETING_PRESETS[selectedSector] || MARKETING_PRESETS['boutique'];
    setCampaignPosts(updated);
    setActivePresetIndex(0);
  }, [selectedSector]);

  const activePost = campaignPosts[activePresetIndex] || campaignPosts[0] || {
    title: 'Campaign',
    content: '',
    tags: [],
    cta: 'Learn More'
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustomCampaign = () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generatedPost = {
        title: `AI Generated: ${customPrompt.slice(0, 30)}...`,
        content: `✨ ${customPrompt}
🌸 প্রিমিয়াম কোয়ালিটি এবং নিখুঁত ফিনিশিং যা আপনার লুকে আনবে নতুন মাত্রা!
📦 ক্যাশ অন ডেলিভারি (COD) সারা বাংলাদেশে এবং bKash পেমেন্টে আকর্ষণীয় অফার।
📞 অর্ডার করতে এখনই ইনবক্স করুন অথবা কল করুন আমাদের হটলাইনে!
#TelestoAI #MadeInBangladesh #BangladeshiSME #FestiveVibes`,
        tags: ['New Drop', 'Limited Stock', 'Festive BD'],
        cta: 'Order Now',
      };

      setCampaignPosts(prev => [generatedPost, ...prev]);
      setActivePresetIndex(0);
      setIsGenerating(false);
      setCustomPrompt('');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Header */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Megaphone size={20} color="var(--purple-primary)" />
              AI Social Marketing Studio & Storytelling Generator
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              SELL Pillar: Automated bilingual social campaigns, export catalogues & artisanal storytelling
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="status-badge in-stock">
              <Sparkles size={13} />
              <span>Multi-Modal Prompt Engine Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Campaign Generator, Right Social Mockup Preview */}
      <div className="marketing-grid">
        {/* Left: Campaign Presets & AI Generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0, width: '100%' }}>
          {/* AI Generator Box */}
          <div className="card" style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--cyan-primary)" />
              Instant AI Campaign Generator
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <textarea 
                className="form-textarea" 
                rows={2}
                placeholder="e.g. Write an Eid festive campaign for Handloom Jamdani in Banglish with 10% discount..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', flex: '1 1 220px' }}>
                  Supports: Bangla, Banglish, English • Automatic Hashtag & CTA optimization
                </span>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={handleGenerateCustomCampaign}
                  disabled={isGenerating || !customPrompt.trim()}
                  style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  <Sparkles size={14} />
                  <span>{isGenerating ? 'Synthesizing Copy...' : 'Generate Social Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preset Selector */}
          <div className="card" style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Pre-Trained Sector Campaigns ({campaignPosts.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: 0 }}>
              {campaignPosts.map((post, idx) => {
                const isActive = idx === activePresetIndex;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActivePresetIndex(idx)}
                    style={{ 
                      padding: '0.85rem 1rem', 
                      borderRadius: 'var(--radius-md)', 
                      background: isActive ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-secondary)',
                      border: `1px solid ${isActive ? 'var(--cyan-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minWidth: 0,
                      overflow: 'hidden',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {post.title}
                      </span>
                      <span className="sku-badge" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                        {post.tags[0]}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '0.78rem', 
                      color: 'var(--text-muted)', 
                      marginTop: '0.35rem', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                      width: '100%'
                    }}>
                      {post.content.replace(/\n/g, ' ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Social Post Mockup (Facebook / Instagram) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0, width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1877f2', flexShrink: 0 }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Facebook / Instagram Feed Preview</span>
            </div>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => handleCopy(activePost.content)}
              style={{ flexShrink: 0 }}
            >
              {copied ? <Check size={14} color="var(--emerald-primary)" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Caption'}</span>
            </button>
          </div>

          {/* Social Card Frame */}
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-medium)', 
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Post Header */}
            <div style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid var(--border-subtle)', minWidth: 0 }}>
              <div style={{ 
                width: 38, 
                height: 38, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#fff',
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                TA
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Telesto Boutique BD</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Sponsored • Dhaka, Bangladesh</div>
              </div>
            </div>

            {/* Post Media Image */}
            <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
              <img 
                src={selectedSector === 'handicrafts' ? '/jute_handicrafts.jpg' : '/jamdani_saree.jpg'} 
                alt="Post creative" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 10, 
                right: 10, 
                background: 'rgba(0,0,0,0.7)', 
                backdropFilter: 'blur(6px)',
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={12} color="#22d3ee" />
                <span>AI Storytelling Creative</span>
              </div>
            </div>

            {/* Post Body Text */}
            <div style={{ 
              padding: '1rem', 
              whiteSpace: 'pre-line', 
              fontSize: '0.86rem', 
              lineHeight: 1.55,
              wordBreak: 'break-word',
              overflowWrap: 'anywhere'
            }}>
              {activePost.content}
            </div>

            {/* Tags row */}
            <div style={{ padding: '0 1rem 0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {activePost.tags.map((tag, tIdx) => (
                <span key={tIdx} className="sku-badge" style={{ fontSize: '0.72rem', color: 'var(--cyan-primary)' }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post CTA Footer */}
            <div style={{ 
              padding: '0.75rem 1rem', 
              background: 'rgba(0, 0, 0, 0.2)', 
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Heart size={15} color="var(--rose-primary)" /> 382
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MessageCircle size={15} /> 49 comments
                </span>
              </div>

              <button className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                <Send size={13} />
                <span>Send WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
