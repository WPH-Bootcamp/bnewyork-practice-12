export {};

// =============================================================
// 03 - ARRAY TYPES: string[], Array<number>, dan Tuple
// =============================================================
// Jalankan file ini: npx ts-node 03-array-types.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Array itu kayak GERBONG KERETA.
// Setiap gerbong isinya harus SAMA jenisnya.
//
// Gerbong penumpang  --> isinya orang semua (string[])
// Gerbong barang     --> isinya barang semua (number[])
// Campur-campur?     --> Harus pakai aturan khusus!

// =====================
// CARA 1: Pakai tanda []
// =====================
// Format: tipe[]
// Ini cara yang PALING UMUM dan paling sering dipakai.

const buah: string[] = ["apel", "mangga", "jeruk"];
const nilaiUjian: number[] = [85, 92, 78, 95];
const statusKehadiran: boolean[] = [true, true, false, true];

console.log("=== CARA 1: tipe[] ===");
console.log("Buah:", buah);
console.log("Nilai:", nilaiUjian);
console.log("Hadir:", statusKehadiran);

// TypeScript JAGA isi array kamu!
// Coba uncomment:
// buah.push(123);        // ERROR! Array string ga bisa diisi number
// nilaiUjian.push("A");  // ERROR! Array number ga bisa diisi string

// =====================
// CARA 2: Pakai Array<tipe> (Generic)
// =====================
// Format: Array<tipe>
// Hasilnya SAMA PERSIS dengan cara 1. Cuma beda penulisan.

const kota: Array<string> = ["Jakarta", "Bandung", "Surabaya"];
const suhu: Array<number> = [32, 28, 35, 30];

console.log("\n=== CARA 2: Array<tipe> ===");
console.log("Kota:", kota);
console.log("Suhu:", suhu);

// =====================
// JADI PAKAI YANG MANA?
// =====================
// string[] vs Array<string> --> SAMA AJA! Pilih salah satu yang konsisten.
//
// Rekomendasi: Pakai string[] karena lebih pendek dan lebih umum.
// Tapi tau Array<string> itu penting karena nanti di Generic (materi lanjut)
// polanya mirip: Promise<string>, Map<string, number>, dll.

// =====================
// CONTOH REAL WORLD: Data Siswa
// =====================

const namaSiswa: string[] = ["Andi", "Budi", "Citra", "Dewi"];
const nilaiSiswa: number[] = [85, 72, 95, 88];

console.log("\n=== CONTOH REAL WORLD ===");

// Looping array - sama kayak JavaScript biasa!
namaSiswa.forEach((nama, index) => {
  const nilai = nilaiSiswa[index]!; // tanda ! = kita YAKIN nilainya pasti ada (bukan undefined)
  const status = nilai >= 75 ? "LULUS" : "TIDAK LULUS";
  console.log(`${nama}: ${nilai} - ${status}`);
});

// =====================
// ARRAY KOSONG - Hati-hati!
// =====================

// Kalau bikin array kosong, HARUS kasih tipe. Kalau ga, TypeScript bingung.
const daftarBelanja: string[] = []; // OK, TypeScript tau ini array of string
daftarBelanja.push("Beras");
daftarBelanja.push("Telur");

// Tanpa tipe:
// const daftarMisterius = [];  // TypeScript anggap tipe "any[]" (ga bagus!)

console.log("\nDaftar belanja:", daftarBelanja);

// =====================
// ARRAY METHOD TETAP AMAN
// =====================

const angka: number[] = [1, 2, 3, 4, 5];

// .map() --> TypeScript tau hasilnya masih number[]
const kaliDua = angka.map((n) => n * 2);
console.log("\n=== ARRAY METHODS ===");
console.log("Angka x2:", kaliDua); // [2, 4, 6, 8, 10]

// .filter() --> TypeScript tau hasilnya masih number[]
const genap = angka.filter((n) => n % 2 === 0);
console.log("Genap:", genap); // [2, 4]

// .find() --> TypeScript tau hasilnya number | undefined (bisa ga ketemu!)
const lebihDari3 = angka.find((n) => n > 3);
console.log("Lebih dari 3:", lebihDari3); // 4

// =====================
// TUPLE - Array dengan POSISI dan TIPE yang FIX
// =====================
// Tuple itu kayak FORMULIR yang kolomnya udah pasti:
// Kolom 1: Nama (string), Kolom 2: Umur (number), Kolom 3: Aktif (boolean)

// Format: [tipe1, tipe2, tipe3]
const dataMahasiswa: [string, number, boolean] = ["Budi", 21, true];

console.log("\n=== TUPLE ===");
console.log(`Nama: ${dataMahasiswa[0]}`); // "Budi" (string)
console.log(`Umur: ${dataMahasiswa[1]}`); // 21 (number)
console.log(`Aktif: ${dataMahasiswa[2]}`); // true (boolean)

// Urutan HARUS sesuai! Coba uncomment:
// const salah: [string, number] = [25, "Budi"];
// ERROR: Type 'number' is not assignable to type 'string'

// Contoh tuple yang sering ditemui di real code:
// - [latitude, longitude]: [number, number]
// - [key, value]: [string, unknown]
// - React useState: const [count, setCount] = useState(0)

const koordinat: [number, number] = [-6.2088, 106.8456]; // Jakarta
console.log(`Koordinat Jakarta: ${koordinat[0]}, ${koordinat[1]}`);

console.log("\n=== Selesai! Lanjut ke 04-object-types.ts ===\n");
