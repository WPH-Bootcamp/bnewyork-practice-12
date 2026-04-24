export {};

// =============================================================
// 05 - `satisfies`
// =============================================================
// Mengecek "apakah cocok dengan tipe X?" TANPA melebarkan tipe nilai asli.
// Berbeda dengan `:` yang membuat tipe menjadi lebih umum.
// =============================================================

console.log("=== SATISFIES ===\n");

// Contoh 1: union literal
// `:` -> warna menjadi union lengkap | `satisfies` -> tetap literal "merah"
type Mobil = {
  nama: string;
  warna: "merah" | "biru" | "hitam";
};

const mobilA: Mobil = { nama: "Avanza", warna: "merah" };
// hover mobilA.warna -> "merah" | "biru" | "hitam"  (melebar)

const mobilB = { nama: "Avanza", warna: "merah" } satisfies Mobil;
// hover mobilB.warna -> "merah"  (tetap spesifik)

console.log("mobilA.warna:", mobilA.warna);
console.log("mobilB.warna:", mobilB.warna);
console.log();

// Contoh 2: deteksi typo
type PortConfig = Record<string, number>;

const portsA: PortConfig = { http: 80, https: 443, ssh: 22 };
// portsA.htp -> TIDAK error (typo lolos, karena Record menerima key apa saja)

const portsB = { http: 80, https: 443, ssh: 22 } satisfies PortConfig;
// portsB.htp -> ERROR (typo tertangkap, key asli tetap diingat)

console.log("portsA.http:", portsA.http);
console.log("portsB.http:", portsB.http);
console.log();

// Contoh 3: routes aplikasi
type RouteMap = Record<string, string>;

const routes = {
  home: "/",
  profile: "/profile",
  settings: "/settings",
} satisfies RouteMap;

console.log("routes.home:", routes.home);
console.log("routes.profile:", routes.profile);
console.log();

// Contoh 4: validasi nilai union
type UserConfig = {
  name: string;
  role: "admin" | "user" | "guest";
};

const configBenar = { name: "Budi", role: "admin" } satisfies UserConfig;
console.log("Config valid:", configBenar);
// role: "administrator" -> ERROR (bukan salah satu nilai union)
console.log();

console.log("PERBANDINGAN:");
console.log("| :         | divalidasi, namun tipe DILEBARKAN       |");
console.log("| as        | TIDAK divalidasi, dipaksa (berbahaya)   |");
console.log("| satisfies | divalidasi, tipe TETAP spesifik         |");
