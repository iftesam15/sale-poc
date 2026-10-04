import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Crown, 
  Phone, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function CustomerCRM({ 
  customers, 
  setCustomers, 
  orders 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Customer Form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    channel: 'whatsapp',
    city: 'Dhaka',
    notes: '',
  });

  const filteredCustomers = customers.filter(c => {
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.phone.includes(searchQuery) ||
           (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  const customerOrders = orders.filter(o => o.customer_id === activeCustomer?.id);

  const handleCreateCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;

    const created = {
      id: `CUST-00${customers.length + 1}`,
      name: newCustomer.name,
      phone: newCustomer.phone,
      channel: newCustomer.channel,
      orders_count: 0,
      total_spent_bdt: 0,
      tier: 'New Customer',
      city: newCustomer.city,
      notes: newCustomer.notes || 'Inquired via social messaging.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      last_active: 'Just now',
    };

    setCustomers(prev => [created, ...prev]);
    setSelectedCustomerId(created.id);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', phone: '', channel: 'whatsapp', city: 'Dhaka', notes: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top action and KPI header */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="var(--indigo-primary)" />
              Unified Customer CRM Database & VIP Retention
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Unified Data Store: <code style={{ color: 'var(--indigo-primary)' }}>crm_customers</code> entity with cross-channel purchase history
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                placeholder="Search Customer or Phone..." 
                className="form-input"
                style={{ paddingLeft: '2.2rem', width: '240px', fontSize: '0.82rem', padding: '0.45rem 0.8rem 0.45rem 2rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={14} />
              <span>Add Customer Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* CRM Main Grid: List on Left, Detailed Profile on Right */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* Customer Directory Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer Profile</th>
                  <th>Primary Channel</th>
                  <th>Retention Tier</th>
                  <th>Total Spent (BDT)</th>
                  <th>Orders</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => {
                  const isSelected = cust.id === activeCustomer?.id;
                  const isVip = cust.tier?.includes('VIP');

                  return (
                    <tr 
                      key={cust.id} 
                      style={{ 
                        background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                        cursor: 'pointer' 
                      }}
                      onClick={() => setSelectedCustomerId(cust.id)}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={cust.avatar} 
                            alt={cust.name} 
                            style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} 
                          />
                          <div>
                            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              {cust.name}
                              {isVip && <Crown size={13} color="var(--amber-primary)" />}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                              {cust.phone} • {cust.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`channel-tag-icon ${cust.channel}`}>
                          {cust.channel === 'whatsapp' ? '● WhatsApp' : cust.channel === 'messenger' ? '● Messenger' : '● Phone Call'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${isVip ? 'low-stock' : 'in-stock'}`}>
                          {cust.tier}
                        </span>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--cyan-primary)' }}>
                          ৳{(cust.total_spent_bdt || 0).toLocaleString()}
                        </strong>
                      </td>
                      <td>
                        <strong>{cust.orders_count || 0}</strong>
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomerId(cust.id);
                          }}
                        >
                          View 360°
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Customer 360° Profile Drawer */}
        {activeCustomer && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={activeCustomer.avatar} 
                alt={activeCustomer.name} 
                style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cyan-primary)' }} 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{activeCustomer.name}</h3>
                  <span className="sku-badge">{activeCustomer.id}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {activeCustomer.phone} • {activeCustomer.city}
                </div>
                <span className="status-badge in-stock" style={{ marginTop: '0.35rem' }}>
                  {activeCustomer.tier} Member
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid-3" style={{ gap: '0.75rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Lifetime Value</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--cyan-primary)', marginTop: '0.2rem' }}>
                  ৳{(activeCustomer.total_spent_bdt || 0).toLocaleString()}
                </div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Orders Count</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald-primary)', marginTop: '0.2rem' }}>
                  {activeCustomer.orders_count || 0}
                </div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Preferred Channel</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem', textTransform: 'capitalize' }}>
                  {activeCustomer.channel}
                </div>
              </div>
            </div>

            {/* Profile Notes */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                Operational Notes & Insights
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {activeCustomer.notes}
              </div>
            </div>

            {/* Order History */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Purchase History ({customerOrders.length})
              </div>
              {customerOrders.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', padding: '0.5rem 0' }}>
                  No past transactions recorded yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {customerOrders.map(ord => (
                    <div key={ord.id} style={{ 
                      background: 'var(--bg-secondary)', 
                      padding: '0.7rem 0.9rem', 
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{ord.product_name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                          {ord.id} • {ord.created_at}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: 'var(--cyan-primary)' }}>৳{ord.total_price_bdt.toLocaleString()}</div>
                        <span className="status-badge delivered" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                          {ord.delivery_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add Customer to Unified CRM</h3>
              <button className="icon-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateCustomerSubmit}>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Ayesha Siddiqa"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number (Bangladeshi)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="017XX-XXXXXX"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Acquisition Channel</label>
                    <select 
                      className="form-select"
                      value={newCustomer.channel}
                      onChange={(e) => setNewCustomer({ ...newCustomer, channel: e.target.value })}
                    >
                      <option value="whatsapp">WhatsApp Business</option>
                      <option value="messenger">Facebook Messenger</option>
                      <option value="phone">Direct Phone Call</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City / Region</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Dhaka (Gulshan)"
                      value={newCustomer.city}
                      onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Customer Preferences / Notes</label>
                  <textarea 
                    className="form-textarea" 
                    rows={2}
                    placeholder="e.g. Size 42 Panjabi preferred, prefers bKash discount..."
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save to CRM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
