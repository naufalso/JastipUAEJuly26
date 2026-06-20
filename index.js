// Fallback static data in case of CORS or offline file browsing
const fallbackProducts = [
  { id: "0", category: "Cokelat", product: "Pistachio Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "assets/0/4449b1c5-8392-4d03-af54-6c6b3beaf6aa_size3840_cropCenter.jpg" },
  { id: "1", category: "Cokelat", product: "Dark Pistachio Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "assets/1/9fb5f7a3-73d0-4a13-bed1-7c9f22cf1d85_size3840_cropCenter.jpg" },
  { id: "2", category: "Cokelat", product: "Kinder Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "assets/2/bb661d34-b3f9-43ec-a732-f9d80c1546ab_size3840_cropCenter.jpg" },
  { id: "3", category: "Cokelat", product: "Speculoos Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "assets/3/528c5812-deb5-49ad-8782-70690f87165d_size3840_cropCenter.jpg" },
  { id: "4", category: "Cokelat", product: "Nutella Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "assets/4/9459d90c-eb86-427f-8d07-453a0ff56deb_size3840_cropCenter.jpg" },
  { id: "5", category: "Cokelat", product: "Pistachio Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "assets/5/527078e7-e28a-4f05-bd10-089caec828ff_size3840_cropCenter.jpg" },
  { id: "6", category: "Cokelat", product: "Dark Pistachio Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "assets/6/7ca4ea1d-49db-445f-9a4b-8aab49258784_size3840_cropCenter.jpg" },
  { id: "7", category: "Cokelat", product: "Kinder Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "assets/7/906d87f7-018e-484f-b3eb-6d48f8a97367_size3840_cropCenter.jpg" },
  { id: "8", category: "Cokelat", product: "Pistachio Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp200,000", image_path: "assets/8/2969d4b7-d8d8-4132-be80-9897aa668f3d_size3840_cropCenter.jpg" },
  { id: "9", category: "Cokelat", product: "Choco Hazelnut Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp200,000", image_path: "assets/9/0548d99a-a4bc-4788-8d7f-883483d049c5_size3840_cropCenter.jpg" },
  { id: "10", category: "Cokelat", product: "Dark Pistachio Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp205,000", image_path: "assets/10/cee7aab0-8580-4123-a6c0-771ed45c315a_size3840_cropCenter.jpg" }
];

const fallbackConfig = {
  whatsapp_link: "https://wa.me/971502916414",
  default_message: "Halo kak, saya mau jastip:",
  po_closing_date: "1 Juli 2026",
  departure_date: "6 Juli 2026",
  arrival_date: "Pertengahan Juli 2026"
};

// State Variables
let products = [];
let jastipConfig = {};
let cart = {}; // maps productId -> quantity

// Helpers
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  const headers = lines[0].map(h => h.trim());
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    if (values.length < headers.length) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] ? values[j].trim() : "";
    }
    data.push(obj);
  }
  return data;
}

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
}

function formatPrice(num) {
  return `Rp ${num.toLocaleString('id-ID')}`;
}

function formatWeight(totalGrams) {
  if (totalGrams >= 1000) {
    return `${(totalGrams / 1000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg`;
  }
  return `${totalGrams} g`;
}

// Toast show helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// YAML Parser
function parseYAML(text) {
  const lines = text.split('\n');
  const obj = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim();
    let val = line.substring(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    obj[key] = val;
  }
  return obj;
}

// Dynamic UI initialization
async function loadData() {
  // 1. Try loading YAML configuration
  try {
    const res = await fetch('data/config.yaml');
    if (!res.ok) throw new Error("Gagal mengambil config.yaml");
    const yamlText = await res.text();
    jastipConfig = parseYAML(yamlText);
    if (!jastipConfig.whatsapp_link) throw new Error("Format config tidak valid");
  } catch (err) {
    console.warn("Menggunakan config fallback karena:", err.message);
    jastipConfig = fallbackConfig;
  }

  // Update schedule display dynamically
  document.getElementById('badge-departure').textContent = `✈️ Pulang ${jastipConfig.departure_date || '6 Juli 2026'}`;
  document.getElementById('stat-closing').textContent = `PO Tutup ${jastipConfig.po_closing_date || '1 Juli 2026'}`;
  document.getElementById('stat-arrival').textContent = `Ready ${jastipConfig.arrival_date || 'Pertengahan Juli 2026'}`;

  // 2. Try loading product list csv
  try {
    const res = await fetch('data/product_list.csv');
    if (!res.ok) throw new Error("Gagal mengambil CSV");
    const csvText = await res.text();
    products = parseCSV(csvText);
    if (products.length === 0) throw new Error("CSV kosong");
  } catch (err) {
    console.warn("Menggunakan produk fallback karena:", err.message);
    products = fallbackProducts;
  }

  document.getElementById('stat-count').textContent = products.length;
  initializeFilters();
  renderProducts();
  updateCartUI();
}

// Render category filters dynamically based on products data
function initializeFilters() {
  const filterContainer = document.getElementById('filter-chips');
  const categories = [...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    if (!cat) return;
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = cat;
    btn.setAttribute('data-category', cat);
    filterContainer.appendChild(btn);
  });

  // Filter click events
  const chips = filterContainer.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderProducts();
    });
  });

  // Search input event
  document.getElementById('search-input').addEventListener('input', () => {
    renderProducts();
  });
}

// Render cards to the main grid
function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  const activeChip = document.querySelector('.chip.active');
  const categoryFilter = activeChip ? activeChip.getAttribute('data-category') : 'all';
  const searchVal = document.getElementById('search-input').value.toLowerCase().trim();

  const filtered = products.filter(p => {
    const matchesCategory = (categoryFilter === 'all' || p.category === categoryFilter);
    const matchesSearch = (
      p.product.toLowerCase().includes(searchVal) ||
      p.category.toLowerCase().includes(searchVal) ||
      (p.brand && p.brand.toLowerCase().includes(searchVal))
    );
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3>Produk Tidak Ditemukan</h3>
        <p>Cobalah mengganti filter kategori atau kata kunci pencarian Anda.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', p.id);

    const currentQty = cart[p.id] || 0;
    const imgPath = p.image_path || 'assets/default.jpg';
    const priceNum = parsePrice(p.idr_sell);

    // Adjuster control content
    let actionHTML = '';
    if (currentQty > 0) {
      actionHTML = `
        <div class="qty-adjuster">
          <button onclick="changeQty('${p.id}', -1)" aria-label="Kurang satu">-</button>
          <span>${currentQty}</span>
          <button onclick="changeQty('${p.id}', 1)" aria-label="Tambah satu">+</button>
        </div>
      `;
    } else {
      actionHTML = `
        <button class="btn-add" onclick="changeQty('${p.id}', 1)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Tambah
        </button>
      `;
    }

    card.innerHTML = `
      <div class="img-wrap">
        <img src="${imgPath}" alt="${p.product}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=Cokelat+Dubai'"/>
      </div>
      <div class="product-card-body">
        <span class="card-tag">${p.category}</span>
        <h3 class="card-title">${p.product}</h3>
        <div class="card-meta">
          <div class="meta-item">
            <span>Ukuran</span>
            <b>${p.size} ${p.unit}</b>
          </div>
          <div class="meta-item">
            <span>Berat Jastip</span>
            <b>± ${(parseFloat(p.size) * 1.3).toFixed(0)} g</b>
          </div>
        </div>
        <div class="card-price-row">
          <div class="price-wrap">
            <span>Harga</span>
            <b>${formatPrice(priceNum)}</b>
          </div>
          <div class="action-wrap">
            ${actionHTML}
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Modify quantity
window.changeQty = function (id, delta) {
  const current = cart[id] || 0;
  const next = current + delta;

  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }

  // Show alert on additions
  if (delta > 0) {
    const prod = products.find(p => p.id === id);
    if (prod) {
      showToast(`Ditambahkan: ${prod.product}`);
    }
  }

  updateCartUI();
  renderProducts();
};

// Remove from cart
window.removeFromCart = function (id) {
  delete cart[id];
  updateCartUI();
  renderProducts();
};

// Calculate totals and update the shopping cart UI
function updateCartUI() {
  const itemsContainer = document.getElementById('cart-items-container');
  const badge = document.getElementById('cart-badge');
  const summaryQty = document.getElementById('summary-qty');
  const summaryWeight = document.getElementById('summary-weight');
  const summaryTotal = document.getElementById('summary-total');

  itemsContainer.innerHTML = '';

  let totalQty = 0;
  let totalWeightGrams = 0;
  let totalPriceSum = 0;

  const cartEntries = Object.entries(cart);

  if (cartEntries.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p class="cart-empty-text">Keranjang belanja Anda kosong</p>
      </div>
    `;
    badge.style.display = 'none';
    badge.textContent = '0';
  } else {
    // Show badge
    cartEntries.forEach(([id, qty]) => {
      const prod = products.find(p => p.id === id);
      if (!prod) return;

      const priceVal = parsePrice(prod.idr_sell);
      const subtotal = priceVal * qty;
      totalQty += qty;

      // Gross weight estimation = item net size * 1.3 (to account for wrapper/packaging/cooler bags)
      const itemWeight = Math.round(parseFloat(prod.size) * 1.3) * qty;
      totalWeightGrams += itemWeight;
      totalPriceSum += subtotal;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item';
      itemRow.innerHTML = `
        <div class="cart-item-img">
          <img src="${prod.image_path}" alt="${prod.product}" onerror="this.src='https://placehold.co/80?text=Cokelat'"/>
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${prod.product}</h4>
          <span class="cart-item-meta">${prod.size} ${prod.unit} · ${formatPrice(priceVal)}</span>
          <span class="cart-item-subtotal">${formatPrice(subtotal)}</span>
        </div>
        <div class="cart-item-action">
          <div class="qty-adjuster" style="scale: 0.85;">
            <button onclick="changeQty('${id}', -1)" aria-label="Kurang satu">-</button>
            <span>${qty}</span>
            <button onclick="changeQty('${id}', 1)" aria-label="Tambah satu">+</button>
          </div>
          <button class="btn-remove" onclick="removeFromCart('${id}')">Hapus</button>
        </div>
      `;
      itemsContainer.appendChild(itemRow);
    });

    badge.style.display = 'flex';
    badge.textContent = totalQty;
  }

  summaryQty.textContent = `${totalQty} item`;
  summaryWeight.textContent = formatWeight(totalWeightGrams);
  summaryTotal.textContent = formatPrice(totalPriceSum);
}

// Dialog Drawer controls
const cartDialog = document.getElementById('cart-dialog');
const openCartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');

openCartBtn.addEventListener('click', () => {
  cartDialog.showModal();
});

closeCartBtn.addEventListener('click', () => {
  cartDialog.close();
});

// Close when clicking outside content (on dialog backdrop)
cartDialog.addEventListener('click', (e) => {
  const dialogDimensions = cartDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    cartDialog.close();
  }
});

// WhatsApp Checkout Click
document.getElementById('checkout-btn').addEventListener('click', () => {
  const cartEntries = Object.entries(cart);
  if (cartEntries.length === 0) {
    showToast("Keranjang Anda kosong! Silakan tambahkan barang terlebih dahulu.");
    return;
  }

  // Build structured text message
  let message = `${jastipConfig.default_message || "Halo kak, saya mau jastip:"}\n\n`;
  let grandTotal = 0;

  cartEntries.forEach(([id, qty]) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const itemPrice = parsePrice(prod.idr_sell);
    const subtotal = itemPrice * qty;
    grandTotal += subtotal;

    message += `- ${qty}x ${prod.product} (${prod.size} ${prod.unit}) @ ${formatPrice(itemPrice)} -> Subtotal: ${formatPrice(subtotal)}\n`;
  });

  message += `\n*Total Belanja:* ${formatPrice(grandTotal)}`;
  message += `\n*Estimasi Berat:* ${formatWeight(Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = products.find(p => p.id === id);
    return sum + (prod ? Math.round(parseFloat(prod.size) * 1.3) * qty : 0);
  }, 0))}`;

  // Open WhatsApp Link
  const baseLink = jastipConfig.whatsapp_link || "https://wa.me/971502916414";
  const finalUrl = `${baseLink}?text=${encodeURIComponent(message)}`;
  window.open(finalUrl, '_blank', 'noopener');
});

// Initial load
window.addEventListener('DOMContentLoaded', loadData);
