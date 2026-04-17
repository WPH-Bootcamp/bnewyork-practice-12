export {};

// =============================================================
// 06 - GENERIC FUNCTION (DASAR)
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/06-generics-basic.ts
// =============================================================

// =====================
// ANALOGI
// =====================
// Generic = KOTAK KADO yang bisa diisi apa saja.
// Kotak-nya SAMA, ISINYA menyesuaikan.
// Ditulis dengan huruf placeholder: T, U, K, V.

console.log("==========================================");
console.log("   BAGIAN 6: GENERIC FUNCTION");
console.log("==========================================\n");

// =====================
// CONTOH 1: MASALAH TANPA GENERIC
// =====================

console.log("--- [MASALAH] tanpa generic: harus bikin ulang ---");
function wrapString(v: string): string { return v; }
function wrapNumber(v: number): number { return v; }
function wrapBoolean(v: boolean): boolean { return v; }
console.log("wrapString('halo')  :", wrapString("halo"));
console.log("wrapNumber(42)      :", wrapNumber(42));
console.log("wrapBoolean(true)   :", wrapBoolean(true));
console.log("  --> Capek, harus duplicate function untuk tiap tipe.");
console.log();

console.log("--- [LEBIH JELEK] pakai any: hilang type safety ---");
function wrapAny(v: any): any { return v; }
const hasilAny = wrapAny("halo");
console.log("wrapAny('halo'):", hasilAny);
console.log("  --> hasilAny tipenya any, TS ga bantu apa-apa lagi.");
console.log("  --> hasilAny.toFixed() LOLOS di TS, meledak di runtime.");
console.log();

// =====================
// CONTOH 2: SOLUSI - GENERIC
// =====================

function wrap<T>(value: T): T {
  return value;
}

const a = wrap<string>("halo");  // a: string
const b = wrap<number>(42);      // b: number
const c = wrap<boolean>(true);   // c: boolean
const d = wrap("otomatis");      // d: string (tertebak otomatis)

console.log("--- [BENAR] wrap<T>(value: T): T ---");
console.log("wrap<string>('halo')  =", a, "| tipe: string");
console.log("wrap<number>(42)      =", b, "| tipe: number");
console.log("wrap<boolean>(true)   =", c, "| tipe: boolean");
console.log("wrap('otomatis')      =", d, "| tipe: string (inferred)");
console.log();

// Bedanya dengan any:
console.log("--- [BENAR] generic TETAP type-safe ---");
console.log("a.toUpperCase()        =", a.toUpperCase());
// a.toFixed();
// ^ TS ERROR: "Property 'toFixed' does not exist on type 'string'."
console.log("[SALAH] a.toFixed() --> TS ERROR karena a: string");
console.log();

// =====================
// CONTOH 3: GENERIC DENGAN ARRAY
// =====================

function first<T>(items: T[]): T | undefined {
  return items[0];
}

console.log("--- [BENAR] first<T> bekerja untuk tipe apapun ---");
console.log("first([10, 20, 30])      =", first([10, 20, 30]));
console.log("first(['a', 'b', 'c'])   =", first(["a", "b", "c"]));
console.log("first([true, false])     =", first([true, false]));
console.log("first([])                =", first([]));
console.log();

// =====================
// CONTOH 4: MULTIPLE TYPE PARAM
// =====================

function pasangkan<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

console.log("--- [BENAR] generic dengan dua parameter tipe ---");
console.log("pasangkan('Budi', 25)    =", pasangkan("Budi", 25));
console.log("pasangkan(1, true)       =", pasangkan(1, true));
console.log();

// =====================
// CONTOH 5: GENERIC CONSTRAINT
// =====================

interface PunyaLength { length: number }

function getLength<T extends PunyaLength>(item: T): number {
  return item.length;
}

console.log("--- [BENAR] constraint: T extends {length: number} ---");
console.log("getLength('hello')       =", getLength("hello"));      // 5
console.log("getLength([1,2,3,4])     =", getLength([1, 2, 3, 4])); // 4
console.log("getLength({length: 10})  =", getLength({ length: 10 })); // 10

// SALAH:
// getLength(123);
// ^ TS ERROR: "Argument of type 'number' is not assignable to parameter of type 'PunyaLength'."
console.log("[SALAH] getLength(123) --> TS ERROR: number ga punya .length");
console.log();

// =====================
// CONTOH 6: POLA PRAKTIS - ApiResponse<T>
// =====================

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface User { id: number; nama: string; }
interface Post { id: number; judul: string; }

const userRes: ApiResponse<User> = {
  success: true,
  data: { id: 1, nama: "Budi" },
};

const postsRes: ApiResponse<Post[]> = {
  success: true,
  data: [
    { id: 1, judul: "Halo dunia" },
    { id: 2, judul: "TypeScript fun" },
  ],
};

function ambilData<T>(res: ApiResponse<T>): T {
  return res.data;
}

console.log("--- [BENAR] ApiResponse<T> generic ---");
console.log("userRes:", userRes);
console.log("postsRes:", postsRes);
console.log();
console.log("ambilData(userRes).nama         =", ambilData(userRes).nama);
console.log("ambilData(postsRes)[0].judul    =", ambilData(postsRes)[0].judul);
console.log();

// SALAH:
// ambilData(userRes).judul;
// ^ TS ERROR: "Property 'judul' does not exist on type 'User'."
console.log("[SALAH] ambilData(userRes).judul --> TS ERROR: User ga punya 'judul'");
console.log();

// =====================
// CONTOH 7: GENERIC YANG UDAH KAMU PAKAI TIAP HARI
// =====================

console.log("--- [INFO] generic yang udah tidak asing ---");
const arr: Array<string> = ["a", "b", "c"]; // sama dengan string[]
const p: Promise<number> = Promise.resolve(42);
const m: Map<string, number> = new Map([["a", 1], ["b", 2]]);

console.log("Array<string>          :", arr);
p.then((v) => console.log("Promise<number> resolve:", v));
console.log("Map<string, number>    :", Array.from(m.entries()));
console.log();

console.log("==========================================");
console.log("  KESIMPULAN:");
console.log("  - Generic = placeholder tipe <T>");
console.log("  - Tetap type-safe (ga seperti any)");
console.log("  - Reusable untuk banyak tipe");
console.log("  - Constraint: <T extends ...>");
console.log("==========================================");
console.log("\n=== Selesai! Lanjut ke 07-api-data-modeling.ts ===\n");
