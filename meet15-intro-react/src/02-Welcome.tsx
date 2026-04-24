// =============================================================
// 02 - FUNCTIONAL COMPONENT
// =============================================================
// Component = fungsi JavaScript yang return JSX.
// Syarat:
//   1. Nama HARUS diawali dengan huruf KAPITAL
//   2. Return JSX
//   3. Dipanggil menggunakan tag: <Welcome />
// =============================================================

// Component minimal tanpa props
export default function Welcome() {
  return (
    <div>
      <h3 className="font-semibold text-slate-100">👋 Selamat datang di React!</h3>
      <p className="text-slate-400">Ini adalah komponen pertama Anda.</p>
    </div>
  );
}

// Component dapat me-render list menggunakan .map()
// Bandingkan dengan versi vanilla-dom.html yang memerlukan createElement manual
const products = [
  { name: "iPhone 15", price: 15000000 },
  { name: "Macbook Air", price: 20000000 },
  { name: "AirPods Pro", price: 4000000 },
];

export function ProductList() {
  return (
    <div>
      <h3 className="font-semibold text-slate-100 mb-2">🛒 Daftar Produk — React</h3>

      {/* Satu .map() menggantikan sekitar 20 baris createElement */}
      {products.map((product) => (
        <div
          key={product.name}
          className="p-3 bg-slate-800 rounded-lg mb-2 border border-slate-700"
        >
          <h4 className="text-sky-400 font-semibold">{product.name}</h4>
          <p className="text-slate-300">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      ))}
    </div>
  );
}
