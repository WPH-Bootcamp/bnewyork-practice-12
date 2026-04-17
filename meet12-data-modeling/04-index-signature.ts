export {};

// =============================================================
// 04 - INDEX SIGNATURE: Object dengan Key Dinamis
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/04-index-signature.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Property biasa    = laci berlabel tetap.
// Index signature   = lemari yang bisa bertambah laci, tapi isinya SEJENIS.
// Syntax: [namaKey: tipeKey]: tipeValue

console.log("==========================================");
console.log("   BAGIAN 4: INDEX SIGNATURE - BENAR vs SALAH");
console.log("==========================================\n");

// =====================
// CONTOH 1: DICTIONARY SKOR SISWA
// =====================

interface SkorSiswa {
  [nama: string]: number;
}

const skor: SkorSiswa = {
  budi: 90,
  ani: 85,
  citra: 95,
  dodi: 78,
};

console.log("--- [BENAR] isi dengan key apa saja, value number ---");
console.log("Semua skor:", skor);
console.log("skor.budi  =", skor.budi);
console.log("skor.ani   =", skor.ani);

console.log();

// // SALAH: value bukan number
// // skor.evan = "A";
// // ^ TS ERROR: "Type 'string' is not assignable to type 'number'."
// console.log("[SALAH] skor.evan = 'A'  --> TS ERROR: value harus number");
// console.log();

// // =====================
// // CONTOH 2: KAMUS TERJEMAHAN
// // =====================

// interface Kamus {
//   [kata: string]: string;
// }

// const kamusInggris: Kamus = {
//   hello: "halo",
//   thank_you: "terima kasih",
//   goodbye: "selamat tinggal",
// };

// function terjemahkan(kata: string): string {
//   return kamusInggris[kata] ?? "(tidak ada terjemahan)";
// }

// console.log("--- [BENAR] dictionary terjemahan ---");
// console.log("hello      -->", terjemahkan("hello"));
// console.log("thank_you  -->", terjemahkan("thank_you"));
// console.log("xyz        -->", terjemahkan("xyz"));
// console.log();

// // =====================
// // CONTOH 3: JEBAKAN - TYPO KEY TIDAK TERDETEKSI
// // =====================

// console.log("--- [JEBAKAN] index signature: typo LOLOS ---");
// const kursus: { [kode: string]: string } = {
//   TS101: "TypeScript Dasar",
//   JS101: "JavaScript Dasar",
// };
// const judul = kursus["TS999"]; // TS ga komplain!
// console.log("kursus['TS999'] =", judul); // undefined
// console.log("  --> TS ga warning karena SEMUA string dianggap valid key.");
// console.log("  --> BUG: akses data yang ga ada, hasilnya undefined.");
// console.log();

// // =====================
// // CONTOH 4: SOLUSI - Record<K, V> DENGAN KEY TERBATAS
// // =====================

// type Hari = "senin" | "selasa" | "rabu" | "kamis" | "jumat";

// const jadwal: Record<Hari, string> = {
//   senin: "Matematika",
//   selasa: "Bahasa Inggris",
//   rabu: "Fisika",
//   kamis: "Kimia",
//   jumat: "Biologi",
//   // Kalau ada yang kurang --> TS ERROR!
//   // Kalau ada key "sabtu" --> TS ERROR!
// };

// console.log("--- [BENAR] Record<Hari, string> memaksa lengkap & valid ---");
// console.log("Jadwal:", jadwal);
// console.log();

// // SALAH contoh 1: key yang tidak dikenal
// // const jadwalSalah: Record<Hari, string> = { ...jadwal, sabtu: "Olahraga" };
// // ^ TS ERROR: "Object literal may only specify known properties,
// //              and 'sabtu' does not exist in type 'Record<Hari, string>'."
// console.log("[SALAH] tambah 'sabtu' --> TS ERROR: 'sabtu' bukan bagian dari Hari");

// // SALAH contoh 2: key kurang
// // const jadwalKurang: Record<Hari, string> = { senin: "X", selasa: "Y", rabu: "Z" };
// // ^ TS ERROR: "Property 'kamis' is missing in type..."
// console.log("[SALAH] kurang 'kamis' --> TS ERROR: Property 'kamis' is missing");
// console.log();

// // =====================
// // CONTOH 5: PERBANDINGAN - index signature vs Record
// // =====================

// console.log("--- PERBANDINGAN ---");
// console.log();
// console.log("| Cara                            | Key bebas? | Typo ketahuan? |");
// console.log("|---------------------------------|------------|----------------|");
// console.log("| [k: string]: number             | YA         | TIDAK          |");
// console.log("| Record<string, number>          | YA         | TIDAK          |");
// console.log("| Record<'a' | 'b', number>       | TIDAK      | YA (TERBAIK)   |");
// console.log();

// // =====================
// // CONTOH 6: VALUE OBJECT KOMPLEKS (CACHE)
// // =====================

// interface CacheUser {
//   [userId: string]: { nama: string; email: string };
// }

// const cache: CacheUser = {
//   "USR-1": { nama: "Budi", email: "b@m.com" },
//   "USR-2": { nama: "Ani",  email: "a@m.com" },
// };

// console.log("--- [BENAR] cache pakai index signature ---");
// console.log("cache['USR-1']:", cache["USR-1"]);
// console.log("cache['USR-2']:", cache["USR-2"]);
// console.log("cache['USR-99']:", cache["USR-99"], "(ga ada)");
// console.log();

// // =====================
// // CONTOH 7: GABUNG property tetap + index signature
// // =====================

// interface KonfigApp {
//   version: string;
//   nama: string;
//   [fitur: string]: string;
// }

// const cfg: KonfigApp = {
//   version: "1.0.0",
//   nama: "MyApp",
//   darkMode: "enabled",
//   language: "id",
// };

// console.log("--- [BENAR] gabung property tetap + index ---");
// console.log(cfg);
// console.log();

// // SALAH: property tetap TIPE berbeda dengan index value
// // interface Konflik {
// //   version: number;         // number
// //   [k: string]: string;     // string
// // }
// // ^ TS ERROR: "Property 'version' of type 'number' is not assignable
// //              to 'string' index type 'string'."
// console.log("[SALAH] version: number + [k: string]: string --> TS ERROR");
// console.log("  Alasannya: semua property HARUS compatible dengan tipe index.");
// console.log();

// console.log("==========================================");
// console.log("  KESIMPULAN:");
// console.log("  - [k: string]: T     --> key bebas (risiko typo)");
// console.log("  - Record<string, T>  --> sama tapi syntax lebih ringkas");
// console.log("  - Record<Union, T>   --> key terbatas, TERAMAN");
// console.log("==========================================");
// console.log("\n=== Selesai! Lanjut ke 05-keyof-typeof-as-const.ts ===\n");
