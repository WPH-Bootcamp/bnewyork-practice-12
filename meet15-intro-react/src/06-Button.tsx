// =============================================================
// 06 - STYLING: className + Tailwind
// =============================================================
// Pada React menggunakan `className` (bukan `class`).
// Tailwind = utility-first CSS (class siap pakai yang digunakan langsung pada JSX).
//
//   p-4                -> padding 1rem
//   bg-blue-500        -> background biru
//   hover:bg-blue-700  -> hover effect cukup dengan prefix
// =============================================================

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

// Lookup object: memetakan variant -> className
// Pattern yang umum digunakan pada React + Tailwind
const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-slate-600 hover:bg-slate-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export default function Button({ label, variant = "primary", onClick }: ButtonProps) {
  // Gabungkan class dasar + class variant menggunakan template literal
  const className = `px-4 py-2 rounded-md font-semibold mr-2 transition active:scale-95 ${variantClasses[variant]}`;

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
