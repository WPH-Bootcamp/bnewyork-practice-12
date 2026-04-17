export {};

// =============================================================
// 02 - READONLY: Properti yang TIDAK BOLEH DIUBAH
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/02-readonly.ts
// =============================================================

// =====================
// ANALOGI SEDERHANA
// =====================
// KTP: NIK ga bisa diubah (readonly), alamat boleh diubah (mutable).
// readonly = property cuma bisa DIBACA, GA BISA DIUBAH setelah dibuat.

console.log("==========================================");
console.log("   BAGIAN 2: READONLY - BENAR vs SALAH");
console.log("==========================================\n");

// =====================
// CONTOH 1: BASIC READONLY
// =====================

interface User {
  readonly id: number;
  readonly email: string;
  nama: string;
  umur: number;
}

const user1: User = {
  id: 1,
  email: "budi@mail.com",
  nama: "Budi",
  umur: 25,
};

console.log("--- [AWAL] data user ---");
console.log(user1);
console.log();

// --- BENAR: ubah field yang MUTABLE ---
console.log("--- [BENAR] mengubah field MUTABLE (nama, umur) ---");
user1.nama = "Budi Santoso";
user1.umur = 26;
console.log("Setelah diubah:", user1);
console.log();

// --- SALAH: mencoba mengubah field READONLY ---
console.log("--- [SALAH] mencoba mengubah field READONLY (id, email) ---");
// user1.id = 99;
// ^ Kalau di-uncomment, TypeScript ERROR:
//   "Cannot assign to 'id' because it is a read-only property."
//
// user1.email = "baru@mail.com";
// ^ ERROR juga: "Cannot assign to 'email' because it is a read-only property."

console.log("Kalau kita uncomment baris `user1.id = 99;`:");
console.log("  TS ERROR: Cannot assign to 'id' because it is a read-only property.");
console.log("Artinya: kita DICEGAH DI EDITOR, ga perlu nunggu bug di production.");
console.log();

// =====================
// CONTOH 2: READONLY ARRAY
// =====================

console.log("--- [CONTOH] readonly array ---");
const angkaTetap: readonly number[] = [1, 2, 3, 4, 5];
console.log("Array readonly:", angkaTetap);

// BENAR: boleh DIBACA
console.log("[BENAR] baca item:", angkaTetap[0]);
console.log("[BENAR] .length:", angkaTetap.length);
console.log("[BENAR] hasil reduce:", angkaTetap.reduce((a, b) => a + b, 0));

// SALAH: ga boleh diubah
// angkaTetap.push(6);
// ^ TS ERROR: "Property 'push' does not exist on type 'readonly number[]'."
// angkaTetap[0] = 100;
// ^ TS ERROR: "Index signature in type 'readonly number[]' only permits reading."
console.log("[SALAH] angkaTetap.push(6) --> TS ERROR: 'push' ga ada di readonly array");
console.log("[SALAH] angkaTetap[0] = 100 --> TS ERROR: only permits reading");
console.log();

// =====================
// CONTOH 3: Readonly<T> UTILITY
// =====================

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

console.log("--- [PERBANDINGAN] Produk biasa vs Readonly<Produk> ---");

const produkBiasa: Produk = { id: 1, nama: "Kopi", harga: 20000 };
produkBiasa.harga = 25000; // BENAR: boleh diubah
console.log("[Produk biasa] setelah harga diubah:", produkBiasa);

const produkReadonly: Readonly<Produk> = { id: 2, nama: "Teh", harga: 15000 };
// produkReadonly.harga = 18000;
// ^ TS ERROR: "Cannot assign to 'harga' because it is a read-only property."
console.log("[Readonly<Produk>] semua field jadi readonly:", produkReadonly);
console.log("  --> produkReadonly.harga = 18000 akan ERROR di TS");
console.log();

// =====================
// CONTOH 4: SHALLOW (Jebakan Readonly!)
// =====================

console.log("--- [PENTING] readonly itu DANGKAL (shallow) ---");

interface Order {
  readonly id: string;
  readonly pelanggan: {
    nama: string;
    alamat: string;
  };
}

const order1: Order = {
  id: "ORD-001",
  pelanggan: { nama: "Ani", alamat: "Jakarta" },
};

console.log("Data awal:", order1);

// BENAR: mengubah property NESTED (readonly cuma lindungi layer 1)
order1.pelanggan.nama = "Anita";
console.log("[LOLOS!] order1.pelanggan.nama diubah jadi 'Anita':", order1);
console.log();

console.log("PELAJARAN: readonly cuma lindungi LAYER 1.");
console.log("  order1.id          --> readonly (aman)");
console.log("  order1.pelanggan   --> readonly (ga bisa diganti SELURUH object)");
console.log("  order1.pelanggan.nama --> MASIH BISA DIUBAH!");
console.log();

// =====================
// CONTOH 5: BUKTI NYATA - KENAPA READONLY PENTING
// =====================

console.log("--- [DEMO] tanpa readonly, function bisa 'mengacak' data kita ---");

interface Config {
  apiUrl: string;
  timeout: number;
}

function prosesJelek(config: Config) {
  config.apiUrl = "https://hacked.com"; // diam-diam mengubah!
  return "done";
}

const myConfig: Config = { apiUrl: "https://api.ku.com", timeout: 5000 };
console.log("Sebelum dipanggil  :", myConfig);
prosesJelek(myConfig);
console.log("SESUDAH dipanggil  :", myConfig);
console.log("  --> apiUrl diubah diam-diam. BUG SUSAH DILACAK.");
console.log();

console.log("--- [SOLUSI] pakai Readonly<Config> di parameter ---");
function prosesBagus(config: Readonly<Config>) {
  // config.apiUrl = "https://hacked.com";
  // ^ TS ERROR: "Cannot assign to 'apiUrl' because it is a read-only property."
  return config.apiUrl;
}
console.log("prosesBagus(myConfig) hasil:", prosesBagus(myConfig));
console.log("Function TIDAK BISA mengubah config. Aman!");
console.log();

console.log("==========================================");
console.log("  KESIMPULAN:");
console.log("  - readonly     = field cuma bisa dibaca");
console.log("  - Readonly<T>  = semua field T jadi readonly");
console.log("  - readonly[]   = array cuma bisa dibaca");
console.log("  - SHALLOW: nested object tetap bisa diubah");
console.log("==========================================");
console.log("\n=== Selesai! Lanjut ke 03-type-vs-interface.ts ===\n");
