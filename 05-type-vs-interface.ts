export {};

// =============================================================
// 05 - TYPE vs INTERFACE: Dua Cara Bikin "Cetakan" Object
// =============================================================
// Jalankan file ini: npx ts-node 05-type-vs-interface.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Bayangkan kamu punya CETAKAN KUE:
// - Sekali bikin cetakan, bisa bikin banyak kue dengan bentuk SAMA
// - Ga perlu bikin bentuk manual satu-satu
//
// TYPE dan INTERFACE = cetakan untuk object.
// Definisi sekali, pakai berkali-kali!

// =====================
// TYPE ALIAS
// =====================
// Pakai keyword: type
// Bisa dipakai untuk APAPUN: object, union, tuple, primitive, dll.

type Mahasiswa = {
  nama: string;
  umur: number;
  jurusan: string;
  ipk?: number; // optional
};

const budi: Mahasiswa = {
  nama: "Budi",
  umur: 21,
  jurusan: "Teknik Informatika",
  ipk: 3.75,
};

const andi: Mahasiswa = {
  nama: "Andi",
  umur: 22,
  jurusan: "Sistem Informasi",
  // ipk ga diisi --> OK karena optional
};

console.log("=== TYPE ALIAS ===");
console.log(budi);
console.log(andi);

// =====================
// INTERFACE
// =====================
// Pakai keyword: interface
// Khusus untuk mendefinisikan "shape" OBJECT.

interface Dosen {
  nama: string;
  nip: string;
  mataKuliah: string[];
  tahunMasuk: number;
}

const pakJoko: Dosen = {
  nama: "Dr. Joko Widodo",
  nip: "198001012005011001",
  mataKuliah: ["Algoritma", "Struktur Data"],
  tahunMasuk: 2005,
};

console.log("\n=== INTERFACE ===");
console.log(pakJoko);

// =====================
// LALU APA BEDANYA? TYPE vs INTERFACE
// =====================
//
// +------------------+----------------------------------+----------------------------------+
// |                  |          TYPE                    |        INTERFACE                 |
// +------------------+----------------------------------+----------------------------------+
// | Syntax           | type Nama = { ... }              | interface Nama { ... }           |
// | Untuk object?    | Bisa                             | Bisa                             |
// | Union?           | BISA (type A = "x" | "y")        | TIDAK BISA                       |
// | Tuple?           | BISA (type Coord = [num, num])   | TIDAK BISA                       |
// | Primitive?       | BISA (type ID = string)          | TIDAK BISA                       |
// | Extend/Inherit?  | Pakai & (intersection)           | Pakai extends                    |
// | Declaration      | TIDAK BISA di-merge              | BISA di-merge (declaration       |
// | Merging          |                                  | merging)                         |
// +------------------+----------------------------------+----------------------------------+

// =====================
// PERBEDAAN 1: Type bisa untuk NON-OBJECT
// =====================

// Type bisa untuk primitive
type ID = string;
type Skor = number;

// Type bisa untuk union (INTERFACE TIDAK BISA!)
type Status = "aktif" | "nonaktif" | "cuti";

// Type bisa untuk tuple (INTERFACE TIDAK BISA!)
type Koordinat = [number, number];

const userId: ID = "USR-001";
const statusMhs: Status = "aktif";
const lokasi: Koordinat = [-6.2, 106.8];

console.log("\n=== TYPE: Non-Object ===");
console.log(`User: ${userId}, Status: ${statusMhs}, Lokasi: ${lokasi}`);

// =====================
// PERBEDAAN 2: Cara Extend / Inheritance
// =====================

// --- TYPE: pakai & (intersection) ---
type Hewan = {
  nama: string;
  kaki: number;
};

type HewanPeliharaan = Hewan & {
  pemilik: string;
  sudahVaksin: boolean;
};

const kucing: HewanPeliharaan = {
  nama: "Mimi",
  kaki: 4,
  pemilik: "Budi",
  sudahVaksin: true,
};

// --- INTERFACE: pakai extends ---
interface Kendaraan {
  merk: string;
  tahun: number;
}

interface Mobil extends Kendaraan {
  pintu: number;
  transmisi: "manual" | "matic";
}

const avanza: Mobil = {
  merk: "Toyota Avanza",
  tahun: 2023,
  pintu: 4,
  transmisi: "matic",
};

console.log("\n=== EXTEND / INHERITANCE ===");
console.log("Type + &:", kucing);
console.log("Interface + extends:", avanza);

// =====================
// PERBEDAAN 3: Declaration Merging (Khusus Interface)
// =====================
// Interface dengan nama SAMA otomatis DIGABUNG.
// Ini berguna untuk nambahin property ke library/framework.

interface Pengguna {
  nama: string;
}

interface Pengguna {
  email: string;
}

// Sekarang Pengguna punya DUALNYA: nama DAN email
const user: Pengguna = {
  nama: "Citra",
  email: "citra@email.com",
};

console.log("\n=== DECLARATION MERGING (Interface Only) ===");
console.log(user);

// Type TIDAK BISA di-merge! Coba uncomment:
// type Barang = { nama: string };
// type Barang = { harga: number };  // ERROR: Duplicate identifier 'Barang'

// =====================
// JADI PAKAI YANG MANA?
// =====================
//
// REKOMENDASI SIMPEL:
//
// 1. Untuk OBJECT SHAPE --> pakai INTERFACE
//    Kenapa? Lebih mudah di-extend, lebih "standard" di komunitas
//
//    interface User {
//      nama: string;
//      email: string;
//    }
//
// 2. Untuk yang BUKAN object (union, tuple, primitive) --> pakai TYPE
//    Kenapa? Interface TIDAK BISA untuk ini
//
//    type Status = "aktif" | "nonaktif";
//    type Koordinat = [number, number];
//
// 3. Kalau BINGUNG --> pakai interface dulu, ganti ke type kalau perlu
//
// Intinya: JANGAN overthink. Keduanya hampir sama untuk object.
// Yang penting KONSISTEN dalam satu project.

console.log("\n=== Selesai! Lanjut ke 06-function-types.ts ===\n");
