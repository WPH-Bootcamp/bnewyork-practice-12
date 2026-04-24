// =============================================================
// 07 - COMPONENT TREE & PROP DRILLING
// =============================================================
// Struktur:
//   App -> Dashboard -> Header -> UserGreeting
//
// Prop drilling = data dilewatkan melalui banyak lapisan component,
// padahal yang membutuhkan hanya component paling bawah.
// =============================================================

import Header from "./Header";

type User = {
  name: string;
  role: string;
};

type DashboardProps = {
  user: User;
};

// Dashboard sendiri TIDAK menggunakan user, hanya meneruskan ke Header
export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="p-3 border-2 border-dashed border-blue-400 rounded-lg">
      <p className="text-blue-400 text-xs mb-2">
        📦 &lt;Dashboard /&gt; — meneruskan `user` ke Header
      </p>

      {/* Drilling #1: Dashboard meneruskan user ke Header */}
      <Header user={user} />

      <div className="mt-2">
        <p>... isi dashboard lainnya ada di sini ...</p>
      </div>
    </div>
  );
}
