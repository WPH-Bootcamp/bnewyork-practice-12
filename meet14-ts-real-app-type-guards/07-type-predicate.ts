export {};

// =============================================================
// 07 - TYPE PREDICATE (CUSTOM TYPE GUARD)
// =============================================================
// Fungsi untuk mengecek bentuk data dengan return type `x is Tipe`.
// Membuat TypeScript ikut melakukan narrowing setelah pengecekan.
//
// Bentuk:
//   function nama(x: Input): x is Output { return kondisi; }
// =============================================================

console.log("=== TYPE PREDICATE ===\n");

type Kucing = { nama: string; meong: () => void };
type Anjing = { nama: string; gonggong: () => void };

// Fungsi boolean biasa: TypeScript TIDAK ikut melakukan narrowing
function apaKucing(h: Kucing | Anjing): boolean {
  return "meong" in h;
}

// Type predicate: return type-nya `h is Kucing` -> TypeScript ikut narrowing
function apaKucingBenar(h: Kucing | Anjing): h is Kucing {
  return "meong" in h;
}

function hewanAcak(pilih: "kucing" | "anjing"): Kucing | Anjing {
  if (pilih === "kucing") {
    return { nama: "Misty", meong: () => console.log("  Meong!") };
  }
  return { nama: "Rex", gonggong: () => console.log("  Guk guk!") };
}

const hewan2 = hewanAcak("kucing");
const hewan3 = hewanAcak("anjing");

if (apaKucingBenar(hewan2)) {
  hewan2.meong(); // TypeScript tahu: ini adalah Kucing
} else {
  hewan2.gonggong();
}

if (apaKucingBenar(hewan3)) {
  hewan3.meong();
} else {
  hewan3.gonggong();
}
console.log();

// Kasus nyata: validasi data dari API
interface Pesanan {
  id: number;
  total: number;
  items: string[];
}

function apaPesanan(x: unknown): x is Pesanan {
  if (typeof x !== "object" || x === null) return false;
  const o = x as any;
  if (typeof o.id !== "number") return false;
  if (typeof o.total !== "number") return false;
  if (!Array.isArray(o.items)) return false;
  if (!o.items.every((i: unknown) => typeof i === "string")) return false;
  return true;
}

const data1: unknown = JSON.parse('{"id":1,"total":50000,"items":["kopi","donat"]}');
const data2: unknown = JSON.parse('{"id":"satu","total":50000}');

if (apaPesanan(data1)) {
  console.log("Valid - ID:", data1.id, "Item:", data1.items.join(", "));
}

if (!apaPesanan(data2)) {
  console.log("Data kedua tidak valid, ditolak.");
}
console.log();

// Penggunaan populer: filter array -> hasil dengan tipe yang bersih
const campuran: (string | null | undefined)[] = ["apel", null, "jeruk", undefined, "mangga"];

function bukanKosong(v: string | null | undefined): v is string {
  return v !== null && v !== undefined;
}

const bersih = campuran.filter(bukanKosong); // tipe: string[]

console.log("Asli:", campuran);
console.log("Bersih:", bersih);
console.log("Join:", bersih.join(", "));
console.log();

console.log("INTI: `x is Tipe` membuat TypeScript melakukan narrowing setelah fungsi return true.");
