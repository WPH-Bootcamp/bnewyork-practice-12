export {};

// =============================================================
// 01 - DISCRIMINATED UNION
// =============================================================
// Union yang memiliki TAG pembeda (biasanya property `type`/`status`/`kind`).
// Dengan tag, TypeScript dapat otomatis tahu bentuk mana yang sedang kita pegang.
// =============================================================

console.log("=== DISCRIMINATED UNION ===\n");

// Contoh 1: hasil fetch API (sukses ATAU error)
type Result<T> =
  | { type: "success"; data: T }
  | { type: "error"; message: string };

function fetchUser(id: number): Result<{ nama: string; umur: number }> {
  if (id === 1) {
    return { type: "success", data: { nama: "Budi", umur: 25 } };
  }
  return { type: "error", message: "User tidak ditemukan" };
}

const hasil1 = fetchUser(1);
const hasil2 = fetchUser(99);

// Cek tag terlebih dahulu, baru akses property-nya
if (hasil1.type === "success") {
  console.log("Sukses:", hasil1.data.nama, "-", hasil1.data.umur, "th");
} else {
  console.log("Gagal:", hasil1.message);
}

if (hasil2.type === "error") {
  console.log("Hasil kedua gagal:", hasil2.message);
}
console.log();

// Contoh 2: tanpa tag, harus menggunakan `in` (lebih rumit)
type ResultJelek = { data: { nama: string } } | { message: string };

function bacaJelek(r: ResultJelek) {
  if ("data" in r) {
    console.log("Data ada:", r.data.nama);
  } else {
    console.log("Error:", r.message);
  }
}

bacaJelek({ data: { nama: "Citra" } });
bacaJelek({ message: "Server down" });
console.log();

// Contoh 3: state UI (3 bentuk berbeda)
type UiState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };

function renderUi(state: UiState): string {
  if (state.status === "loading") return "Loading...";
  if (state.status === "success") return "Data: " + state.data.join(", ");
  return "Error: " + state.error;
}

console.log(renderUi({ status: "loading" }));
console.log(renderUi({ status: "success", data: ["apel", "jeruk"] }));
console.log(renderUi({ status: "error", error: "Timeout" }));
console.log();

console.log("INTI: union + tag pembeda -> TypeScript otomatis melakukan narrowing.");
