import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  RefreshCw,
  TrendingDown,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function VariantInventory({ 
  inventory, 
  setInventory, 
  selectedSector, 
  onStockAdjustment 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, low, healthy
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedVariantForRestock, setSelectedVariantForRestock] = useState(null);
  const [restockAmount, setRestockAmount] = useState(10);

  // New SKU form state
  const [newSku, setNewSku] = useState({
    variant_id: '',
    product_name: '',
    category: 'Saree',
    size: 'Standard',
    color: 'Crimson',
    price_bdt: 3500,
    stock_qty: 15,
    safety_threshold: 5,
    material: 'Pure Handloom Cotton',
  });

  const filteredInventory = inventory.filter(item => {
    // Sector filter
    const matchesSector = item.sector === selectedSector;
    // Search query
    const matchesSearch = item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.variant_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    // Stock status filter
    const isLow = item.stock_qty <= item.safety_threshold;
    const matchesStatus = filterStatus === 'all' ? true :
                          filterStatus === 'low' ? isLow : !isLow;

    return matchesSector && matchesSearch && matchesStatus;
  });

  // Handle instant +1 / -1
  const adjustStock = (variantId, delta) => {
    setInventory(prev => prev.map(item => {
      if (item.variant_id === variantId) {
        const newQty = Math.max(0, item.stock_qty + delta);
        return { ...item, stock_qty: newQty };
      }
      return item;
    }));
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!selectedVariantForRestock) return;

    adjustStock(selectedVariantForRestock.variant_id, parseInt(restockAmount, 10) || 10);
    setIsRestockModalOpen(false);
    setSelectedVariantForRestock(null);
  };

  const handleCreateSkuSubmit = (e) => {
    e.preventDefault();
    if (!newSku.variant_id || !newSku.product_name) return;

    const itemToAdd = {
      ...newSku,
      sector: selectedSector,
      price_bdt: Number(newSku.price_bdt),
      stock_qty: Number(newSku.stock_qty),
      safety_threshold: Number(newSku.safety_threshold),
      image_url: selectedSector === 'handicrafts' ? '/jute_handicrafts.jpg' : '/jamdani_saree.jpg',
    };

    setInventory(prev => [itemToAdd, ...prev]);
    setIsAddModalOpen(false);
    setNewSku({
      variant_id: '',
      product_name: '',
      category: 'Apparel',
      size: 'Standard',
      color: 'Custom',
      price_bdt: 2500,
      stock_qty: 10,
      safety_threshold: 4,
      material: 'Organic Fabric',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top action & filter bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} color="var(--cyan-primary)" />
              Real-Time Size / Variant Inventory Tracking (SKU Matrix)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Unified Data Store: <code style={{ color: 'var(--cyan-primary)' }}>variant_inventory</code> table with atomic threshold alarms
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                placeholder="Search SKU or Product..." 
                className="form-input"
                style={{ paddingLeft: '2.2rem', width: '220px', fontSize: '0.82rem', padding: '0.45rem 0.8rem 0.45rem 2rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="channel-filter-pills" style={{ margin: 0 }}>
              <button 
                className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All SKUs
              </button>
              <button 
                className={`filter-pill ${filterStatus === 'low' ? 'active' : ''}`}
                onClick={() => setFilterStatus('low')}
              >
                Low Stock Alerts
              </button>
            </div>

            {/* Add SKU Button */}
            <button className="btn btn-primary btn-sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={14} />
              <span>Add New SKU Variant</span>
            </button>
          </div>
        </div>
      </div>

      {/* SKU Table View */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU Identifier</th>
                <th>Product Description</th>
                <th>Category</th>
                <th>Size / Dimensions</th>
                <th>Color / Variant</th>
                <th>Unit Price (BDT)</th>
                <th>Live Stock</th>
                <th>Safety Threshold</th>
                <th>Inventory Health</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-dim)' }}>
                    No variants match current search criteria in this sector profile.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const isLow = item.stock_qty <= item.safety_threshold;
                  const isCritical = item.stock_qty <= 2;

                  return (
                    <tr key={item.variant_id}>
                      <td>
                        <span className="sku-badge">{item.variant_id}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {item.image_url && (
                            <img 
                              src={item.image_url} 
                              alt={item.product_name} 
                              style={{ width: 36, height: 36, borderRadius: '6px', objectFit: 'cover' }} 
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.product_name}</div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{item.material}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{item.size}</span>
                      </td>
                      <td>
                        <span>{item.color}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--cyan-primary)' }}>
                          ৳{item.price_bdt.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button 
                            className="icon-btn" 
                            style={{ width: 24, height: 24 }} 
                            onClick={() => adjustStock(item.variant_id, -1)}
                            title="Decrement stock -1"
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: 800, 
                            minWidth: '24px', 
                            textAlign: 'center',
                            color: isLow ? 'var(--amber-primary)' : 'var(--text-main)' 
                          }}>
                            {item.stock_qty}
                          </span>
                          <button 
                            className="icon-btn" 
                            style={{ width: 24, height: 24 }} 
                            onClick={() => adjustStock(item.variant_id, +1)}
                            title="Increment stock +1"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                          Min: <strong>{item.safety_threshold} units</strong>
                        </span>
                      </td>
                      <td>
                        {isCritical ? (
                          <span className="status-badge critical">
                            <AlertTriangle size={12} />
                            <span>Critical Low ({item.stock_qty})</span>
                          </span>
                        ) : isLow ? (
                          <span className="status-badge low-stock">
                            <AlertTriangle size={12} />
                            <span>Low Stock Alert</span>
                          </span>
                        ) : (
                          <span className="status-badge in-stock">
                            <CheckCircle size={12} />
                            <span>Optimal Level</span>
                          </span>
                        )}
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            setSelectedVariantForRestock(item);
                            setIsRestockModalOpen(true);
                          }}
                        >
                          <RefreshCw size={12} />
                          <span>Restock</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {isRestockModalOpen && selectedVariantForRestock && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Restock SKU Variant: {selectedVariantForRestock.variant_id}
              </h3>
              <button className="icon-btn" onClick={() => setIsRestockModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleRestockSubmit}>
              <div className="modal-body">
                <div>
                  <strong>{selectedVariantForRestock.product_name}</strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Current Stock: {selectedVariantForRestock.stock_qty} | Safety Threshold: {selectedVariantForRestock.safety_threshold}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Units to Add to Inventory</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="500" 
                    className="form-input"
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(e.target.value)}
                    required
                  />
                </div>

                <div style={{ 
                  background: 'rgba(6, 182, 212, 0.08)', 
                  border: '1px solid rgba(6, 182, 212, 0.2)', 
                  padding: '0.75rem', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: 'var(--cyan-primary)'
                }}>
                  Atomic Stock Sync: Real-time update will be broadcast immediately to the 24/7 AI Chat Responder and WhatsApp listeners.
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsRestockModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Restock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New SKU Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add New SKU Variant to {selectedSector.toUpperCase()}</h3>
              <button className="icon-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateSkuSubmit}>
              <div className="modal-body">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">SKU Identifier (Variant ID)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. JAM-GLD-03" 
                      value={newSku.variant_id}
                      onChange={(e) => setNewSku({ ...newSku, variant_id: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newSku.category}
                      onChange={(e) => setNewSku({ ...newSku, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Dhakai Golden Antique Jamdani Saree"
                    value={newSku.product_name}
                    onChange={(e) => setNewSku({ ...newSku, product_name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Size / Dimension</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newSku.size}
                      onChange={(e) => setNewSku({ ...newSku, size: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Color / Finish</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={newSku.color}
                      onChange={(e) => setNewSku({ ...newSku, color: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid-3">
                  <div className="form-group">
                    <label className="form-label">Price (BDT)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newSku.price_bdt}
                      onChange={(e) => setNewSku({ ...newSku, price_bdt: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Initial Stock Qty</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newSku.stock_qty}
                      onChange={(e) => setNewSku({ ...newSku, stock_qty: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Safety Threshold</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newSku.safety_threshold}
                      onChange={(e) => setNewSku({ ...newSku, safety_threshold: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create SKU Variant</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
