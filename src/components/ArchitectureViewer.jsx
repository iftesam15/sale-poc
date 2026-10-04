import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  Workflow,
  Sparkles
} from 'lucide-react';

export default function ArchitectureViewer({ 
  inventory, 
  customers, 
  orders, 
  copilotSchedules 
}) {
  const [selectedSchemaTable, setSelectedSchemaTable] = useState('variant_inventory');
  const [copied, setCopied] = useState(false);

  const tables = {
    variant_inventory: {
      name: 'variant_inventory',
      primaryKey: 'variant_id VARCHAR(50) PK',
      foreignKeys: 'None (Referenced by orders.variant_id)',
      data: inventory,
      schemaDesc: 'Atomic SKU variant tracking with real-time stock and safety threshold guards.',
    },
    crm_customers: {
      name: 'crm_customers',
      primaryKey: 'id VARCHAR(50) PK',
      foreignKeys: 'UNIQUE(phone)',
      data: customers,
      schemaDesc: 'Multi-channel unified customer profiles across WhatsApp, FB Messenger, and Voice.',
    },
    orders: {
      name: 'orders',
      primaryKey: 'id VARCHAR(50) PK',
      foreignKeys: 'FK(crm_customers.id), FK(variant_inventory.variant_id)',
      data: orders,
      schemaDesc: 'Transactional digital orders with COD, bKash & Nagad status and courier tracking.',
    },
    copilot_schedules: {
      name: 'copilot_schedules',
      primaryKey: 'id VARCHAR(50) PK',
      foreignKeys: 'FK(orders.id)',
      data: copilotSchedules,
      schemaDesc: 'Automated post-delivery customer retention triggers and low-stock threshold triggers.',
    },
  };

  const currentTable = tables[selectedSchemaTable];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentTable.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentTable.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentTable.name}_tbop_dump.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Platform Multi-Tier Architecture (Figure 1 in PDF) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-title-icon">
              <Layers size={18} />
            </div>
            <div>
              <div className="card-title">Figure 1: Layered Platform Architecture Stack</div>
              <div className="card-subtitle">TBOP Enterprise Foundation (Telesto AI Specification Section 2)</div>
            </div>
          </div>
          <span className="sku-badge" style={{ color: 'var(--cyan-primary)' }}>
            TBOP Core Architecture
          </span>
        </div>

        <div className="arch-stack-container">
          {/* Layer 1 */}
          <div className="arch-layer-box ui">
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--cyan-primary)' }}>
                LAYER 1: USER INTERFACE (TELESTO AI BUSINESS)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Simplified SME Dashboard • Omnichannel Messaging Workspace • Mobile Web Progressive App
              </div>
            </div>
            <span className="sku-badge">SME UX</span>
          </div>

          {/* Layer 2 */}
          <div className="arch-layer-box pillars">
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--indigo-primary)' }}>
                LAYER 2: APPLICATION PILLARS (SELL • OPERATE • INTELLIGENCE)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                SELL: AI Marketing & Lead Gen | OPERATE: Order & SKU Lifecycle | INTELLIGENCE: Executive Copilot
              </div>
            </div>
            <span className="sku-badge">Core Pillars</span>
          </div>

          {/* Layer 3 */}
          <div className="arch-layer-box services">
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--emerald-primary)' }}>
                LAYER 3: COMMON PLATFORM SERVICES
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Identity & Access • Security Guardrails • Workflow Orchestration Engine • AI Models • Unified Data Store
              </div>
            </div>
            <span className="sku-badge">Shared Services</span>
          </div>

          {/* Layer 4 */}
          <div className="arch-layer-box foundation">
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--amber-primary)' }}>
                LAYER 4: FOUNDATION ENGINE (TELESTO / TBOP CORE ENTERPRISE ENGINE)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                High-concurrency Event Loop • ACID Atomic Transaction Manager • Distributed Multi-Tenant Store
              </div>
            </div>
            <span className="sku-badge">Enterprise Engine</span>
          </div>
        </div>
      </div>

      {/* Unified Data Store & Relational Schemas (Section 5 in PDF) */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-title-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-primary)' }}>
              <Database size={18} />
            </div>
            <div>
              <div className="card-title">Section 5: Data Schemas & Unified Data Store</div>
              <div className="card-subtitle">Relational mapping and transactional consistency across inventory variants, CRM, and orders</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline btn-sm" onClick={handleCopyJson}>
              {copied ? <Check size={13} color="var(--emerald-primary)" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleExportJson}>
              <Download size={13} />
              <span>Export Table JSON</span>
            </button>
          </div>
        </div>

        {/* Table Selector Pills */}
        <div className="channel-filter-pills" style={{ marginBottom: '1rem' }}>
          {Object.keys(tables).map((key) => {
            const tbl = tables[key];
            const isActive = selectedSchemaTable === key;
            return (
              <button 
                key={key}
                className={`filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedSchemaTable(key)}
              >
                <code>{tbl.name}</code> ({tbl.data.length} records)
              </button>
            );
          })}
        </div>

        {/* Schema Specs Bar */}
        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-medium)', 
          borderRadius: 'var(--radius-md)', 
          padding: '0.85rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          fontSize: '0.8rem',
          marginBottom: '1rem'
        }}>
          <div>
            <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase' }}>Primary Key</div>
            <code style={{ color: 'var(--cyan-primary)', fontSize: '0.78rem' }}>{currentTable.primaryKey}</code>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase' }}>Relational Constraints</div>
            <code style={{ color: 'var(--emerald-primary)', fontSize: '0.78rem' }}>{currentTable.foreignKeys}</code>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase' }}>Description</div>
            <span style={{ color: 'var(--text-muted)' }}>{currentTable.schemaDesc}</span>
          </div>
        </div>

        {/* Live Raw JSON Payload Viewer */}
        <div style={{ 
          background: '#040810', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1.25rem',
          maxHeight: '360px',
          overflowY: 'auto'
        }}>
          <pre style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.78rem', 
            color: '#a5f3fc',
            lineHeight: 1.5,
            margin: 0
          }}>
            {JSON.stringify(currentTable.data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
