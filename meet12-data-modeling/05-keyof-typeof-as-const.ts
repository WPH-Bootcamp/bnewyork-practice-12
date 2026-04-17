export {};

// =============================================================
// 05 - keyof, typeof, as const
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/05-keyof-typeof-as-const.ts
// =============================================================

console.log("==========================================");
console.log("   BAGIAN 5: keyof, typeof, as const");
console.log("==========================================\n");

// =====================
// BAGIAN A: typeof
// =====================
// typeof = ambil TIPE dari SEBUAH NILAI/VARIABLE yang udah ada.

const userDefault = {
  nama: "Guest",
  umur: 0,
  role: "guest",
};

type UserDefault = typeof userDefault;
// Otomatis jadi: { nama: string; umur: number; role: string }

const userBaru: UserDefault = {
  nama: "Budi",
  umur: 25,
  role: "admin",
};

console.log("--- [BENAR] typeof mengambil tipe dari variable ---");
console.log("userBaru:", userBaru);

// SALAH: coba assign object yang bentuknya beda
// const userSalah: UserDefault = { nama: "Budi" };
// ^ TS ERROR: "Property 'umur' is missing in type..."
console.log("[SALAH] { nama: 'Budi' } saja --> TS ERROR: umur & role missing");
console.log();

// =====================
// BAGIAN B: keyof
// =====================
// keyof = ambil SEMUA NAMA KEY dari sebuah tipe, jadi union literal.

interface Produk {
  id: number;
  nama: string;
  harga: number;
  stok: number;
}

type KunciProduk = keyof Produk;
// "id" | "nama" | "harga" | "stok"

const k1: KunciProduk = "harga";
console.log("--- [BENAR] keyof Produk ---");
console.log("Contoh kunci valid:", k1);

// SALAH:
// const k2: KunciProduk = "warna";
// ^ TS ERROR: "Type '\"warna\"' is not assignable to type 'keyof Produk'."
console.log("[SALAH] 'warna' --> TS ERROR: bukan key dari Produk");
console.log();

// --- Function yang AMAN pakai keyof ---
function ambilProperty(produk: Produk, key: keyof Produk) {
  return produk[key];
}

const kopi: Produk = { id: 1, nama: "Kopi", harga: 20000, stok: 50 };
console.log("--- [BENAR] ambilProperty aman pakai keyof ---");
console.log("nama  :", ambilProperty(kopi, "nama"));
console.log("harga :", ambilProperty(kopi, "harga"));
console.log("stok  :", ambilProperty(kopi, "stok"));

// SALAH:
// ambilProperty(kopi, "warna");
// ^ TS ERROR: "Argument of type '\"warna\"' is not assignable to parameter of type 'keyof Produk'."
console.log("[SALAH] ambilProperty(kopi, 'warna') --> TS ERROR di editor");
console.log();

// =====================
// BAGIAN C: keyof + typeof (POLA PALING SERING DIPAKAI)
// =====================

const WARNA = {
  primary: "#3B82F6",
  secondary: "#10B981",
  danger: "#EF4444",
};

type NamaWarna = keyof typeof WARNA;
// "primary" | "secondary" | "danger"

function setWarna(nama: NamaWarna) {
  console.log(`  setWarna('${nama}') --> ${WARNA[nama]}`);
}

console.log("--- [BENAR] keyof typeof WARNA ---");
setWarna("primary");
setWarna("secondary");
setWarna("danger");

// SALAH:
// setWarna("pink");
// ^ TS ERROR: "Argument of type '\"pink\"' is not assignable to parameter of type 'NamaWarna'."
console.log("[SALAH] setWarna('pink') --> TS ERROR: 'pink' bukan key WARNA");
console.log();

// =====================
// BAGIAN D: as const
// =====================
// as const = kunci nilai jadi LITERAL (bukan tipe umum) + readonly.

const kebijakanA = { role: "admin", level: 1 };
// kebijakanA.role tipe: string (di-widen). Boleh diubah ke "user", dst.

const kebijakanB = { role: "admin", level: 1 } as const;
// kebijakanB.role tipe: "admin" (literal). Readonly juga!

console.log("--- [PERBANDINGAN] tanpa vs dengan 'as const' ---");
console.log("kebijakanA:", kebijakanA, "(tipe role: string)");
console.log("kebijakanB:", kebijakanB, "(tipe role: 'admin' literal)");

kebijakanA.role = "user"; // OK
console.log("  kebijakanA.role boleh diubah --> jadi:", kebijakanA.role);

// kebijakanB.role = "user";
// ^ TS ERROR: "Cannot assign to 'role' because it is a read-only property."
//   juga: "Type '\"user\"' is not assignable to type '\"admin\"'."
console.log("  kebijakanB.role TIDAK BISA diubah --> TS ERROR: readonly & harus literal 'admin'");
console.log();

// =====================
// BAGIAN E: POLA JAGOAN (const + as const + keyof typeof)
// =====================

const ROLE = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
} as const;

type RoleKey   = keyof typeof ROLE;              // "ADMIN" | "USER" | "GUEST"
type RoleValue = typeof ROLE[keyof typeof ROLE]; // "admin" | "user" | "guest"

function cekAkses(role: RoleValue) {
  if (role === "admin") return "Full access";
  if (role === "user")  return "Limited access";
  return "Read-only access";
}

console.log("--- [BENAR] POLA JAGOAN: const + as const + keyof typeof ---");
console.log("ROLE object       :", ROLE);
console.log("cekAkses(ROLE.ADMIN):", cekAkses(ROLE.ADMIN));
console.log("cekAkses('user')   :", cekAkses("user"));
console.log("cekAkses('guest')  :", cekAkses("guest"));

// SALAH:
// cekAkses("root");
// ^ TS ERROR: "Argument of type '\"root\"' is not assignable to parameter of type 'RoleValue'."
console.log("[SALAH] cekAkses('root') --> TS ERROR: bukan value dari ROLE");
console.log();

// Demo kunci RoleKey vs RoleValue
const kSample: RoleKey = "ADMIN";   // nama propertinya
const vSample: RoleValue = "admin"; // nilainya
console.log("RoleKey contoh  :", kSample);
console.log("RoleValue contoh:", vSample);
console.log();

// =====================
// BAGIAN F: KASUS NYATA - HTTP STATUS
// =====================

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

type StatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// 200 | 201 | 400 | 404 | 500

function describeStatus(code: StatusCode): string {
  if (code === 200) return "OK - Sukses";
  if (code === 201) return "CREATED - Data dibuat";
  if (code === 404) return "NOT FOUND - Tidak ketemu";
  return `Status lain: ${code}`;
}

console.log("--- [BENAR] HTTP_STATUS constant ---");
console.log("200:", describeStatus(HTTP_STATUS.OK));
console.log("201:", describeStatus(HTTP_STATUS.CREATED));
console.log("404:", describeStatus(HTTP_STATUS.NOT_FOUND));

// SALAH:
// describeStatus(999);
// ^ TS ERROR: 999 bukan StatusCode
console.log("[SALAH] describeStatus(999) --> TS ERROR: 999 bukan status yang terdaftar");
console.log();

console.log("==========================================");
console.log("  KESIMPULAN:");
console.log("  - typeof X        = ambil tipe dari value");
console.log("  - keyof T         = union nama-nama key");
console.log("  - as const        = kunci ke literal + readonly");
console.log("  - KOMBINASI-nya   = konstanta yang super safe");
console.log("==========================================");
console.log("\n=== Selesai! Lanjut ke 06-generics-basic.ts ===\n");
