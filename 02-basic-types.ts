export {};

// =============================================================
// 02 - BASIC TYPES: string, number, boolean, null, undefined
// =============================================================
// Jalankan file ini: npx ts-node 02-basic-types.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Tipe data itu kayak LABEL di toples dapur:
// - Toples bertulisan "GULA"  --> isinya harus gula, bukan garam
// - Toples bertulisan "BERAS" --> isinya harus beras, bukan pasir
//
// Di TypeScript, setiap variabel punya "label" yang nentuin
// data apa yang BOLEH disimpan di dalamnya.

// =====================
// 1. STRING - untuk teks/tulisan
// =====================
// Apapun yang berupa tulisan = string
// Cara nulis: pakai petik satu '', petik dua "", atau backtick ``

let namaDepan: string = "Budi";
let namaBelakang: string = "Santoso";
let namaLengkap: string = `${namaDepan} ${namaBelakang}`; // template literal

console.log("=== STRING ===");
console.log(namaLengkap); // "Budi Santoso"

// =====================
// 2. NUMBER - untuk angka (bulat maupun desimal)
// =====================
// Di TypeScript, SEMUA angka itu tipe "number".
// Ga ada bedanya integer sama float/decimal. Semua number.

let umur: number = 25;
let tinggi: number = 175.5;
let saldo: number = -50000;
let hex: number = 0xff; // hexadecimal juga bisa

console.log("\n=== NUMBER ===");
console.log(`Umur: ${umur}, Tinggi: ${tinggi}, Saldo: ${saldo}`);

// =====================
// 3. BOOLEAN - untuk ya/tidak, true/false
// =====================
// Cuma ada 2 kemungkinan: true atau false.
// Kayak saklar lampu: ON atau OFF. Ga ada "setengah ON".

let sudahMenikah: boolean = false;
let sudahVerifikasi: boolean = true;
let bisaAkses: boolean = umur >= 17; // hasilnya true karena 25 >= 17

console.log("\n=== BOOLEAN ===");
console.log(`Sudah menikah: ${sudahMenikah}`); // false
console.log(`Sudah verifikasi: ${sudahVerifikasi}`); // true
console.log(`Bisa akses (umur >= 17): ${bisaAkses}`); // true

// =====================
// 4. NULL - "sengaja kosong"
// =====================
// null artinya: "Saya TAU nilainya kosong, dan itu DISENGAJA"
// Analogi: Kotak kosong yang SENGAJA dikosongkan.

// Contoh real: User belum pilih foto profil
let fotoProfil: string | null = null; // belum ada foto
console.log("\n=== NULL ===");
console.log(`Foto profil: ${fotoProfil}`); // null

// Nanti setelah user upload foto:
fotoProfil = "foto-budi.jpg";
console.log(`Foto profil (setelah upload): ${fotoProfil}`);

// =====================
// 5. UNDEFINED - "belum diisi"
// =====================
// undefined artinya: "Variabelnya ada, tapi BELUM DIISI nilai"
// Analogi: Formulir yang belum diisi. Kolomnya ada, tapi kosong.

// Bedanya sama null:
// - null      = "Saya sengaja kosongkan" (intentional)
// - undefined = "Belum diisi / belum ada nilainya" (unintentional)

let nomorTelepon: string | undefined; // belum diisi, otomatis undefined
console.log("\n=== UNDEFINED ===");
console.log(`Nomor telepon: ${nomorTelepon}`); // undefined

nomorTelepon = "08123456789";
console.log(`Nomor telepon (setelah diisi): ${nomorTelepon}`);

// =====================
// PERBEDAAN NULL vs UNDEFINED - PENTING!
// =====================
// Biar makin jelas, ini analogi restoran:
//
// null      = Pelayan nanya "Mau minum apa?"
//             Kamu jawab: "Ga usah, ga mau minum." (SENGAJA KOSONG)
//
// undefined = Pelayan BELUM nanya kamu mau minum apa.
//             Jadi pesanan minumnya belum ada. (BELUM DIISI)

console.log("\n=== NULL vs UNDEFINED ===");
console.log(null == undefined); // true  (nilainya "mirip")
console.log(null === undefined); // false (tapi TIPE-nya beda!)

// =====================
// TYPE INFERENCE - TypeScript itu pinter!
// =====================
// Kamu ga HARUS selalu nulis tipenya.
// TypeScript bisa NEBAK dari nilai yang kamu kasih.

let kota = "Jakarta"; // TypeScript tau ini string
let populasi = 10000000; // TypeScript tau ini number
let ibukota = true; // TypeScript tau ini boolean

// Coba uncomment, tetap ERROR meskipun ga tulis tipenya:
// kota = 123;  // ERROR! TypeScript udah tau 'kota' itu string

console.log("\n=== TYPE INFERENCE ===");
console.log(`Kota: ${kota} (TypeScript tau ini string tanpa kita tulis)`);

// =====================
// KAPAN HARUS TULIS TIPE, KAPAN GAK PERLU?
// =====================
//
// TULIS tipenya kalau:
// - Deklarasi variabel TANPA nilai awal
//   let nama: string;
//
// - Parameter function (WAJIB di strict mode)
//   function sapa(nama: string) { ... }
//
// - Nilainya bisa lebih dari satu tipe
//   let data: string | null = null;
//
// GAK PERLU tulis kalau:
// - Langsung dikasih nilai (TypeScript bisa nebak sendiri)
//   let nama = "Budi";  // udah jelas string

console.log("\n=== Selesai! Lanjut ke 03-array-types.ts ===\n");
