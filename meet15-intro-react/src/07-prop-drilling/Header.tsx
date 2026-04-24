// Header juga tidak menggunakan `user`, hanya diteruskan ke UserGreeting
import UserGreeting from "./UserGreeting";

type User = {
  name: string;
  role: string;
};

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <div className="p-3 border-2 border-dashed border-amber-400 rounded-lg mb-2">
      <p className="text-amber-400 text-xs mb-2">
        🎩 &lt;Header /&gt; — meneruskan `user` ke UserGreeting
      </p>

      {/* Drilling #2: Header meneruskan kembali ke UserGreeting */}
      <UserGreeting user={user} />
    </div>
  );
}
