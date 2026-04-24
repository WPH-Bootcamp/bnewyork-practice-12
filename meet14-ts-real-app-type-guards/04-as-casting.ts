export {};

// =============================================================
// 04 - `as` CASTING
// =============================================================
// `as` = janji kepada TypeScript: "Percayalah, tipenya adalah X."
// TypeScript akan langsung menerima tanpa melakukan pengecekan.
// Bahaya jika salah -> akan terjadi runtime error.
// Gunakan seperlunya, hanya jika kita yakin lebih tahu dibanding TypeScript.
// =============================================================

console.log("=== AS CASTING ===\n");

// DIPERBOLEHKAN #1: TypeScript belum dapat melakukan narrowing sendiri
const elemenPalsu = { tagName: "INPUT", value: "halo" };
const sebagaiInput = elemenPalsu as { tagName: string; value: string };
console.log("Input value:", sebagaiInput.value);
console.log();

// DIPERBOLEHKAN #2: data dari luar yang sudah divalidasi
interface User {
  nama: string;
  umur: number;
}

function validasiUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "nama" in obj &&
    "umur" in obj &&
    typeof (obj as User).nama === "string" &&
    typeof (obj as User).umur === "number"
  );
}

const raw: unknown = JSON.parse('{"nama":"Budi","umur":25}');
if (validasiUser(raw)) {
  console.log("User valid:", raw.nama, raw.umur);
}
console.log();

// BAHAYA #1: cast paksa ke tipe yang salah
const angka = 42 as unknown as string;
try {
  console.log(angka.toUpperCase());
} catch (err) {
  console.log("RUNTIME ERROR:", (err as Error).message);
}
console.log();

// BAHAYA #2: `as any` akan mematikan pengecekan TypeScript
const userData = { nama: "Citra", umur: 30 };
const userData2 = userData as any;
console.log("Typo lolos:", userData2.namaaa); // undefined, tanpa peringatan
console.log();

// Alternatif yang lebih aman: `unknown` + narrowing
function prosesAman(input: unknown) {
  if (typeof input === "string") {
    console.log("String:", input.toUpperCase());
  } else if (typeof input === "number") {
    console.log("Number:", input.toFixed(2));
  } else {
    console.log("Tipe tidak didukung");
  }
}

prosesAman("hello");
prosesAman(3.14);
prosesAman(true);
console.log();

console.log("INTI:");
console.log("- DIPERBOLEHKAN: narrowing yang belum dapat ditangkap TypeScript / setelah validasi");
console.log("- DIHINDARI: `as any`, cast paksa antar tipe yang tidak kompatibel");
