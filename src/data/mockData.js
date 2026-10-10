// Telesto AI SME Platform - Mock Data Store & Pre-configured Database Schemas
// Matching telesto_architecture_specification.pdf

export const SECTORS = [
  {
    id: 'boutique',
    name: 'Boutiques & Fashion',
    category: 'Apparel, Jamdani, Panjabi, Festive Wear',
    description: 'Size & color variant matrix tracking + automated festive social media campaigns',
    badge: 'Popular',
    color: '#06b6d4',
  },
  {
    id: 'handicrafts',
    name: 'Handicrafts & Jute',
    subtitle: 'Julhas Handicrafts',
    category: 'Artisanal Crafts, Jute Goods, Export Goods',
    description: 'Storytelling marketing generator + digital export product catalogues',
    badge: 'Export Focus',
    color: '#10b981',
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Gifts',
    category: 'High-Value Personal Accessories, Custom Gifts',
    description: 'High-value customer CRM profile tracking + automated repeat customer loyalty',
    badge: 'High AOV',
    color: '#f59e0b',
  },
  {
    id: 'retail_food',
    name: 'Retail & Food',
    category: 'Fast-Moving Consumer Goods, Bakery, Groceries',
    description: 'Rapid order creation workflow + real-time automated low-stock safety triggers',
    badge: 'High Velocity',
    color: '#ec4899',
  },
];

export const INITIAL_INVENTORY = [
  // Boutiques & Fashion
  {
    variant_id: 'JAM-RED-01',
    product_name: 'Dhakai Royal Jamdani Saree',
    category: 'Saree',
    sector: 'boutique',
    size: '12 Haat (Standard)',
    color: 'Crimson Red & Gold Zari',
    stock_qty: 14,
    price_bdt: 8500,
    safety_threshold: 5,
    image_url: '/jamdani_saree.jpg',
    material: 'Pure Cotton Silk Weave',
  },
  {
    variant_id: 'JAM-EMR-02',
    product_name: 'Dhakai Royal Jamdani Saree',
    category: 'Saree',
    sector: 'boutique',
    size: '12 Haat (Standard)',
    color: 'Emerald Green Floral',
    stock_qty: 4, // Below safety threshold
    price_bdt: 9200,
    safety_threshold: 6,
    image_url: '/jamdani_saree.jpg',
    material: '84-Count Handloom Cotton',
  },
  {
    variant_id: 'PAN-WHT-40',
    product_name: 'Aristocrat Embroidered Panjabi',
    category: 'Panjabi',
    sector: 'boutique',
    size: '40 (M)',
    color: 'Ivory White',
    stock_qty: 18,
    price_bdt: 3850,
    safety_threshold: 6,
    image_url: '/jamdani_saree.jpg',
    material: 'Egyptian Cotton with Collar Embroidery',
  },
  {
    variant_id: 'PAN-BLK-42',
    product_name: 'Aristocrat Embroidered Panjabi',
    category: 'Panjabi',
    sector: 'boutique',
    size: '42 (L)',
    color: 'Midnight Black',
    stock_qty: 2, // Critical Low
    price_bdt: 4200,
    safety_threshold: 5,
    image_url: '/jamdani_saree.jpg',
    material: 'Fine Cotton Silk Blend',
  },
  {
    variant_id: 'PAN-NVY-44',
    product_name: 'Aristocrat Embroidered Panjabi',
    category: 'Panjabi',
    sector: 'boutique',
    size: '44 (XL)',
    color: 'Royal Navy',
    stock_qty: 9,
    price_bdt: 3950,
    safety_threshold: 4,
    image_url: '/jamdani_saree.jpg',
    material: 'Breathable Organic Cotton',
  },
  {
    variant_id: 'KRT-LST-M',
    product_name: 'Festive Floral 3-Piece Kurti Set',
    category: 'Kurti',
    sector: 'boutique',
    size: 'M',
    color: 'Pastel Lilac',
    stock_qty: 11,
    price_bdt: 2950,
    safety_threshold: 4,
    image_url: '/jamdani_saree.jpg',
    material: 'Georgette with Organza Dupatta',
  },

  // Handicrafts & Jute (Julhas Handicrafts)
  {
    variant_id: 'JUT-BAG-L',
    product_name: 'Julhas Export-Grade Handwoven Jute Tote',
    category: 'Jute Bags',
    sector: 'handicrafts',
    size: 'Large (16"x14")',
    color: 'Natural Golden Fiber / Brown Leather',
    stock_qty: 38,
    price_bdt: 1450,
    safety_threshold: 15,
    image_url: '/jute_handicrafts.jpg',
    material: '100% Biodegradable Treated Jute',
  },
  {
    variant_id: 'JUT-BSK-SET',
    product_name: 'Artisanal Braided Jute Storage Baskets (Set of 3)',
    category: 'Home Decor',
    sector: 'handicrafts',
    size: 'Nest Set (S/M/L)',
    color: 'Natural Tan',
    stock_qty: 5, // Low
    price_bdt: 2200,
    safety_threshold: 8,
    image_url: '/jute_handicrafts.jpg',
    material: 'Hand-braided Natural Jute Twine',
  },
  {
    variant_id: 'TER-VAS-01',
    product_name: 'Patuakhali Handcrafted Terracotta Urn',
    category: 'Ceramics',
    sector: 'handicrafts',
    size: '12-inch Height',
    color: 'Burnt Earth Clay',
    stock_qty: 16,
    price_bdt: 850,
    safety_threshold: 5,
    image_url: '/jute_handicrafts.jpg',
    material: 'Kiln-fired Terracotta Clay',
  },
  {
    variant_id: 'NAK-KNT-01',
    product_name: 'Rajshahi Pure Silk Nakshi Kantha',
    category: 'Textiles',
    sector: 'handicrafts',
    size: 'Double Bed (7.5x6 ft)',
    color: 'Multicolor Needlework',
    stock_qty: 3, // Low
    price_bdt: 6800,
    safety_threshold: 4,
    image_url: '/jute_handicrafts.jpg',
    material: 'Hand-stitched Mulberry Silk',
  },

  // Jewelry & Gifts
  {
    variant_id: 'BRS-CHK-01',
    product_name: 'Heritage Filigree Brass Choker',
    category: 'Necklace',
    sector: 'jewelry',
    size: 'Adjustable Dori',
    color: 'Antique Matte Gold',
    stock_qty: 7,
    price_bdt: 3200,
    safety_threshold: 4,
    image_url: '/jamdani_saree.jpg',
    material: 'Handcrafted Brass with Meenakari',
  },
  {
    variant_id: 'SLV-EAR-02',
    product_name: 'Dhaka Antique Silver Jhumka',
    category: 'Earrings',
    sector: 'jewelry',
    size: 'Classic 2.5 inch',
    color: 'Oxidized Silver',
    stock_qty: 4, // Low
    price_bdt: 2400,
    safety_threshold: 5,
    image_url: '/jamdani_saree.jpg',
    material: '92.5 Sterling Silver Replica',
  },

  // Retail & Food
  {
    variant_id: 'HON-SUN-500',
    product_name: 'Raw Wild Sundarban Honey',
    category: 'Gourmet Food',
    sector: 'retail_food',
    size: '500 gm Jar',
    color: 'Dark Amber',
    stock_qty: 42,
    price_bdt: 850,
    safety_threshold: 12,
    image_url: '/jute_handicrafts.jpg',
    material: '100% Unprocessed Wild Honey',
  },
  {
    variant_id: 'OIL-MST-1L',
    product_name: 'Cold-Pressed Wooden Ghani Mustard Oil',
    category: 'Organic Oils',
    sector: 'retail_food',
    size: '1 Litre Glass Bottle',
    color: 'Golden Pungent',
    stock_qty: 60,
    price_bdt: 420,
    safety_threshold: 15,
    image_url: '/jute_handicrafts.jpg',
    material: 'First Cold Press Mustard Seed',
  },
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: 'Sadia Rahman',
    phone: '01711-234567',
    channel: 'whatsapp',
    orders_count: 4,
    total_spent_bdt: 34200,
    tier: 'VIP Gold',
    city: 'Dhaka (Gulshan-2)',
    notes: 'Loves pure Dhakai Jamdani and festive colors. Always pays via bKash immediately.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    last_active: '10 mins ago',
  },
  {
    id: 'CUST-002',
    name: 'Tanvir Hasan',
    phone: '01819-987654',
    channel: 'messenger',
    orders_count: 2,
    total_spent_bdt: 7450,
    tier: 'Frequent',
    city: 'Dhaka (Dhanmondi)',
    notes: 'Size 42 Panjabi regular buyer. Prefers Cash on Delivery.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    last_active: '25 mins ago',
  },
  {
    id: 'CUST-003',
    name: 'Farzana Ahmed',
    phone: '01912-345678',
    channel: 'whatsapp',
    orders_count: 2,
    total_spent_bdt: 11550,
    tier: 'New Customer',
    city: 'Dhaka (Uttara Sec 4)',
    notes: 'Bought Royal Jamdani Red. Kurti order is waiting to be packed for Steadfast.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    last_active: '1 hour ago',
  },
  {
    id: 'CUST-004',
    name: 'Mahir Faisal',
    phone: '01611-889900',
    channel: 'messenger',
    orders_count: 6,
    total_spent_bdt: 48900,
    tier: 'VIP Platinum',
    city: 'Sylhet Sadar',
    notes: 'High-value customer. Orders gifts for overseas family in UK.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    last_active: 'Yesterday',
  },
  {
    id: 'CUST-005',
    name: 'Nusrat Jahan',
    phone: '01755-667788',
    channel: 'phone',
    orders_count: 1,
    total_spent_bdt: 1450,
    tier: 'New Customer',
    city: 'Chittagong GEC',
    notes: 'Corporate inquiries for artisanal jute gift packaging.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    last_active: '3 hours ago',
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9824',
    customer_id: 'CUST-001',
    customer_name: 'Sadia Rahman',
    phone: '01711-234567',
    variant_id: 'JAM-RED-01',
    product_name: 'Dhakai Royal Jamdani Saree (Crimson Red)',
    quantity: 1,
    unit_price: 8500,
    delivery_fee: 100,
    total_price_bdt: 8600,
    payment_status: 'BKASH_VERIFIED',
    trx_id: 'BK9X7B21PQA',
    delivery_status: 'DISPATCHED',
    courier: 'Steadfast Courier',
    tracking_code: 'ST-9921448',
    address: 'House 42, Road 11, Block C, Gulshan-2, Dhaka',
    created_at: '2026-10-04 11:20 AM',
    steadfast: {
      stage: 'in_transit',
      weight_kg: 0.45,
      consignment_id: 99214481,
      events: [
        { time: '11:20 AM', title: 'Customer placed order', detail: 'bKash paid at checkout' },
        { time: '11:34 AM', title: 'Opened on your desk', detail: 'Sadia Rahman · Gulshan-2' },
        { time: '11:51 AM', title: 'Goods packaged', detail: '1 lot · 0.45 kg · sealed' },
        { time: '11:52 AM', title: 'Steadfast consignment created', detail: 'Tracking ST-9921448' },
        { time: '01:10 PM', title: 'Picked up', detail: 'Rider collected the parcel from the shop' },
      ],
    },
  },
  {
    id: 'ORD-9823',
    customer_id: 'CUST-002',
    customer_name: 'Tanvir Hasan',
    phone: '01819-987654',
    variant_id: 'PAN-NVY-44',
    product_name: 'Aristocrat Embroidered Panjabi (Size 44, Navy)',
    quantity: 1,
    unit_price: 3950,
    delivery_fee: 80,
    total_price_bdt: 4030,
    payment_status: 'COD_PENDING',
    trx_id: 'N/A (Cash on Delivery)',
    delivery_status: 'CONFIRMED',
    courier: 'Pathao Courier',
    tracking_code: 'PTH-663812',
    address: 'Flat 4B, Road 7/A, Dhanmondi, Dhaka',
    created_at: '2026-10-04 10:15 AM',
  },
  {
    id: 'ORD-9822',
    customer_id: 'CUST-004',
    customer_name: 'Mahir Faisal',
    phone: '01611-889900',
    variant_id: 'PAN-BLK-42',
    product_name: 'Aristocrat Embroidered Panjabi (Size 42, Black)',
    quantity: 2,
    unit_price: 4200,
    delivery_fee: 150,
    total_price_bdt: 8550,
    payment_status: 'BKASH_VERIFIED',
    trx_id: 'BK8K1M99ZZ',
    delivery_status: 'DELIVERED',
    courier: 'RedX Express',
    tracking_code: 'RDX-12009',
    address: 'Green View Villa, Shibganj, Sylhet',
    created_at: '2026-10-03 04:45 PM',
  },
  {
    id: 'ORD-9821',
    customer_id: 'CUST-005',
    customer_name: 'Nusrat Jahan',
    phone: '01755-667788',
    variant_id: 'JUT-BAG-L',
    product_name: 'Julhas Export Handwoven Jute Tote Bag',
    quantity: 1,
    unit_price: 1450,
    delivery_fee: 120,
    total_price_bdt: 1570,
    payment_status: 'NAGAD_VERIFIED',
    trx_id: 'NG-77123A8',
    delivery_status: 'DELIVERED',
    courier: 'Steadfast Courier',
    tracking_code: 'ST-881230',
    address: 'CDA Avenue, GEC Circle, Chittagong',
    created_at: '2026-10-03 02:10 PM',
    steadfast: {
      stage: 'delivered',
      weight_kg: 0.7,
      consignment_id: 88123044,
      events: [
        { time: '02:10 PM', title: 'Customer placed order', detail: 'Nagad paid at checkout' },
        { time: '02:22 PM', title: 'Goods packaged', detail: '1 lot · 0.70 kg · sealed' },
        { time: '02:23 PM', title: 'Steadfast consignment created', detail: 'Tracking ST-881230' },
        { time: 'Oct 3, 06:40 PM', title: 'Delivered', detail: 'Handed to Nusrat Jahan in Chittagong' },
      ],
    },
  },
  {
    id: 'ORD-9830',
    customer_id: 'CUST-003',
    customer_name: 'Farzana Ahmed',
    phone: '01912-345678',
    variant_id: 'KRT-LST-M',
    product_name: 'Festive Floral 3-Piece Kurti Set',
    quantity: 1,
    unit_price: 2950,
    delivery_fee: 100,
    total_price_bdt: 3050,
    payment_status: 'COD_PENDING',
    trx_id: 'N/A (Cash on Delivery)',
    delivery_status: 'AWAITING_PACK',
    courier: 'Steadfast Courier',
    tracking_code: null,
    address: 'House 18, Road 4, Sector 4, Uttara, Dhaka',
    created_at: 'Just now',
    steadfast: {
      stage: 'placed',
      weight_kg: null,
      consignment_id: null,
      events: [
        { time: '09:40 PM', title: 'Customer placed order', detail: 'Cash on delivery from the shop page' },
      ],
    },
  },
];

export const INITIAL_COPILOT_SCHEDULES = [
  {
    id: 'SCH-01',
    customer_id: 'CUST-004',
    customer_name: 'Mahir Faisal',
    order_id: 'ORD-9822',
    scheduled_date: '2026-10-05',
    type: 'POST_DELIVERY_REVIEW',
    channel: 'messenger',
    message_draft: 'Assalamu Alaikum Mahir Bhai! Apnar Panjabi parcel ti deliver hoyeche. Fit and fabric kemon laglo janaben please?',
    status: 'SCHEDULED',
  },
  {
    id: 'SCH-02',
    customer_id: 'CUST-001',
    customer_name: 'Sadia Rahman',
    order_id: 'ORD-9824',
    scheduled_date: '2026-10-06',
    type: 'VIP_FESTIVE_EARLY_ACCESS',
    channel: 'whatsapp',
    message_draft: 'Dear Sadia Apa, as our valued VIP Gold patron, here is 24-hour early access to our exclusive Handloom Jamdani Festive drop!',
    status: 'SCHEDULED',
  },
  {
    id: 'SCH-03',
    customer_id: 'SYSTEM',
    customer_name: 'Inventory Manager',
    order_id: 'PAN-BLK-42',
    scheduled_date: '2026-10-04',
    type: 'LOW_STOCK_REORDER_ALERT',
    channel: 'dashboard',
    message_draft: 'Variant PAN-BLK-42 is at 2 units (Safety threshold 5). Projected stockout in 36 hours. Supplier order recommendation: 25 units.',
    status: 'TRIGGERED',
  },
];

export const INITIAL_CHAT_THREADS = [
  {
    id: 'thread-01',
    customer_id: 'CUST-001',
    customer_name: 'Sadia Rahman',
    phone: '01711-234567',
    channel: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    unread: 1,
    last_message_time: '15:32',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        text: 'Assalamu Alaikum! Aapnader Dhakai Crimson Red Jamdani saree ta ki stock-e ache? Price koto porbe?',
        time: '15:30',
      },
      {
        id: 'msg-2',
        sender: 'ai_copilot',
        text: 'Walaikum Assalam Sadia Apa! ❤️ Amader Dhakai Royal Jamdani (Crimson Red & Gold Zari, 12 Haat) ekhon available ache stock-e (14 pieces available). Price ৳8,500 with free matching blouse piece!',
        time: '15:31',
        is_automated: true,
      },
      {
        id: 'msg-3',
        sender: 'customer',
        text: 'Ami 1ta order korte chai. Gulshan-2 te Cash on Delivery te pathano jabe?',
        time: '15:32',
      },
    ],
    intent: 'READY_TO_BUY',
    detected_variant: 'JAM-RED-01',
    suggested_action: 'CREATE_ORDER',
  },
  {
    id: 'thread-02',
    customer_id: 'CUST-002',
    customer_name: 'Tanvir Hasan',
    phone: '01819-987654',
    channel: 'messenger',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    unread: 1,
    last_message_time: '15:20',
    messages: [
      {
        id: 'msg-201',
        sender: 'customer',
        text: 'Bhai Midnight Black Panjabi ta size 42 te pawa jabe? Ar bKash payment e kono discount ache?',
        time: '15:20',
      },
    ],
    intent: 'PRODUCT_INQUIRY',
    detected_variant: 'PAN-BLK-42',
    suggested_action: 'STOCK_CHECK_QUOTE',
  },
  {
    id: 'thread-03',
    customer_id: 'CUST-005',
    customer_name: 'Nusrat Jahan',
    phone: '01755-667788',
    channel: 'whatsapp',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    unread: 0,
    last_message_time: '14:05',
    messages: [
      {
        id: 'msg-301',
        sender: 'customer',
        text: 'Hello, Julhas export jute bags corporate gift hishebe 50 ta nile kemon discount pawa jabe?',
        time: '14:02',
      },
      {
        id: 'msg-302',
        sender: 'ai_copilot',
        text: 'Hello Nusrat! Corporate bulk orders for our Julhas Jute Bags (50+ units) receive a special 15% B2B concession at ৳1,230/unit including custom branding tags.',
        time: '14:05',
        is_automated: true,
      },
    ],
    intent: 'B2B_INQUIRY',
    detected_variant: 'JUT-BAG-L',
    suggested_action: 'SEND_CATALOGUE',
  },
];

// Presets for the 5-Step Boutique Automated Workflow
export const WORKFLOW_SCENARIOS = [
  {
    id: 'flow-jamdani',
    title: 'Dhakai Jamdani Fast Purchase (WhatsApp)',
    channel: 'whatsapp',
    customer: {
      name: 'Farzana Chowdhury',
      phone: '01788-554433',
      city: 'Uttara, Dhaka',
    },
    variant_id: 'JAM-RED-01',
    inquiry_text: 'Hello! Red Jamdani saree ta available? Delivery charge koto?',
    order_type: 'Cash on Delivery (৳8,500 + ৳100 shipping)',
    payment_method: 'COD',
  },
  {
    id: 'flow-panjabi',
    title: 'Festive Panjabi Urgent Order (Messenger)',
    channel: 'messenger',
    customer: {
      name: 'Kamrul Islam',
      phone: '01922-110022',
      city: 'Mirpur DOHS, Dhaka',
    },
    variant_id: 'PAN-WHT-40',
    inquiry_text: 'Bhai White Panjabi size 40 ache? Ami bKash advance kore dibo.',
    order_type: 'bKash Merchant Pay (৳3,850 + ৳80 delivery)',
    payment_method: 'BKASH',
  },
  {
    id: 'flow-jute',
    title: 'Julhas Jute Artisanal Export Order',
    channel: 'whatsapp',
    customer: {
      name: 'Amina Karim',
      phone: '01844-332211',
      city: 'Banani, Dhaka',
    },
    variant_id: 'JUT-BAG-L',
    inquiry_text: 'Hi Julhas team! Need 2 Handwoven Jute Totes for my upcoming trip.',
    order_type: 'Nagad Online Pay (৳2,900 + ৳100 shipping)',
    payment_method: 'NAGAD',
  },
];

// AI Social Marketing Presets (SELL Pillar)
export const MARKETING_PRESETS = {
  boutique: [
    {
      title: 'Dhakai Jamdani Heritage Drop (Banglish & English)',
      content: `✨ রূপবতী বাংলার ঐতিহ্যের শ্রেষ্ঠ রূপ — Royal Dhakai Jamdani! 
বুননে প্রতিটি সুতোর নিখুঁত স্পর্শ আর জড়ি কাজের আভিজাত্য।
🛍️ সাইজ: ১২ হাত স্ট্যান্ডার্ড | ১০০% প্রিমিয়াম সুতি-সিল্ক
🚚 ঢাকা সিটিতে ক্যাশ অন ডেলিভারি এবং ৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি!
👉 ইনবক্স করুন সরাসরি মেসেঞ্জারে অথবা WhatsApp: 01711-XXXXXX
#DhakaiJamdani #BangladeshiFashion #BoutiqueElegance #TelestoRetail`,
      tags: ['Eid Collection', 'Jamdani', 'Boutique', 'Dhakai Heritage'],
      cta: 'Order on WhatsApp',
    },
    {
      title: 'Aristocrat Panjabi Festive Collection',
      content: `পুরুষের আভিজাত্যের আসল প্রকাশ! 🌙
Aristocrat Embroidered Panjabi — মিসরীয় কটন ও সূক্ষ্ম কলার এমব্রয়ডারি।
আরামদায়ক ও প্রিমিয়াম ফিনিশ যা প্রতিটি অনুষ্ঠানে আপনাকে রাখবে স্পেশাল।
💵 bKash পেমেন্টে ইনস্ট্যান্ট ক্যাশব্যাক সুবিধা!
#PanjabiStyle #FestiveLook #MenFashionBD #TelestoOperate`,
      tags: ['Panjabi', 'Menswear', 'Festive Offer'],
      cta: 'Shop Now',
    },
  ],
  handicrafts: [
    {
      title: 'Julhas Handicrafts: Eco-Conscious Jute Storytelling',
      content: `The Golden Fiber of Bengal, woven for the conscious world. 🌿
Julhas Handicrafts brings 100% biodegradable, handwoven Jute totes made with passion by rural Bangladeshi artisans.
Support fair-trade craft while carrying timeless elegance.
🌍 Export standard quality | Plastic-free lifestyle
Order your sustainable companion today!
#JulhasHandicrafts #GoldenFiber #SustainableFashion #MadeInBangladesh`,
      tags: ['Julhas Handicrafts', 'Eco-Friendly', 'Export Jute', 'Fair Trade'],
      cta: 'View Export Catalogue',
    },
  ],
  jewelry: [
    {
      title: 'Royal Brass & Filigree Timeless Elegance',
      content: `शाही ঐতিহ্যের রাজকীয় ছোঁয়া! ✨
হাতে তৈরি Antique Filigree Brass Choker Set — আপনার ঐতিহ্যবাহী পোশাকের নিখুঁত সঙ্গী।
অর্ডার করুন সীমিত স্টকে থাকা এক্সক্লুসিভ পিসগুলো।
#AntiqueJewelry #BrassChoker #TraditionalBD #DeshiGlam`,
      tags: ['Jewelry', 'Antique Brass', 'VIP Collection'],
      cta: 'Claim Yours',
    },
  ],
  retail_food: [
    {
      title: 'Sundarban Raw Honey & Cold Ghani Mustard Oil',
      content: `প্রকৃতির খাঁটি উপহার আপনার পরিবারের সুরক্ষায়! 🍯
সরাসরি সুন্দরবনের বুনো ফুলের খাঁটি মধু এবং কাঠের ঘানিতে ভাঙানো খাঁটি সরিষার তেল।
কোনো ভেজাল নেই, কোনো কেমিক্যাল নেই।
🚚 দেশজুড়ে ক্যাশ অন ডেলিভারি সুবিধা!
#PureHoney #GhaniMustardOil #OrganicFoodBD #HealthyLiving`,
      tags: ['Organic Food', 'Sundarban Honey', 'Cold Pressed'],
      cta: 'Order Fresh',
    },
  ],
};

const ANALYTICS_RANGES = {
  '7d': { id: '7d', label: '7 days', days: 7, buckets: 7, span: 7 / 30, lift: 1.12 },
  '30d': { id: '30d', label: '30 days', days: 30, buckets: 10, span: 1, lift: 1 },
  '90d': { id: '90d', label: '90 days', days: 90, buckets: 12, span: 3.05, lift: 1 },
};

const ANALYTICS_PROFILES = {
  boutique: {
    monthlyGmv: 1840000,
    aov: 4490,
    margin: 0.34,
    repeat: 0.41,
    rto: 0.128,
    conversion: 0.24,
    growth: 0.186,
    products: [
      { name: 'Dhakai Royal Jamdani Saree', price: 8850, share: 0.38, margin: 0.36, returns: 0.04 },
      { name: 'Aristocrat Embroidered Panjabi', price: 4000, share: 0.27, margin: 0.32, returns: 0.06 },
      { name: 'Festive Floral 3-Piece Kurti Set', price: 2950, share: 0.18, margin: 0.41, returns: 0.05 },
      { name: 'Handloom Cotton Saree', price: 3200, share: 0.11, margin: 0.33, returns: 0.03 },
      { name: 'Eid Waistcoat Set', price: 2650, share: 0.06, margin: 0.38, returns: 0.07 },
    ],
    cities: [
      { name: 'Dhaka', share: 0.58 },
      { name: 'Chattogram', share: 0.14 },
      { name: 'Sylhet', share: 0.09 },
      { name: 'Rajshahi', share: 0.07 },
      { name: 'Khulna', share: 0.06 },
      { name: 'Other districts', share: 0.06 },
    ],
    payments: [
      { id: 'bkash', name: 'bKash', share: 0.44, color: '#e2136e' },
      { id: 'cod', name: 'Cash on delivery', share: 0.31, color: '#06b6d4' },
      { id: 'nagad', name: 'Nagad', share: 0.17, color: '#f7941d' },
      { id: 'rocket', name: 'Rocket', share: 0.08, color: '#a855f7' },
    ],
    channels: [
      { id: 'whatsapp', name: 'WhatsApp', share: 0.49 },
      { id: 'messenger', name: 'Messenger', share: 0.33 },
      { id: 'phone', name: 'Phone', share: 0.11 },
      { id: 'instagram', name: 'Instagram', share: 0.07 },
    ],
    couriers: [
      { name: 'Steadfast', share: 0.46, hours: 18, rto: 0.09 },
      { name: 'Pathao', share: 0.34, hours: 14, rto: 0.11 },
      { name: 'RedX', share: 0.2, hours: 26, rto: 0.16 },
    ],
    hours: [4, 6, 9, 14, 18, 22, 16, 11, 8, 6, 5, 7],
  },
  handicrafts: {
    monthlyGmv: 620000,
    aov: 1680,
    margin: 0.42,
    repeat: 0.29,
    rto: 0.074,
    conversion: 0.19,
    growth: 0.142,
    products: [
      { name: 'Julhas Export-Grade Handwoven Jute Tote', price: 1450, share: 0.34, margin: 0.46, returns: 0.02 },
      { name: 'Artisanal Braided Jute Storage Baskets', price: 2200, share: 0.22, margin: 0.4, returns: 0.03 },
      { name: 'Rajshahi Pure Silk Nakshi Kantha', price: 3800, share: 0.2, margin: 0.38, returns: 0.04 },
      { name: 'Patuakhali Handcrafted Terracotta Urn', price: 850, share: 0.14, margin: 0.48, returns: 0.05 },
      { name: 'Jute Gift Hamper', price: 1650, share: 0.1, margin: 0.44, returns: 0.03 },
    ],
    cities: [
      { name: 'Dhaka', share: 0.41 },
      { name: 'Export desk', share: 0.22 },
      { name: 'Chattogram', share: 0.13 },
      { name: 'Rajshahi', share: 0.1 },
      { name: 'Sylhet', share: 0.08 },
      { name: 'Other districts', share: 0.06 },
    ],
    payments: [
      { id: 'bkash', name: 'bKash', share: 0.36, color: '#e2136e' },
      { id: 'cod', name: 'Cash on delivery', share: 0.22, color: '#06b6d4' },
      { id: 'nagad', name: 'Nagad', share: 0.14, color: '#f7941d' },
      { id: 'rocket', name: 'Bank / TT', share: 0.28, color: '#22d3ee' },
    ],
    channels: [
      { id: 'whatsapp', name: 'WhatsApp', share: 0.38 },
      { id: 'messenger', name: 'Messenger', share: 0.21 },
      { id: 'phone', name: 'Phone', share: 0.17 },
      { id: 'instagram', name: 'Catalogue', share: 0.24 },
    ],
    couriers: [
      { name: 'Steadfast', share: 0.4, hours: 22, rto: 0.06 },
      { name: 'Pathao', share: 0.28, hours: 16, rto: 0.08 },
      { name: 'Sundarban', share: 0.32, hours: 40, rto: 0.05 },
    ],
    hours: [6, 8, 11, 13, 12, 10, 9, 8, 7, 6, 5, 5],
  },
  jewelry: {
    monthlyGmv: 980000,
    aov: 6100,
    margin: 0.48,
    repeat: 0.36,
    rto: 0.045,
    conversion: 0.16,
    growth: 0.094,
    products: [
      { name: 'Heritage Filigree Brass Choker', price: 3200, share: 0.31, margin: 0.52, returns: 0.02 },
      { name: 'Dhaka Antique Silver Jhumka', price: 2400, share: 0.24, margin: 0.5, returns: 0.03 },
      { name: 'Bridal Gold-Plated Set', price: 12800, share: 0.22, margin: 0.41, returns: 0.01 },
      { name: 'Custom Name Pendant', price: 4500, share: 0.14, margin: 0.55, returns: 0.02 },
      { name: 'Gift Box Pair', price: 1800, share: 0.09, margin: 0.46, returns: 0.04 },
    ],
    cities: [
      { name: 'Dhaka', share: 0.64 },
      { name: 'Sylhet', share: 0.12 },
      { name: 'Chattogram', share: 0.1 },
      { name: 'UK / family gift', share: 0.07 },
      { name: 'Rajshahi', share: 0.04 },
      { name: 'Other districts', share: 0.03 },
    ],
    payments: [
      { id: 'bkash', name: 'bKash', share: 0.52, color: '#e2136e' },
      { id: 'cod', name: 'Cash on delivery', share: 0.14, color: '#06b6d4' },
      { id: 'nagad', name: 'Nagad', share: 0.21, color: '#f7941d' },
      { id: 'rocket', name: 'Rocket', share: 0.13, color: '#a855f7' },
    ],
    channels: [
      { id: 'whatsapp', name: 'WhatsApp', share: 0.57 },
      { id: 'messenger', name: 'Messenger', share: 0.22 },
      { id: 'phone', name: 'Phone', share: 0.14 },
      { id: 'instagram', name: 'Instagram', share: 0.07 },
    ],
    couriers: [
      { name: 'Steadfast', share: 0.51, hours: 20, rto: 0.04 },
      { name: 'Pathao', share: 0.22, hours: 12, rto: 0.05 },
      { name: 'RedX', share: 0.27, hours: 24, rto: 0.07 },
    ],
    hours: [3, 5, 8, 12, 16, 20, 18, 14, 10, 8, 6, 4],
  },
  retail_food: {
    monthlyGmv: 410000,
    aov: 540,
    margin: 0.28,
    repeat: 0.52,
    rto: 0.062,
    conversion: 0.41,
    growth: 0.21,
    products: [
      { name: 'Raw Wild Sundarban Honey', price: 850, share: 0.36, margin: 0.33, returns: 0.02 },
      { name: 'Cold-Pressed Wooden Ghani Mustard Oil', price: 420, share: 0.29, margin: 0.24, returns: 0.01 },
      { name: 'Date-Palm Gur Jar', price: 380, share: 0.15, margin: 0.3, returns: 0.02 },
      { name: 'Bakery Mix Box', price: 650, share: 0.12, margin: 0.27, returns: 0.04 },
      { name: 'Weekly Grocery Bundle', price: 980, share: 0.08, margin: 0.22, returns: 0.03 },
    ],
    cities: [
      { name: 'Dhaka', share: 0.72 },
      { name: 'Narayanganj', share: 0.09 },
      { name: 'Gazipur', share: 0.07 },
      { name: 'Chattogram', share: 0.05 },
      { name: 'Sylhet', share: 0.04 },
      { name: 'Other districts', share: 0.03 },
    ],
    payments: [
      { id: 'bkash', name: 'bKash', share: 0.33, color: '#e2136e' },
      { id: 'cod', name: 'Cash on delivery', share: 0.41, color: '#06b6d4' },
      { id: 'nagad', name: 'Nagad', share: 0.19, color: '#f7941d' },
      { id: 'rocket', name: 'Rocket', share: 0.07, color: '#a855f7' },
    ],
    channels: [
      { id: 'whatsapp', name: 'WhatsApp', share: 0.44 },
      { id: 'messenger', name: 'Messenger', share: 0.36 },
      { id: 'phone', name: 'Phone', share: 0.16 },
      { id: 'instagram', name: 'Instagram', share: 0.04 },
    ],
    couriers: [
      { name: 'Pathao', share: 0.48, hours: 8, rto: 0.05 },
      { name: 'Steadfast', share: 0.31, hours: 16, rto: 0.07 },
      { name: 'Shop rider', share: 0.21, hours: 3, rto: 0.02 },
    ],
    hours: [8, 10, 7, 6, 8, 12, 14, 16, 11, 8, 6, 5],
  },
};

const CHANNEL_BIAS = {
  whatsapp: [1.22, 1.05, 0.92, 0.86, 0.78],
  messenger: [0.82, 1.18, 1.16, 0.96, 0.9],
  phone: [1.08, 0.88, 0.76, 1.28, 0.84],
  instagram: [0.7, 0.82, 1.35, 1.12, 1.24],
};

const HOUR_LABELS = ['9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'];
const ANALYTICS_END = new Date('2026-10-08T00:00:00');

function analyticsSeries(count, seed) {
  const raw = Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0.5 : index / (count - 1);
    const wave = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 + seed);
    const drift = 0.82 + t * 0.36;
    return 0.45 + wave * drift;
  });
  const sum = raw.reduce((total, value) => total + value, 0);
  return raw.map((value) => value / sum);
}

function formatAnalyticsDay(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function shiftDate(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function trendLabels(range) {
  if (range.id === '7d') {
    return Array.from({ length: 7 }, (_, index) => formatAnalyticsDay(shiftDate(ANALYTICS_END, index - 6)));
  }
  if (range.id === '30d') {
    return Array.from({ length: 10 }, (_, index) => {
      const end = shiftDate(ANALYTICS_END, -((9 - index) * 3));
      const start = shiftDate(end, -2);
      return `${formatAnalyticsDay(start).split(' ')[0]}–${formatAnalyticsDay(end)}`;
    });
  }
  return Array.from({ length: 12 }, (_, index) => {
    const start = shiftDate(ANALYTICS_END, -((11 - index) * 7) - 6);
    return formatAnalyticsDay(start);
  });
}

function weightedShares(items, bias) {
  const raw = items.map((item, index) => item.share * (bias?.[index] ?? 1));
  const sum = raw.reduce((total, value) => total + value, 0);
  return raw.map((value) => value / sum);
}

export function getShopAnalytics(sectorId, rangeId = '30d', channelId = 'all') {
  const profile = ANALYTICS_PROFILES[sectorId] || ANALYTICS_PROFILES.boutique;
  const range = ANALYTICS_RANGES[rangeId] || ANALYTICS_RANGES['30d'];
  const channel = profile.channels.find((item) => item.id === channelId) || null;
  const channelShare = channel ? channel.share : 1;
  const bias = channel ? CHANNEL_BIAS[channel.id] : null;
  const productShares = weightedShares(profile.products, bias);

  const gmv = Math.round(profile.monthlyGmv * range.span * range.lift * channelShare);
  const orders = Math.max(1, Math.round(gmv / profile.aov));
  const grossProfit = Math.round(gmv * profile.margin);
  const growth = range.id === '7d' ? profile.growth + 0.04 : range.id === '90d' ? profile.growth * 0.72 : profile.growth;

  const weights = analyticsSeries(range.buckets, profile.monthlyGmv / 100000);
  const labels = trendLabels(range);
  const trend = labels.map((label, index) => ({
    label,
    gmv: Math.round(gmv * weights[index]),
    orders: Math.max(1, Math.round(orders * weights[index])),
  }));

  const products = profile.products.map((product, index) => {
    const revenue = Math.round(gmv * productShares[index]);
    const units = Math.max(1, Math.round(revenue / product.price));
    return {
      ...product,
      share: productShares[index],
      revenue,
      units,
      profit: Math.round(revenue * product.margin),
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const payments = profile.payments.map((item) => ({
    ...item,
    amount: Math.round(gmv * item.share),
  }));
  const channels = profile.channels.map((item) => ({
    ...item,
    amount: Math.round((profile.monthlyGmv * range.span * range.lift) * item.share),
    orders: Math.max(1, Math.round((profile.monthlyGmv * range.span * range.lift * item.share) / profile.aov)),
  }));
  const cities = profile.cities.map((item) => ({
    ...item,
    amount: Math.round(gmv * item.share),
    orders: Math.max(1, Math.round(orders * item.share)),
  }));
  const couriers = profile.couriers.map((item) => ({
    ...item,
    orders: Math.max(1, Math.round(orders * item.share)),
  }));

  const inquiries = Math.round(orders / profile.conversion);
  const quoted = Math.round(inquiries * Math.min(0.86, profile.conversion + 0.34));
  const dispatched = Math.round(orders * 0.93);
  const delivered = Math.round(orders * (1 - profile.rto) * 0.97);
  const funnel = [
    { id: 'inbox', label: 'Inbox inquiries', value: inquiries },
    { id: 'quote', label: 'Quotes sent', value: quoted },
    { id: 'order', label: 'Orders confirmed', value: orders },
    { id: 'dispatch', label: 'Dispatched', value: dispatched },
    { id: 'delivered', label: 'Delivered', value: delivered },
  ];

  const buyers = Math.max(1, Math.round(orders * (1 - profile.repeat * 0.35)));
  const customers = [
    { id: 'new', label: 'New buyers', share: 1 - profile.repeat, color: '#06b6d4' },
    { id: 'repeat', label: 'Repeat buyers', share: profile.repeat * 0.72, color: '#10b981' },
    { id: 'vip', label: 'VIP repeat', share: profile.repeat * 0.28, color: '#f59e0b' },
  ].map((item) => ({
    ...item,
    count: Math.max(1, Math.round(buyers * item.share)),
  }));

  const hourPeak = Math.max(...profile.hours);
  const hours = profile.hours.map((value, index) => ({
    label: HOUR_LABELS[index],
    value,
    share: value / hourPeak,
  }));

  const top = products[0];
  const bestCourier = [...couriers].sort((a, b) => a.rto - b.rto)[0];
  const busiest = [...hours].sort((a, b) => b.value - a.value)[0];
  const cod = payments.find((item) => item.id === 'cod');

  const insights = [
    {
      tone: 'amber',
      title: 'Cash on delivery returns',
      text: `${(profile.rto * 100).toFixed(1)}% of COD parcels come back. ${cod.name} is ${(cod.share * 100).toFixed(0)}% of takings. A small bKash rebate on the Dhaka lane is the usual fix.`,
    },
    {
      tone: 'cyan',
      title: `${top.name.split(' ').slice(0, 3).join(' ')} leads the ledger`,
      text: `${top.units.toLocaleString('en-US')} units, ৳${top.revenue.toLocaleString('en-US')}, ${(top.margin * 100).toFixed(0)}% margin. It is ${(top.share * 100).toFixed(0)}% of this view.`,
    },
    {
      tone: 'emerald',
      title: `${bestCourier.name} is the cleanest courier`,
      text: `${bestCourier.orders.toLocaleString('en-US')} parcels, about ${bestCourier.hours} hours to the door, ${(bestCourier.rto * 100).toFixed(0)}% returns.`,
    },
    {
      tone: 'purple',
      title: `Inbox is busiest at ${busiest.label.replace('a', ' AM').replace('p', ' PM')}`,
      text: 'Quotes sent in that hour close faster. Staff the WhatsApp desk before the evening rush, not after it.',
    },
  ];

  return {
    sectorId,
    range,
    channelId: channel ? channel.id : 'all',
    channelName: channel ? channel.name : 'All channels',
    gmv,
    orders,
    aov: profile.aov,
    grossProfit,
    margin: profile.margin,
    repeat: profile.repeat,
    rto: profile.rto,
    conversion: profile.conversion,
    growth,
    deltas: {
      gmv: growth,
      orders: growth - 0.018,
      aov: 0.032,
      profit: growth + 0.011,
      repeat: 0.04,
      rto: -0.012,
    },
    trend,
    products,
    payments,
    channels,
    cities,
    couriers,
    funnel,
    customers,
    buyers,
    hours,
    insights,
  };
}
