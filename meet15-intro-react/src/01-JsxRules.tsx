// =============================================================
// 01 - JSX RULES
// =============================================================
// JSX = JavaScript XML. Terlihat seperti HTML, namun akan di-compile
// menjadi React.createElement(...). Terdapat 5 aturan utama.
// =============================================================

export default function JsxRules() {
  // RULE 1: Hanya boleh ada 1 parent element (gunakan <div> atau Fragment <>...</>)
  // RULE 2: Attribute menggunakan camelCase (className, htmlFor, onClick)
  // RULE 3: Tag tanpa children WAJIB self-close (<img />, <br />)
  // RULE 4: Embed JavaScript menggunakan { } -> di dalamnya JavaScript biasa
  // RULE 5: Comment di dalam JSX menggunakan {/* ... */}

  const namaUser = "Budi";
  const umur = 25;
  const isAdmin = true;

  return (
    <div>
      {/* Embed variable menggunakan { } */}
      <p>Halo, nama saya {namaUser}, umur {umur} tahun.</p>

      {/* Dapat juga menggunakan expression */}
      <p>Tahun depan umur saya {umur + 1}.</p>

      {/* Conditional: gunakan ternary (if/else tidak dapat digunakan di dalam JSX) */}
      <p>Status: {isAdmin ? "👑 Admin" : "👤 User biasa"}</p>

      <hr />

      {/* className (bukan class!) + Tailwind */}
      <span className="bg-yellow-300 text-slate-900 px-2 py-0.5 rounded">
        Ini menggunakan className + Tailwind
      </span>
    </div>
  );
}
