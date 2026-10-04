import React from 'react';
import { 
  Cpu, 
  RotateCcw, 
  Sun, 
  Moon, 
  Store, 
  Sparkles, 
  Layers, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import { SECTORS } from '../data/mockData';

export default function Header({ 
  selectedSector, 
  onSectorChange, 
  onResetData, 
  theme, 
  onToggleTheme,
  systemPulse 
}) {
  const currentSector = SECTORS.find(s => s.id === selectedSector) || SECTORS[0];

  return (
    <header className="top-header">
      <div className="top-header-inner">
        {/* Brand & Platform Identity */}
        <div className="brand-section">
          <div className="brand-logo-badge">
            <Cpu size={24} />
          </div>
          <div>
            <div className="brand-title">
              TELESTO <span className="highlight">AI</span>
              <span className="brand-version-pill">TBOP Core v2.4</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Enterprise SME Retail Engine</span>
              <span>•</span>
              <span style={{ color: currentSector.color, fontWeight: 600 }}>{currentSector.name}</span>
            </div>
          </div>
        </div>

        {/* Center: Sector Switcher & System Telemetry */}
        <div className="header-center">
          <div className="sector-selector-box">
            <Store size={16} style={{ color: currentSector.color }} />
            <span className="sector-selector-label">Sector Profile:</span>
            <select 
              className="sector-select" 
              value={selectedSector} 
              onChange={(e) => onSectorChange(e.target.value)}
              title="Switch SME Sector Profile"
            >
              {SECTORS.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name} ({sector.badge})
                </option>
              ))}
            </select>
          </div>

          <div className="system-status-indicator" title="Atomic Transaction Engine Status">
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: 600 }}>24/7 AI Engine Active</span>
            <span style={{ color: 'var(--text-dim)' }}>| 12ms latency</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={onResetData}
            title="Reset POC to original demo state"
          >
            <RotateCcw size={14} />
            <span>Reset POC Data</span>
          </button>

          <button 
            className="icon-btn" 
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
