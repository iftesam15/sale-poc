import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WorkflowSimulator from './components/WorkflowSimulator';
import OmnichannelChat from './components/OmnichannelChat';
import VariantInventory from './components/VariantInventory';
import DigitalOrders from './components/DigitalOrders';
import CustomerCRM from './components/CustomerCRM';
import MarketingStudio from './components/MarketingStudio';
import AICopilotIntelligence from './components/AICopilotIntelligence';
import ArchitectureViewer from './components/ArchitectureViewer';

import { 
  SECTORS, 
  INITIAL_INVENTORY, 
  INITIAL_CUSTOMERS, 
  INITIAL_ORDERS, 
  INITIAL_COPILOT_SCHEDULES, 
  INITIAL_CHAT_THREADS 
} from './data/mockData';

export default function App() {
  const [selectedSector, setSelectedSector] = useState('boutique');
  const [activeTab, setActiveTab] = useState('workflow');
  const [theme, setTheme] = useState('dark');

  // Application unified state store
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [copilotSchedules, setCopilotSchedules] = useState(INITIAL_COPILOT_SCHEDULES);
  const [chatThreads, setChatThreads] = useState(INITIAL_CHAT_THREADS);

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Reset demo state
  const handleResetData = () => {
    setInventory(INITIAL_INVENTORY);
    setCustomers(INITIAL_CUSTOMERS);
    setOrders(INITIAL_ORDERS);
    setCopilotSchedules(INITIAL_COPILOT_SCHEDULES);
    setChatThreads(INITIAL_CHAT_THREADS);
  };

  // ACID Atomic Order Creation & Decrement Transaction
  const handleAtomicOrderCreation = ({ 
    customer, 
    channel, 
    variant_id, 
    product_name, 
    price_bdt, 
    payment_method 
  }) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = price_bdt + 100; // adding ৳100 shipping

    // 1. Decrement inventory stock atomically
    setInventory(prev => prev.map(item => {
      if (item.variant_id === variant_id) {
        return { ...item, stock_qty: Math.max(0, item.stock_qty - 1) };
      }
      return item;
    }));

    // 2. Insert into orders
    const newOrder = {
      id: orderId,
      customer_id: customer.phone ? (customers.find(c => c.phone === customer.phone)?.id || 'CUST-NEW') : 'CUST-NEW',
      customer_name: customer.name,
      phone: customer.phone,
      variant_id: variant_id,
      product_name: product_name,
      quantity: 1,
      unit_price: price_bdt,
      delivery_fee: 100,
      total_price_bdt: totalAmount,
      payment_status: payment_method === 'COD' ? 'COD_PENDING' : 'BKASH_VERIFIED',
      trx_id: payment_method === 'COD' ? 'N/A (Cash on Delivery)' : `BK${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      delivery_status: 'CONFIRMED',
      courier: 'Steadfast Courier',
      tracking_code: `ST-${Math.floor(100000 + Math.random() * 900000)}`,
      address: customer.city || 'Dhaka Metropolitan Area',
      created_at: 'Just Now',
    };

    setOrders(prev => [newOrder, ...prev]);

    // 3. Upsert customer CRM
    setCustomers(prev => {
      const existing = prev.find(c => c.phone === customer.phone);
      if (existing) {
        return prev.map(c => {
          if (c.phone === customer.phone) {
            return {
              ...c,
              orders_count: c.orders_count + 1,
              total_spent_bdt: c.total_spent_bdt + totalAmount,
              last_active: 'Just now',
            };
          }
          return c;
        });
      } else {
        const newCust = {
          id: `CUST-00${prev.length + 1}`,
          name: customer.name,
          phone: customer.phone,
          channel: channel || 'whatsapp',
          orders_count: 1,
          total_spent_bdt: totalAmount,
          tier: 'New Customer',
          city: customer.city || 'Dhaka',
          notes: 'Acquired through automated 5-step transaction sequence.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          last_active: 'Just now',
        };
        return [newCust, ...prev];
      }
    });

    // 4. Schedule Copilot Post-Delivery follow-up
    const newSchedule = {
      id: `SCH-${Date.now().toString().slice(-4)}`,
      customer_id: newOrder.customer_id,
      customer_name: customer.name,
      order_id: orderId,
      scheduled_date: '2026-10-06',
      type: 'POST_DELIVERY_REVIEW',
      channel: channel || 'whatsapp',
      message_draft: `Assalamu Alaikum ${customer.name.split(' ')[0]}! Apnar parcel deliver hoyeche. Product kemon laglo janaben please?`,
      status: 'SCHEDULED',
    };

    setCopilotSchedules(prev => [newSchedule, ...prev]);
  };

  // Convert Chat conversation directly into Digital Order
  const handleConvertChatToOrder = ({ customer, variant, channel }) => {
    handleAtomicOrderCreation({
      customer: {
        name: customer.name,
        phone: customer.phone,
        city: customer.city || 'Dhaka',
      },
      channel: channel || 'whatsapp',
      variant_id: variant.variant_id,
      product_name: variant.product_name,
      price_bdt: variant.price_bdt,
      payment_method: 'COD',
    });
  };

  // Counts for navigation badges
  const currentSectorObj = SECTORS.find(s => s.id === selectedSector) || SECTORS[0];
  const sectorInventory = inventory.filter(i => i.sector === selectedSector);
  const lowStockCount = sectorInventory.filter(i => i.stock_qty <= i.safety_threshold).length;
  const unreadChatsCount = chatThreads.reduce((sum, t) => sum + (t.unread || 0), 0);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_price_bdt || 0), 0);

  return (
    <div className="app-container">
      {/* Top Brand & System Bar */}
      <Header 
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        onResetData={handleResetData}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Navigation across 3 Pillars and Architecture */}
      <Navigation 
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={{
          unreadChats: unreadChatsCount,
          lowStockItems: lowStockCount,
        }}
      />

      {/* Main Container */}
      <main className="main-content">
        {/* Hero Context Banner */}
        <section className="hero-banner-card">
          <div className="hero-banner-text">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: currentSectorObj.color, fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
              <span>TBOP Core Foundation</span>
              <span>•</span>
              <span>Sector Config: {currentSectorObj.name}</span>
            </div>
            <h2>Unify Sales, Inventory, and Social Chats into 24/7 Intelligent Automation</h2>
            <p>
              Transforming Bangladeshi SME retail operations from manual delays (FB Messenger, WhatsApp, spreadsheets, paper notebooks) 
              into an automated transaction engine with atomic inventory synchronization, instant quotes, and predictive retail copilot.
            </p>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-label">Platform GMV</span>
                <span className="hero-stat-value cyan">৳{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-label">Digital Orders</span>
                <span className="hero-stat-value emerald">{orders.length} Fulfilled</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-label">Sector SKUs</span>
                <span className="hero-stat-value">{sectorInventory.length} Active</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-label">Stock Safety</span>
                <span className={`hero-stat-value ${lowStockCount > 0 ? 'amber' : 'emerald'}`}>
                  {lowStockCount > 0 ? `${lowStockCount} Low Alert` : 'All Healthy'}
                </span>
              </div>
            </div>
          </div>

          <div className="hero-banner-visual">
            <img 
              src="/telesto_brand_hero.jpg" 
              alt="Telesto AI Platform Dashboard Overview" 
              className="hero-banner-img"
            />
          </div>
        </section>

        {/* View Switcher by Tab */}
        {activeTab === 'workflow' && (
          <WorkflowSimulator 
            inventory={sectorInventory}
            onAtomicOrderCreation={handleAtomicOrderCreation}
            selectedSector={selectedSector}
          />
        )}

        {activeTab === 'chat' && (
          <OmnichannelChat 
            chatThreads={chatThreads}
            setChatThreads={setChatThreads}
            inventory={inventory}
            customers={customers}
            onConvertChatToOrder={handleConvertChatToOrder}
          />
        )}

        {activeTab === 'inventory' && (
          <VariantInventory 
            inventory={inventory}
            setInventory={setInventory}
            selectedSector={selectedSector}
          />
        )}

        {activeTab === 'orders' && (
          <DigitalOrders 
            orders={orders}
            setOrders={setOrders}
            inventory={inventory}
            customers={customers}
          />
        )}

        {activeTab === 'crm' && (
          <CustomerCRM 
            customers={customers}
            setCustomers={setCustomers}
            orders={orders}
          />
        )}

        {activeTab === 'marketing' && (
          <MarketingStudio 
            selectedSector={selectedSector}
            inventory={sectorInventory}
          />
        )}

        {activeTab === 'copilot' && (
          <AICopilotIntelligence 
            orders={orders}
            inventory={inventory}
            customers={customers}
            copilotSchedules={copilotSchedules}
            selectedSector={selectedSector}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureViewer 
            inventory={inventory}
            customers={customers}
            orders={orders}
            copilotSchedules={copilotSchedules}
          />
        )}
      </main>

      {/* Enterprise Platform Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Telesto AI Platform (TBOP Core)</span>
            <span>•</span>
            <span>Boutique Workflow Engineering POC</span>
            <span>•</span>
            <span style={{ color: 'var(--cyan-primary)' }}>React 19 + Vanilla CSS Architecture</span>
          </div>
          <div>
            <span>Targeting Emerging SME Retail Markets • Dhakai Jamdani, Jute Crafts & Fashion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
