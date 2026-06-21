// Fallback static data in case of CORS or offline file browsing
const fallbackProducts = [
  { id: "0", category: "Cokelat", brand: "Lucca", product: "Pistachio Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2025/02/19/320762/4449b1c5-8392-4d03-af54-6c6b3beaf6aa_size3840_cropCenter.jpg", product_description: "Cokelat Lucca dengan perpaduan cokelat kaya, kunafa renyah, dan pistachio. Dibuat dengan bahan premium, cocok dinikmati sendiri maupun dijadikan hadiah." },
  { id: "1", category: "Cokelat", brand: "Lucca", product: "Dark Pistachio Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2025/02/19/320731/9fb5f7a3-73d0-4a13-bed1-7c9f22cf1d85_size3840_cropCenter.jpg", product_description: "Varian dark chocolate pistachio kunafa dengan rasa cokelat yang lebih intens. Menggunakan bahan premium, cocok untuk camilan indulgent atau hadiah." },
  { id: "2", category: "Cokelat", brand: "Lucca", product: "Kinder Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2025/02/19/320738/bb661d34-b3f9-43ec-a732-f9d80c1546ab_size3840_cropCenter.jpg", product_description: "Cokelat kunafa varian Kinder dengan kombinasi cokelat creamy dan tekstur kunafa yang renyah. Cocok dinikmati langsung atau untuk hadiah." },
  { id: "3", category: "Cokelat", brand: "Lucca", product: "Speculoos Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2025/02/19/320736/528c5812-deb5-49ad-8782-70690f87165d_size3840_cropCenter.jpg", product_description: "Cokelat kunafa varian speculoos dengan rasa biskuit hangat dan tekstur kunafa renyah. Cocok untuk camilan maupun hadiah acara spesial." },
  { id: "4", category: "Cokelat", brand: "Lucca", product: "Nutella Kunafa Chocolate Bar", size: "135", unit: "g", idr_sell: "Rp130,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2025/02/19/320763/9459d90c-eb86-427f-8d07-453a0ff56deb_size3840_cropCenter.jpg", product_description: "Cokelat kunafa varian Nutella dengan rasa hazelnut dan kakao yang creamy. Dibuat dengan bahan premium, cocok dinikmati sendiri atau sebagai hadiah." },
  { id: "5", category: "Cokelat", brand: "Lucca", product: "Pistachio Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2024/12/14/320735/527078e7-e28a-4f05-bd10-089caec828ff_size3840_cropCenter.jpg", product_description: "Cokelat pistachio kunafa ukuran 170 g dengan perpaduan cokelat, kunafa renyah, dan pistachio. Dibuat di UAE dan cocok untuk hadiah." },
  { id: "6", category: "Cokelat", brand: "Lucca", product: "Dark Pistachio Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2024/12/14/320816/7ca4ea1d-49db-445f-9a4b-8aab49258784_size3840_cropCenter.jpg", product_description: "Dark pistachio kunafa ukuran 170 g dengan karakter dark chocolate yang lebih pekat, bahan premium, dan tekstur kunafa yang renyah." },
  { id: "7", category: "Cokelat", brand: "Lucca", product: "Kinder Kunafa Chocolate Bar", size: "170", unit: "g", idr_sell: "Rp160,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2024/12/14/320818/906d87f7-018e-484f-b3eb-6d48f8a97367_size3840_cropCenter.jpg", product_description: "Kinder kunafa ukuran 170 g dengan rasa cokelat creamy dan kunafa renyah. Cocok sebagai camilan manis atau hadiah." },
  { id: "8", category: "Cokelat", brand: "Lucca", product: "Pistachio Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp200,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2026/03/19/652892/2969d4b7-d8d8-4132-be80-9897aa668f3d_size3840_cropCenter.jpg", product_description: "Kunafa bites pistachio 500 g dengan isian pistachio, kunafa renyah, dan lapisan cokelat lembut. Cocok untuk sharing, gifting, atau personal treat." },
  { id: "9", category: "Cokelat", brand: "Lucca", product: "Choco Hazelnut Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp200,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2026/03/19/647019/0548d99a-a4bc-4788-8d7f-883483d049c5_size3840_cropCenter.jpg", product_description: "Kunafa bites choco hazelnut 500 g dengan perpaduan cokelat, hazelnut manis, dan lapisan kunafa renyah. Cocok untuk sharing, gifting, atau personal treat." },
  { id: "10", category: "Cokelat", brand: "Lucca", product: "Dark Pistachio Crunchy Kunafa Bites Dubai Chocolate", size: "500", unit: "g", idr_sell: "Rp205,000", image_path: "https://bf1af2.akinoncloudcdn.com/products/2026/03/19/647020/cee7aab0-8580-4123-a6c0-771ed45c315a_size3840_cropCenter.jpg", product_description: "Kunafa bites dark pistachio 500 g dengan dark chocolate, isian pistachio, dan kunafa renyah. Rasa lebih intens, cocok untuk camilan premium atau hadiah." },
  { id: "11", category: "Parfum", brand: "Osma", product: "Amber S Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/4ba99711-1dcf-4426-8045-ef94a0974f1a-1000x1000-Mr8TDT3c5hBY6KTdY5ns6cXWZUqGULGvWmO7YOOx.jpg", product_description: "Amber S adalah EDP unisex 75 ml dengan nuansa black currant, rose, dan amber. Karakternya seimbang, elegan, hangat, dan tahan lama." },
  { id: "12", category: "Parfum", brand: "Osma", product: "Cotton C Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/ec50c9c6-e387-4312-a427-26046048d51f-1000x1000-G9evAuNBndEY7HbDo7zZwnomSS0306UFD3VMYcRJ.jpg", product_description: "Cotton C adalah parfum 75 ml dengan karakter rose dan sandalwood yang lembut. Nuansanya floral-woody, halus, dan mudah dipakai sehari-hari." },
  { id: "13", category: "Parfum", brand: "Osma", product: "Vanilla S Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/46bff8b3-d0ca-4e27-b027-2840ace5111f-1000x1000-8UZ7hRAWKh1Bh9Zm6C2XtjDQGeG5Lz03HGlsuN9j.jpg", product_description: "Vanilla S adalah EDP unisex 75 ml dengan tuberose musk, amber, vanilla, dan leather. Aromanya manis, hangat, mewah, dan cocok untuk berbagai kesempatan." },
  { id: "14", category: "Parfum", brand: "Osma", product: "Citrus F Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/7039bf7c-350b-4dbe-9342-13f2aa9f9157-1000x1000-Nvfrk0784ObDAqz681cXHVVodPOZ1V6vddX82qQi.jpg", product_description: "Citrus F adalah EDP unisex 75 ml dengan citrus, rose, dan white musk. Karakternya fresh, bersih, ringan, dan cocok untuk daily wear atau cuaca hangat." },
  { id: "15", category: "Parfum", brand: "Osma", product: "White F Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/5d644ee4-273d-40b9-899d-48f1e260e147-1000x1000-Ks8ZwYn8ZdZ4v7Zb4Koe3edmP23LSrWdY8cD0nQr.jpg", product_description: "White F adalah parfum unisex 75 ml dengan black currant, orange blossom, dan maltol. Aromanya fruity-floral, segar, hangat, modern, dan mudah dipakai." },
  { id: "16", category: "Parfum", brand: "Osma", product: "Ambry A Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/b6890300-5129-4009-bae3-4e2bd8d728dc-1000x1000-ZT1VKDn9LaIuSfRulNIrXNAaDUPfI7Qfkh1kVnPN.jpg", product_description: "Ambry A adalah parfum 75 ml dengan harmoni amber dan leather. Karakternya hangat, oriental, modern, dan cocok untuk kesan elegan." },
  { id: "17", category: "Parfum", brand: "Osma", product: "Rose P Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/d4bd31a3-9496-49a7-9984-01df3cfa366b-1000x1000-f5t2A2TG8xu6O0YsU75fJLeBpV0jmpz2vQ2w6q6j.jpg", product_description: "Rose P adalah parfum unisex 75 ml dengan red berries, rose, dan white musk. Aromanya floral-fruity, romantis, lembut, dan percaya diri." },
  { id: "18", category: "Parfum", brand: "Osma", product: "Floral R Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/cfbd9147-ae99-4ea3-85b9-f47bb752e09e-1000x1000-9yd8flJh5h8J6h0laiYEIo1L9cTBAOKdrKytUMNZ.jpg", product_description: "Floral R adalah parfum unisex 75 ml dengan blackberry, rose, dan cedarwood. Karakternya floral mewah, hangat, elegan, dan meninggalkan kesan kuat." },
  { id: "19", category: "Parfum", brand: "Osma", product: "Osma S Perfume", size: "150", unit: "ml", idr_sell: "Rp750,000", image_path: "https://cdn.salla.sa/YNEym/e8ad4a36-a5fc-44ba-917d-d20eba051f94-1000x1000-gtCVhsvfLC5gRAPqio2VznDOG6pgea8VvI7sqI8a.jpg", product_description: "Osma S adalah parfum unisex 150 ml dengan pink pepper, jasmine sambac, dan sandalwood. Aromanya fresh, floral, hangat, dan cocok untuk daily maupun special occasion." },
  { id: "20", category: "Parfum", brand: "Osma", product: "Woody F Perfume", size: "75", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/b0c9e569-cae2-4e44-9834-7c7725759afc-1000x1000-nxos8WKGtJYH3rIDbY4QYLpplDy81oH279rG5t7E.jpg", product_description: "Woody F adalah parfum unisex 75 ml dengan pineapple, leather, dan amber. Karakternya fresh di awal, leathery di tengah, lalu hangat dan long-lasting." },
  { id: "21", category: "Parfum", brand: "Osma", product: "Osma O Perfume", size: "150", unit: "ml", idr_sell: "Rp550,000", image_path: "https://cdn.salla.sa/YNEym/ffba731d-f8e9-4f7b-a466-1a5b556d9399-1000x1000-zG1H3Mkmrb21i6ahkfKcBhwpoLKGAP79ExPSeHmW.jpg", product_description: "Osma O adalah parfum unisex 150 ml dengan pear, tobacco, dan musk. Aromanya fruity di awal, sophisticated di tengah, hangat, dan berkarakter kuat." },
  { id: "22", category: "Parfum", brand: "Osma", product: "Osma A Perfume", size: "150", unit: "ml", idr_sell: "Rp595,000", image_path: "https://cdn.salla.sa/YNEym/f114bff7-cb39-486b-a498-219a83a1be7f-1000x1000-8CZNlVu2EPsmHxhy9dO5tU2KVfthlagEhIQ7rNDz.png", product_description: "Osma A adalah EDP unisex 150 ml dengan pineapple, coconut, dan vanilla. Karakternya tropical, sweet, soft, cocok untuk cuaca hangat dan daily wear." },
  { id: "23", category: "Parfum", brand: "Osma", product: "Bonsoir Perfume", size: "150", unit: "ml", idr_sell: "Rp880,000", image_path: "https://cdn.salla.sa/YNEym/369e2428-6761-4ae1-b9dc-d079f6fddbc4-1000x1000-Mv3smn9DWNhQ9SDoc68KuUOplIuN6mZlcVHQP0I6.jpg", product_description: "Bonsoir adalah parfum unisex 150 ml dengan grapefruit, leather, dan cedarwood. Karakternya fresh, bold, woody, sophisticated, dan cocok untuk daily maupun evening wear." }
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

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
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
      (p.brand && p.brand.toLowerCase().includes(searchVal)) ||
      (p.product_description && p.product_description.toLowerCase().includes(searchVal))
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
    const productDescription = p.product_description || '';
    const brandLabel = p.brand ? `${p.brand} · ${p.category}` : p.category;

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
        <img src="${escapeHTML(imgPath)}" alt="${escapeHTML(p.product)}" loading="lazy" onerror="this.src='https://placehold.co/300x200?text=Jastip+UAE'"/>
      </div>
      <div class="product-card-body">
        <span class="card-tag">${escapeHTML(brandLabel)}</span>
        <h3 class="card-title">${escapeHTML(p.product)}</h3>
        ${productDescription ? `<p class="card-description">${escapeHTML(productDescription)}</p>` : ''}
        <div class="card-meta">
          <div class="meta-item">
            <span>Ukuran</span>
            <b>${escapeHTML(p.size)} ${escapeHTML(p.unit)}</b>
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
          <img src="${escapeHTML(prod.image_path)}" alt="${escapeHTML(prod.product)}" onerror="this.src='https://placehold.co/80?text=Jastip'"/>
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${escapeHTML(prod.product)}</h4>
          <span class="cart-item-meta">${escapeHTML(prod.size)} ${escapeHTML(prod.unit)} · ${formatPrice(priceVal)}</span>
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
