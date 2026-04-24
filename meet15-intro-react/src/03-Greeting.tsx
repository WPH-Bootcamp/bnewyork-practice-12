// =============================================================
// 03 - PROPS: PASSING DATA
// =============================================================
// Props = "argumen" untuk component.
// Parent mengirim data ke child melalui attribute pada JSX.
//
//   <Greeting name="Budi" umur={25} />
//     -> string menggunakan "..."
//     -> number / boolean / object / array menggunakan {...}
//
// Props bersifat READ-ONLY di child (tidak boleh diubah).
// =============================================================

// Definisikan tipe props terlebih dahulu -> mendapatkan autocomplete + error checking
type GreetingProps = {
  name: string;
  umur: number;
  kota?: string; // opsional (tanda ?)
};

// Destructure props pada parameter agar lebih mudah dibaca
export default function Greeting({ name, umur, kota }: GreetingProps) {
  return (
    <div>
      <h3>👋 Halo, {name}!</h3>
      <p>Anda berumur {umur} tahun.</p>

      {/* Conditional render: jika kota ada, baru akan di-render */}
      {kota && <p>📍 Dari kota: {kota}</p>}
    </div>
  );
}
