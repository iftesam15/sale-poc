import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalOrders({ 
  orders, 
  setOrders, 
  inventory, 
  customers, 
  onAdvanceOrderDelivery 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPayment, setFilterPayment] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // New Order Form state
  const [newOrder, setNewOrder] = useState({
    customer_id: customers[0]?.id || 'CUST-001',
    variant_id: inventory[0]?.variant_id || 'JAM-RED-01',
    quantity: 1,
    payment_method: 'COD',
    courier: 'Steadfast Courier',
    address: 'House 14, Road 8, Dhanmondi, Dhaka',
  });

  const filteredOrders = orders.filter(ord => {
    const matchesSearch = ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ord.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ord.phone.includes(searchQuery) ||
                          ord.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPayment = filterPayment === 'all' ? true :
                           filterPayment === 'bkash' ? ord.payment_status.includes('BKASH') :
                           filterPayment === 'nagad' ? ord.payment_status.includes('NAGAD') :
                           ord.payment_status.includes('COD');

    return matchesSearch && matchesPayment;
  });

  // Verify bKash / Nagad or mark COD received
  const markPaymentVerified = (orderId) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          payment_status: 'BKASH_VERIFIED',
          trx_id: ord.trx_id.startsWith('BK') ? ord.trx_id : `BK${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        };
      }
      return ord;
    }));
  };

  // Step delivery forward: PENDING -> CONFIRMED -> DISPATCHED -> DELIVERED
  const stepDeliveryStatus = (orderId) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const nextStatus = {
          PENDING: 'CONFIRMED',
          AWAITING_PACK: 'PACKED',
          CONFIRMED: 'DISPATCHED',
          PACKED: 'PICKUP_REQUESTED',
          PICKUP_REQUESTED: 'DISPATCHED',
          DISPATCHED: 'DELIVERED',
          OUT_FOR_DELIVERY: 'DELIVERED',
        }[ord.delivery_status] || ord.delivery_status;

        return { ...ord, delivery_status: nextStatus };
      }
      return ord;
    }));

    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === newOrder.customer_id) || customers[0];
    const item = inventory.find(i => i.variant_id === newOrder.variant_id) || inventory[0];
    const qty = parseInt(newOrder.quantity, 10) || 1;
    const deliveryFee = 100;
    const total = (item.price_bdt * qty) + deliveryFee;

    const createdOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: cust.id,
      customer_name: cust.name,
      phone: cust.phone,
      variant_id: item.variant_id,
      product_name: item.product_name,
      quantity: qty,
      unit_price: item.price_bdt,
      delivery_fee: deliveryFee,
      total_price_bdt: total,
      payment_status: newOrder.payment_method === 'COD' ? 'COD_PENDING' : 'BKASH_VERIFIED',
      trx_id: newOrder.payment_method === 'COD' ? 'N/A (Cash on Delivery)' : `BK${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      delivery_status: 'CONFIRMED',
      courier: newOrder.courier,
      tracking_code: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      address: newOrder.address,
      created_at: 'Just Now',
    };

    setOrders(prev => [createdOrder, ...prev]);
    setIsNewOrderModalOpen(false);

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top action and KPI header */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={20} color="var(--emerald-primary)" />
              Digital Order Execution & Payment Lifecycle
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Unified Data Store: <code style={{ color: 'var(--emerald-primary)' }}>orders</code> schema with atomic stock linking
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                placeholder="Search Order ID, Name, Phone..." 
                className="form-input"
                style={{ paddingLeft: '2.2rem', width: '240px', fontSize: '0.82rem', padding: '0.45rem 0.8rem 0.45rem 2rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="channel-filter-pills" style={{ margin: 0 }}>
              <button 
                className={`filter-pill ${filterPayment === 'all' ? 'active' : ''}`}
                onClick={() => setFilterPayment('all')}
              >
                All Orders ({orders.length})
              </button>
              <button 
                className={`filter-pill ${filterPayment === 'bkash' ? 'active' : ''}`}
                onClick={() => setFilterPayment('bkash')}
              >
                bKash
              </button>
              <button 
                className={`filter-pill ${filterPayment === 'cod' ? 'active' : ''}`}
                onClick={() => setFilterPayment('cod')}
              >
                COD
              </button>
            </div>

            <button className="btn btn-primary btn-sm" onClick={() => setIsNewOrderModalOpen(true)}>
              <Plus size={14} />
              <span>Issue Digital Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer & Contact</th>
                <th>Item & SKU</th>
                <th>Qty</th>
                <th>Total (BDT)</th>
                <th>Payment Status & TrxID</th>
                <th>Delivery Tracking</th>
                <th>Timestamp</th>
                <th>Workflow Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-dim)' }}>
                    No orders found matching filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isBkash = ord.payment_status.includes('BKASH');
                  const isNagad = ord.payment_status.includes('NAGAD');
                  const isCod = ord.payment_status.includes('COD');

                  return (
                    <tr key={ord.id}>
                      <td>
                        <span className="sku-badge" style={{ color: 'var(--cyan-primary)', fontWeight: 700 }}>
                          {ord.id}
                        </span>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: 600 }}>{ord.customer_name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{ord.phone}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.84rem' }}>{ord.product_name}</div>
                          <span className="sku-badge" style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem' }}>
                            {ord.variant_id}
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong>{ord.quantity}x</strong>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--emerald-primary)', fontSize: '0.92rem' }}>
                          ৳{ord.total_price_bdt.toLocaleString()}
                        </strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span className={`status-badge ${isBkash ? 'bkash' : isNagad ? 'nagad' : 'cod'}`}>
                            {isBkash ? 'bKash Verified' : isNagad ? 'Nagad Verified' : 'COD (Pending)'}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                            {ord.trx_id}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span className={`status-badge ${
                            ord.delivery_status === 'DELIVERED' ? 'delivered' :
                            ord.delivery_status === 'DISPATCHED' || ord.delivery_status === 'OUT_FOR_DELIVERY' ? 'dispatched' :
                            ord.delivery_status === 'AWAITING_PACK' ? 'low-stock' : 'cod'
                          }`}>
                            {ord.delivery_status}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {ord.courier}{ord.tracking_code ? ` (${ord.tracking_code})` : ' · awaiting booking'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{ord.created_at}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {isCod && (
                            <button 
                              className="btn btn-outline btn-sm" 
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                              onClick={() => markPaymentVerified(ord.id)}
                              title="Mark bKash received"
                            >
                              Verify Pay
                            </button>
                          )}
                          {ord.delivery_status !== 'DELIVERED' && (
                            <button 
                              className="btn btn-primary btn-sm" 
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}
                              onClick={() => stepDeliveryStatus(ord.id)}
                              title="Advance courier delivery status"
                            >
                              <span>Next Status</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Order Creation Modal */}
      {isNewOrderModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Generate Digital Order (TBOP Engine)</h3>
              <button className="icon-btn" onClick={() => setIsNewOrderModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateOrderSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Customer (Unified CRM)</label>
                  <select 
                    className="form-select"
                    value={newOrder.customer_id}
                    onChange={(e) => setNewOrder({ ...newOrder, customer_id: e.target.value })}
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.phone} ({c.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Variant SKU</label>
                    <select 
                      className="form-select"
                      value={newOrder.variant_id}
                      onChange={(e) => setNewOrder({ ...newOrder, variant_id: e.target.value })}
                    >
                      {inventory.map(i => (
                        <option key={i.variant_id} value={i.variant_id}>
                          {i.variant_id} - {i.product_name} (৳{i.price_bdt})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      className="form-input"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Payment Channel</label>
                    <select 
                      className="form-select"
                      value={newOrder.payment_method}
                      onChange={(e) => setNewOrder({ ...newOrder, payment_method: e.target.value })}
                    >
                      <option value="COD">Cash on Delivery (COD)</option>
                      <option value="BKASH">bKash Merchant Pay</option>
                      <option value="NAGAD">Nagad Direct Pay</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Courier Logistics Partner</label>
                    <select 
                      className="form-select"
                      value={newOrder.courier}
                      onChange={(e) => setNewOrder({ ...newOrder, courier: e.target.value })}
                    >
                      <option value="Steadfast Courier">Steadfast Courier (Fast COD)</option>
                      <option value="Pathao Courier">Pathao Courier</option>
                      <option value="RedX Express">RedX Express</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Shipping Address</label>
                  <textarea 
                    className="form-textarea" 
                    rows={2}
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsNewOrderModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Generate Order & Deduct Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
