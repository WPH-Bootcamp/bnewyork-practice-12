export {};

// =============================================================
// 06 - FUNCTION TYPES: Parameter, Return, Optional, Void
// =============================================================
// Jalankan file ini: npx ts-node 06-function-types.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Function itu kayak MESIN di pabrik:
// - MASUKAN (parameter): bahan baku yang dimasukin ke mesin
// - PROSES: apa yang mesin lakuin
// - KELUARAN (return): produk jadi yang keluar dari mesin
//
// Di TypeScript, kita harus JELAS:
// - Bahan bakunya APA (parameter type)
// - Produk jadinya APA (return type)
// - Bahan baku mana yang WAJIB, mana yang OPSIONAL

// =====================
// 1. PARAMETER TYPE & RETURN TYPE
// =====================
// Format: function nama(param: tipe): tipeReturn { ... }

//                   masukan         keluaran
//                   vvvvvvvvvvvv    vvvvvv
function luasPersegiPanjang(panjang: number, lebar: number): number {
  return panjang * lebar;
}

console.log("=== PARAMETER & RETURN TYPE ===");
console.log(`Luas 5x3 = ${luasPersegiPanjang(5, 3)}`); // 15

// TypeScript jaga kamu dari kesalahan:
// luasPersegiPanjang("5", "3");   // ERROR! parameter harus number
// luasPersegiPanjang(5);           // ERROR! kurang 1 parameter

// =====================
// 2. VOID - Function yang TIDAK return apa-apa
// =====================
// Kadang function cuma MELAKUKAN sesuatu, tanpa mengembalikan nilai.
// Kayak mesin printer: dia NGEPRINT, tapi ga ngeluarin "hasil" ke kamu.

function tampilkanSalam(nama: string): void {
  console.log(`\nHalo, ${nama}! Selamat datang.`);
  // Ga ada return --> void
}

tampilkanSalam("Budi");

// Kalau kamu coba ambil hasilnya:
// const hasil = tampilkanSalam("Budi"); // hasil tipenya void, ga bisa dipakai

// =====================
// 3. OPTIONAL PARAMETER (?)
// =====================
// Parameter yang BOLEH ga diisi.
// Kalau ga diisi, nilainya undefined.
// ATURAN: optional parameter HARUS di BELAKANG!

function buatProfil(nama: string, umur: number, hobi?: string): string {
  //                                             ^ optional!
  if (hobi) {
    return `${nama} (${umur} tahun) - Hobi: ${hobi}`;
  }
  return `${nama} (${umur} tahun)`;
}

console.log("\n=== OPTIONAL PARAMETER ===");
console.log(buatProfil("Budi", 21, "Coding"));  // dengan hobi
console.log(buatProfil("Andi", 22));              // tanpa hobi --> OK!

// =====================
// 4. DEFAULT PARAMETER
// =====================
// Kayak optional, tapi PUNYA NILAI BAWAAN kalau ga diisi.

function hitungPajak(harga: number, persenPajak: number = 11): number {
  //                                              ^ default 11%
  return harga * (persenPajak / 100);
}

console.log("\n=== DEFAULT PARAMETER ===");
console.log(`Pajak 100rb (default 11%): Rp ${hitungPajak(100000)}`);        // 11000
console.log(`Pajak 100rb (custom 15%): Rp ${hitungPajak(100000, 15)}`);     // 15000

// =====================
// 5. ARROW FUNCTION dengan Type
// =====================
// Sama aja kayak function biasa, cuma penulisannya beda.

const kuadrat = (n: number): number => n * n;
const sapaPagi = (nama: string): string => `Selamat pagi, ${nama}!`;

console.log("\n=== ARROW FUNCTION ===");
console.log(`Kuadrat 5: ${kuadrat(5)}`);       // 25
console.log(sapaPagi("Citra"));                 // "Selamat pagi, Citra!"

// =====================
// 6. FUNCTION TYPE - Menyimpan function dalam variabel
// =====================
// Kamu bisa mendefinisikan "bentuk" function sebagai type.
// Ini berguna banget untuk callback!

// Format: (param: tipe) => tipeReturn
type OperasiMatematika = (a: number, b: number) => number;

const tambah: OperasiMatematika = (a, b) => a + b;
const kurang: OperasiMatematika = (a, b) => a - b;
const kali: OperasiMatematika = (a, b) => a * b;

console.log("\n=== FUNCTION TYPE ===");
console.log(`10 + 3 = ${tambah(10, 3)}`);
console.log(`10 - 3 = ${kurang(10, 3)}`);
console.log(`10 * 3 = ${kali(10, 3)}`);

// =====================
// 7. CALLBACK dengan Function Type
// =====================
// Real world: function yang nerima function lain sebagai parameter.
// Kayak "Mas, tolong jalanin tugas ini ya" (tugasnya = callback)

function prosesData(
  data: number[],
  callback: (item: number) => number  // <-- function sebagai parameter!
): number[] {
  return data.map(callback);
}

const angka = [1, 2, 3, 4, 5];

console.log("\n=== CALLBACK ===");
console.log("x2:", prosesData(angka, (n) => n * 2));     // [2, 4, 6, 8, 10]
console.log("x10:", prosesData(angka, (n) => n * 10));    // [10, 20, 30, 40, 50]
console.log("+100:", prosesData(angka, (n) => n + 100));  // [101, 102, 103, 104, 105]

// =====================
// 8. REAL WORLD EXAMPLE: Function di Aplikasi
// =====================

interface User {
  id: number;
  nama: string;
  email: string;
  aktif: boolean;
}

// Function yang return object
function buatUser(nama: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    nama,
    email,
    aktif: true,
  };
}

// Function dengan callback untuk filter
function cariUser(
  users: User[],
  filter: (user: User) => boolean
): User[] {
  return users.filter(filter);
}

const semuaUser: User[] = [
  buatUser("Budi", "budi@email.com"),
  buatUser("Andi", "andi@email.com"),
  { id: 3, nama: "Citra", email: "citra@email.com", aktif: false },
];

const userAktif = cariUser(semuaUser, (u) => u.aktif);

console.log("\n=== REAL WORLD EXAMPLE ===");
console.log("Semua user:", semuaUser);
console.log("User aktif:", userAktif);

// =====================
// RINGKASAN
// =====================
//
// function nama(param: tipe): returnTipe     --> basic function
// function nama(param?: tipe): returnTipe    --> optional parameter
// function nama(param: tipe = default): tipe --> default parameter
// function nama(): void                      --> ga return apa-apa
//
// type FnType = (param: tipe) => returnTipe  --> function type
// (param: tipe): returnTipe => { ... }       --> arrow function

console.log("\n=== Selesai! Lanjut ke 07-union-dan-literal-types.ts ===\n");
