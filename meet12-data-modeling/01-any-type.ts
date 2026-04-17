export {};

// =============================================================
// 01 - ANY TYPE & KAPAN HARUS DIHINDARI
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/01-any-type.ts
// =============================================================

// =====================
// ANALOGI SEDERHANA
// =====================
// TypeScript normal = restoran mewah dengan DRESS CODE (wajib rapi).
// `any`             = "bebas aja, sandal jepit juga boleh".
// Enak? Iya. Aman? ENGGA. `any` = mematikan TypeScript.

console.log("==========================================");
console.log("   BAGIAN 1: ANY TYPE - BENAR vs SALAH");
console.log("==========================================\n");

// =====================
// CONTOH 1: `any` mematikan type checking
// =====================

let sesuatu: any = "halo";
sesuatu = 123;
sesuatu = true;
sesuatu = [1, 2, 3];

console.log("--- [BENAR] any boleh diisi apa saja ---");
console.log("Value sekarang:", sesuatu);
console.log("Tipenya waktu runtime:", typeof sesuatu);
console.log();

// =====================
// CONTOH 2: `any` membuat BUG LOLOS ke runtime
// =====================

console.log("--- [SALAH] any menipu kita: TS diam, runtime meledak ---");

const angka: any = 10;
// Baris di bawah TIDAK error di TypeScript (karena `any`),
// tapi MELEDAK pas dijalankan.
try {
  // @ts-ignore - sengaja kita biarkan supaya mentee lihat runtime error-nya
  console.log("Coba panggil .toUpperCase() pada number:");
  console.log((angka as any).toUpperCase());
} catch (err) {
  console.log("HASIL RUNTIME ERROR:");
  console.log("  >>>", (err as Error).message);
  console.log(
    "  Artinya: TS ga nangkep bug karena `any` mematikan pengecekan.",
  );
}
console.log();

// =====================
// CONTOH 3: PAKAI TYPE YANG BENAR --> BUG KETAHUAN DI EDITOR
// =====================

console.log(
  "--- [BENAR] pakai tipe jelas, bug ketahuan SEBELUM dijalankan ---",
);

const angkaBenar: number = 10;
// angkaBenar.toUpperCase();
// ^ Kalau di-uncomment, TypeScript LANGSUNG error di editor:
//   "Property 'toUpperCase' does not exist on type 'number'."
// Artinya: bug ga pernah sampai ke production.

console.log("angkaBenar =", angkaBenar, "- tipenya number, aman.");
console.log(
  "Method number yang valid, contoh .toFixed(2):",
  angkaBenar.toFixed(2),
);
console.log();

// =====================
// CONTOH 4: `unknown` = versi `any` yang AMAN
// =====================

console.log("--- [BENAR] pakai `unknown` + narrowing ---");

let dataMentah: unknown = "halo dunia";

// Langsung pakai dataMentah.toUpperCase() --> ERROR di TS:
//   "'dataMentah' is of type 'unknown'."
// Harus DI-CEK dulu tipenya:

if (typeof dataMentah === "string") {
  console.log("Setelah dicek string:", dataMentah.toUpperCase());
}

dataMentah = 42;
if (typeof dataMentah === "number") {
  console.log("Setelah dicek number:", (dataMentah as number).toFixed(2));
}
console.log();

// =====================
// CONTOH 5: PERBANDINGAN SIDE-BY-SIDE
// =====================

console.log("--- RINGKASAN: any vs unknown vs typed ---");
console.log();
console.log("| Tipe     | TS cek?          | Bug ketahuan?            |");
console.log("|----------|------------------|--------------------------|");
console.log("| any      | TIDAK            | Baru di production       |");
console.log("| unknown  | YA (harus narrow)| Di editor                |");
console.log("| number   | YA               | Di editor                |");
console.log();

// =====================
// CONTOH 6: KASUS NYATA API
// =====================

console.log("--- CONTOH KASUS API ---");

// JELEK: pakai any
function parseJelek(json: string): any {
  return JSON.parse(json);
}

const dataJelek = parseJelek('{"nama": "Budi"}');
console.log("[JELEK] dataJelek.umurrr (typo):", dataJelek.umurrr);
//                                        ^ TS diam, undefined. Typo ga ketahuan!

// BAGUS: pakai interface
interface UserDariApi {
  nama: string;
  umur?: number;
}
function parseBagus(json: string): UserDariApi {
  return JSON.parse(json);
}

const dataBagus = parseBagus('{"nama": "Budi"}');
console.log("[BAGUS] dataBagus.nama:", dataBagus.nama);
// dataBagus.umurrr;
// ^ Kalau di-uncomment: TS ERROR "Property 'umurrr' does not exist on type 'UserDariApi'."
// Typo langsung ketahuan di editor, BELUM SEMPAT di-deploy.

console.log();
console.log("==========================================");
console.log("  KESIMPULAN:");
console.log("  - `any`    = matikan TS, bug lolos   (HINDARI)");
console.log("  - `unknown`= aman tapi harus dicek   (BOLEH)");
console.log("  - tipe jelas (interface/type)        (TERBAIK)");
console.log("==========================================");
console.log("\n=== Selesai! Lanjut ke 02-readonly.ts ===\n");
