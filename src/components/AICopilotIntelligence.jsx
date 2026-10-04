import React, { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  MessageSquare, 
  CalendarClock, 
  Send, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  Layers
} from 'lucide-react';

export default function AICopilotIntelligence({ 
  orders, 
  inventory, 
  customers, 
  copilotSchedules, 
  selectedSector 
}) {
  const [nlQuery, setNlQuery] = useState('');
  const [copilotHistory, setCopilotHistory] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Which sizes of Royal Jamdani and Panjabi should I reorder before next week?',
      time: '14:20',
    },
    {
      id: 2,
      sender: 'copilot',
      text: `Based on current stock levels and demand velocity:
1. **PAN-BLK-42 (Aristocrat Panjabi, Size 42):** Current stock is 2 units (Safety threshold: 5). High stockout risk! Recommend issuing PO for **25 units**.
2. **JAM-EMR-02 (Emerald Green Jamdani):** Stock is 4 units (Threshold: 6). Recommended reorder: **12 units**.
3. **JAM-RED-01 (Crimson Red Jamdani):** Demand velocity is 3.2 units/day. Current stock of 14 units will last ~4.3 days. Safe for 72 hours.`,
      time: '14:20',
      actionable: 'DRAFT_SUPPLIER_PO',
    },
  ]);

  // Executive KPIs
  const totalRevenueBdt = orders.reduce((sum, o) => sum + (o.total_price_bdt || 0), 0);
  const totalOrders = orders.length;
  const lowStockCount = inventory.filter(i => i.stock_qty <= i.safety_threshold).length;
  const bkashRevenue = orders.filter(o => o.payment_status.includes('BKASH')).reduce((sum, o) => sum + o.total_price_bdt, 0);
  const codRevenue = orders.filter(o => o.payment_status.includes('COD')).reduce((sum, o) => sum + o.total_price_bdt, 0);

  const handleSendNlQuery = (e) => {
    e?.preventDefault();
    if (!nlQuery.trim()) return;

    const userText = nlQuery;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCopilotHistory(prev => [...prev, userMsg]);
    setNlQuery('');

    // Generate smart contextual AI analysis
    setTimeout(() => {
      let replyText = '';
      const lower = userText.toLowerCase();

      if (lower.includes('bkash') || lower.includes('cod') || lower.includes('payment') || lower.includes('revenue')) {
        replyText = `📊 **Payment Method & GMV Breakdown:**\n• Total Platform GMV: **৳${totalRevenueBdt.toLocaleString()} BDT**\n• bKash Digital Pay: **৳${bkashRevenue.toLocaleString()}** (${Math.round((bkashRevenue / (totalRevenueBdt || 1)) * 100)}% of total)\n• Cash on Delivery (COD): **৳${codRevenue.toLocaleString()}** (${Math.round((codRevenue / (totalRevenueBdt || 1)) * 100)}%)\n\n💡 *Copilot Tip:* Offering a 2% bKash instant cash rebate reduces COD parcel returns by 38% across Dhaka delivery corridors.`;
      } else if (lower.includes('stock') || lower.includes('inventory') || lower.includes('reorder')) {
        replyText = `⚠️ **Inventory Health Audit:**\n• Total Active SKUs: **${inventory.length}**\n• SKUs Below Safety Threshold: **${lowStockCount} items**\n• Highest Velocity Variant: **${inventory[0]?.product_name}**\n\nAutomated stock replenishments are ready to be dispatched to your Mirpur/Tangail weavers.`;
      } else if (lower.includes('customer') || lower.includes('vip') || lower.includes('retention')) {
        const topCustomer = customers.slice().sort((a,b) => b.total_spent_bdt - a.total_spent_bdt)[0];
        replyText = `👑 **Customer Loyalty & VIP Intelligence:**\n• Top Patron: **${topCustomer?.name}** (Total Spent: ৳${(topCustomer?.total_spent_bdt || 0).toLocaleString()} across ${topCustomer?.orders_count} orders)\n• Repeat Purchase Rate: **64.2%**\n• WhatsApp Follow-up Completion: **100%** (via Copilot Post-Delivery schedules)`;
      } else {
        replyText = `Telesto Copilot synthesis for: "${userText}"\n• System telemetry: All 24/7 AI chat responders operational (0 dropped inquiries).\n• Current fulfillment SLA: Steadfast & Pathao avg dispatch time is **1.8 hours**.\n• Growth opportunity: Launching an Eid preview drop on WhatsApp can yield ~৳45,000 incremental GMV this weekend.`;
      }

      setCopilotHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'copilot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 600);
  };

  const sampleQuestions = [
    'Show bKash vs COD revenue breakdown',
    'Which SKUs need urgent restocking?',
    'Who are our top VIP repeat customers?',
    'Predict upcoming festive demand surge',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Executive Performance KPI Cards */}
      <div className="grid-4">
        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            Gross Platform GMV
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--cyan-primary)', marginTop: '0.35rem' }}>
            ৳{totalRevenueBdt.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--emerald-primary)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={13} />
            <span>+24.6% vs last week</span>
          </div>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Digital Orders
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.35rem' }}>
            {totalOrders} Orders
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            100% atomic inventory tracking
          </div>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            Stock Safety Alert
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: lowStockCount > 0 ? 'var(--amber-primary)' : 'var(--emerald-primary)', marginTop: '0.35rem' }}>
            {lowStockCount} At Risk
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            Threshold-triggered alerts active
          </div>
        </div>

        <div className="card" style={{ padding: '1.15rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
            24/7 AI Chat Resolution
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--emerald-primary)', marginTop: '0.35rem' }}>
            94.8%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--cyan-primary)', marginTop: '0.2rem' }}>
            Avg reply latency: 140ms
          </div>
        </div>
      </div>

      {/* Main Copilot Grid: Conversational Intelligence on Left, Demand Forecasts & Retention Schedules on Right */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* Left: Natural Language Conversational Analytics */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '520px' }}>
          <div className="card-header" style={{ marginBottom: 0 }}>
            <div className="card-title-group">
              <div className="card-title-icon">
                <BrainCircuit size={18} />
              </div>
              <div>
                <div className="card-title">Telesto AI Executive Copilot</div>
                <div className="card-subtitle">Natural Language Conversational Business Analytics</div>
              </div>
            </div>
            <span className="status-badge in-stock">
              <Sparkles size={12} />
              <span>TBOP Intelligence Copilot</span>
            </span>
          </div>

          {/* Quick Query Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {sampleQuestions.map((q, idx) => (
              <button 
                key={idx}
                className="filter-pill"
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                onClick={() => {
                  setNlQuery(q);
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Stream */}
          <div className="chat-bubble-stream" style={{ flex: 1, maxHeight: '360px' }}>
            {copilotHistory.map((item) => {
              const isUser = item.sender === 'user';
              return (
                <div key={item.id} className={`chat-bubble ${isUser ? 'merchant' : 'ai_copilot'}`}>
                  {!isUser && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem', color: 'var(--cyan-hover)', fontSize: '0.75rem' }}>
                      <BrainCircuit size={13} />
                      <strong>Telesto Executive Intelligence</strong>
                    </div>
                  )}
                  <div style={{ whiteSpace: 'pre-line' }}>{item.text}</div>
                  <div className="chat-bubble-footer">
                    <span>{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendNlQuery} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="chat-text-input"
              placeholder="Ask Copilot anything about sales, low stock, bKash vs COD..." 
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Right: Predictive Demand Models & Automated Copilot Schedules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Predictive Demand Forecasting */}
          <div className="card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <TrendingUp size={16} color="var(--cyan-primary)" />
              Predictive Demand Models & Seasonal Forecasting
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-subtle)', 
                padding: '0.85rem', 
                borderRadius: 'var(--radius-md)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.86rem' }}>Festive & Wedding Rush Surge</strong>
                  <span className="status-badge low-stock">+140% Demand Surge</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Jamdani Crimson Sarees and Size 42 Black Panjabis projected to deplete within 3 days. Recommend issuing pre-order campaigns.
                </p>
              </div>

              <div style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-subtle)', 
                padding: '0.85rem', 
                borderRadius: 'var(--radius-md)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.86rem' }}>Julhas Jute Export Demand</strong>
                  <span className="status-badge in-stock">+65% Export Inquiries</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  International buyer interest from EU/UK for eco-friendly handwoven totes. Adequate raw jute fiber inventory secured.
                </p>
              </div>
            </div>
          </div>

          {/* Copilot Schedules from Section 5 */}
          <div className="card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CalendarClock size={16} color="var(--emerald-primary)" />
              Automated Copilot Schedules (<code style={{ color: 'var(--emerald-primary)' }}>copilot_schedules</code>)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {copilotSchedules.map(sch => (
                <div key={sch.id} style={{ 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-subtle)', 
                  padding: '0.75rem 0.9rem', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong>{sch.customer_name}</strong>
                    <span className={`status-badge ${sch.status === 'TRIGGERED' ? 'critical' : 'in-stock'}`}>
                      {sch.status}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {sch.message_draft}
                  </div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: '0.35rem' }}>
                    Scheduled Date: {sch.scheduled_date} • Type: {sch.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
