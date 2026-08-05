/* =========================================================
   ANIMEVERSE STORE — APP LOGIC (Vanilla JS)
   Struktur:
   1. Data Produk (array — mudah ditambah / disambungkan ke backend)
   2. State Aplikasi
   3. Util
   4. Render: Produk, Detail, Cart, Wishlist, Checkout
   5. Event Handlers & Init
   ========================================================= */

/* =========================================================
   1. DATA PRODUK
   Di masa depan, array ini bisa diganti dengan hasil fetch()
   dari REST API / database backend tanpa mengubah kode render.
   ========================================================= */
function img(seed, bg, fg) {
  // Placeholder image generator — ganti dengan URL gambar asli dari backend nanti
  return `https://placehold.co/600x600/${bg || "15142a"}/${fg || "a855f7"}?font=poppins&text=${encodeURIComponent(seed)}`;
}

const PRODUCTS = [
  {
        id: 1, name: "One Piece Gear 5 Luffy Figure", category: "scale-figure", 
    price: 1850000, oldPrice: 2200000, rating: 4.8, reviewsCount: 214, stock: 8, isNew: false,
    desc: "Figure scale premium Luffy dalam form Gear 5, detail ekspresi ikonik & finishing glossy.",
    longDesc: "Rasakan kekuatan Sun God Nika dalam genggamanmu. One Piece Gear 5 Luffy Figure hadir dengan pose dinamis, detail otot dan rambut yang presisi, serta cat berkualitas tinggi yang menonjolkan aura karismatik Luffy pasca-bangkitnya kekuatan Gear 5.",
    specs: { Material: "PVC & ABS", Tinggi: "27 cm", Skala: "1/8", Manufaktur: "Banpresto", Origin: "Jepang", Lisensi: "Resmi Toei Animation" },
  },
  {
    id: 2, name: "Naruto Sage Mode Figure", category: "scale-figure", image: "images/naruto.png",
    price: 1250000, oldPrice: null, rating: 4.7, reviewsCount: 178, stock: 15, isNew: false,
    desc: "Figure Naruto Sage Mode dengan efek chakra transparan dan pose penuh aksi.",
    longDesc: "Naruto Sage Mode Figure menghadirkan momen legendaris saat Naruto menguasai chakra alam. Dilengkapi base efek energi translucent dan detail jubah yang berkibar dinamis.",
    specs: { Material: "PVC", Tinggi: "23 cm", Skala: "1/8", Manufaktur: "Bandai Spirits", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 3, name: "Gojo Satoru Figure", category: "prize-figure",
    price: 1450000, oldPrice: 1650000, rating: 4.9, reviewsCount: 302, stock: 6, isNew: true,
    desc: "Prize figure Gojo Satoru dengan Six Eyes menyala dan jubah khas Jujutsu Kaisen.",
    longDesc: "Sang penyihir terkuat kini hadir di rak koleksimu. Gojo Satoru Figure menonjolkan tatapan tajam Six Eyes, detail blindfold ikonik, serta lipatan jubah yang dinamis dan elegan.",
    specs: { Material: "PVC", Tinggi: "22 cm", Skala: "Prize Size", Manufaktur: "SEGA", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 4, name: "Levi Ackerman Figure", category: "action-figure",
    price: 1300000, oldPrice: null, rating: 4.8, reviewsCount: 189, stock: 10, isNew: false,
    desc: "Action figure Levi Ackerman dengan ODM gear lengkap dan sendi fully articulated.",
    longDesc: "Kapten pasukan survei terkuat, Levi Ackerman, hadir dalam action figure dengan sendi dapat digerakkan penuh, lengkap dengan ODM gear dan aksesori pedang ganda.",
    specs: { Material: "PVC & ABS", Tinggi: "17 cm", Skala: "Non-scale", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Kodansha" },
  },
  {
    id: 5, name: "Mikasa Ackerman Figure", category: "action-figure",
    price: 1250000, oldPrice: null, rating: 4.7, reviewsCount: 156, stock: 0, isNew: false,
    desc: "Action figure Mikasa Ackerman lengkap dengan scarf merah ikonik dan senjata.",
    longDesc: "Mikasa Ackerman Figure menghadirkan sosok prajurit tangguh dengan detail scarf merah khasnya, ekspresi tegas, dan aksesori blade dual-wield.",
    specs: { Material: "PVC & ABS", Tinggi: "17 cm", Skala: "Non-scale", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Kodansha" },
  },
  {
    id: 6, name: "Tanjiro Kamado Figure", category: "nendoroid",
    price: 980000, oldPrice: 1150000, rating: 4.9, reviewsCount: 421, stock: 20, isNew: false,
    desc: "Nendoroid Tanjiro Kamado, imut, chibi, dengan wajah interchangeable.",
    longDesc: "Versi Nendoroid dari Tanjiro Kamado ini datang dengan 3 ekspresi wajah berbeda, pedang Nichirin, serta motif haori kotak-kotak khasnya dalam gaya chibi yang menggemaskan.",
    specs: { Material: "PVC & ABS", Tinggi: "10 cm", Skala: "Nendoroid", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 7, name: "Nezuko Kamado Figure", category: "nendoroid",
    price: 920000, oldPrice: null, rating: 4.9, reviewsCount: 388, stock: 18, isNew: false,
    desc: "Nendoroid Nezuko Kamado dengan bambu mulut dan mode Blood Demon Art.",
    longDesc: "Nezuko hadir dalam versi Nendoroid lengkap dengan bambu penutup mulut yang bisa dilepas, serta opsi part efek Blood Demon Art berwarna pink translucent.",
    specs: { Material: "PVC & ABS", Tinggi: "10 cm", Skala: "Nendoroid", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 8, name: "Goku Ultra Instinct Figure", category: "scale-figure",
    price: 1750000, oldPrice: 1950000, rating: 4.8, reviewsCount: 267, stock: 5, isNew: false,
    desc: "Scale figure Goku Ultra Instinct dengan efek aura perak dinamis.",
    longDesc: "Goku Ultra Instinct Figure menampilkan momen epik transformasi tertinggi Goku, dengan rambut perak berkilau dan pose pertarungan yang penuh energi.",
    specs: { Material: "PVC", Tinggi: "28 cm", Skala: "1/6", Manufaktur: "Banpresto", Origin: "Jepang", Lisensi: "Resmi Toei Animation" },
  },
  {
    id: 9, name: "Vegeta Blue Figure", category: "scale-figure",
    price: 1600000, oldPrice: null, rating: 4.7, reviewsCount: 198, stock: 9, isNew: false,
    desc: "Figure Vegeta Super Saiyan Blue dengan detail aura biru elektrik.",
    longDesc: "Sang Pangeran Saiyan tampil gagah dalam form Super Saiyan Blue, lengkap dengan efek aura energi biru menyala dan pose khas penuh kebanggaan.",
    specs: { Material: "PVC", Tinggi: "26 cm", Skala: "1/6", Manufaktur: "Banpresto", Origin: "Jepang", Lisensi: "Resmi Toei Animation" },
  },
  {
    id: 10, name: "Frieren Figure", category: "popup-parade",
    price: 1200000, oldPrice: null, rating: 4.9, reviewsCount: 143, stock: 11, isNew: true,
    desc: "Pop Up Parade Frieren, detail jubah penyihir dan tongkat sihir elegan.",
    longDesc: "Frieren: Beyond Journey's End hadir dalam lini Pop Up Parade dengan pahatan detail jubah penyihir, ekspresi tenang khasnya, dan tongkat sihir yang elegan.",
    specs: { Material: "PVC", Tinggi: "17 cm", Skala: "Pop Up Parade", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Shogakukan" },
  },
  {
    id: 11, name: "Chainsaw Man Figure", category: "action-figure",
    price: 1150000, oldPrice: 1300000, rating: 4.6, reviewsCount: 176, stock: 7, isNew: false,
    desc: "Action figure Denji dalam mode Chainsaw Man dengan gergaji mesin ikonik.",
    longDesc: "Chainsaw Man Figure menampilkan transformasi brutal Denji lengkap dengan gergaji mesin di kepala dan lengan, serta detail tekstur kulit yang mengesankan.",
    specs: { Material: "PVC & ABS", Tinggi: "19 cm", Skala: "Non-scale", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 12, name: "Anya Forger Figure", category: "nendoroid",
    price: 850000, oldPrice: null, rating: 4.9, reviewsCount: 356, stock: 25, isNew: false,
    desc: "Nendoroid Anya Forger dengan ekspresi khas 'waku waku' yang menggemaskan.",
    longDesc: "Anya Forger dari Spy x Family hadir dalam Nendoroid lucu lengkap dengan seragam Eden Academy dan wajah ekspresif khas 'waku waku'-nya.",
    specs: { Material: "PVC & ABS", Tinggi: "10 cm", Skala: "Nendoroid", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 13, name: "Power Figure", category: "prize-figure",
    price: 1050000, oldPrice: null, rating: 4.7, reviewsCount: 132, stock: 4, isNew: false,
    desc: "Prize figure Power dengan pose percaya diri dan tanduk khas iblis darah.",
    longDesc: "Power, iblis darah dari Chainsaw Man, tampil penuh karakter dengan pose angkuh khasnya, tanduk melengkung, dan detail kostum yang tajam.",
    specs: { Material: "PVC", Tinggi: "21 cm", Skala: "Prize Size", Manufaktur: "SEGA", Origin: "Jepang", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 14, name: "Nendoroid Hatsune Miku", category: "nendoroid",
    price: 750000, oldPrice: 850000, rating: 5.0, reviewsCount: 512, stock: 30, isNew: false,
    desc: "Nendoroid Hatsune Miku klasik, ikon Vocaloid dengan twin-tail hijau toska.",
    longDesc: "Nendoroid paling ikonik sepanjang masa. Hatsune Miku hadir dengan twin-tail hijau toska khasnya, mic stand, dan beberapa ekspresi wajah interchangeable.",
    specs: { Material: "PVC & ABS", Tinggi: "10 cm", Skala: "Nendoroid", Manufaktur: "Good Smile Company", Origin: "Jepang", Lisensi: "Resmi Crypton Future Media" },
  },
  {
    id: 15, name: "Gundam RX-78 MG", category: "gundam",
    price: 980000, oldPrice: null, rating: 4.8, reviewsCount: 245, stock: 14, isNew: false,
    desc: "Model kit Master Grade RX-78-2 Gundam, rangka dalam presisi tinggi.",
    longDesc: "Gundam RX-78-2 versi Master Grade menghadirkan rangka dalam (inner frame) yang detail, panel line tajam, serta sistem sendi yang memungkinkan pose action penuh dinamika.",
    specs: { Material: "Plastik Injeksi", Tinggi: "18 cm (rakit)", Skala: "1/100", Manufaktur: "Bandai", Origin: "Jepang", Lisensi: "Resmi Sunrise" },
  },
  {
    id: 16, name: "Manga One Piece Vol.1", category: "manga",
    price: 65000, oldPrice: null, rating: 4.9, reviewsCount: 890, stock: 50, isNew: false,
    desc: "Manga One Piece volume pertama, awal petualangan Monkey D. Luffy.",
    longDesc: "Volume pertama dari saga bajak laut terpanjang sepanjang masa. Ikuti awal perjalanan Luffy mencari One Piece dan membentuk kru Topi Jerami.",
    specs: { Bahasa: "Indonesia", Halaman: "192 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 17, name: "Manga Naruto Vol.1", category: "manga",
    price: 60000, oldPrice: null, rating: 4.8, reviewsCount: 743, stock: 45, isNew: false,
    desc: "Manga Naruto volume pertama, kisah awal ninja pembawa Kyuubi.",
    longDesc: "Volume pembuka kisah Naruto Uzumaki, seorang ninja muda dari Konoha yang bertekad menjadi Hokage meski membawa kekuatan Kyuubi dalam dirinya.",
    specs: { Bahasa: "Indonesia", Halaman: "200 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 18, name: "Manga Jujutsu Kaisen Vol.1", category: "manga",
    price: 68000, oldPrice: null, rating: 4.9, reviewsCount: 612, stock: 38, isNew: true,
    desc: "Manga Jujutsu Kaisen volume pertama, awal kisah Yuji Itadori.",
    longDesc: "Yuji Itadori menelan jari kutukan Sukuna dan terseret ke dunia penuh kutukan dan penyihir jujutsu. Volume pertama yang membuka seluruh cerita.",
    specs: { Bahasa: "Indonesia", Halaman: "196 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 19, name: "Manga Demon Slayer Vol.1", category: "manga",
    price: 70000, oldPrice: null, rating: 4.9, reviewsCount: 678, stock: 40, isNew: false,
    desc: "Manga Demon Slayer volume pertama, awal perjalanan Tanjiro Kamado.",
    longDesc: "Setelah keluarganya dibantai iblis dan adiknya Nezuko berubah menjadi iblis, Tanjiro memulai perjalanan menjadi Pembasmi Iblis dalam volume pembuka ini.",
    specs: { Bahasa: "Indonesia", Halaman: "192 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi Shueisha" },
  },
  {
    id: 20, name: "Manga Attack on Titan Vol.1", category: "manga",
    price: 72000, oldPrice: null, rating: 4.9, reviewsCount: 705, stock: 33, isNew: false,
    desc: "Manga Attack on Titan volume pertama, kejatuhan tembok Maria.",
    longDesc: "Umat manusia terjebak di balik tembok raksasa demi berlindung dari para Titan. Volume pertama ini menandai runtuhnya Wall Maria dan awal perjuangan Eren Yeager.",
    specs: { Bahasa: "Indonesia", Halaman: "195 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi Kodansha" },
  },
  {
    id: 21, name: "Sword Art Online Light Novel Vol.1", category: "light-novel",
    price: 55000, oldPrice: null, rating: 4.7, reviewsCount: 289, stock: 22, isNew: false,
    desc: "Light novel Sword Art Online volume pertama, Aincrad arc.",
    longDesc: "10.000 pemain terjebak dalam game VRMMORPG Sword Art Online — satu-satunya cara keluar adalah menaklukkan lantai ke-100. Volume pertama arc Aincrad.",
    specs: { Bahasa: "Indonesia", Halaman: "260 hlm", Penerbit: "Elex Media Komputindo", Format: "Softcover", Lisensi: "Resmi ASCII Media Works" },
  },
  {
    id: 22, name: "Demon Slayer Keychain Set", category: "aksesoris",
    price: 45000, oldPrice: 55000, rating: 4.6, reviewsCount: 167, stock: 60, isNew: false,
    desc: "Set gantungan kunci akrilik karakter Demon Slayer, isi 5 pcs.",
    longDesc: "Set gantungan kunci akrilik berisi 5 karakter utama Demon Slayer — Tanjiro, Nezuko, Zenitsu, Inosuke, dan Giyu — cocok untuk tas atau koleksi.",
    specs: { Material: "Akrilik", Isi: "5 pcs / set", Ukuran: "± 5 cm", Manufaktur: "AnimeVerse Original Merch", Lisensi: "Resmi Shueisha" },
  },
];

// Kelompok kategori untuk navigasi (Figure / Manga)
const CATEGORY_GROUPS = {
  "figure-group": ["action-figure", "scale-figure", "nendoroid", "popup-parade", "prize-figure", "gundam"],
  "manga-group": ["manga", "light-novel"],
};

const CATEGORY_LABELS = {
  all: "Semua Produk", "action-figure": "Action Figure", "scale-figure": "Scale Figure",
  nendoroid: "Nendoroid", "popup-parade": "Pop Up Parade", "prize-figure": "Prize Figure",
  gundam: "Gundam", manga: "Manga", "light-novel": "Light Novel", aksesoris: "Aksesoris",
  "figure-group": "Semua Figure", "manga-group": "Manga & Light Novel", promo: "Produk Promo",
};

// Review dummy per produk (agar halaman detail terasa hidup)
const SAMPLE_REVIEWS = [
  { name: "Rizky A.", rating: 5, text: "Kualitas cat rapi banget, packaging aman sampai rumah tanpa lecet sedikit pun." },
  { name: "Dinda P.", rating: 5, text: "Sesuai gambar, detailnya tajam. Worth it buat koleksi!" },
  { name: "Fajar S.", rating: 4, text: "Bagus, cuma pengiriman agak lama karena stok terbatas." },
  { name: "Melisa W.", rating: 5, text: "Original dan ada hologram resmi, seller terpercaya." },
];

/* =========================================================
   2. STATE APLIKASI
   ========================================================= */
const state = {
  view: "home",
  filterCategory: "all",
  searchQuery: "",
  sort: "default",
  cart: [],       // { id, qty }
  wishlist: [],   // [id, id, ...]
  currentProductId: null,
  currentSlide: 0,
  theme: "dark",
};

const SHIPPING_FEE = 25000;
const FREE_SHIPPING_MIN = 500000;

/* =========================================================
   3. UTIL
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function formatRupiah(num) {
  return "Rp" + Number(num).toLocaleString("id-ID");
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function stockStatus(stock) {
  if (stock <= 0) return { label: "Habis", cls: "out" };
  if (stock <= 5) return { label: `Sisa ${stock}`, cls: "low" };
  return { label: "Tersedia", cls: "in" };
}

function starHTML(rating) {
  const full = Math.round(rating);
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-solid fa-star" style="opacity:${i <= full ? 1 : 0.25}"></i>`;
  }
  return html;
}

function showToast(message, type = "success") {
  const container = $("#toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 350);
  }, 2600);
}

/* =========================================================
   4. FILTER / SEARCH / SORT
   ========================================================= */
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Filter kategori (termasuk grup & promo)
  if (state.filterCategory && state.filterCategory !== "all") {
    if (state.filterCategory === "promo") {
      list = list.filter((p) => p.oldPrice);
    } else if (CATEGORY_GROUPS[state.filterCategory]) {
      list = list.filter((p) => CATEGORY_GROUPS[state.filterCategory].includes(p.category));
    } else {
      list = list.filter((p) => p.category === state.filterCategory);
    }
  }

  // Search realtime
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  // Sorting
  switch (state.sort) {
    case "price-asc": list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "rating": list.sort((a, b) => b.rating - a.rating); break;
    case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: list.sort((a, b) => a.id - b.id);
  }

  return list;
}

/* =========================================================
   5. RENDER: PRODUCT CARD & GRID
   ========================================================= */
function productCardHTML(p) {
  const stockInfo = stockStatus(p.stock);
  const isWishlisted = state.wishlist.includes(p.id);
  const discountPct = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;

  return `
  <article class="product-card" data-id="${p.id}">
    <div class="pc-media">
      <div class="pc-badges">
        ${p.oldPrice ? `<span class="pc-badge discount">-${discountPct}%</span>` : ""}
        ${p.isNew ? `<span class="pc-badge new">NEW</span>` : ""}
        ${p.stock <= 0 ? `<span class="pc-badge out">Habis</span>` : ""}
      </div>
      <button class="pc-wishlist ${isWishlisted ? "active" : ""}" data-wishlist="${p.id}" title="Tambah ke wishlist">
        <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
      </button>
      <img src="${img(p.name, "15142a", "a855f7")}" alt="${p.name}" loading="lazy">
    </div>
    <div class="pc-body">
      <span class="pc-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
      <h3 class="pc-name" data-detail="${p.id}">${p.name}</h3>
      <p class="pc-desc">${p.desc}</p>
      <div class="pc-rating">${starHTML(p.rating)} <span>${p.rating.toFixed(1)} (${p.reviewsCount})</span></div>
      <div class="pc-price">
        <span class="now">${formatRupiah(p.price)}</span>
        ${p.oldPrice ? `<span class="old">${formatRupiah(p.oldPrice)}</span>` : ""}
      </div>
      <span class="pc-stock ${stockInfo.cls}"><i class="fa-solid fa-circle" style="font-size:6px;"></i> ${stockInfo.label}</span>
      <div class="pc-actions">
        <button class="pc-btn detail" data-detail="${p.id}"><i class="fa-regular fa-eye"></i> Detail</button>
        <button class="pc-btn add" data-add="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>
          <i class="fa-solid fa-cart-plus"></i> Keranjang
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const list = getFilteredProducts();
  const grid = $("#productsGrid");
  const empty = $("#emptyState");
  const titleEl = $("#productsTitle");
  const subtitleEl = $("#productsSubtitle");

  titleEl.textContent = CATEGORY_LABELS[state.filterCategory] || "Semua Produk";
  subtitleEl.textContent = state.searchQuery ? `Hasil pencarian untuk "${state.searchQuery}"` : "Original & bergaransi resmi";
  $("#resultsCount").textContent = `${list.length} produk ditemukan`;

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = list.map(productCardHTML).join("");
  }

  // update active category chip
  $$(".category-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === state.filterCategory);
  });
}

/* =========================================================
   6. RENDER: PRODUCT DETAIL
   ========================================================= */
function renderProductDetail(id) {
  const p = getProduct(id);
  if (!p) return;
  state.currentProductId = p.id;

  const stockInfo = stockStatus(p.stock);
  const discountPct = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;
  const isWishlisted = state.wishlist.includes(p.id);

  const thumbs = [
    img(p.name, "15142a", "a855f7"),
    img(p.name + " 2", "191828", "22d3ee"),
    img(p.name + " 3", "1f1e30", "a855f7"),
  ];

  $("#productDetailContent").innerHTML = `
    <div class="pd-gallery">
      <div class="pd-gallery-main"><img src="${thumbs[0]}" alt="${p.name}" id="pdMainImg"></div>
      <div class="pd-thumbs">
        ${thumbs.map((t, i) => `<div class="pd-thumb ${i === 0 ? "active" : ""}" data-thumb="${t}"><img src="${t}" alt="thumbnail ${i + 1}"></div>`).join("")}
      </div>
    </div>
    <div class="pd-info">
      <span class="pd-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
      <h1 class="pd-name">${p.name}</h1>
      <div class="pd-rating">${starHTML(p.rating)} <span>${p.rating.toFixed(1)} · ${p.reviewsCount} ulasan</span></div>
      <div class="pd-price-row">
        <span class="now">${formatRupiah(p.price)}</span>
        ${p.oldPrice ? `<span class="old">${formatRupiah(p.oldPrice)}</span><span class="disc">-${discountPct}%</span>` : ""}
      </div>
      <p class="pd-desc">${p.longDesc}</p>

      <div class="pd-specs">
        <h4>Spesifikasi</h4>
        ${Object.entries(p.specs).map(([k, v]) => `<div class="spec-row"><span>${k}</span><b>${v}</b></div>`).join("")}
      </div>

      <div class="pd-stock ${stockInfo.cls}"><i class="fa-solid fa-box"></i> Status Stok: ${stockInfo.label}</div>

      <div class="pd-qty">
        <span style="font-size:13.5px;color:var(--text-muted);">Jumlah</span>
        <div class="qty-control">
          <button id="pdQtyMinus"><i class="fa-solid fa-minus"></i></button>
          <span id="pdQtyValue">1</span>
          <button id="pdQtyPlus"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <div class="pd-actions">
        <button class="btn btn-outline" id="pdAddCart" ${p.stock <= 0 ? "disabled" : ""}><i class="fa-solid fa-cart-plus"></i> Tambah Keranjang</button>
        <button class="btn btn-primary" id="pdBuyNow" ${p.stock <= 0 ? "disabled" : ""}><i class="fa-solid fa-bolt"></i> Beli Sekarang</button>
        <button class="pd-wishlist-btn ${isWishlisted ? "active" : ""}" id="pdWishlist" title="Simpan ke wishlist">
          <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>
    </div>
  `;

  // reviews
  $("#reviewList").innerHTML = SAMPLE_REVIEWS.map(
    (r) => `
    <div class="review-item">
      <div class="review-head">
        <div class="review-user"><span class="review-avatar">${r.name.charAt(0)}</span> ${r.name}</div>
        <div class="review-stars">${starHTML(r.rating)}</div>
      </div>
      <p class="review-text">${r.text}</p>
    </div>`
  ).join("");

  // related products (same category, excluding current)
  const related = PRODUCTS.filter((rp) => rp.category === p.category && rp.id !== p.id).slice(0, 4);
  $("#relatedGrid").innerHTML = related.length
    ? related.map(productCardHTML).join("")
    : `<p style="color:var(--text-faint);">Belum ada produk serupa.</p>`;

  bindDetailEvents(p);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindDetailEvents(p) {
  let qty = 1;
  const qtyValueEl = $("#pdQtyValue");

  $("#pdQtyMinus").addEventListener("click", () => {
    if (qty > 1) qty--;
    qtyValueEl.textContent = qty;
  });
  $("#pdQtyPlus").addEventListener("click", () => {
    if (qty < p.stock) qty++;
    qtyValueEl.textContent = qty;
  });

  $$(".pd-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      $$(".pd-thumb").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      $("#pdMainImg").src = thumb.dataset.thumb;
    });
  });

  $("#pdAddCart")?.addEventListener("click", () => {
    addToCart(p.id, qty);
  });
  $("#pdBuyNow")?.addEventListener("click", () => {
    addToCart(p.id, qty, true);
    switchView("cart");
  });
  $("#pdWishlist")?.addEventListener("click", () => toggleWishlist(p.id));
}

/* =========================================================
   7. CART
   ========================================================= */
function addToCart(id, qty = 1, silent = false) {
  const product = getProduct(id);
  if (!product || product.stock <= 0) return;

  const existing = state.cart.find((c) => c.id === id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.stock);
  } else {
    state.cart.push({ id, qty: Math.min(qty, product.stock) });
  }
  updateCartCount();
  if (!silent) showToast(`${product.name} ditambahkan ke keranjang`, "success");
}

function removeFromCart(id) {
  state.cart = state.cart.filter((c) => c.id !== id);
  updateCartCount();
  renderCart();
  showToast("Produk dihapus dari keranjang", "info");
}

function changeCartQty(id, delta) {
  const item = state.cart.find((c) => c.id === id);
  const product = getProduct(id);
  if (!item || !product) return;
  item.qty = Math.max(1, Math.min(item.qty + delta, product.stock));
  updateCartCount();
  renderCart();
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, c) => {
    const p = getProduct(c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}

function updateCartCount() {
  const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
  $("#cartCount").textContent = totalQty;
}

function updateWishlistCount() {
  $("#wishlistCount").textContent = state.wishlist.length;
}

function renderCart() {
  const container = $("#cartItems");
  const empty = $("#cartEmpty");
  const layout = $(".cart-layout");

  if (state.cart.length === 0) {
    layout.style.display = "none";
    empty.style.display = "block";
    return;
  }
  layout.style.display = "grid";
  empty.style.display = "none";

  container.innerHTML = state.cart.map((c) => {
    const p = getProduct(c.id);
    if (!p) return "";
    return `
    <div class="cart-item" data-id="${p.id}">
      <img src="${img(p.name, "15142a", "a855f7")}" alt="${p.name}">
      <div>
        <div class="ci-name">${p.name}</div>
        <div class="ci-cat">${CATEGORY_LABELS[p.category] || p.category}</div>
        <div class="ci-price">${formatRupiah(p.price)}</div>
      </div>
      <div class="qty-control">
        <button data-qty-minus="${p.id}"><i class="fa-solid fa-minus"></i></button>
        <span>${c.qty}</span>
        <button data-qty-plus="${p.id}"><i class="fa-solid fa-plus"></i></button>
      </div>
      <button class="ci-remove" data-remove="${p.id}" title="Hapus"><i class="fa-solid fa-trash"></i></button>
    </div>`;
  }).join("");

  const { subtotal, shipping, total } = cartTotals();
  $("#cartSubtotal").textContent = formatRupiah(subtotal);
  $("#cartShipping").textContent = shipping === 0 ? "Gratis" : formatRupiah(shipping);
  $("#cartTotal").textContent = formatRupiah(total);
}

/* =========================================================
   8. WISHLIST
   ========================================================= */
function toggleWishlist(id) {
  const product = getProduct(id);
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(`${product.name} dihapus dari wishlist`, "info");
  } else {
    state.wishlist.push(id);
    showToast(`${product.name} ditambahkan ke wishlist ❤`, "success");
  }
  updateWishlistCount();
  renderProducts();
  if (state.view === "wishlist") renderWishlist();
  if (state.view === "detail" && state.currentProductId === id) renderProductDetail(id);
}

function renderWishlist() {
  const list = PRODUCTS.filter((p) => state.wishlist.includes(p.id));
  const grid = $("#wishlistGrid");
  const empty = $("#wishlistEmpty");
  if (list.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = list.map(productCardHTML).join("");
  }
}

/* =========================================================
   9. CHECKOUT
   ========================================================= */
function renderCheckoutSummary() {
  const { subtotal, shipping, total } = cartTotals();
  $("#checkoutItems").innerHTML = state.cart.map((c) => {
    const p = getProduct(c.id);
    if (!p) return "";
    return `<div class="co-item">
      <img src="${img(p.name, "15142a", "a855f7")}" alt="${p.name}">
      <span class="co-name">${p.name}</span>
      <span class="co-qty">x${c.qty}</span>
    </div>`;
  }).join("");
  $("#ckSubtotal").textContent = formatRupiah(subtotal);
  $("#ckShipping").textContent = shipping === 0 ? "Gratis" : formatRupiah(shipping);
  $("#ckTotal").textContent = formatRupiah(total);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (state.cart.length === 0) {
    showToast("Keranjang masih kosong", "error");
    return;
  }
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const orderId = "AV-" + Date.now().toString().slice(-8);

  $("#orderIdText").textContent = `${orderId} (${payment})`;
  state.cart = [];
  updateCartCount();
  switchView("success");
  e.target.reset();
}

/* =========================================================
   10. VIEW SWITCHING
   ========================================================= */
function switchView(viewName) {
  state.view = viewName;
  $$(".view").forEach((v) => v.classList.remove("active-view"));
  const target = $(`#view-${viewName}`);
  if (target) target.classList.add("active-view");

  // update active nav link (only meaningful for home/about/contact top-level)
  $$(".nav-links a").forEach((a) => a.classList.remove("active-link"));
  const navMatch = document.querySelector(`.nav-links a[data-view="${viewName}"]`);
  if (navMatch) navMatch.classList.add("active-link");

  if (viewName === "cart") renderCart();
  if (viewName === "wishlist") renderWishlist();
  if (viewName === "checkout") renderCheckoutSummary();
  if (viewName === "home") renderProducts();

  window.scrollTo({ top: 0, behavior: "smooth" });
  closeMobileNav();
}

/* =========================================================
   11. HERO SLIDER
   ========================================================= */
let sliderInterval;
function initSlider() {
  const slides = $$(".slide");
  const dotsContainer = $("#sliderDots");
  dotsContainer.innerHTML = slides.length ? Array.from(slides).map((_, i) => `<span data-dot="${i}" class="${i === 0 ? "active" : ""}"></span>`).join("") : "";

  function goToSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    $$("#sliderDots span").forEach((d) => d.classList.remove("active"));
    state.currentSlide = (index + slides.length) % slides.length;
    slides[state.currentSlide].classList.add("active");
    $$("#sliderDots span")[state.currentSlide].classList.add("active");
  }

  $("#sliderPrev").addEventListener("click", () => { goToSlide(state.currentSlide - 1); resetAutoplay(); });
  $("#sliderNext").addEventListener("click", () => { goToSlide(state.currentSlide + 1); resetAutoplay(); });
  $$("#sliderDots span").forEach((dot) => {
    dot.addEventListener("click", () => { goToSlide(Number(dot.dataset.dot)); resetAutoplay(); });
  });

  function resetAutoplay() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => goToSlide(state.currentSlide + 1), 4500);
  }
  resetAutoplay();
}

/* =========================================================
   12. SEARCH (realtime)
   ========================================================= */
function initSearch() {
  const input = $("#searchInput");
  const box = input.closest(".search-box");
  const suggestBox = $("#searchSuggestions");

  input.addEventListener("input", () => {
    state.searchQuery = input.value;
    box.classList.toggle("has-value", input.value.length > 0);

    if (input.value.trim().length > 0) {
      const results = PRODUCTS.filter((p) => p.name.toLowerCase().includes(input.value.trim().toLowerCase())).slice(0, 6);
      suggestBox.innerHTML = `<div class="suggestion-inner">${
        results.length
          ? results.map((p) => `
            <div class="suggestion-item" data-detail="${p.id}">
              <img src="${img(p.name, "15142a", "a855f7")}" alt="${p.name}">
              <div><div class="s-name">${p.name}</div><div class="s-price">${formatRupiah(p.price)}</div></div>
            </div>`).join("")
          : `<div class="suggestion-empty">Produk tidak ditemukan</div>`
      }</div>`;
      suggestBox.classList.add("open");
    } else {
      suggestBox.classList.remove("open");
    }

    if (state.view === "home") renderProducts();
  });

  $("#searchClear").addEventListener("click", () => {
    input.value = "";
    state.searchQuery = "";
    box.classList.remove("has-value");
    suggestBox.classList.remove("open");
    if (state.view === "home") renderProducts();
  });

  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && !suggestBox.contains(e.target)) {
      suggestBox.classList.remove("open");
    }
  });
}

/* =========================================================
   13. MOBILE NAV
   ========================================================= */
function closeMobileNav() {
  $("#navLinks").classList.remove("open");
}

/* =========================================================
   14. THEME TOGGLE
   ========================================================= */
function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", state.theme);
  const icon = $("#themeToggle i");
  icon.className = state.theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* =========================================================
   15. BACK TO TOP
   ========================================================= */
function initBackToTop() {
  const btn = $("#backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =========================================================
   16. POLICY MODAL
   ========================================================= */
const POLICY_CONTENT = {
  privacy: {
    title: "Kebijakan Privasi",
    body: `<p>AnimeVerse Store menghargai privasi setiap pengunjung dan pelanggan. Data pribadi yang kamu berikan saat checkout — seperti nama, nomor HP, dan alamat — hanya digunakan untuk keperluan pengiriman pesanan.</p>
    <p>Kami tidak membagikan data pribadimu kepada pihak ketiga tanpa izin, kecuali mitra logistik yang memproses pengiriman barang.</p>
    <p>Kamu berhak meminta penghapusan data pribadi kapan saja dengan menghubungi tim CS kami melalui halaman Kontak.</p>`,
  },
  tos: {
    title: "Syarat & Ketentuan",
    body: `<p>Dengan berbelanja di AnimeVerse Store, kamu menyetujui bahwa seluruh produk yang dijual adalah original dan berlisensi resmi.</p>
    <p>Pembatalan pesanan hanya dapat dilakukan sebelum status pesanan "Diproses". Pengembalian barang berlaku untuk produk cacat produksi maksimal 3 hari setelah barang diterima.</p>
    <p>Harga dan ketersediaan stok dapat berubah sewaktu-waktu mengikuti kondisi supplier resmi kami di Jepang.</p>`,
  },
};

function openPolicyModal(key) {
  const data = POLICY_CONTENT[key];
  if (!data) return;
  $("#policyModalTitle").textContent = data.title;
  $("#policyModalBody").innerHTML = data.body;
  $("#policyModal").classList.add("open");
}
function closePolicyModal() {
  $("#policyModal").classList.remove("open");
}

/* =========================================================
   17. GLOBAL CLICK DELEGATION
   ========================================================= */
function initDelegatedEvents() {
  document.body.addEventListener("click", (e) => {
    // Nav / view switching links (data-view attribute anywhere)
    const viewLink = e.target.closest("[data-view]");
    if (viewLink) {
      e.preventDefault();
      const view = viewLink.dataset.view;
      const filter = viewLink.dataset.filter;
      if (filter) state.filterCategory = filter;
      switchView(view);
      if (view === "home") {
        setTimeout(() => $("#productsSection").scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }
      return;
    }

    // Category chip
    const chip = e.target.closest(".category-chip");
    if (chip) {
      state.filterCategory = chip.dataset.category;
      renderProducts();
      $("#productsSection").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Add to cart
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(Number(addBtn.dataset.add), 1);
      return;
    }

    // Detail
    const detailEl = e.target.closest("[data-detail]");
    if (detailEl) {
      renderProductDetail(Number(detailEl.dataset.detail));
      switchView("detail");
      return;
    }

    // Wishlist toggle (card)
    const wishBtn = e.target.closest("[data-wishlist]");
    if (wishBtn) {
      toggleWishlist(Number(wishBtn.dataset.wishlist));
      return;
    }

    // Cart qty / remove
    const qMinus = e.target.closest("[data-qty-minus]");
    if (qMinus) { changeCartQty(Number(qMinus.dataset.qtyMinus), -1); return; }
    const qPlus = e.target.closest("[data-qty-plus]");
    if (qPlus) { changeCartQty(Number(qPlus.dataset.qtyPlus), 1); return; }
    const remove = e.target.closest("[data-remove]");
    if (remove) { removeFromCart(Number(remove.dataset.remove)); return; }

    // Checkout button (from cart)
    if (e.target.closest("#checkoutBtn")) {
      if (state.cart.length === 0) { showToast("Keranjang masih kosong", "error"); return; }
      switchView("checkout");
      return;
    }

    // Hero shop button
    if (e.target.closest("#heroShopBtn")) {
      e.preventDefault();
      state.filterCategory = "all";
      switchView("home");
      setTimeout(() => $("#productsSection").scrollIntoView({ behavior: "smooth" }), 150);
      return;
    }

    // Policy links
    if (e.target.closest("#privacyLink")) { e.preventDefault(); openPolicyModal("privacy"); return; }
    if (e.target.closest("#tosLink")) { e.preventDefault(); openPolicyModal("tos"); return; }
    if (e.target.closest("#policyModalClose") || e.target.id === "policyModal") { closePolicyModal(); return; }
  });

  // Sort
  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  // Theme
  $("#themeToggle").addEventListener("click", toggleTheme);

  // Mobile nav toggle
  $("#navToggle").addEventListener("click", () => $("#navLinks").classList.toggle("open"));

  // Checkout form
  $("#checkoutForm").addEventListener("submit", handleCheckoutSubmit);

  // Newsletter (front-end simulation — connect to backend later)
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Terima kasih! Kamu berhasil berlangganan newsletter.", "success");
    e.target.reset();
  });
}

/* =========================================================
   18. INIT
   ========================================================= */
function init() {
  $("#year").textContent = new Date().getFullYear();
  document.body.setAttribute("data-theme", state.theme);

  renderProducts();
  updateCartCount();
  updateWishlistCount();
  initSlider();
  initSearch();
  initBackToTop();
  initDelegatedEvents();

  // Hide loading screen
  window.addEventListener("load", () => {
    setTimeout(() => $("#loadingScreen").classList.add("hide"), 600);
  });
  // fallback in case 'load' already fired
  setTimeout(() => $("#loadingScreen").classList.add("hide"), 2000);
}

document.addEventListener("DOMContentLoaded", init);