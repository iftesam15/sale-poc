import React from 'react';
import { 
  Zap, 
  MessageSquare, 
  Package, 
  ShoppingBag, 
  Users, 
  Megaphone, 
  BrainCircuit, 
  Database
} from 'lucide-react';

export const TABS = [
  { id: 'workflow', label: '5-Step Workflow Flow', pillar: 'CORE TRANSFORMATION', icon: Zap },
  { id: 'chat', label: 'Omnichannel AI Inbox', pillar: 'SELL', icon: MessageSquare },
  { id: 'inventory', label: 'Variant Inventory Matrix', pillar: 'OPERATE', icon: Package },
  { id: 'orders', label: 'Digital Orders & Payments', pillar: 'OPERATE', icon: ShoppingBag },
  { id: 'crm', label: 'Unified Customer CRM', pillar: 'SELL', icon: Users },
  { id: 'marketing', label: 'AI Marketing Studio', pillar: 'SELL', icon: Megaphone },
  { id: 'copilot', label: 'Executive Copilot & Demand', pillar: 'INTELLIGENCE', icon: BrainCircuit },
  { id: 'architecture', label: 'TBOP Architecture & Schemas', pillar: 'FOUNDATION', icon: Database },
];

export default function Navigation({ activeTab, onSelectTab, counts }) {
  return (
    <nav className="sub-nav-bar">
      <div className="sub-nav-inner">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span className="pillar-tag">{tab.pillar}</span>
              {tab.id === 'chat' && counts.unreadChats > 0 && (
                <span style={{ 
                  background: 'var(--rose-primary)', 
                  color: '#fff', 
                  fontSize: '0.68rem', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '999px',
                  fontWeight: 700 
                }}>
                  {counts.unreadChats}
                </span>
              )}
              {tab.id === 'inventory' && counts.lowStockItems > 0 && (
                <span style={{ 
                  background: 'var(--amber-primary)', 
                  color: '#000', 
                  fontSize: '0.68rem', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '999px',
                  fontWeight: 700 
                }}>
                  {counts.lowStockItems} low
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
