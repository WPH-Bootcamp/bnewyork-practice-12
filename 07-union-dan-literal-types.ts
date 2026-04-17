export {};

// =============================================================
// 07 - UNION TYPE & LITERAL TYPE
// =============================================================
// Jalankan file ini: npx ts-node 07-union-dan-literal-types.ts
// =============================================================

// =====================
// ANALOGI UNION TYPE
// =====================
// Union type itu kayak COLOKAN LISTRIK UNIVERSAL:
// - Bisa masuk colokan Indonesia
// - Bisa masuk colokan Eropa
// - Bisa masuk colokan US
// Tapi CUMA bisa salah satu di satu waktu, bukan semuanya sekaligus!
//
// Format: tipe1 | tipe2 | tipe3
// Dibaca: "bisa tipe1 ATAU tipe2 ATAU tipe3"

// =====================
// 1. BASIC UNION TYPE
// =====================

// ID bisa berupa angka ATAU tulisan
let userId: number | string;

userId = 123;       // OK! number
userId = "USR-123"; // OK! string
// userId = true;   // ERROR! boolean bukan number atau string

console.log("=== BASIC UNION ===");
console.log(`User ID: ${userId}`);

// Contoh: hasil dari API kadang bisa null
let response: string | null = null;  // belum ada data
response = "Data berhasil dimuat";    // sudah ada data
console.log(`Response: ${response}`);

// =====================
// 2. UNION dalam Function
// =====================

function tampilkanId(id: number | string): string {
  // Di dalam function, kamu perlu CEK tipenya dulu sebelum pakai
  // Ini namanya "TYPE NARROWING"
  if (typeof id === "string") {
    return id.toUpperCase(); // TypeScript tau di sini id pasti string
  }
  return id.toString();      // TypeScript tau di sini id pasti number
}

console.log("\n=== UNION in FUNCTION ===");
console.log(tampilkanId("usr-001"));  // "USR-001"
console.log(tampilkanId(12345));      // "12345"

// =====================
// 3. LITERAL TYPE - Nilai yang SPESIFIK
// =====================
//
// ANALOGI:
// - Regular type (string) = "Bisa tulisan APA AJA"
// - Literal type ("aktif") = "Cuma boleh tulisan 'aktif', titik!"
//
// Kayak mesin minuman otomatis:
// Tombolnya cuma: "kopi" | "teh" | "susu"
// Kamu ga bisa pencet "jus" karena tombolnya GA ADA.

type StatusPesanan = "menunggu" | "diproses" | "dikirim" | "selesai";

let statusSaya: StatusPesanan = "menunggu";   // OK!
statusSaya = "diproses";                       // OK!
// statusSaya = "dibatalkan";  // ERROR! "dibatalkan" bukan pilihan yang valid

console.log("\n=== LITERAL TYPE ===");
console.log(`Status pesanan: ${statusSaya}`);

// =====================
// 4. LITERAL TYPE bukan cuma String!
// =====================

// Number literal
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
const lemparDadu: DiceRoll = 4; // OK!
// const lemparDadu2: DiceRoll = 7; // ERROR! dadu cuma 1-6

// Boolean literal (jarang dipakai, tapi bisa)
type Pasti = true;
const yakin: Pasti = true;
// const yakin2: Pasti = false; // ERROR!

console.log(`Dadu: ${lemparDadu}`);

// =====================
// 5. UNION + LITERAL = SUPER POWERFUL
// =====================
// Ini PATTERN yang PALING SERING dipakai di real project!

interface ApiResponse {
  status: "success" | "error";          // <-- literal union!
  data?: unknown;
  message?: string;
}

function handleResponse(res: ApiResponse): void {
  // TypeScript tau bahwa status CUMA bisa "success" atau "error"
  // Jadi kamu ga perlu handle case lain!

  if (res.status === "success") {
    console.log("Berhasil!", res.data);
  } else {
    // TypeScript tau di sini pasti "error"
    console.log("Gagal:", res.message);
  }
}

console.log("\n=== UNION + LITERAL (API Response) ===");
handleResponse({ status: "success", data: { id: 1, nama: "Budi" } });
handleResponse({ status: "error", message: "Data tidak ditemukan" });

// =====================
// 6. DISCRIMINATED UNION - Pattern Lanjutan yang SANGAT BERGUNA
// =====================
// Ini kayak "paket" yang punya LABEL.
// Dari label-nya, kamu tau isinya apa.

type Notifikasi =
  | { tipe: "email"; alamatEmail: string; subjek: string }
  | { tipe: "sms"; nomorHp: string; pesan: string }
  | { tipe: "push"; deviceId: string; judul: string };

function kirimNotifikasi(notif: Notifikasi): void {
  // TypeScript PINTAR! Dia tau:
  // - kalau tipe === "email", pasti ada alamatEmail & subjek
  // - kalau tipe === "sms", pasti ada nomorHp & pesan
  // - kalau tipe === "push", pasti ada deviceId & judul

  switch (notif.tipe) {
    case "email":
      console.log(`Kirim email ke ${notif.alamatEmail}: ${notif.subjek}`);
      break;
    case "sms":
      console.log(`Kirim SMS ke ${notif.nomorHp}: ${notif.pesan}`);
      break;
    case "push":
      console.log(`Push notif ke device ${notif.deviceId}: ${notif.judul}`);
      break;
  }
}

console.log("\n=== DISCRIMINATED UNION ===");
kirimNotifikasi({ tipe: "email", alamatEmail: "budi@email.com", subjek: "Hai!" });
kirimNotifikasi({ tipe: "sms", nomorHp: "08123456789", pesan: "Halo!" });
kirimNotifikasi({ tipe: "push", deviceId: "ABC123", judul: "Promo!" });

// =====================
// 7. TYPE NARROWING - Cara "Mempersempit" Union
// =====================

function prosesInput(input: string | number | boolean): string {
  // typeof --> cara paling umum untuk narrowing
  if (typeof input === "string") {
    // Di sini TypeScript tau input PASTI string
    return `Teks: "${input.toUpperCase()}"`;
  }
  if (typeof input === "number") {
    // Di sini TypeScript tau input PASTI number
    return `Angka: ${input.toFixed(2)}`;
  }
  // Di sini TypeScript tau input PASTI boolean
  return `Boolean: ${input ? "YA" : "TIDAK"}`;
}

console.log("\n=== TYPE NARROWING ===");
console.log(prosesInput("halo"));    // Teks: "HALO"
console.log(prosesInput(42.567));    // Angka: 42.57
console.log(prosesInput(true));      // Boolean: YA

// =====================
// RINGKASAN
// =====================
//
// UNION TYPE:
// let x: string | number        --> x bisa string ATAU number
// let y: User | null             --> y bisa User ATAU null
//
// LITERAL TYPE:
// type Dir = "up" | "down"       --> Dir CUMA bisa "up" atau "down"
// type Dice = 1 | 2 | 3 | 4 | 5 | 6
//
// DISCRIMINATED UNION:
// type Shape =
//   | { kind: "circle"; radius: number }
//   | { kind: "square"; side: number }
//
// TYPE NARROWING:
// if (typeof x === "string") { ... }  --> di dalam sini x pasti string

console.log("\n=== Selesai! Lanjut ke 08-mini-project.ts ===\n");
