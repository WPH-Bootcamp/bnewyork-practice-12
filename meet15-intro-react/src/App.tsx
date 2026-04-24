// App.tsx - komponen akar, me-render seluruh lesson dalam 1 halaman

import JsxRules from "./01-JsxRules";
import Welcome, { ProductList } from "./02-Welcome";
import Greeting from "./03-Greeting";
import UserCard from "./04-UserCard";
import Card from "./05-Card";
import Button from "./06-Button";
import Dashboard from "./07-prop-drilling/Dashboard";

// Data dummy (pada kondisi nyata diambil dari API)
const users = [
  { id: 1, name: "Budi Santoso", email: "budi@mail.com", hobbies: ["coding", "kopi"] },
  { id: 2, name: "Siti Aminah", email: "siti@mail.com", hobbies: ["nulis", "lari"] },
];

const currentUser = { name: "Henry", role: "Admin" };

// Wrapper untuk setiap section agar App.tsx tidak repetitif
type LessonProps = {
  title: string;
  desc: string;
  children: React.ReactNode;
};

function Lesson({ title, desc, children }: LessonProps) {
  return (
    <section className="mb-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl text-blue-400 font-bold mb-1">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{desc}</p>
      <div className="p-4 bg-slate-900 rounded-lg border border-dashed border-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">🚀 Meet 16 — Intro React</h1>
        <p className="text-slate-400 mb-8">
          Seluruh lesson di bawah ini akan langsung tampil secara live.
        </p>

        <Lesson
          title="01 — JSX Rules"
          desc="Aturan main JSX: satu parent, camelCase, self-close, {} untuk JS, dan sebagainya."
        >
          <JsxRules />
        </Lesson>

        <Lesson
          title="02 — Functional Component"
          desc="Component = fungsi yang return JSX. Dapat digunakan berulang kali."
        >
          {/* 1 komponen dipasang 3x -> menghasilkan 3 output */}
          <Welcome />
          <Welcome />
          <Welcome />

          <div className="mt-6 pt-4 border-t border-slate-700">
            <ProductList />
          </div>
        </Lesson>

        <Lesson
          title="03 — Props: Passing Data"
          desc='Props = "argumen" untuk komponen. 1 komponen, data yang berbeda-beda.'
        >
          <Greeting name="Budi" umur={25} kota="Jakarta" />
          <Greeting name="Siti" umur={30} />
          <Greeting name="Andi" umur={22} kota="Bandung" />
        </Lesson>

        <Lesson
          title="04 — Props: Object & Array"
          desc="Props dapat berupa object & array. Me-render list menggunakan .map() + key."
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Lesson>

        <Lesson
          title="05 — Props Children"
          desc="Card = wadah. Isinya fleksibel, dikirim melalui `children`."
        >
          <Card title="📝 Tentang Saya">
            <p>Saya adalah frontend developer.</p>
            <p>Hobi: coding sambil menikmati kopi.</p>
          </Card>

          {/* children dapat berisi component lain */}
          <Card title="👥 User Card di dalam Card">
            <UserCard user={users[0]} />
          </Card>
        </Lesson>

        <Lesson
          title="06 — Styling: className + Tailwind"
          desc="className + Tailwind utilities. Variant button menggunakan props."
        >
          <Button label="Simpan" variant="primary" onClick={() => alert("Saved!")} />
          <Button label="Batal" variant="secondary" />
          <Button label="Hapus" variant="danger" onClick={() => alert("Deleted!")} />
        </Lesson>

        <Lesson
          title="07 — Component Tree & Prop Drilling"
          desc="Data user di-drilling dari App -> Dashboard -> Header -> UserGreeting."
        >
          {/* App mengirim user -> Dashboard -> Header -> UserGreeting */}
          <Dashboard user={currentUser} />
        </Lesson>
      </div>
    </div>
  );
}
