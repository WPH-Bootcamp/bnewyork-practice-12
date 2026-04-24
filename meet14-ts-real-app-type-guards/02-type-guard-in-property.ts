export {};

// =============================================================
// 02 - TYPE GUARD: typeof, instanceof, `in`
// =============================================================
// Type guard = cara TypeScript melakukan narrowing tipe di dalam blok if.
//   - typeof     -> untuk primitif (string/number/boolean)
//   - instanceof -> untuk class (Date, Error)
//   - `in`       -> untuk cek property pada object
// =============================================================

console.log("=== TYPE GUARD ===\n");

// typeof untuk tipe primitif
function format(input: string | number) {
  if (typeof input === "string") {
    return "STRING: " + input.toUpperCase();
  }
  return "NUMBER: " + input.toFixed(2);
}

console.log(format("halo"));
console.log(format(3.14));
console.log();

// `in` untuk object
type Ikan = { nama: string; berenang: () => void };
type Burung = { nama: string; terbang: () => void };

function bergerak(hewan: Ikan | Burung) {
  // Jika property "berenang" ada -> pasti Ikan
  if ("berenang" in hewan) {
    console.log(hewan.nama, "berenang");
    hewan.berenang();
    return;
  }
  console.log(hewan.nama, "terbang");
  hewan.terbang();
}

const nemo: Ikan = { nama: "Nemo", berenang: () => console.log("  glug glug") };
const tweety: Burung = { nama: "Tweety", terbang: () => console.log("  kepak kepak") };

bergerak(nemo);
bergerak(tweety);
console.log();

// typeof untuk object SELALU "object" -> tidak dapat membedakan
console.log("typeof nemo:", typeof nemo);
console.log("typeof tweety:", typeof tweety);
console.log();

// Kasus nyata: user login vs guest
type Guest = { isLogin: false };
type UserLogin = { isLogin: true; email: string };

function sapa(user: Guest | UserLogin) {
  if ("email" in user) {
    console.log("Halo,", user.email);
    return;
  }
  console.log("Halo, Tamu!");
}

sapa({ isLogin: false });
sapa({ isLogin: true, email: "budi@mail.com" });
console.log();

// Jika object memiliki tag, gunakan tag (lebih rapi dibanding `in`)
type Response =
  | { type: "ok"; data: string }
  | { type: "fail"; error: string };

function baca(res: Response) {
  if (res.type === "ok") {
    console.log("OK:", res.data);
  } else {
    console.log("FAIL:", res.error);
  }
}

baca({ type: "ok", data: "Berhasil" });
baca({ type: "fail", error: "DB error" });
console.log();

console.log("INTI: typeof / instanceof / `in` berfungsi sebagai pagar untuk narrowing.");
