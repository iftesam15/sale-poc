import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Bot, 
  ShoppingCart, 
  Users, 
  CalendarClock, 
  AlertTriangle,
  Zap,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORKFLOW_SCENARIOS } from '../data/mockData';

export default function WorkflowSimulator({ 
  inventory, 
  onAtomicOrderCreation,
  selectedSector 
}) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(WORKFLOW_SCENARIOS[0].id);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [logs, setLogs] = useState([]);

  const currentScenario = WORKFLOW_SCENARIOS.find(s => s.id === selectedScenarioId) || WORKFLOW_SCENARIOS[0];
  const targetVariant = inventory.find(i => i.variant_id === currentScenario.variant_id) || inventory[0];

  const stepsData = [
    {
      step: 1,
      name: 'Customer Social Inquiry',
      trigger: 'Customer sends message via FB Messenger / WhatsApp requesting price and size availability.',
      execution: 'Ingested by AI Message Listener',
      icon: Send,
      action: 'Receive Inquiry',
    },
    {
      step: 2,
      name: 'Instant AI Reply & Stock Check',
      trigger: 'AI parses intent via NLP, executes real-time stock lookup against Variant Inventory matrix.',
      execution: 'Instant 24/7 quote sent to customer',
      icon: Bot,
      action: 'Run AI Stock Lookup & Reply',
    },
    {
      step: 3,
      name: 'Instant Digital Order Creation',
      trigger: 'Customer confirms buy; AI generates structured Digital Order with size, address & payment terms.',
      execution: 'Digital Order record issued',
      icon: ShoppingCart,
      action: 'Generate Digital Order',
    },
    {
      step: 4,
      name: 'Automated CRM & Atomic Stock Update',
      trigger: 'TBOP Core executes ACID atomic transaction: inventory decremented, customer CRM profile updated.',
      execution: 'Stock reduced, CRM profile synchronized',
      icon: Users,
      action: 'Commit Atomic DB Transaction',
    },
    {
      step: 5,
      name: 'Copilot Follow-Up & Alerts Scheduled',
      trigger: 'AI Copilot registers 48-hour post-delivery retention check-in & evaluates stock safety threshold.',
      execution: 'Retention trigger set, safety check complete',
      icon: CalendarClock,
      action: 'Schedule Copilot Triggers',
    },
  ];

  // Initialize logs on scenario change or reset
  const resetWorkflow = () => {
    setCurrentStep(1);
    setIsPlayingAuto(false);
    setLogs([
      {
        id: 1,
        time: new Date().toLocaleTimeString(),
        type: 'sys',
        text: `[TBOP CORE] Scenario initialized: "${currentScenario.title}". Waiting for Customer Social Inquiry...`,
      },
    ]);
  };

  useEffect(() => {
    resetWorkflow();
  }, [selectedScenarioId]);

  const advanceStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep > 5) return;

    setCurrentStep(nextStep);
    appendStepLog(nextStep);

    if (nextStep === 4) {
      // Execute the atomic state mutation in the parent state!
      onAtomicOrderCreation({
        customer: currentScenario.customer,
        channel: currentScenario.channel,
        variant_id: targetVariant.variant_id,
        product_name: targetVariant.product_name,
        price_bdt: targetVariant.price_bdt,
        payment_method: currentScenario.payment_method,
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    if (nextStep === 5) {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };

  const appendStepLog = (stepNum) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLogs = [];

    if (stepNum === 2) {
      newLogs.push({
        id: Date.now() + 1,
        time: timestamp,
        type: 'ai',
        text: `[AI NLP PARSER] Ingested incoming message from ${currentScenario.customer.name} via ${currentScenario.channel.toUpperCase()}. Intent: "PURCHASE_QUERY" (Confidence: 99.4%).`,
      });
      newLogs.push({
        id: Date.now() + 2,
        time: timestamp,
        type: 'db',
        text: `[SQL QUERY] SELECT * FROM variant_inventory WHERE variant_id = '${targetVariant.variant_id}'; Stock count: ${targetVariant.stock_qty} units available. Price: ৳${targetVariant.price_bdt.toLocaleString()}.`,
      });
      newLogs.push({
        id: Date.now() + 3,
        time: timestamp,
        type: 'ai',
        text: `[AI DISPATCH] Dispatched automated response quote with item details and payment options in 140ms.`,
      });
    } else if (stepNum === 3) {
      newLogs.push({
        id: Date.now() + 4,
        time: timestamp,
        type: 'order',
        text: `[BUY CONFIRMATION] Customer confirmed purchase intent for 1 unit of ${targetVariant.product_name}.`,
      });
      newLogs.push({
        id: Date.now() + 5,
        time: timestamp,
        type: 'order',
        text: `[DIGITAL ORDER CREATED] Order #ORD-TRANS-${Math.floor(1000 + Math.random() * 9000)} issued with delivery terms: ${currentScenario.order_type}.`,
      });
    } else if (stepNum === 4) {
      newLogs.push({
        id: Date.now() + 6,
        time: timestamp,
        type: 'db',
        text: `[TBOP TRANSACTION ENGINE] BEGIN TRANSACTION [ISOLATION: SERIALIZABLE]`,
      });
      newLogs.push({
        id: Date.now() + 7,
        time: timestamp,
        type: 'write',
        text: `[ATOMIC DECREMENT] UPDATE variant_inventory SET stock_qty = ${targetVariant.stock_qty - 1} WHERE variant_id = '${targetVariant.variant_id}'; [Affected Rows: 1]`,
      });
      newLogs.push({
        id: Date.now() + 8,
        time: timestamp,
        type: 'write',
        text: `[CRM SYNC] UPSERT INTO crm_customers (name, phone, channel, total_spent_bdt) VALUES ('${currentScenario.customer.name}', '${currentScenario.customer.phone}', '${currentScenario.channel}', +৳${targetVariant.price_bdt});`,
      });
      newLogs.push({
        id: Date.now() + 9,
        time: timestamp,
        type: 'db',
        text: `[COMMIT] Transaction committed successfully. 0 discrepancies, 0 stockout collision.`,
      });
    } else if (stepNum === 5) {
      const remainingStock = targetVariant.stock_qty - 1;
      const isThresholdBreached = remainingStock <= targetVariant.safety_threshold;

      newLogs.push({
        id: Date.now() + 10,
        time: timestamp,
        type: 'ai',
        text: `[COPILOT RETENTION] Scheduled automated 48-hr post-delivery feedback check-in for ${currentScenario.customer.name} via ${currentScenario.channel}.`,
      });
      newLogs.push({
        id: Date.now() + 11,
        time: timestamp,
        type: isThresholdBreached ? 'alert' : 'db',
        text: isThresholdBreached
          ? `[LOW-STOCK TRIGGER] ALERT! Remaining stock for ${targetVariant.variant_id} is ${remainingStock}, at or below safety threshold (${targetVariant.safety_threshold}). Automated supplier PO drafted!`
          : `[THRESHOLD CHECK] Remaining stock for ${targetVariant.variant_id} is ${remainingStock} (Safe threshold: ${targetVariant.safety_threshold}). Healthy stock level.`,
      });
      newLogs.push({
        id: Date.now() + 12,
        time: timestamp,
        type: 'sys',
        text: `[TRANSFORMATION COMPLETE] 5-Step Automated Transaction Flow finished in under 2 seconds. Zero human delay.`,
      });
    }

    setLogs(prev => [...prev, ...newLogs]);
  };

  // Auto-play simulation handler
  const handleAutoPlay = () => {
    if (isPlayingAuto) return;
    setIsPlayingAuto(true);

    let step = currentStep;
    const interval = setInterval(() => {
      if (step < 5) {
        step++;
        setCurrentStep(step);
        appendStepLog(step);
        if (step === 4) {
          onAtomicOrderCreation({
            customer: currentScenario.customer,
            channel: currentScenario.channel,
            variant_id: targetVariant.variant_id,
            product_name: targetVariant.product_name,
            price_bdt: targetVariant.price_bdt,
            payment_method: currentScenario.payment_method,
          });
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        if (step === 5) {
          confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });
          clearInterval(interval);
          setIsPlayingAuto(false);
        }
      } else {
        clearInterval(interval);
        setIsPlayingAuto(false);
      }
    }, 1400);
  };

  return (
    <div className="workflow-stepper-container">
      {/* Top Controller Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ 
                background: 'rgba(6, 182, 212, 0.15)', 
                color: 'var(--cyan-primary)', 
                padding: '0.4rem', 
                borderRadius: '8px',
                display: 'flex' 
              }}>
                <Zap size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  Boutique Workflow Transformation Simulator
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Automated 5-Step Transaction Sequence Flow (Figure 2: Social Inquiry to Fulfilled Digital Order)
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>Scenario:</span>
              <select 
                className="form-select" 
                style={{ width: 'auto', padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
              >
                {WORKFLOW_SCENARIOS.map(sc => (
                  <option key={sc.id} value={sc.id}>
                    {sc.title}
                  </option>
                ))}
              </select>
            </div>

            <button 
              className="btn btn-outline btn-sm" 
              onClick={resetWorkflow}
              disabled={isPlayingAuto}
            >
              <RotateCcw size={14} />
              <span>Reset Flow</span>
            </button>

            {currentStep < 5 ? (
              <button 
                className="btn btn-primary btn-sm" 
                onClick={advanceStep}
                disabled={isPlayingAuto}
              >
                <span>Advance to Step {currentStep + 1}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <span className="status-badge delivered" style={{ padding: '0.4rem 0.8rem' }}>
                <CheckCircle2 size={15} />
                <span>Workflow Successfully Completed</span>
              </span>
            )}

            <button 
              className="btn btn-success btn-sm" 
              onClick={handleAutoPlay}
              disabled={isPlayingAuto || currentStep >= 5}
            >
              <Play size={14} />
              <span>{isPlayingAuto ? 'Auto Executing...' : 'Auto-Run All 5 Steps'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Visual Timeline */}
      <div className="workflow-steps-timeline">
        {stepsData.map((step) => {
          const isCompleted = currentStep > step.step;
          const isActive = currentStep === step.step;
          const Icon = step.icon;

          return (
            <div 
              key={step.step}
              className={`workflow-step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (step.step <= currentStep) {
                  // allow viewing
                }
              }}
            >
              <div className="step-node-header">
                <span className="step-badge-num">STEP {step.step}</span>
                <div className="step-status-icon">
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="var(--emerald-primary)" />
                  ) : isActive ? (
                    <span className="pulse-dot"></span>
                  ) : (
                    <Icon size={16} color="var(--text-dim)" />
                  )}
                </div>
              </div>

              <div className="step-title">{step.name}</div>
              <div className="step-trigger-desc">{step.trigger}</div>
              <div className="step-execution-tag">{step.execution}</div>
            </div>
          );
        })}
      </div>

      {/* Interactive Execution Stage & DB Mutator */}
      <div className="workflow-interactive-stage">
        {/* Left: Live Customer Chat & Transaction Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-title-icon">
                <Bot size={18} />
              </div>
              <div>
                <div className="card-title">Live Channel Simulation: {currentScenario.channel.toUpperCase()}</div>
                <div className="card-subtitle">
                  Customer: <strong style={{ color: 'var(--text-main)' }}>{currentScenario.customer.name}</strong> ({currentScenario.customer.phone})
                </div>
              </div>
            </div>
            <span className={`channel-tag-icon ${currentScenario.channel}`} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {currentScenario.channel === 'whatsapp' ? '● WhatsApp Business' : '● FB Messenger'}
            </span>
          </div>

          <div className="workflow-preview-chat">
            {/* Step 1: Incoming message */}
            <div className="chat-bubble customer">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>
                {currentScenario.customer.name} • {currentScenario.customer.city}
              </div>
              <div>{currentScenario.inquiry_text}</div>
              <div className="chat-bubble-footer">
                <span>Received Just Now</span>
              </div>
            </div>

            {/* Step 2: Instant AI reply */}
            {currentStep >= 2 && (
              <div className="chat-bubble ai_copilot" style={{ animation: 'fadeIn 0.3s ease-in' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem', fontSize: '0.75rem' }}>
                  <Sparkles size={13} color="#22d3ee" />
                  <strong>Telesto AI 24/7 Responder</strong>
                </div>
                <div>
                  Assalamu Alaikum {currentScenario.customer.name.split(' ')[0]}! 😊 Amader <strong>{targetVariant.product_name}</strong> ({targetVariant.color}) ekhon stock-e ache. 
                  Price holo <strong>৳{targetVariant.price_bdt.toLocaleString()}</strong>.
                </div>
                <div style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '6px', 
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.8rem'
                }}>
                  <div>📦 <strong>Stock Status:</strong> {targetVariant.stock_qty} units available</div>
                  <div>🚚 <strong>Delivery:</strong> Dhaka city 24-48 hours (৳80-100)</div>
                  <div>💳 <strong>Payment Terms:</strong> COD / bKash / Nagad available</div>
                </div>
                <div className="chat-bubble-footer">
                  <span>AI Latency: 140ms • Intent Verified</span>
                </div>
              </div>
            )}

            {/* Step 3: Customer Buy Confirmation */}
            {currentStep >= 3 && (
              <div className="chat-bubble customer" style={{ animation: 'fadeIn 0.3s ease-in' }}>
                <div>Haa, ami 1ta confirm korchi! Please send via {currentScenario.order_type}. My address is {currentScenario.customer.city}.</div>
              </div>
            )}

            {/* Step 4 & 5: Digital Order Issued Card */}
            {currentStep >= 3 && (
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.08)', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                animation: 'fadeIn 0.3s ease-in'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald-primary)', fontWeight: 700, fontSize: '0.88rem' }}>
                    <ShieldCheck size={18} />
                    <span>Instant Digital Order Issued</span>
                  </div>
                  <span className="sku-badge">{targetVariant.variant_id}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <div><strong>Item:</strong> {targetVariant.product_name}</div>
                  <div><strong>Size/Color:</strong> {targetVariant.size} • {targetVariant.color}</div>
                  <div><strong>Total Amount:</strong> ৳{(targetVariant.price_bdt + 100).toLocaleString()}</div>
                  <div><strong>Payment:</strong> {currentScenario.payment_method === 'COD' ? 'Cash on Delivery (Pending)' : 'bKash Merchant Pay'}</div>
                </div>

                {currentStep >= 4 && (
                  <div style={{ 
                    borderTop: '1px dashed rgba(16, 185, 129, 0.3)', 
                    paddingTop: '0.4rem', 
                    fontSize: '0.75rem', 
                    color: 'var(--emerald-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>✓ Atomic stock decremented: {targetVariant.stock_qty - 1} remaining</span>
                    <span>✓ Customer CRM profile synced</span>
                  </div>
                )}

                {currentStep >= 5 && (
                  <div style={{ 
                    borderTop: '1px dashed rgba(6, 182, 212, 0.3)', 
                    paddingTop: '0.4rem', 
                    fontSize: '0.75rem', 
                    color: 'var(--cyan-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>✓ Copilot post-delivery WhatsApp check-in scheduled</span>
                    <span>✓ Inventory safety threshold monitored</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: TBOP Core Enterprise Engine Audit Log */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-title-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-primary)' }}>
                <Database size={18} />
              </div>
              <div>
                <div className="card-title">TBOP Engine Transaction Log</div>
                <div className="card-subtitle">ACID Consistency • Event Stream & DB Commit Audit</div>
              </div>
            </div>
            <span className="sku-badge" style={{ color: 'var(--emerald-primary)' }}>
              LIVE AUDIT
            </span>
          </div>

          <div className="workflow-audit-log">
            {logs.map((log) => (
              <div key={log.id} className="log-entry">
                <span className="log-time">{log.time}</span>
                <span className={`log-badge-op ${
                  log.type === 'write' ? 'write' :
                  log.type === 'ai' ? 'ai' :
                  log.type === 'alert' ? 'alert' : 'ai'
                }`}>
                  {log.type.toUpperCase()}
                </span>
                <span>{log.text}</span>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: '1rem', 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Affected Variant: </span>
              <strong style={{ color: 'var(--cyan-primary)' }}>{targetVariant.variant_id}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Live Stock: </span>
              <strong style={{ color: targetVariant.stock_qty <= targetVariant.safety_threshold ? 'var(--amber-primary)' : 'var(--emerald-primary)' }}>
                {targetVariant.stock_qty} units
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Safety Threshold: </span>
              <strong>{targetVariant.safety_threshold} units</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
