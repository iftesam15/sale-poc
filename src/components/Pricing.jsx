import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Clock,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PLANS = [
  {
    id: 'shuru',
    name: 'শুরু',
    en: 'Shuru',
    audience: 'নতুন ফেসবুক পেজ ও একার দোকান',
    monthly: 990,
    blurb: 'ইনবক্স আর স্টক একসাথে। খাতা ছাড়াই শুরু।',
    features: [
      '১ জন ইউজার',
      '২০০ প্রোডাক্ট ভ্যারিয়েন্ট',
      'Messenger ও WhatsApp ইনবক্স',
      'মাসে ৩০০ অর্ডার',
      'bKash, নগদ ও ক্যাশ অন ডেলিভারি',
      'স্টক কমে গেলে অ্যালার্ট',
      'বাংলা সাপোর্ট, সকাল ১০টা–রাত ১০টা',
    ],
  },
  {
    id: 'dokan',
    name: 'দোকান',
    en: 'Dokan',
    audience: 'বাড়ন্ত বুটিক, জুয়েলারি ও হ্যান্ডিক্রাফট',
    monthly: 2490,
    popular: true,
    blurb: 'ঈদ ও পহেলা বৈশাখে ইনবক্স যেন আর না ফেটে।',
    features: [
      '৫ জন স্টাফ',
      'আনলিমিটেড ভ্যারিয়েন্ট — সাইজ ও কালার',
      'বাংলায় AI ক্যাপশন ও ক্যাম্পেইন',
      'কাস্টমার খাতা — কে আবার কিনবে',
      'Steadfast ও Pathao কুরিয়ার',
      'মাসে ২,০০০ অর্ডার',
      'ঢাকা, চট্টগ্রাম, সিলেটে অনবোর্ডিং কল',
    ],
  },
  {
    id: 'brand',
    name: 'ব্র্যান্ড',
    en: 'Brand',
    audience: 'একাধিক আউটলেট ও এক্সপোর্ট ঘর',
    monthly: 5990,
    blurb: 'শাখা, স্টক আর পরের মাসের চাহিদা — এক ড্যাশবোর্ডে।',
    features: [
      'আনলিমিটেড স্টাফ ও ব্রাঞ্চ',
      'পরের মাসে কী লাগবে, আগে থেকে জানা',
      'মাল্টি-আউটলেট স্টক',
      'এক্সপোর্ট ক্যাটালগ',
      'ব্র্যান্ডেড ইনভয়েস',
      'হোয়াটসঅ্যাপে প্রায়োরিটি সাপোর্ট',
      'নিজস্ব অ্যাকাউন্ট ম্যানেজার',
    ],
  },
];

const COMPARE = [
  { label: 'ইউজার', shuru: '১', dokan: '৫', brand: 'আনলিমিটেড' },
  { label: 'প্রোডাক্ট ভ্যারিয়েন্ট', shuru: '২০০', dokan: 'আনলিমিটেড', brand: 'আনলিমিটেড' },
  { label: 'মাসিক অর্ডার', shuru: '৩০০', dokan: '২,০০০', brand: 'আনলিমিটেড' },
  { label: 'WhatsApp + Messenger', shuru: true, dokan: true, brand: true },
  { label: 'bKash, নগদ, COD', shuru: true, dokan: true, brand: true },
  { label: 'বাংলায় AI ক্যাপশন', shuru: false, dokan: true, brand: true },
  { label: 'কাস্টমার CRM', shuru: false, dokan: true, brand: true },
  { label: 'কুরিয়ার বুকিং', shuru: false, dokan: true, brand: true },
  { label: 'চাহিদার পূর্বাভাস', shuru: false, dokan: false, brand: true },
  { label: 'একাধিক ব্রাঞ্চ', shuru: false, dokan: false, brand: true },
];

const FAQS = [
  {
    q: 'bKash দিয়ে মাসিক পেমেন্ট করা যাবে?',
    a: 'হ্যাঁ। bKash, নগদ, রকেট অথবা ব্যাংক ট্রান্সফার। কার্ড লাগে না। দোকানের মোবাইলেই বিল হয়।',
  },
  {
    q: 'ফ্রি ট্রায়ালের পর কি নিজে থেকে টাকা কাটবে?',
    a: 'না। ১৪ দিন শেষে আপনি নিজে প্ল্যান না নিলে কোনো চার্জ নেই। অটো-রিনিউয়াল নেই।',
  },
  {
    q: 'শুধু ফেসবুক পেজ আছে, ওয়েবসাইট নেই। চলবে?',
    a: 'চলবে। বেশিরভাগ দোকান Messenger আর WhatsApp দিয়েই অর্ডার নেয়। ওয়েবসাইট ছাড়াই পুরো সেটআপ হয়।',
  },
  {
    q: 'ঈদের আগে প্ল্যান বদলানো যাবে?',
    a: 'যেকোনো দিন আপগ্রেড করা যায়। পার্থক্যের টাকা শুধু মাসের বাকি দিনের জন্য। সিজন শেষে আবার শুরু প্ল্যানে নামা যায়।',
  },
  {
    q: 'দামের সাথে আর কিছু যোগ হবে?',
    a: 'সেটআপ ফি নেই, হিডেন চার্জ নেই। কুরিয়ার চার্জ কুরিয়ার কোম্পানির — সেটা প্ল্যানের বাইরে, যেমন আজকেও হয়।',
  },
  {
    q: 'সাপোর্ট কি বাংলায়?',
    a: 'হ্যাঁ। হোয়াটসঅ্যাপ ও ফোনে বাংলায়। ঢাকা, চট্টগ্রাম ও সিলেটের দোকানের জন্য অনবোর্ডিং কল আছে।',
  },
];

const STEPS = [
  { day: 'দিন ১', title: 'দোকান সেটআপ', text: 'প্রোডাক্ট, সাইজ আর দাম তুলুন। আমরা কলে ধরে দিই।' },
  { day: 'দিন ২', title: 'ইনবক্স জুড়ুন', text: 'Messenger আর WhatsApp এক স্ক্রিনে চলে আসে।' },
  { day: 'দিন ৩', title: 'প্রথম অর্ডার', text: 'bKash, নগদ বা ক্যাশ অন ডেলিভারিতে সেল নিন।' },
  { day: 'দিন ৭', title: 'পুরনো কাস্টমার', text: 'যারা কিনেছিল, তাদের আবার খবর দিন।' },
];

const CITIES = ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ', 'অন্যান্য'];

const PAYMENTS = [
  { id: 'bkash', name: 'bKash', hint: 'Send Money', color: 'var(--bkash-pink)' },
  { id: 'nagad', name: 'নগদ', hint: 'Send Money', color: 'var(--nagad-orange)' },
  { id: 'rocket', name: 'রকেট', hint: 'Send Money', color: '#c084fc' },
  { id: 'bank', name: 'ব্যাংক', hint: 'NPSB / BEFTN', color: 'var(--cyan-primary)' },
];

const SECTOR_LINE = {
  boutique: 'জামদানি ও পাঞ্জাবির সাইজ-কালার শেষ হলে ইনবক্সে আর ভুল দাম যাবে না।',
  handicrafts: 'পাট ও হ্যান্ডিক্রাফটের গল্প দিয়ে ক্যাপশন, আর এক্সপোর্ট ক্যাটালগ এক জায়গায়।',
  jewelry: 'দামি গহনার কাস্টমার কে, কবে আবার কিনবে — খাতায় হারাবে না।',
  retail_food: 'বেকারি ও মুদি দোকানে স্টক ফুরিয়ে অর্ডার নেওয়া বন্ধ হবে।',
};

const SECTOR_HOOK = {
  boutique: {
    amount: '৳৮,৫০০',
    text: 'একটা জামদানি সেল মিস হলেই দোকান প্ল্যানের তিন মাসের বেশি খরচ। ইনবক্স খোলা রাখলে সেই অর্ডারটা থাকে।',
  },
  handicrafts: {
    amount: '৳৩,২০০',
    text: 'একটা এক্সপোর্ট অর্ডার মিস হলেই শুরু প্ল্যানের তিন মাস। ক্যাটালগ আর ইনবক্স একসাথে থাকলে অর্ডারটা ধরা যায়।',
  },
  jewelry: {
    amount: '৳১২,০০০',
    text: 'একটা গহনার অর্ডার মিস হলেই দোকান প্ল্যানের চার মাসের বেশি খরচ। কাস্টমার খাতা থাকলে সে ফিরে আসে।',
  },
  retail_food: {
    amount: '৳১,৫০০',
    text: 'কয়েকটা অর্ডার স্টক ফুরিয়ে বাতিল হলে মাসে শুরু প্ল্যানের চেয়ে বেশি ক্ষতি। স্টক অ্যালার্ট সেটা আগেই বলে।',
  },
};

const DEFAULT_AOV = {
  boutique: 4500,
  handicrafts: 1800,
  jewelry: 6500,
  retail_food: 850,
};

const PAY_HELP = {
  bkash: 'Send Money করুন 01713-456789 নম্বরে। রেফারেন্স: দোকানের নাম। ডেমোতে টাকা কাটা হবে না।',
  nagad: 'নগদ Send Money: 01813-456789। রেফারেন্স: দোকানের নাম। ডেমোতে টাকা কাটা হবে না।',
  rocket: 'রকেট Send Money: 01613-456789। রেফারেন্স: দোকানের নাম। ডেমোতে টাকা কাটা হবে না।',
  bank: 'Dutch-Bangla Bank · A/C 123.456.7890 · Telesto AI। ডেমো অ্যাকাউন্ট — টাকা কাটা হবে না।',
};

function taka(amount) {
  return `৳${amount.toLocaleString('en-US')}`;
}

function normalizePhone(raw) {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('880')) digits = `0${digits.slice(3)}`;
  return digits.slice(0, 11);
}

function planQuote(plan, cycle) {
  if (cycle === 'yearly') {
    const total = plan.monthly * 10;
    return { perMonth: Math.round(total / 12), total, save: plan.monthly * 2 };
  }
  return { perMonth: plan.monthly, total: plan.monthly, save: 0 };
}

function Cell({ value }) {
  if (value === true) return <Check size={16} color="var(--emerald-primary)" aria-label="আছে" />;
  if (value === false) return <span className="pricing-miss" aria-label="নেই">—</span>;
  return <span>{value}</span>;
}

export default function Pricing({ selectedSector, onExplore }) {
  const [cycle, setCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);
  const [missed, setMissed] = useState(6);
  const [aovSector, setAovSector] = useState(selectedSector);
  const [aov, setAov] = useState(DEFAULT_AOV[selectedSector] || 3500);
  const [activePlan, setActivePlan] = useState(null);
  const [form, setForm] = useState({ shop: '', phone: '', city: 'ঢাকা', pay: 'bkash' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  if (aovSector !== selectedSector) {
    setAovSector(selectedSector);
    setAov(DEFAULT_AOV[selectedSector] || 3500);
  }

  useEffect(() => {
    if (!activePlan && !success) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setActivePlan(null);
        setSuccess(null);
        setErrors({});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePlan, success]);

  const lost = missed * aov;
  const recommended = lost >= 2490 ? PLANS[1] : PLANS[0];
  const recommendedQuote = planQuote(recommended, cycle);
  const paybackDays = lost > 0 ? Math.max(1, Math.round((recommendedQuote.perMonth / lost) * 30)) : null;

  const openCheckout = (plan) => {
    setSuccess(null);
    setErrors({});
    setActivePlan(plan);
  };

  const closeModal = () => {
    setActivePlan(null);
    setSuccess(null);
    setErrors({});
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submitTrial = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const shop = form.shop.trim();
    const phone = normalizePhone(form.phone);

    if (shop.length < 2) nextErrors.shop = 'দোকানের নাম লিখুন।';
    if (!/^01[3-9]\d{8}$/.test(phone)) nextErrors.phone = '১১ সংখ্যার মোবাইল দিন, যেমন 01712345678।';
    if (!form.city) nextErrors.city = 'শহর বাছুন।';
    if (!form.pay) nextErrors.pay = 'পেমেন্ট মাধ্যম বাছুন।';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const quote = planQuote(activePlan, cycle);
    setSuccess({
      shop,
      phone,
      city: form.city,
      pay: form.pay,
      plan: activePlan,
      cycle,
      perMonth: quote.perMonth,
    });
    setActivePlan(null);
    confetti({
      particleCount: 90,
      spread: 72,
      origin: { y: 0.62 },
      colors: ['#06b6d4', '#10b981', '#f59e0b', '#e2136e'],
    });
  };

  const quoteFor = (plan) => planQuote(plan, cycle);
  const sectorLine = SECTOR_LINE[selectedSector] || SECTOR_LINE.boutique;
  const sectorHook = SECTOR_HOOK[selectedSector] || SECTOR_HOOK.boutique;
  const successPay = PAYMENTS.find((item) => item.id === success?.pay);

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero-copy">
          <div className="pricing-kicker bn">বাংলাদেশের দোকানের জন্য</div>
          <h2 className="bn">দোকান চলুক সারা রাত — আপনি পরিবারের সাথে থাকুন</h2>
          <p className="bn pricing-lead">
            ফেসবুক ইনবক্স, হোয়াটসঅ্যাপ আর খাতার স্টক — সব এক জায়গায়। ঘুমের মধ্যেও bKash, নগদ আর ক্যাশ অন ডেলিভারিতে অর্ডার নিন।
          </p>
          <p className="pricing-sector bn">{sectorLine}</p>
          <div className="pricing-trust">
            <span><ShieldCheck size={15} /> সেটআপ ফি নেই</span>
            <span><Clock size={15} /> ১৪ দিন ফ্রি</span>
            <span><Smartphone size={15} /> কার্ড লাগে না</span>
            <span><MessageCircle size={15} /> বাংলায় সাপোর্ট</span>
          </div>
        </div>
        <div className="pricing-hero-aside">
          <div className="pricing-aside-label">একটা মিসড অর্ডার</div>
          <div className="pricing-aside-figure">{sectorHook.amount}</div>
          <p className="bn">{sectorHook.text}</p>
        </div>
      </section>

      <div className="pricing-switch-row" id="plans">
        <div className="billing-toggle" role="group" aria-label="বিলিং সময়">
          <button
            type="button"
            className={cycle === 'monthly' ? 'active' : ''}
            aria-pressed={cycle === 'monthly'}
            onClick={() => setCycle('monthly')}
          >
            মাসিক
          </button>
          <button
            type="button"
            className={cycle === 'yearly' ? 'active' : ''}
            aria-pressed={cycle === 'yearly'}
            onClick={() => setCycle('yearly')}
          >
            বার্ষিক
            <span className="billing-save">২ মাস ফ্রি</span>
          </button>
        </div>
        <p className="bn pricing-switch-note">যেকোনো সময় বাতিল। দামে সবকিছু আছে — আলাদা সেটআপ ফি নেই।</p>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => {
          const quote = quoteFor(plan);
          return (
            <article key={plan.id} className={`plan-card ${plan.popular ? 'featured' : ''}`}>
              <div className="plan-card-top">
                <div>
                  <div className="plan-en">{plan.en}</div>
                  <h3 className="bn">{plan.name}</h3>
                </div>
                {plan.popular && <span className="plan-ribbon bn">সবচেয়ে জনপ্রিয়</span>}
              </div>
              <p className="plan-audience bn">{plan.audience}</p>
              <p className="plan-blurb bn">{plan.blurb}</p>
              <div className="plan-price-block">
                {cycle === 'yearly' && (
                  <span className="plan-price-was">{taka(plan.monthly)}</span>
                )}
                <div className="plan-price-now">
                  <span className="taka-sign">৳</span>
                  {quote.perMonth.toLocaleString('en-US')}
                </div>
                <div className="plan-price-caption bn">
                  {cycle === 'yearly'
                    ? `মাসে · বার্ষিক বিল ${taka(quote.total)} · ${taka(quote.save)} সাশ্রয়`
                    : 'প্রতি মাস · যেকোনো সময় বাতিল'}
                </div>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature} className="bn">
                    <Check size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} plan-cta`}
                onClick={() => openCheckout(plan)}
              >
                {plan.popular ? 'এই প্ল্যান দিয়ে শুরু করুন' : '১৪ দিন ফ্রি শুরু'}
              </button>
            </article>
          );
        })}
      </div>

      <section className="pricing-panel">
        <div className="pricing-panel-head">
          <div>
            <h3 className="bn">আপনার দোকানে এটা কতটা ওঠে?</h3>
            <p className="bn">মাসে কয়টা অর্ডার ইনবক্সে হারিয়ে যায়, সেটা বসান। প্ল্যান নিজে থেকে বলে দেবে।</p>
          </div>
          <Sparkles size={18} color="var(--amber-primary)" />
        </div>
        <div className="roi-grid">
          <div className="roi-controls">
            <label className="roi-field">
              <span className="bn">মাসে মিস হওয়া অর্ডার <strong>{missed}</strong></span>
              <input
                className="roi-range"
                type="range"
                min="0"
                max="30"
                value={missed}
                onChange={(event) => setMissed(Number(event.target.value))}
              />
            </label>
            <label className="roi-field">
              <span className="bn">গড় অর্ডারের দাম <strong>{taka(aov)}</strong></span>
              <input
                className="roi-range"
                type="range"
                min="500"
                max="15000"
                step="100"
                value={aov}
                onChange={(event) => setAov(Number(event.target.value))}
              />
            </label>
          </div>
          <div className="roi-result">
            {lost === 0 ? (
              <>
                <div className="roi-kicker bn">সময়ের হিসাব</div>
                <p className="bn roi-result-copy">
                  অর্ডার না মিস হলেও ইনবক্স দেখা, স্টক মিলানো আর ফলো-আপ — দিনে প্রায় দুই ঘণ্টা। শুরু প্ল্যানে সেই কাজটা দোকানের ভেতরেই থাকে।
                </p>
              </>
            ) : (
              <>
                <div className="roi-kicker bn">মাসে আনুমানিক ক্ষতি</div>
                <div className="roi-loss">{taka(lost)}</div>
                <p className="bn roi-result-copy">
                  {recommended.name} প্ল্যান {taka(recommendedQuote.perMonth)}। এই হিসাবে খরচ উঠতে প্রায় {paybackDays} দিন।
                </p>
              </>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openCheckout(recommended)}
            >
              {recommended.name} প্ল্যান নিন
            </button>
          </div>
        </div>
      </section>

      <section className="pricing-panel">
        <div className="pricing-panel-head">
          <div>
            <h3 className="bn">প্রথম সপ্তাহে কী হয়</h3>
            <p className="bn">সেটআপ নিজে বুঝে নিতে হয় না। কলের পর দোকান চালু থাকে।</p>
          </div>
        </div>
        <div className="pricing-steps">
          {STEPS.map((step) => (
            <div key={step.day} className="pricing-step">
              <div className="pricing-step-day bn">{step.day}</div>
              <h4 className="bn">{step.title}</h4>
              <p className="bn">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-panel">
        <div className="pricing-panel-head">
          <div>
            <h3 className="bn">প্ল্যান পাশাপাশি</h3>
            <p className="bn">যা লাগবে, সেটাই নিন। বাকিটা সিজন এলে যোগ করা যায়।</p>
          </div>
        </div>
        <p className="pricing-scroll-hint bn">আড়াআড়ি সোয়াইপ করে বাকি কলাম দেখুন।</p>
        <div className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th scope="col" className="bn">যা পাবেন</th>
                {PLANS.map((plan) => (
                  <th key={plan.id} scope="col" className={plan.popular ? 'col-popular bn' : 'bn'}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="bn">{row.label}</th>
                  <td><Cell value={row.shuru} /></td>
                  <td className="col-popular"><Cell value={row.dokan} /></td>
                  <td><Cell value={row.brand} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-pay-strip">
        <Store size={18} />
        <div>
          <strong className="bn">দোকানি যেভাবে টাকা পাঠায়, বিলও সেভাবে</strong>
          <p className="bn">bKash, নগদ, রকেট বা ব্যাংক। মাস শেষে মোবাইলে নোটিফিকেশন — কার্ড বা বিদেশি পেমেন্ট গেটওয়ে লাগে না।</p>
        </div>
        <div className="pricing-pay-pills">
          <span className="pay-pill bkash">bKash</span>
          <span className="pay-pill nagad">নগদ</span>
          <span className="pay-pill rocket">রকেট</span>
          <span className="pay-pill bank">ব্যাংক</span>
        </div>
      </section>

      <section className="pricing-panel">
        <div className="pricing-panel-head">
          <h3 className="bn">দোকানিরা যা জিজ্ঞেস করেন</h3>
        </div>
        <div className="faq-list">
          {FAQS.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className={`faq-item ${open ? 'open' : ''}`}>
                <button
                  type="button"
                  className="bn"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} />
                </button>
                {open && <p className="bn">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pricing-closing">
        <div>
          <h3 className="bn">কালকের ইনবক্স যেন খাতায় না থাকে</h3>
          <p className="bn">১৪ দিন ফ্রি। কার্ড লাগবে না। মন না হলে বন্ধ করে দিলেই হয়।</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => openCheckout(PLANS[1])}>
          দোকান প্ল্যান দিয়ে শুরু
        </button>
      </section>

      {(activePlan || success) && (
        <div className="modal-overlay" onClick={closeModal} role="presentation">
          <div
            className="modal-card pricing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            {success ? (
              <>
                <div className="modal-header">
                  <h3 id="pricing-modal-title" className="bn">ট্রায়াল চালু হয়েছে</h3>
                  <button type="button" className="icon-btn" onClick={closeModal} aria-label="বন্ধ করুন">
                    <X size={16} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="trial-success-mark">
                    <Check size={28} />
                  </div>
                  <p className="bn trial-success-lead">
                    {success.shop} এর জন্য {success.plan.name} প্ল্যানের ১৪ দিন ফ্রি চালু। কোনো টাকা কাটা হয়নি।
                  </p>
                  <ul className="trial-summary bn">
                    <li><span>মোবাইল</span><strong>{success.phone}</strong></li>
                    <li><span>শহর</span><strong>{success.city}</strong></li>
                    <li><span>পেমেন্ট</span><strong>{successPay?.name}</strong></li>
                    <li>
                      <span>ট্রায়াল শেষে</span>
                      <strong>
                        {taka(success.perMonth)} / মাস
                        {success.cycle === 'yearly' ? ' · বার্ষিক' : ''}
                      </strong>
                    </li>
                  </ul>
                  <p className="bn pricing-demo-note">
                    ডেমো চেকআউট। টিম হোয়াটসঅ্যাপে যোগাযোগ করবে — আপনি না বললে বিল হবে না।
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>
                    আরেকটি প্ল্যান
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => onExplore('workflow')}>
                    দোকান ঘুরে দেখুন
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={submitTrial}>
                <div className="modal-header">
                  <div>
                    <h3 id="pricing-modal-title" className="bn">{activePlan.name} প্ল্যান · ১৪ দিন ফ্রি</h3>
                    <p className="pricing-modal-sub bn">
                      ট্রায়াল শেষে {taka(quoteFor(activePlan).perMonth)} / মাস
                      {cycle === 'yearly' ? ` · বার্ষিক ${taka(quoteFor(activePlan).total)}` : ''}
                    </p>
                  </div>
                  <button type="button" className="icon-btn" onClick={closeModal} aria-label="বন্ধ করুন">
                    <X size={16} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label" htmlFor="shop-name">দোকানের নাম</label>
                    <input
                      id="shop-name"
                      className={`form-input ${errors.shop ? 'invalid' : ''}`}
                      value={form.shop}
                      autoComplete="organization"
                      placeholder="রয়েল জামদানি হাউস"
                      onChange={(event) => updateField('shop', event.target.value)}
                    />
                    {errors.shop && <span className="form-error">{errors.shop}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="shop-phone">মোবাইল নম্বর</label>
                    <input
                      id="shop-phone"
                      className={`form-input ${errors.phone ? 'invalid' : ''}`}
                      value={form.phone}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="01712345678"
                      onChange={(event) => updateField('phone', normalizePhone(event.target.value))}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="shop-city">শহর</label>
                    <select
                      id="shop-city"
                      className="form-select"
                      value={form.city}
                      onChange={(event) => updateField('city', event.target.value)}
                    >
                      {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <span className="form-label">পেমেন্ট মাধ্যম</span>
                    <div className="pay-method-grid">
                      {PAYMENTS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          className={`pay-method ${form.pay === method.id ? 'selected' : ''}`}
                          style={{ '--pay-color': method.color }}
                          onClick={() => updateField('pay', method.id)}
                        >
                          <strong>{method.name}</strong>
                          <span>{method.hint}</span>
                        </button>
                      ))}
                    </div>
                    <p className="bn pricing-demo-note">{PAY_HELP[form.pay]}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>পরে</button>
                  <button type="submit" className="btn btn-primary">ট্রায়াল চালু করুন</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
