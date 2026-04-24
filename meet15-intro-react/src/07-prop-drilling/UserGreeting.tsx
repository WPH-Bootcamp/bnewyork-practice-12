// Komponen paling dalam - yang AKHIRNYA menggunakan data user
// (3 lapisan di atasnya hanya berfungsi sebagai perantara)

type User = {
  name: string;
  role: string;
};

type UserGreetingProps = {
  user: User;
};

export default function UserGreeting({ user }: UserGreetingProps) {
  return (
    <div className="p-3 border-2 border-green-500 rounded-lg bg-green-900/40">
      <p className="text-green-300 text-xs mb-2">
        🎯 &lt;UserGreeting /&gt; — AKHIRNYA menggunakan datanya
      </p>
      <p>
        👋 Halo <strong>{user.name}</strong>, Anda login sebagai{" "}
        <strong>{user.role}</strong>.
      </p>
    </div>
  );
}

// Solusi untuk prop drilling: Context API / state management (Zustand, Redux)
// Akan dibahas pada pertemuan berikutnya.
