// =============================================================
// 04 - PROPS: OBJECT & ARRAY
// =============================================================
// Props tidak hanya string / number, tetapi juga dapat berupa
// object, array, bahkan function.
// =============================================================

type User = {
  id: number;
  name: string;
  email: string;
  hobbies: string[];
};

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="p-3 border border-slate-600 rounded-lg mb-2 bg-slate-800">
      <h4 className="font-semibold text-slate-100">{user.name}</h4>
      <p className="text-sm text-slate-400">📧 {user.email}</p>

      <p className="text-sm mt-2">
        🎯 Hobby:{" "}
        {/* Render array menggunakan .map(). `key` WAJIB ada - sebagai ID unik untuk React */}
        {user.hobbies.map((hobby, index) => (
          <span key={index} className="mr-2 text-sky-400">
            #{hobby}
          </span>
        ))}
      </p>
    </div>
  );
}
