export {};

// =============================================================
// 03 - TYPE ALIAS vs INTERFACE (UNTUK DATA MODELING)
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/03-type-vs-interface.ts
// =============================================================

console.log("==========================================");
console.log("   BAGIAN 3: TYPE vs INTERFACE");
console.log("==========================================\n");

// =====================
// CONTOH 1: SAMA-SAMA BISA UNTUK OBJECT
// =====================

interface UserInterface {
  id: number;
  nama: string;
  email: string;
}

type UserType = {
  id: number;
  nama: string;
  email: string;
};

const u1: UserInterface = { id: 1, nama: "Budi", email: "b@m.com" };
const u2: UserType      = { id: 2, nama: "Ani",  email: "a@m.com" };

console.log("--- [BENAR] Interface dan Type SAMA untuk object ---");
console.log("UserInterface :", u1);
console.log("UserType      :", u2);
console.log();

// =====================
// CONTOH 2: EXTEND - SYNTAX BEDA, HASIL SAMA
// =====================

interface AdminInterface extends UserInterface {
  role: "admin" | "superadmin";
}

type AdminType = UserType & {
  role: "admin" | "superadmin";
};

const a1: AdminInterface = { id: 1, nama: "Budi", email: "b@m.com", role: "admin" };
const a2: AdminType      = { id: 2, nama: "Ani",  email: "a@m.com", role: "superadmin" };

console.log("--- [BENAR] extends (interface) vs & (type) ---");
console.log("AdminInterface:", a1);
console.log("AdminType     :", a2);
console.log();

// =====================
// CONTOH 3: TYPE BISA UNTUK UNION - INTERFACE TIDAK BISA!
// =====================

type Status = "aktif" | "nonaktif" | "cuti";

const st1: Status = "aktif";
console.log("--- [BENAR] type Status = union literal ---");
console.log("Status:", st1);

// Coba dengan interface:
// interface StatusInterface = "aktif" | "nonaktif";
// ^ SYNTAX ERROR: interface ga bisa untuk union!
console.log("[SALAH] interface Status = 'aktif' | 'nonaktif'");
console.log("  --> TS ERROR: interface tidak bisa untuk union literal");
console.log();

// =====================
// CONTOH 4: TYPE BISA UNTUK TUPLE & PRIMITIVE ALIAS
// =====================

type LatLong = [number, number];
type UserID = string;

const jakarta: LatLong = [-6.2, 106.8];
const myId: UserID = "USR-001";

console.log("--- [BENAR] type untuk tuple & primitive ---");
console.log("Jakarta (LatLong):", jakarta);
console.log("UserID:", myId);

// Kalau pakai interface:
// interface LatLongInterface = [number, number];
// ^ ERROR: interface ga bisa tuple
// interface UserIdInterface = string;
// ^ ERROR: interface ga bisa alias primitive
console.log("[SALAH] interface ga bisa dipakai untuk tuple atau primitive alias");
console.log();

// =====================
// CONTOH 5: DECLARATION MERGING (KHUSUS INTERFACE)
// =====================

interface AppConfig {
  apiUrl: string;
}
interface AppConfig {
  timeout: number;
}
// Dua interface bernama sama OTOMATIS digabung jadi satu!

const cfg: AppConfig = { apiUrl: "https://api.com", timeout: 5000 };
console.log("--- [BENAR] Declaration merging (interface) ---");
console.log("Config hasil merge:", cfg);

// Kalau pakai type:
// type AppType = { apiUrl: string };
// type AppType = { timeout: number };
// ^ TS ERROR: "Duplicate identifier 'AppType'."
console.log("[SALAH] type dengan nama sama akan ERROR: Duplicate identifier");
console.log();

// =====================
// CONTOH 6: DISCRIMINATED UNION (POLA POPULER API)
// =====================
// Pola ini WAJIB pakai type karena interface ga bisa union.

type Respon =
  | { status: "sukses"; data: { nama: string } }
  | { status: "gagal"; pesan: string };

function handle(res: Respon) {
  if (res.status === "sukses") {
    console.log("  --> SUKSES, nama:", res.data.nama);
    // TS tahu: di cabang ini, res pasti punya `data`
  } else {
    console.log("  --> GAGAL, pesan:", res.pesan);
    // TS tahu: di cabang ini, res pasti punya `pesan`
  }
}

console.log("--- [BENAR] discriminated union dengan type ---");
handle({ status: "sukses", data: { nama: "Budi" } });
handle({ status: "gagal", pesan: "User tidak ditemukan" });
console.log();

// Demo: coba akses field yang SALAH
console.log("[JEBAKAN] kalau kita akses res.data TANPA cek status dulu:");
console.log("  --> TS ERROR: 'data' tidak pasti ada. Harus cek dulu status-nya.");
console.log();

// =====================
// CONTOH 7: KAPAN PAKAI APA?
// =====================

console.log("--- PANDUAN PAKAI ---");
console.log();
console.log("| Bentuk data                | Pilihan             |");
console.log("|----------------------------|---------------------|");
console.log("| Object biasa (User, Post)  | interface           |");
console.log("| Hirarki / extend           | interface + extends |");
console.log("| Union shape (response API) | type (WAJIB)        |");
console.log("| Tuple / koordinat          | type (WAJIB)        |");
console.log("| Alias primitive (UserID)   | type (WAJIB)        |");
console.log();

console.log("==========================================");
console.log("  KESIMPULAN:");
console.log("  - Object entity   --> interface");
console.log("  - Union/tuple/primitive --> type");
console.log("  - Konsisten dalam 1 project");
console.log("==========================================");
console.log("\n=== Selesai! Lanjut ke 04-index-signature.ts ===\n");
