export {};

// =============================================================
// 04 - OBJECT TYPES: Mendefinisikan "Shape" Object
// =============================================================
// Jalankan file ini: npx ts-node 04-object-types.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Object type itu kayak FORMULIR PENDAFTARAN.
// Formulir punya kolom-kolom yang sudah ditentukan:
// - Nama: _________ (harus diisi, tulisan)
// - Umur: _________ (harus diisi, angka)
// - Email: _________ (boleh kosong)
//
// Kalau kamu isi "umur" dengan tulisan "dua puluh", DITOLAK!
// Kalau kamu ga isi "nama", DITOLAK!
// Itulah object type.

// =====================
// OBJECT TANPA TYPE (BAD PRACTICE)
// =====================

// Di JavaScript biasa:
// const user = { nama: "Budi", umur: "dua puluh lima" };
// Ga ada yang larang umur itu string. Bahaya!

// =====================
// OBJECT DENGAN INLINE TYPE
// =====================
// Kita bisa langsung tulis "shape"-nya di samping variabel.

const mahasiswa: {
  nama: string;
  umur: number;
  jurusan: string;
} = {
  nama: "Budi",
  umur: 21,
  jurusan: "Teknik Informatika",
};

console.log("=== INLINE OBJECT TYPE ===");
console.log(mahasiswa);

// TypeScript bakal cek:
// - Semua property HARUS ada
// - Tipe setiap property HARUS sesuai

// Coba uncomment:
// const mahasiswaSalah: { nama: string; umur: number } = {
//   nama: "Andi",
//   // ERROR: Property 'umur' is missing!
// };

// =====================
// OPTIONAL PROPERTY (?)
// =====================
// Kadang ada property yang BOLEH ga diisi.
// Tambahkan tanda ? setelah nama property.

const produk: {
  nama: string;
  harga: number;
  diskon?: number; // boleh ada, boleh engga
  catatan?: string; // boleh ada, boleh engga
} = {
  nama: "Laptop",
  harga: 15000000,
  // diskon dan catatan ga diisi --> VALID! karena optional
};

console.log("\n=== OPTIONAL PROPERTY ===");
console.log(produk);
console.log(`Diskon: ${produk.diskon ?? "Tidak ada diskon"}`);

// =====================
// READONLY PROPERTY
// =====================
// Property yang TIDAK BOLEH diubah setelah dibuat.

const konfigurasi: {
  readonly apiKey: string;
  readonly versi: number;
  debug: boolean;
} = {
  apiKey: "abc-123-xyz",
  versi: 1,
  debug: false,
};

console.log("\n=== READONLY PROPERTY ===");
konfigurasi.debug = true; // OK, bisa diubah

// Coba uncomment:
// konfigurasi.apiKey = "hacked!";
// ERROR: Cannot assign to 'apiKey' because it is a read-only property

console.log(konfigurasi);

// =====================
// NESTED OBJECT (Object di dalam Object)
// =====================
// Real world: data hampir selalu nested!

const pesanan: {
  id: string;
  pelanggan: {
    nama: string;
    alamat: {
      jalan: string;
      kota: string;
      kodePos: string;
    };
  };
  items: string[];
  total: number;
} = {
  id: "ORD-001",
  pelanggan: {
    nama: "Citra",
    alamat: {
      jalan: "Jl. Sudirman No. 10",
      kota: "Jakarta",
      kodePos: "12190",
    },
  },
  items: ["Laptop", "Mouse", "Keyboard"],
  total: 17500000,
};

console.log("\n=== NESTED OBJECT ===");
console.log(`Pesanan ${pesanan.id} untuk ${pesanan.pelanggan.nama}`);
console.log(
  `Kirim ke: ${pesanan.pelanggan.alamat.jalan}, ${pesanan.pelanggan.alamat.kota}`,
);
console.log(`Items: ${pesanan.items.join(", ")}`);
console.log(`Total: Rp ${pesanan.total.toLocaleString("id-ID")}`);

// =====================
// MASALAH: Inline type itu RIBET kalau dipake berkali-kali!
// =====================
// Bayangkan kamu harus nulis ulang shape object "mahasiswa"
// di 10 function berbeda. CAPE!
//
// Solusinya? TYPE ALIAS dan INTERFACE!
// --> Lanjut ke file 05-type-vs-interface.ts
//
// Sneak peek:
//
//   type Mahasiswa = {
//     nama: string;
//     umur: number;
//     jurusan: string;
//   };
//
//   const budi: Mahasiswa = { nama: "Budi", umur: 21, jurusan: "TI" };
//   const andi: Mahasiswa = { nama: "Andi", umur: 22, jurusan: "SI" };
//
// Jauh lebih rapi kan? Definisi shape-nya SEKALI, pakai BERKALI-KALI!

console.log("\n=== Selesai! Lanjut ke 05-type-vs-interface.ts ===\n");
