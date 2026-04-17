export {}; // Biar TypeScript anggap file ini "modul" sendiri (ga bentrok nama variabel antar file)

// =============================================================
// 01 - KENAPA TYPESCRIPT? (TS vs JS)
// =============================================================
// Jalankan file ini: npx ts-node 01-kenapa-typescript.ts
// =============================================================

// =====================
// ANALOGI SEDERHANA
// =====================
// JavaScript  = Nulis surat TANPA amplop. Isinya bebas, ga ada aturan.
// TypeScript  = Nulis surat PAKAI amplop yang ada FORMAT-nya.
//               Nama harus string, umur harus angka, dst.
//
// JavaScript itu FLEKSIBEL tapi BERBAHAYA.
// TypeScript itu LEBIH KETAT tapi LEBIH AMAN.

// =====================
// CONTOH MASALAH DI JAVASCRIPT (bayangkan ini file .js biasa)
// =====================

// Di JavaScript, kode ini SAH-SAH aja, ga ada error:
//
//   let harga = 10000;
//   harga = "sepuluh ribu";  // ??? tiba-tiba jadi string?!
//
//   function hitungTotal(harga, jumlah) {
//     return harga * jumlah;
//   }
//
//   hitungTotal("sepuluh ribu", 3);  // NaN! Bug yang DIAM-DIAM rusak!
//
// JavaScript DIAM AJA. Ga ada peringatan. Ga ada error.
// Bug-nya baru ketahuan PAS USER PAKE APLIKASINYA. Ngeri kan?

// =====================
// SEKARANG LIHAT TYPESCRIPT BERAKSI
// =====================

// TypeScript langsung teriak kalau ada yang salah!
let harga: number = 10000;

// Coba uncomment baris di bawah ini, pasti LANGSUNG ERROR:
// harga = "sepuluh ribu";  // ERROR: Type 'string' is not assignable to type 'number'

// Function di TypeScript punya "kontrak" yang jelas
function hitungTotal(harga: number, jumlah: number): number {
  return harga * jumlah;
}

// Yang benar:
console.log(hitungTotal(10000, 3)); // 30000 - AMAN!

// Coba uncomment, pasti ERROR:
// console.log(hitungTotal("sepuluh ribu", 3));
// ERROR: Argument of type 'string' is not assignable to parameter of type 'number'

// =====================
// KENAPA INI PENTING?
// =====================
//
// Bayangkan kamu kerja di tim 10 orang, bikin aplikasi e-commerce:
//
// 1. TANPA TypeScript (JavaScript):
//    - Developer A bikin function hitungTotal(harga, qty)
//    - Developer B panggil hitungTotal("100", "2") --> "1002" bukan 200!
//    - Bug-nya baru ketahuan 3 bulan kemudian pas user komplain
//    - Debugging nya SUSAH karena ga tau error-nya dari mana
//
// 2. DENGAN TypeScript:
//    - Developer A bikin function hitungTotal(harga: number, qty: number): number
//    - Developer B panggil hitungTotal("100", "2") --> LANGSUNG ERROR!
//    - Bug ketahuan SEBELUM code di-deploy
//    - Hemat waktu, hemat tenaga, hemat air mata
//
// Intinya: TypeScript = PENERJEMAH + SATPAM untuk code kamu.
//          Dia nerjemahin ke JS, sambil ngecek ga ada yang salah.

// =====================
// TYPESCRIPT TETAP JADI JAVASCRIPT
// =====================
// TypeScript BUKAN bahasa baru yang terpisah.
// TypeScript = JavaScript + Type System.
// Semua code JS yang valid, VALID juga di TS.
// Pas di-compile, TypeScript jadi JavaScript BIASA.

// Buktinya:
const namaOrang = "Budi";
const umurOrang = 25;
console.log(`${namaOrang} umurnya ${umurOrang} tahun`); // Ini JS biasa, valid di TS!

// =====================
// KESIMPULAN
// =====================
// JavaScript: "Terserah kamu mau ngapain, aku ga peduli" (sampai error di production)
// TypeScript: "Bentar, itu salah. Beneran mau gitu? Fix dulu baru jalan." (error di IDE)
//
// TypeScript itu kayak HELM buat programmer.
// Ribet? Sedikit. Tapi selamat? SANGAT.

console.log("\n=== Selamat! Kamu sudah paham kenapa TypeScript penting! ===\n");
