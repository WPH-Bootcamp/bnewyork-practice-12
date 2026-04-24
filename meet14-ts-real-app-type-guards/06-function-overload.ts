export {};

// =============================================================
// 06 - FUNCTION OVERLOAD
// =============================================================
// Satu fungsi dengan banyak signature. Input berbeda -> return type berbeda.
// Kegunaannya: membuat return type menjadi PRESISI (bukan union yang lebar).
// =============================================================

console.log("=== FUNCTION OVERLOAD ===\n");

// Tanpa overload: return type menjadi union `string | number`
function dobelJelek(input: string | number): string | number {
  if (typeof input === "string") return input + input;
  return input * 2;
}

const hasilJelek1 = dobelJelek("halo"); // tipe: string | number
const hasilJelek2 = dobelJelek(5); // tipe: string | number
console.log("Hasil:", hasilJelek1, hasilJelek2);
console.log();

// Dengan overload: return type menjadi presisi
function dobel(input: string): string;
function dobel(input: number): number;
function dobel(input: string | number): string | number {
  if (typeof input === "string") return input + input;
  return input * 2;
}

const hasilBenar1 = dobel("halo"); // tipe: string
const hasilBenar2 = dobel(5); // tipe: number

console.log(hasilBenar1.toUpperCase());
console.log(hasilBenar2.toFixed(2));
console.log();

// Kasus nyata: buatTanggal dapat dipanggil dengan 3 cara
function buatTanggal(): Date;
function buatTanggal(timestamp: number): Date;
function buatTanggal(isoString: string): Date;
function buatTanggal(input?: number | string): Date {
  if (input === undefined) return new Date();
  return new Date(input);
}

console.log("Sekarang:", buatTanggal().toISOString());
console.log("Timestamp:", buatTanggal(0).toISOString());
console.log("String:", buatTanggal("2026-01-01").toISOString());
console.log();

// Overload dapat menghasilkan bentuk return berbeda (object atau array)
type UserSederhana = { id: number; nama: string };

function ambilUser(id: number): UserSederhana;
function ambilUser(ids: number[]): UserSederhana[];
function ambilUser(input: number | number[]): UserSederhana | UserSederhana[] {
  if (Array.isArray(input)) {
    return input.map((id) => ({ id, nama: "User-" + id }));
  }
  return { id: input, nama: "User-" + input };
}

const satuUser = ambilUser(1); // tipe: UserSederhana
const banyakUser = ambilUser([1, 2, 3]); // tipe: UserSederhana[]

console.log("Satu:", satuUser);
console.log("Banyak:", banyakUser);
console.log();

console.log("INTI: tulis signature di bagian atas, dan satu implementasi di bawah.");
