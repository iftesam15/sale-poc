# Telesto AI SME Retail Platform — Proof of Concept (POC)

> **Enterprise-grade Technical Architecture & Workflow Engineering Report Implementation**  
> Built on the **TBOP Core Enterprise Engine** foundation to unify sales, inventory, and customer chats into an automated 24/7 intelligent retail engine for emerging retail markets and Bangladeshi SMEs.

---

## 🌟 Executive Overview & Problem Statement

Small and Medium Enterprises (SMEs) in emerging retail markets (such as Bangladeshi Boutiques, Handicrafts, Fashion, and Food retailers) currently suffer from fragmented operations:
- **Fragmented Channels:** Juggling Facebook Messenger, WhatsApp, direct phone calls, Excel spreadsheets, and physical paper notebooks.
- **Slow Customer Replies:** Inquiries missed during peak sales hours leading to lost conversions.
- **Stock Mismanagement:** Manual paper tracking causing frequent stockouts or overselling.
- **Zero Customer History:** No systematic repeat follow-ups or customer retention tracking.

**Telesto AI Solution:** Unify sales, variant inventory, and customer chats into a single AI platform, shifting SME retail operations from manual delays to an automated 24/7 intelligent engine with atomic database guarantees.

---

## 🏛️ Multi-Tier Platform Architecture (TBOP Foundation)

```
┌────────────────────────────────────────────────────────────────────────┐
│             TELESTO AI BUSINESS (Simplified SME UI & Workflows)         │
├────────────────────────────────────────────────────────────────────────┤
│        APPLICATION PILLARS: SELL • OPERATE • INTELLIGENCE              │
├────────────────────────────────────────────────────────────────────────┤
│                     COMMON PLATFORM SERVICES                           │
│  (Identity • Security • Workflow Engine • AI Models • Unified Data Store)│
├────────────────────────────────────────────────────────────────────────┤
│               TELESTO / TBOP CORE ENTERPRISE ENGINE                    │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Layer 1: User Interface (Telesto AI Business)** — Simplified SME dashboard and omnichannel messaging workspace.
2. **Layer 2: Application Pillars** — Core commercial engines: `SELL`, `OPERATE`, `INTELLIGENCE`.
3. **Layer 3: Shared Platform Services** — Identity, Security, Workflow Orchestration Engine, AI Models, Unified Data Store.
4. **Layer 4: Foundation Engine (TBOP Core Enterprise)** — High-concurrency scalability and transactional consistency.

---

## 🚀 The Three Functional Pillars

### 1. SELL (Growth & Marketing)
- **24/7 AI Chat Responder:** Real-time intent recognition and automated bilingual responses across Facebook Messenger and WhatsApp.
- **AI Social Marketing Content Generator:** Generates high-converting social campaigns, festive promotions (Eid-ul-Fitr, Pahela Baishakh, Puja, Wedding season) in English, Banglish, and Bangla.
- **Storytelling Marketing Generator:** Tailored specifically for artisanal crafts & jute goods (e.g., Julhas Handicrafts export line).
- **Unified Customer CRM Database:** Multi-channel customer profiles (`crm_customers`) tracking channel, orders count, total spent in ৳ BDT, and VIP tiering.

### 2. OPERATE (Streamlined Operations)
- **Instant Digital Order Creation:** 1-Click order creation directly from chat inquiries or quick entry.
- **Real-Time Size/Variant Inventory Tracking (`variant_inventory` SKU Matrix):** Tracks size, color, stock quantity, unit price (৳ BDT), and safety thresholds.
- **Multi-Channel Payment Logging:** Native support for Cash on Delivery (COD), bKash (with TrxID verification), and Nagad.
- **Automated Delivery Tracking & Stock Deduction:** Atomic inventory decrement on order creation; courier status progression (Pending ➔ Confirmed ➔ Dispatched via Steadfast / Pathao / RedX ➔ Delivered).

### 3. INTELLIGENCE (AI Business Copilot)
- **Executive Performance Dashboard:** Real-time Gross Merchandise Value (GMV ৳ BDT), active chats, order conversion rate, and inventory health index.
- **Automated Low-Stock Safety Triggers:** Immediate threshold warnings and restock recommendations when stock drops below safety minimums.
- **Demand Prediction Models & Sales Forecasting:** Seasonal rush predictive analytics (e.g. Jamdani & Panjabi Eid rush).
- **Conversational Business Analytics:** Interactive Natural Language Copilot query interface ("Show bKash vs COD revenue", "Which Jamdani variant needs reorder?").

---

## ⚡ 5-Step Boutique Automated Workflow Transformation Flow

The platform implements the automated transaction sequence specified in Section 4 of the architectural report:

```
[ Step 1: Customer Social Inquiry ] (WhatsApp / FB Messenger request for price/size)
                   │
                   ▼
[ Step 2: Instant AI Reply & Stock Check ] (AI parses intent, checks SKU stock, returns quote in 140ms)
                   │
                   ▼
[ Step 3: Instant Digital Order Created ] (Customer confirms buy; AI issues Digital Order with COD/bKash terms)
                   │
                   ▼
[ Step 4: Automated CRM & Stock Update ] (Atomic ACID inventory decrement; customer profile synced in CRM)
                   │
                   ▼
[ Step 5: Copilot Follow-Up & Alerts Scheduled ] (48-hr post-delivery check-in scheduled; safety thresholds checked)
```

---

## 🗄️ Unified Data Store Schemas

| Entity | Primary Key & Fields | Data Types & Constraints | Relational Mapping |
| :--- | :--- | :--- | :--- |
| `crm_customers` | `id, phone, name, channel, orders_count, total_spent_bdt` | `VARCHAR(50) PK, UNIQUE(phone), INTEGER, DECIMAL(10,2)` | 1-to-Many with `orders` |
| `variant_inventory` | `variant_id, product_name, category, size, color, stock_qty, price_bdt, safety_threshold` | `VARCHAR(50) PK, VARCHAR(100), INTEGER, DECIMAL(10,2)` | Referenced by `orders` |
| `orders` | `id, customer_id, variant_id, quantity, total_price_bdt, payment_status, delivery_status` | `VARCHAR(50) PK, FK(crm_customers), FK(variant_inventory)` | Many-to-1 Customer & Variant |
| `copilot_schedules` | `id, customer_id, order_id, scheduled_date, status` | `VARCHAR(50) PK, FK(orders), DATE, VARCHAR(20)` | 1-to-1 Order Follow-up |

---

## 🎯 Targeted Sector Configurations

1. **Boutiques & Fashion:** Apparel, Royal Dhakai Jamdani Sarees, Aristocrat Panjabi, Festive Wear — Size & color variant matrix tracking + automated festive social media campaigns.
2. **Handicrafts & Jute (e.g., Julhas Handicrafts):** Artisanal Crafts, Handwoven Jute Totes, Nakshi Kantha, Export Line — Storytelling marketing generator + digital export product catalogues.
3. **Jewelry & Gifts:** Antique Brass Choker, Handcrafted Filigree Silver — High-value CRM profile tracking + repeat customer loyalty.
4. **Retail & Gourmet Food:** Pure Sundarban Honey, Cold Ghani Mustard Oil — Rapid order creation workflow + real-time automated safety triggers.

---

## 🛠️ Technology Stack & Installation

- **Frontend & Logic:** React 19 + Vite
- **Styling:** Custom Vanilla CSS Design System with luxury dark/light glassmorphic tokens, Outfit & Inter typography
- **Icons & Visuals:** Lucide React, Canvas Confetti
- **Specification Source:** `telesto_architecture_specification.pdf` (Included in repo)

### Running Locally

```bash
# 1. Clone repository
git clone https://github.com/iftesam15/sale-poc.git
cd sale-poc

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📄 License
Telesto AI SME Platform Architecture POC — Developed for TBOP Core Enterprise Foundation.
