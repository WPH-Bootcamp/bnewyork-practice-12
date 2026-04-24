export {};

// =============================================================
// 03 - SWITCH EXHAUSTIVE CHECK
// =============================================================
// Cara memaksa TypeScript agar SEMUA case ditangani.
// Triknya: assign variabel ke tipe `never` di default branch.
// Jika nanti ada case baru yang terlewat -> TypeScript langsung error.
// =============================================================

console.log("=== EXHAUSTIVE CHECK ===\n");

type Payment =
  | { method: "cash"; amount: number }
  | { method: "card"; amount: number; cardNumber: string }
  | { method: "ewallet"; amount: number; provider: string };

// Tanpa exhaustive: mudah terlewat menangani case, menyebabkan bug silent
function prosesJelek(p: Payment): string {
  switch (p.method) {
    case "cash":
      return `Cash: Rp${p.amount}`;
    case "card":
      return `Card: Rp${p.amount}`;
    // "ewallet" tidak ditangani - kode tetap jalan dengan return string fallback
  }
  return "method tidak dikenal";
}

console.log(prosesJelek({ method: "cash", amount: 10000 }));
console.log(prosesJelek({ method: "ewallet", amount: 5000, provider: "OVO" }));
console.log();

// Dengan exhaustive: TypeScript memaksa untuk menangani semua case
function prosesBenar(p: Payment): string {
  switch (p.method) {
    case "cash":
      return `Cash: Rp${p.amount}`;
    case "card":
      return `Card ${p.cardNumber}: Rp${p.amount}`;
    case "ewallet":
      return `${p.provider}: Rp${p.amount}`;
    default: {
      // Jika semua case sudah ditangani, p di sini pasti bertipe `never`
      const _exhaustive: never = p;
      throw new Error("Method tidak dikenal: " + JSON.stringify(_exhaustive));
    }
  }
}

console.log(prosesBenar({ method: "cash", amount: 10000 }));
console.log(prosesBenar({ method: "card", amount: 20000, cardNumber: "1234" }));
console.log(prosesBenar({ method: "ewallet", amount: 5000, provider: "OVO" }));
console.log();

// Simulasi: penambahan method baru (qris) -> TypeScript akan error jika terlewat
type PaymentV2 =
  | { method: "cash"; amount: number }
  | { method: "card"; amount: number; cardNumber: string }
  | { method: "ewallet"; amount: number; provider: string }
  | { method: "qris"; amount: number; merchantId: string };

function prosesV2(p: PaymentV2): string {
  switch (p.method) {
    case "cash":
      return `Cash: Rp${p.amount}`;
    case "card":
      return `Card: Rp${p.amount}`;
    case "ewallet":
      return `E-wallet: Rp${p.amount}`;
    case "qris":
      return `QRIS (${p.merchantId}): Rp${p.amount}`;
    default: {
      const _exhaustive: never = p;
      throw new Error("Method tidak dikenal: " + JSON.stringify(_exhaustive));
    }
  }
}

console.log(prosesV2({ method: "qris", amount: 15000, merchantId: "M-001" }));
console.log();

// Dapat juga menggunakan if/else
type Status = "loading" | "success" | "error";

function pesanStatus(s: Status): string {
  if (s === "loading") return "Tunggu sebentar...";
  if (s === "success") return "Berhasil!";
  if (s === "error") return "Gagal.";

  const _exhaustive: never = s;
  return _exhaustive;
}

console.log(pesanStatus("success"));
console.log();

console.log("INTI: `never` berfungsi sebagai pagar agar TypeScript error jika ada case baru.");
