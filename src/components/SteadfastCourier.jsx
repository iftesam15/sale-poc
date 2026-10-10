import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Check,
  MapPin,
  PackageCheck,
  ScanLine,
  ShoppingBag,
  Store,
  Truck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGE_RANK = {
  placed: 0,
  seen: 1,
  packed: 2,
  booked: 3,
  in_transit: 4,
  out_for_delivery: 5,
  delivered: 6,
};

const STAGE_LABEL = {
  placed: 'New on your desk',
  seen: 'Opened — pack next',
  packed: 'Packaged',
  booked: 'Pickup requested',
  in_transit: 'In transit',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
};

const CUSTOMER_COPY = {
  placed: 'The shop has your order and has not packed it yet.',
  seen: 'The shop opened your order and is about to pack it.',
  packed: 'Your parcel is sealed. Steadfast tracking is issued next.',
  booked: 'Steadfast has the parcel. A rider will pick it up.',
  in_transit: 'Steadfast picked up the parcel. It is on the way.',
  out_for_delivery: 'The rider is out for delivery.',
  delivered: 'Delivered.',
};

const SCAN_NEXT = {
  booked: {
    stage: 'in_transit',
    delivery_status: 'DISPATCHED',
    title: 'Picked up',
    detail: 'Steadfast rider collected the parcel from the shop',
  },
  in_transit: {
    stage: 'out_for_delivery',
    delivery_status: 'OUT_FOR_DELIVERY',
    title: 'Out for delivery',
    detail: 'Rider is heading to the customer address',
  },
  out_for_delivery: {
    stage: 'delivered',
    delivery_status: 'DELIVERED',
    title: 'Delivered',
    detail: 'Parcel handed to the customer',
  },
};

function clock() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function inferStage(order) {
  if (order.steadfast?.stage) return order.steadfast.stage;
  if (order.delivery_status === 'DELIVERED') return 'delivered';
  if (order.delivery_status === 'OUT_FOR_DELIVERY') return 'out_for_delivery';
  if (order.delivery_status === 'DISPATCHED') return 'in_transit';
  if (order.delivery_status === 'PICKUP_REQUESTED') return 'booked';
  if (order.delivery_status === 'PACKED') return 'packed';
  if (order.tracking_code) return 'booked';
  return 'placed';
}

function ensureSteadfast(order) {
  if (order.steadfast?.stage) return order;
  return {
    ...order,
    steadfast: {
      stage: inferStage(order),
      weight_kg: order.steadfast?.weight_kg ?? null,
      consignment_id: order.steadfast?.consignment_id ?? null,
      events: order.steadfast?.events || [
        {
          time: order.created_at,
          title: 'Customer placed order',
          detail: order.tracking_code
            ? `Tracking ${order.tracking_code}`
            : 'Waiting for the shop to pack',
        },
      ],
    },
  };
}

function emptyDraft() {
  return { picked: false, counted: false, sealed: false, weight: '0.5' };
}

export default function SteadfastCourier({
  inventory,
  orders,
  setOrders,
  onCustomerCheckout,
}) {
  const inStock = inventory.filter((item) => item.stock_qty > 0);
  const [variantId, setVariantId] = useState(inStock[0]?.variant_id || inventory[0]?.variant_id || '');
  const [checkout, setCheckout] = useState({
    name: 'Rafiul Karim',
    phone: '01300-112233',
    city: 'Dhaka',
    address: 'Flat 2C, House 9, Road 2, Banani, Dhaka',
    payment_method: 'COD',
    quantity: 1,
  });
  const [formError, setFormError] = useState('');
  const [customerOrderId, setCustomerOrderId] = useState(null);
  const [selectedId, setSelectedId] = useState('ORD-9830');
  const [landedId, setLandedId] = useState(null);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    if (inventory.some((item) => item.variant_id === variantId)) return;
    const next = inventory.find((item) => item.stock_qty > 0) || inventory[0];
    if (next) setVariantId(next.variant_id);
  }, [inventory, variantId]);

  const steadfastOrders = useMemo(() => {
    return orders
      .filter((order) => order.courier === 'Steadfast Courier')
      .map(ensureSteadfast)
      .sort((a, b) => STAGE_RANK[inferStage(a)] - STAGE_RANK[inferStage(b)]);
  }, [orders]);

  const selected = steadfastOrders.find((order) => order.id === selectedId) || steadfastOrders[0] || null;
  const customerOrder = orders.find((order) => order.id === customerOrderId);
  const customerView = customerOrder ? ensureSteadfast(customerOrder) : null;
  const selectedVariant = inventory.find((item) => item.variant_id === variantId) || inStock[0] || null;
  const draft = selected ? (drafts[selected.id] || emptyDraft()) : emptyDraft();
  const packReady = draft.picked && draft.counted && draft.sealed && Number(draft.weight) > 0;
  const toPackCount = steadfastOrders.filter((order) => ['placed', 'seen', 'packed'].includes(inferStage(order))).length;

  const patchOrder = (orderId, mutate) => {
    setOrders((prev) => prev.map((order) => {
      if (order.id !== orderId) return order;
      return mutate(ensureSteadfast(order));
    }));
  };

  const openOrder = (order) => {
    setSelectedId(order.id);
    patchOrder(order.id, (current) => {
      if (current.steadfast.stage !== 'placed') return current;
      return {
        ...current,
        delivery_status: 'CONFIRMED',
        steadfast: {
          ...current.steadfast,
          stage: 'seen',
          events: [
            ...current.steadfast.events,
            {
              time: clock(),
              title: 'Opened on your desk',
              detail: `${current.customer_name} · ${current.address}`,
            },
          ],
        },
      };
    });
  };

  const updateDraft = (orderId, patch) => {
    setDrafts((prev) => ({
      ...prev,
      [orderId]: { ...(prev[orderId] || emptyDraft()), ...patch },
    }));
  };

  const packageGoods = () => {
    if (!selected || !packReady) return;
    const weight = Number(draft.weight);
    patchOrder(selected.id, (current) => ({
      ...current,
      delivery_status: 'PACKED',
      steadfast: {
        ...current.steadfast,
        stage: 'packed',
        weight_kg: weight,
        events: [
          ...current.steadfast.events,
          {
            time: clock(),
            title: 'Goods packaged',
            detail: `${current.quantity} lot · ${weight.toFixed(2)} kg · sealed for Steadfast`,
          },
        ],
      },
    }));
  };

  const bookSteadfast = () => {
    if (!selected || inferStage(selected) !== 'packed') return;
    const tracking = `ST-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const consignmentId = Math.floor(10000000 + Math.random() * 90000000);
    patchOrder(selected.id, (current) => ({
      ...current,
      delivery_status: 'PICKUP_REQUESTED',
      tracking_code: tracking,
      steadfast: {
        ...current.steadfast,
        stage: 'booked',
        consignment_id: consignmentId,
        events: [
          ...current.steadfast.events,
          {
            time: clock(),
            title: 'Steadfast consignment created',
            detail: `Tracking ${tracking} · consignment ${consignmentId}`,
          },
        ],
      },
    }));
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 } });
  };

  const advanceScan = () => {
    if (!selected) return;
    const next = SCAN_NEXT[inferStage(selected)];
    if (!next) return;
    patchOrder(selected.id, (current) => ({
      ...current,
      delivery_status: next.delivery_status,
      steadfast: {
        ...current.steadfast,
        stage: next.stage,
        events: [
          ...current.steadfast.events,
          { time: clock(), title: next.title, detail: next.detail },
        ],
      },
    }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const name = checkout.name.trim();
    const phone = checkout.phone.trim();
    const address = checkout.address.trim();
    const city = checkout.city.trim();
    const quantity = Math.max(1, Number(checkout.quantity) || 1);
    const digits = phone.replace(/\D/g, '');

    if (!selectedVariant) {
      setFormError('Choose a product that is still in stock.');
      return;
    }
    if (!name || digits.length < 11 || !address || !city) {
      setFormError('Name, an 11-digit phone, city, and address are required.');
      return;
    }
    if (selectedVariant.stock_qty < quantity) {
      setFormError(`Only ${selectedVariant.stock_qty} left for this variant.`);
      return;
    }

    const orderId = onCustomerCheckout({
      customer: { name, phone, city },
      variant: selectedVariant,
      quantity,
      address,
      payment_method: checkout.payment_method,
    });

    setFormError('');
    setCustomerOrderId(orderId);
    setSelectedId(orderId);
    setLandedId(orderId);
    confetti({ particleCount: 40, spread: 55, origin: { y: 0.75 } });
  };

  const stage = selected ? inferStage(selected) : null;
  const codAmount = selected
    ? (selected.payment_status.includes('COD') ? selected.total_price_bdt : 0)
    : 0;

  return (
    <div className="steadfast-flow">
      <div className="card steadfast-intro">
        <div>
          <h3>
            <Truck size={20} color="#e11d48" />
            Steadfast Courier — order, desk, pack
          </h3>
          <p>
            A customer checks out, the order lands on your desk, then you pack the goods and Steadfast issues a tracking code.
            {toPackCount > 0
              ? ` ${toPackCount} ${toPackCount === 1 ? 'parcel still needs' : 'parcels still need'} packing or a booking.`
              : ' Nothing is waiting to pack.'}
          </p>
        </div>
        <ol className="steadfast-rail">
          <li>Customer orders</li>
          <li>You see it</li>
          <li>You pack it</li>
          <li>Tracking goes live</li>
        </ol>
      </div>

      <div className="steadfast-layout">
        <section className="card steadfast-lane">
          <div className="steadfast-lane-title">
            <Store size={18} />
            <div>
              <h4>Customer shop</h4>
              <p>Place an order the way a buyer would.</p>
            </div>
          </div>

          <div className="steadfast-products">
            {(inStock.length ? inStock : inventory).slice(0, 4).map((item) => (
              <button
                key={item.variant_id}
                type="button"
                className={`steadfast-product ${variantId === item.variant_id ? 'active' : ''}`}
                onClick={() => setVariantId(item.variant_id)}
              >
                <img src={item.image_url} alt="" />
                <span>
                  <strong>{item.product_name}</strong>
                  <em>{item.color} · {item.size}</em>
                  <em>৳{item.price_bdt.toLocaleString()} · {item.stock_qty} in stock</em>
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={placeOrder} className="steadfast-form">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="sf-name">Name</label>
                <input
                  id="sf-name"
                  className="form-input"
                  value={checkout.name}
                  onChange={(e) => setCheckout({ ...checkout, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="sf-phone">Phone</label>
                <input
                  id="sf-phone"
                  className="form-input"
                  value={checkout.phone}
                  onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="sf-city">City</label>
                <input
                  id="sf-city"
                  className="form-input"
                  value={checkout.city}
                  onChange={(e) => setCheckout({ ...checkout, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="sf-pay">Payment</label>
                <select
                  id="sf-pay"
                  className="form-select"
                  value={checkout.payment_method}
                  onChange={(e) => setCheckout({ ...checkout, payment_method: e.target.value })}
                >
                  <option value="COD">Cash on delivery</option>
                  <option value="BKASH">bKash</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sf-address">Delivery address</label>
              <textarea
                id="sf-address"
                className="form-textarea"
                rows={2}
                value={checkout.address}
                onChange={(e) => setCheckout({ ...checkout, address: e.target.value })}
              />
            </div>
            {formError && <p className="steadfast-error">{formError}</p>}
            <button className="btn btn-primary" type="submit" disabled={!selectedVariant || selectedVariant.stock_qty < 1}>
              <ShoppingBag size={16} />
              Place order
            </button>
          </form>

          {customerView && (
            <div className="steadfast-receipt">
              <div className="steadfast-receipt-head">
                <span>Order {customerView.id}</span>
                <strong>{STAGE_LABEL[inferStage(customerView)]}</strong>
              </div>
              <p>{CUSTOMER_COPY[inferStage(customerView)]}</p>
              <p>
                {customerView.product_name} · ৳{customerView.total_price_bdt.toLocaleString()}
                {customerView.tracking_code ? ` · ${customerView.tracking_code}` : ' · tracking after packing'}
              </p>
            </div>
          )}
        </section>

        <section className="card steadfast-lane">
          <div className="steadfast-lane-title">
            <PackageCheck size={18} />
            <div>
              <h4>Your desk</h4>
              <p>Open the order, pack the goods, then book Steadfast.</p>
            </div>
          </div>

          <div className="steadfast-desk">
            <div className="steadfast-queue">
              {steadfastOrders.map((order) => {
                const orderStage = inferStage(order);
                const active = selected?.id === order.id;
                return (
                  <button
                    key={order.id}
                    type="button"
                    className={`steadfast-queue-item ${active ? 'active' : ''} ${landedId === order.id && orderStage === 'placed' ? 'landed' : ''}`}
                    onClick={() => openOrder(order)}
                  >
                    <span className="sku-badge">{order.id}</span>
                    <strong>{order.customer_name}</strong>
                    <em>{order.product_name}</em>
                    <span className={`status-badge ${orderStage === 'delivered' ? 'delivered' : orderStage === 'placed' ? 'low-stock' : 'dispatched'}`}>
                      {STAGE_LABEL[orderStage]}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="steadfast-detail">
                <header>
                  <div>
                    <h4>{selected.customer_name}</h4>
                    <p>{selected.phone} · {selected.address}</p>
                  </div>
                  <span className="status-badge cod">{STAGE_LABEL[stage]}</span>
                </header>

                <div className="steadfast-meta">
                  <span><Box size={14} /> {selected.quantity}× {selected.product_name}</span>
                  <span className="sku-badge">{selected.variant_id}</span>
                  <span>৳{selected.total_price_bdt.toLocaleString()} · COD ৳{codAmount.toLocaleString()}</span>
                  <span><MapPin size={14} /> Steadfast home delivery</span>
                </div>

                {stage === 'placed' && (
                  <div className="steadfast-pack">
                    <p>This order is on your desk. Open it before you pack the goods.</p>
                    <button className="btn btn-outline" type="button" onClick={() => openOrder(selected)}>
                      I can see this order
                    </button>
                  </div>
                )}

                {stage === 'seen' && (
                  <fieldset className="steadfast-pack">
                    <legend>Pack the goods</legend>
                    {[
                      ['picked', `Pick ${selected.variant_id} from the shelf`],
                      ['counted', `Count ${selected.quantity} piece${selected.quantity > 1 ? 's' : ''}`],
                      ['sealed', 'Wrap and seal the parcel'],
                    ].map(([key, label]) => (
                      <label key={key} className="steadfast-check">
                        <input
                          type="checkbox"
                          checked={draft[key]}
                          onChange={(e) => updateDraft(selected.id, { [key]: e.target.checked })}
                        />
                        <span>{label}</span>
                        {draft[key] && <Check size={14} />}
                      </label>
                    ))}
                    <label className="form-label" htmlFor="sf-weight">Parcel weight (kg)</label>
                    <input
                      id="sf-weight"
                      className="form-input"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={draft.weight}
                      onChange={(e) => updateDraft(selected.id, { weight: e.target.value })}
                    />
                    <button className="btn btn-success" type="button" disabled={!packReady} onClick={packageGoods}>
                      <PackageCheck size={16} />
                      Package this order
                    </button>
                  </fieldset>
                )}

                {stage === 'packed' && (
                  <div className="steadfast-pack">
                    <p>Parcel sealed at {Number(selected.steadfast.weight_kg).toFixed(2)} kg. Book it with Steadfast to get a tracking code.</p>
                    <button className="btn btn-primary" type="button" onClick={bookSteadfast}>
                      <Truck size={16} />
                      Book Steadfast pickup
                    </button>
                  </div>
                )}

                {selected.tracking_code && (
                  <div className="steadfast-label">
                    <div>
                      <span>Steadfast Courier</span>
                      <strong>{selected.tracking_code}</strong>
                    </div>
                    <dl>
                      <div><dt>Invoice</dt><dd>{selected.id}</dd></div>
                      <div><dt>Consignment</dt><dd>{selected.steadfast.consignment_id || '—'}</dd></div>
                      <div><dt>COD</dt><dd>৳{codAmount.toLocaleString()}</dd></div>
                      <div><dt>Lot</dt><dd>{selected.quantity} · {selected.steadfast.weight_kg ?? '—'} kg</dd></div>
                    </dl>
                  </div>
                )}

                {SCAN_NEXT[stage] && (
                  <button className="btn btn-outline" type="button" onClick={advanceScan}>
                    <ScanLine size={16} />
                    Advance courier scan
                  </button>
                )}

                <ol className="steadfast-timeline">
                  {selected.steadfast.events.map((item, index) => (
                    <li key={`${item.title}-${index}`}>
                      <span>{item.time}</span>
                      <strong>{item.title}</strong>
                      <em>{item.detail}</em>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
