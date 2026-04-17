export {};

// =============================================================
// 08 - MINI PROJECT: Sistem Pemesanan Makanan Online
// =============================================================
// Jalankan file ini: npx ts-node 08-mini-project.ts
// =============================================================
//
// Di file ini, SEMUA konsep dari file 01-07 digabung jadi satu!
// Kita bikin sistem pemesanan makanan sederhana.
//
// Konsep yang dipakai:
// [x] Basic types: string, number, boolean
// [x] Array types: string[], MenuItem[]
// [x] Object types: nested objects
// [x] Interface: MenuItem, Customer, Order
// [x] Type alias: OrderStatus, PaymentMethod
// [x] Function types: parameter, return, optional, void, callback
// [x] Union type: string | null
// [x] Literal type: OrderStatus, PaymentMethod
// =============================================================

// =====================
// STEP 1: Definisikan Types & Interfaces
// =====================

// Literal type --> status pesanan cuma bisa salah satu dari ini
type OrderStatus = "menunggu" | "dimasak" | "diantar" | "selesai" | "dibatalkan";

// Literal type --> metode pembayaran
type PaymentMethod = "cash" | "ewallet" | "transfer";

// Interface --> bentuk data menu makanan
interface MenuItem {
  id: number;
  nama: string;
  harga: number;
  kategori: "makanan" | "minuman" | "snack"; // literal type di dalam interface!
  tersedia: boolean;
}

// Interface --> bentuk data pelanggan
interface Customer {
  nama: string;
  alamat: string;
  telepon: string;
  member?: boolean; // optional: boleh ada, boleh engga
}

// Interface --> bentuk data item yang dipesan
interface OrderItem {
  menu: MenuItem;
  jumlah: number;
}

// Interface --> bentuk data pesanan
interface Order {
  id: string;
  pelanggan: Customer;       // nested object!
  items: OrderItem[];        // array of objects!
  status: OrderStatus;       // literal type!
  pembayaran: PaymentMethod; // literal type!
  catatan?: string;          // optional!
  totalHarga: number;
  waktuPesan: string;
}

// =====================
// STEP 2: Data Menu (Array of Interface)
// =====================

const daftarMenu: MenuItem[] = [
  { id: 1, nama: "Nasi Goreng Spesial", harga: 25000, kategori: "makanan", tersedia: true },
  { id: 2, nama: "Mie Ayam Bakso", harga: 20000, kategori: "makanan", tersedia: true },
  { id: 3, nama: "Es Teh Manis", harga: 5000, kategori: "minuman", tersedia: true },
  { id: 4, nama: "Jus Alpukat", harga: 15000, kategori: "minuman", tersedia: true },
  { id: 5, nama: "Kentang Goreng", harga: 18000, kategori: "snack", tersedia: false },
  { id: 6, nama: "Ayam Geprek", harga: 22000, kategori: "makanan", tersedia: true },
];

// =====================
// STEP 3: Functions
// =====================

// Function: Tampilkan menu (void - ga return apa-apa)
function tampilkanMenu(menu: MenuItem[]): void {
  console.log("\n========== DAFTAR MENU ==========");
  menu.forEach((item) => {
    const status = item.tersedia ? "v" : "x HABIS";
    console.log(
      `  [${item.id}] ${item.nama.padEnd(22)} Rp ${item.harga.toLocaleString("id-ID").padStart(6)}  (${status})`
    );
  });
  console.log("=================================\n");
}

// Function: Filter menu berdasarkan kategori (pakai callback!)
function filterMenu(
  menu: MenuItem[],
  filter: (item: MenuItem) => boolean
): MenuItem[] {
  return menu.filter(filter);
}

// Function: Hitung total harga (return number)
function hitungTotal(items: OrderItem[], isMember: boolean = false): number {
  //                                      ^ default parameter!
  const subtotal = items.reduce((total, item) => {
    return total + item.menu.harga * item.jumlah;
  }, 0);

  // Member dapat diskon 10%
  if (isMember) {
    return subtotal * 0.9;
  }
  return subtotal;
}

// Function: Buat pesanan baru (return Order)
function buatPesanan(
  pelanggan: Customer,
  items: OrderItem[],
  pembayaran: PaymentMethod,
  catatan?: string // optional parameter!
): Order {
  const totalHarga = hitungTotal(items, pelanggan.member);

  return {
    id: `ORD-${Date.now()}`,
    pelanggan,
    items,
    status: "menunggu",
    pembayaran,
    catatan,
    totalHarga,
    waktuPesan: new Date().toLocaleString("id-ID"),
  };
}

// Function: Update status pesanan (union type di parameter)
function updateStatus(order: Order, statusBaru: OrderStatus): Order {
  return { ...order, status: statusBaru };
}

// Function: Tampilkan detail pesanan (void)
function tampilkanPesanan(order: Order): void {
  console.log(`\n======== DETAIL PESANAN ========`);
  console.log(`  ID        : ${order.id}`);
  console.log(`  Pelanggan : ${order.pelanggan.nama}`);
  console.log(`  Alamat    : ${order.pelanggan.alamat}`);
  console.log(`  Telepon   : ${order.pelanggan.telepon}`);
  console.log(`  Member    : ${order.pelanggan.member ? "Ya (diskon 10%)" : "Tidak"}`);
  console.log(`  Pembayaran: ${order.pembayaran}`);
  console.log(`  Status    : ${order.status.toUpperCase()}`);

  if (order.catatan) {
    console.log(`  Catatan   : ${order.catatan}`);
  }

  console.log(`  ----- Pesanan -----`);
  order.items.forEach((item) => {
    const subtotal = item.menu.harga * item.jumlah;
    console.log(
      `  ${item.jumlah}x ${item.menu.nama.padEnd(22)} Rp ${subtotal.toLocaleString("id-ID")}`
    );
  });

  console.log(`  ---------------------`);
  console.log(`  TOTAL     : Rp ${order.totalHarga.toLocaleString("id-ID")}`);
  console.log(`  Waktu     : ${order.waktuPesan}`);
  console.log(`================================\n`);
}

// Function: Cari menu berdasarkan ID (return union: MenuItem | undefined)
function cariMenu(id: number): MenuItem | undefined {
  return daftarMenu.find((item) => item.id === id);
}

// =====================
// STEP 4: Jalankan Simulasi!
// =====================

console.log("=".repeat(50));
console.log("   WARUNG TYPESCRIPT - Sistem Pemesanan Online");
console.log("=".repeat(50));

// 1. Tampilkan semua menu
tampilkanMenu(daftarMenu);

// 2. Filter: Tampilkan cuma yang tersedia
console.log("--- Menu yang TERSEDIA ---");
const menuTersedia = filterMenu(daftarMenu, (item) => item.tersedia);
tampilkanMenu(menuTersedia);

// 3. Filter: Tampilkan cuma minuman
console.log("--- Menu MINUMAN ---");
const menuMinuman = filterMenu(daftarMenu, (item) => item.kategori === "minuman");
tampilkanMenu(menuMinuman);

// 4. Buat pelanggan
const pelanggan: Customer = {
  nama: "Budi Santoso",
  alamat: "Jl. Merdeka No. 17, Jakarta",
  telepon: "08123456789",
  member: true,
};

// 5. Cari menu dan buat pesanan
const nasiGoreng = cariMenu(1);
const esTeh = cariMenu(3);
const jusAlpukat = cariMenu(4);

if (nasiGoreng && esTeh && jusAlpukat) {
  // 6. Buat pesanan
  const orderItems: OrderItem[] = [
    { menu: nasiGoreng, jumlah: 2 },
    { menu: esTeh, jumlah: 3 },
    { menu: jusAlpukat, jumlah: 1 },
  ];

  let pesanan = buatPesanan(
    pelanggan,
    orderItems,
    "ewallet",
    "Nasi gorengnya pedes level 3 ya!"
  );

  // 7. Tampilkan pesanan
  tampilkanPesanan(pesanan);

  // 8. Update status pesanan
  console.log(">>> Pesanan diproses...");
  pesanan = updateStatus(pesanan, "dimasak");
  console.log(`Status: ${pesanan.status}`);

  console.log(">>> Pesanan diantar...");
  pesanan = updateStatus(pesanan, "diantar");
  console.log(`Status: ${pesanan.status}`);

  console.log(">>> Pesanan selesai!");
  pesanan = updateStatus(pesanan, "selesai");
  console.log(`Status: ${pesanan.status}`);

  tampilkanPesanan(pesanan);
}

// =====================
// RECAP: Apa aja yang kita pakai di mini project ini?
// =====================
//
// 1. BASIC TYPES
//    string, number, boolean --> di semua property dan parameter
//
// 2. ARRAY TYPES
//    MenuItem[], OrderItem[] --> daftar menu, daftar pesanan
//
// 3. OBJECT TYPES
//    Nested object: Order.pelanggan.alamat --> object di dalam object
//
// 4. INTERFACE
//    MenuItem, Customer, OrderItem, Order --> "cetakan" untuk object
//
// 5. TYPE ALIAS
//    OrderStatus, PaymentMethod --> alias untuk literal union
//
// 6. FUNCTION TYPES
//    - Parameter types: (menu: MenuItem[]) --> tipe input jelas
//    - Return types: ): Order --> tipe output jelas
//    - Optional params: catatan?: string --> boleh ga diisi
//    - Default params: isMember = false --> ada nilai bawaan
//    - Void: tampilkanMenu(): void --> ga return apa-apa
//    - Callback: filter: (item: MenuItem) => boolean
//
// 7. UNION TYPE
//    MenuItem | undefined --> return cariMenu bisa ketemu atau engga
//    string | null --> data yang bisa kosong
//
// 8. LITERAL TYPE
//    "menunggu" | "dimasak" | "diantar" | "selesai" | "dibatalkan"
//    "cash" | "ewallet" | "transfer"
//    "makanan" | "minuman" | "snack"

console.log("\n=== SELAMAT! Kamu sudah menyelesaikan semua materi TypeScript Basic! ===");
console.log("=== Sekarang kamu paham KENAPA dan BAGAIMANA TypeScript bekerja.    ===\n");
