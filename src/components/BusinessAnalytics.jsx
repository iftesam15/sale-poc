import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Download,
  MapPin,
  Search,
  Truck,
  Wallet,
} from 'lucide-react';
import { getShopAnalytics, SECTORS } from '../data/mockData';

const RANGES = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '90d', label: '90 days' },
];

function taka(amount) {
  return `৳${Math.round(amount).toLocaleString('en-US')}`;
}

function pct(value) {
  const points = Math.abs(value * 100).toFixed(1);
  return `${value > 0 ? '+' : value < 0 ? '−' : ''}${points}%`;
}

function Delta({ value, invert = false }) {
  const good = invert ? value < 0 : value > 0;
  const Icon = value >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`analytics-delta ${good ? 'up' : 'down'}`}>
      <Icon size={13} />
      {pct(value)} vs prior
    </span>
  );
}

function Donut({ slices }) {
  const stops = slices.reduce((acc, slice) => {
    const end = acc.cursor + slice.share * 100;
    return {
      cursor: end,
      parts: [...acc.parts, `${slice.color} ${acc.cursor}% ${end}%`],
    };
  }, { cursor: 0, parts: [] }).parts.join(', ');

  return (
    <div className="analytics-donut" style={{ background: `conic-gradient(${stops})` }} aria-hidden="true">
      <div className="analytics-donut-hole" />
    </div>
  );
}

function downloadCsv(filename, rows) {
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function stockForProduct(inventory, sector, productName) {
  const key = productName.split(' ').slice(0, 3).join(' ').toLowerCase();
  return inventory.filter((item) => (
    item.sector === sector && item.product_name.toLowerCase().includes(key.split(' ')[0])
    && item.product_name.toLowerCase().split(' ').some((word) => key.includes(word) && word.length > 4)
  ));
}

export default function BusinessAnalytics({ selectedSector, orders, customers, inventory }) {
  const [range, setRange] = useState('30d');
  const [channel, setChannel] = useState('all');
  const [sortKey, setSortKey] = useState('revenue');
  const [query, setQuery] = useState('');
  const [openProduct, setOpenProduct] = useState(null);
  const [hover, setHover] = useState(null);

  const sector = SECTORS.find((item) => item.id === selectedSector) || SECTORS[0];
  const report = useMemo(
    () => getShopAnalytics(selectedSector, range, channel),
    [selectedSector, range, channel],
  );

  const maxTrend = Math.max(...report.trend.map((point) => point.gmv));
  const sortedProducts = [...report.products].sort((a, b) => b[sortKey] - a[sortKey]);
  const visibleProducts = sortedProducts.filter((product) => (
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  ));
  const liveGmv = orders.reduce((sum, order) => sum + (order.total_price_bdt || 0), 0);
  const activeProduct = report.products.find((product) => product.name === openProduct) || null;

  const exportReport = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Sector', sector.name],
      ['Range', report.range.label],
      ['Channel', report.channelName],
      ['GMV (BDT)', report.gmv],
      ['Orders', report.orders],
      ['AOV (BDT)', report.aov],
      ['Gross profit (BDT)', report.grossProfit],
      ['Repeat rate', `${(report.repeat * 100).toFixed(1)}%`],
      ['COD return rate', `${(report.rto * 100).toFixed(1)}%`],
      [],
      ['Product', 'Units', 'Revenue BDT', 'Margin', 'Returns'],
      ...report.products.map((product) => [
        product.name,
        product.units,
        product.revenue,
        `${(product.margin * 100).toFixed(0)}%`,
        `${(product.returns * 100).toFixed(0)}%`,
      ]),
    ];
    downloadCsv(`telesto-analytics-${selectedSector}-${range}.csv`, rows);
  };

  return (
    <div className="analytics-page">
      <section className="analytics-toolbar">
        <div>
          <div className="analytics-kicker">
            <BarChart3 size={15} />
            Shop ledger
          </div>
          <h2>Business analytics</h2>
          <p>
            {sector.name} · {report.range.label} · {report.channelName}. Figures are the demo ledger. The register at the bottom is this session’s live orders.
          </p>
        </div>
        <div className="analytics-toolbar-actions">
          <div className="analytics-range" role="group" aria-label="Date range">
            {RANGES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={range === item.id ? 'active' : ''}
                aria-pressed={range === item.id}
                onClick={() => { setRange(item.id); setOpenProduct(null); }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-outline" onClick={exportReport}>
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </section>

      <div className="analytics-filters">
        <span>Channel</span>
        <button
          type="button"
          className={channel === 'all' ? 'active' : ''}
          onClick={() => setChannel('all')}
        >
          All
        </button>
        {report.channels.map((item) => (
          <button
            key={item.id}
            type="button"
            className={channel === item.id ? 'active' : ''}
            onClick={() => setChannel(item.id)}
          >
            {item.name}
            <em>{Math.round(item.share * 100)}%</em>
          </button>
        ))}
      </div>

      <section className="analytics-kpis">
        <article className="analytics-kpi">
          <span>Gross sales</span>
          <strong>{taka(report.gmv)}</strong>
          <Delta value={report.deltas.gmv} />
        </article>
        <article className="analytics-kpi">
          <span>Orders</span>
          <strong>{report.orders.toLocaleString('en-US')}</strong>
          <Delta value={report.deltas.orders} />
        </article>
        <article className="analytics-kpi">
          <span>Average order</span>
          <strong>{taka(report.aov)}</strong>
          <Delta value={report.deltas.aov} />
        </article>
        <article className="analytics-kpi">
          <span>Gross profit</span>
          <strong>{taka(report.grossProfit)}</strong>
          <Delta value={report.deltas.profit} />
        </article>
        <article className="analytics-kpi">
          <span>Repeat buyers</span>
          <strong>{(report.repeat * 100).toFixed(0)}%</strong>
          <Delta value={report.deltas.repeat} />
        </article>
        <article className="analytics-kpi">
          <span>COD returns</span>
          <strong>{(report.rto * 100).toFixed(1)}%</strong>
          <Delta value={report.deltas.rto} invert />
        </article>
      </section>

      <section className="analytics-grid-main">
        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Sales over time</h3>
              <p>{report.trend.length} buckets ending 8 Oct 2026</p>
            </div>
            <Wallet size={16} />
          </div>
          <div className="analytics-chart" role="img" aria-label="Sales trend">
            {report.trend.map((point, index) => (
              <button
                key={point.label}
                type="button"
                className={`analytics-bar ${hover === index ? 'active' : ''}`}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
              >
                <span className="analytics-bar-fill" style={{ height: `${Math.max(8, (point.gmv / maxTrend) * 100)}%` }} />
                <span className="analytics-bar-label">{point.label}</span>
                {hover === index && (
                  <span className="analytics-tip">
                    <strong>{taka(point.gmv)}</strong>
                    <em>{point.orders} orders</em>
                  </span>
                )}
              </button>
            ))}
          </div>
        </article>

        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>How customers pay</h3>
              <p>Mix applied to this view</p>
            </div>
          </div>
          <div className="analytics-pay-layout">
            <Donut slices={report.payments} />
            <ul className="analytics-legend">
              {report.payments.map((item) => (
                <li key={item.id}>
                  <i style={{ background: item.color }} />
                  <span>{item.name}</span>
                  <strong>{Math.round(item.share * 100)}%</strong>
                  <em>{taka(item.amount)}</em>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="analytics-grid-split">
        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Inbox to delivery</h3>
              <p>{(report.conversion * 100).toFixed(0)}% of inquiries become an order</p>
            </div>
          </div>
          <ol className="analytics-funnel">
            {report.funnel.map((step, index) => {
              const previous = report.funnel[index - 1];
              const width = (step.value / report.funnel[0].value) * 100;
              const drop = previous ? 1 - step.value / previous.value : 0;
              return (
                <li key={step.id}>
                  <div className="analytics-funnel-meta">
                    <span>{step.label}</span>
                    <strong>{step.value.toLocaleString('en-US')}</strong>
                  </div>
                  <div className="analytics-funnel-track">
                    <div style={{ width: `${width}%` }} />
                  </div>
                  {previous && drop >= 0.01 && (
                    <em>{(drop * 100).toFixed(0)}% drop from previous step</em>
                  )}
                </li>
              );
            })}
          </ol>
        </article>

        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Buyers</h3>
              <p>{report.buyers.toLocaleString('en-US')} people in this view</p>
            </div>
          </div>
          <ul className="analytics-buyers">
            {report.customers.map((item) => (
              <li key={item.id}>
                <div className="analytics-funnel-meta">
                  <span><i style={{ background: item.color }} />{item.label}</span>
                  <strong>{item.count.toLocaleString('en-US')}</strong>
                </div>
                <div className="analytics-funnel-track">
                  <div style={{ width: `${item.share * 100}%`, background: item.color }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="analytics-insights">
            {report.insights.map((insight) => (
              <div key={insight.title} className={`analytics-insight ${insight.tone}`}>
                <strong>{insight.title}</strong>
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="card analytics-card">
        <div className="analytics-card-head">
          <div>
            <h3>Products</h3>
            <p>Click a row for stock cover from the live inventory.</p>
          </div>
          <label className="analytics-search">
            <Search size={14} />
            <input
              value={query}
              placeholder="Search products"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table analytics-table-click">
            <thead>
              <tr>
                <th scope="col">Product</th>
                {[
                  ['units', 'Units'],
                  ['revenue', 'Revenue'],
                  ['margin', 'Margin'],
                  ['returns', 'Returns'],
                ].map(([key, label]) => (
                  <th key={key} scope="col">
                    <button type="button" className={sortKey === key ? 'active' : ''} onClick={() => setSortKey(key)}>
                      {label}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="analytics-empty">No product matches “{query.trim()}”.</td>
                </tr>
              )}
              {visibleProducts.map((product) => {
                const variants = stockForProduct(inventory, selectedSector, product.name);
                const stock = variants.reduce((sum, item) => sum + item.stock_qty, 0);
                const low = variants.some((item) => item.stock_qty <= item.safety_threshold);
                const open = openProduct === product.name;
                const daily = product.units / report.range.days;
                const cover = daily > 0 && variants.length ? Math.round(stock / daily) : null;
                return (
                  <React.Fragment key={product.name}>
                    <tr
                      className={open ? 'open' : ''}
                      onClick={() => setOpenProduct(open ? null : product.name)}
                    >
                      <th scope="row">
                        {product.name}
                        {low && <em className="analytics-low">Low stock</em>}
                      </th>
                      <td>{product.units.toLocaleString('en-US')}</td>
                      <td>{taka(product.revenue)}</td>
                      <td>{(product.margin * 100).toFixed(0)}%</td>
                      <td>{(product.returns * 100).toFixed(0)}%</td>
                    </tr>
                    {open && (
                      <tr className="analytics-detail-row">
                        <td colSpan={5}>
                          <div className="analytics-detail">
                            <span>Profit {taka(product.profit)}</span>
                            <span>Share {(product.share * 100).toFixed(0)}%</span>
                            <span>
                              {variants.length
                                ? `${stock} in stock${cover !== null ? ` · about ${cover} days of cover` : ''}`
                                : 'Not on the live inventory sheet'}
                            </span>
                            {cover !== null && cover < 7 && <span>Reorder before the week runs out.</span>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {activeProduct && visibleProducts.some((product) => product.name === activeProduct.name) && (
          <p className="analytics-sr">{activeProduct.name} details expanded.</p>
        )}
      </section>

      <section className="analytics-grid-three">
        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Where it sells</h3>
              <p><MapPin size={13} /> District mix</p>
            </div>
          </div>
          <ul className="analytics-bars">
            {report.cities.map((city) => (
              <li key={city.name}>
                <div className="analytics-funnel-meta">
                  <span>{city.name}</span>
                  <strong>{taka(city.amount)}</strong>
                </div>
                <div className="analytics-funnel-track">
                  <div style={{ width: `${city.share * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Peak hours</h3>
              <p>When the inbox usually fills</p>
            </div>
          </div>
          <div className="analytics-hours">
            {report.hours.map((hour) => (
              <div key={hour.label} className="analytics-hour" title={hour.label}>
                <span style={{ height: `${Math.max(10, hour.share * 100)}%` }} />
                <em>{hour.label}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="card analytics-card">
          <div className="analytics-card-head">
            <div>
              <h3>Couriers</h3>
              <p><Truck size={13} /> Speed and returns</p>
            </div>
          </div>
          <ul className="analytics-couriers">
            {report.couriers.map((courier) => (
              <li key={courier.name}>
                <strong>{courier.name}</strong>
                <span>{courier.orders.toLocaleString('en-US')} parcels</span>
                <span>{courier.hours}h typical</span>
                <span className={courier.rto > 0.1 ? 'warn' : ''}>{(courier.rto * 100).toFixed(0)}% returns</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card analytics-card">
        <div className="analytics-card-head">
          <div>
            <h3>Live order register</h3>
            <p>
              {orders.length} orders in this session · {taka(liveGmv)} · {customers.length} customers on file
            </p>
          </div>
        </div>
        {orders.length === 0 ? (
          <p className="analytics-empty">No live orders yet. Confirm one in the workflow and it will show up here.</p>
        ) : (
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Product</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Delivery</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.customer_name}</td>
                    <td>{order.product_name}</td>
                    <td>{order.payment_status.replaceAll('_', ' ')}</td>
                    <td>{order.delivery_status}</td>
                    <td>{taka(order.total_price_bdt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
