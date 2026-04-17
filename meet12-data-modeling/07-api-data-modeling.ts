export {};

// =============================================================
// 07 - MINI PROJECT: MAPPING TYPESCRIPT KE SHAPE DATA API
// =============================================================
// Jalankan file ini: npx ts-node meet12-data-modeling/07-api-data-modeling.ts
// =============================================================
//
// Gabungan SEMUA materi Meet 12:
//   - any vs unknown / tipe eksplisit
//   - readonly
//   - type vs interface
//   - Record / index signature
//   - keyof, typeof, as const
//   - generic
//
// Konteks: API ala JSONPlaceholder --> User, Post, Comment.

console.log("==========================================");
console.log("   BAGIAN 7: MINI PROJECT API DATA MODELING");
console.log("==========================================\n");

// =====================
// STEP 1: PRIMITIVE ALIAS (biar semantik)
// =====================

type UserID    = number;
type PostID    = number;
type CommentID = number;

// =====================
// STEP 2: KONSTANTA dengan as const
// =====================

const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

type PostStatus = typeof POST_STATUS[keyof typeof POST_STATUS];
// "draft" | "published" | "archived"

// =====================
// STEP 3: INTERFACE UNTUK ENTITY
// =====================

interface Address {
  readonly street: string;
  readonly city: string;
  readonly zipcode: string;
}

interface User {
  readonly id: UserID;
  readonly email: string;
  name: string;
  username: string;
  address: Address;
  phone?: string;
}

interface Post {
  readonly id: PostID;
  readonly userId: UserID;
  title: string;
  body: string;
  status: PostStatus;
  tags: readonly string[];
}

interface Comment {
  readonly id: CommentID;
  readonly postId: PostID;
  name: string;
  email: string;
  body: string;
}

// =====================
// STEP 4: GENERIC RESPONSE
// =====================

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// =====================
// STEP 5: LOOKUP TABLE pakai Record
// =====================

type UserLookup = Record<UserID, User>;

// =====================
// STEP 6: DATA DUMMY
// =====================

const users: User[] = [
  {
    id: 1,
    email: "budi@mail.com",
    name: "Budi Santoso",
    username: "budi",
    address: { street: "Jl. Merdeka 1", city: "Jakarta", zipcode: "10110" },
    phone: "081234567890",
  },
  {
    id: 2,
    email: "ani@mail.com",
    name: "Ani Wijaya",
    username: "ani",
    address: { street: "Jl. Sudirman 45", city: "Bandung", zipcode: "40111" },
  },
];

const posts: Post[] = [
  {
    id: 101,
    userId: 1,
    title: "Halo TypeScript",
    body: "Post pertama saya belajar TS.",
    status: POST_STATUS.PUBLISHED,
    tags: ["typescript", "belajar"],
  },
  {
    id: 102,
    userId: 2,
    title: "Tips React Hooks",
    body: "useState itu simple tapi powerful.",
    status: POST_STATUS.PUBLISHED,
    tags: ["react", "hooks"],
  },
  {
    id: 103,
    userId: 1,
    title: "Draft saya",
    body: "Belum selesai.",
    status: POST_STATUS.DRAFT,
    tags: [],
  },
];

const comments: Comment[] = [
  { id: 1, postId: 101, name: "Ani", email: "a@m.com", body: "Keren!" },
  { id: 2, postId: 101, name: "Citra", email: "c@m.com", body: "Lanjut bang!" },
  { id: 3, postId: 102, name: "Budi", email: "b@m.com", body: "Thanks tipsnya." },
];

// =====================
// STEP 7: HELPER GENERIC
// =====================

function findById<T extends { id: number }>(items: readonly T[], id: number): T | undefined {
  return items.find((it) => it.id === id);
}

function toLookup<T extends { id: number }>(items: readonly T[]): Record<number, T> {
  const lookup: Record<number, T> = {};
  for (const item of items) lookup[item.id] = item;
  return lookup;
}

function sortBy<T>(items: readonly T[], key: keyof T): T[] {
  return [...items].sort((a, b) => (a[key] > b[key] ? 1 : -1));
}

function fetchPost(id: PostID): Result<Post> {
  const post = findById(posts, id);
  if (post) return { ok: true, data: post };
  return { ok: false, error: `Post dengan id ${id} tidak ditemukan` };
}

function bungkusResponse<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

// =====================
// STEP 8: DEMO - HASIL NYATA
// =====================

console.log("--- [1] Daftar User ---");
users.forEach((u) => {
  console.log(`  [${u.id}] ${u.name} (${u.email}) - kota: ${u.address.city}`);
});
console.log();

console.log("--- [2] Lookup User by ID (Record<UserID, User>) ---");
const userLookup: UserLookup = toLookup(users);
console.log("userLookup[1]:", userLookup[1].name);
console.log("userLookup[2]:", userLookup[2].name);
console.log();

console.log("--- [3] Daftar Post + nama author (pakai lookup) ---");
posts.forEach((p) => {
  const author = userLookup[p.userId];
  console.log(`  [${p.id}] "${p.title}" by ${author.name} [${p.status}]`);
});
console.log();

console.log("--- [4] fetchPost --> Result<T> (discriminated union) ---");
const r1 = fetchPost(101);
if (r1.ok) console.log("  [BENAR ] Post ketemu:", r1.data.title);
else       console.log("  [SALAH ] Error     :", r1.error);

const r2 = fetchPost(999);
if (r2.ok) console.log("  [BENAR ] Post ketemu:", r2.data.title);
else       console.log("  [SALAH ] Error     :", r2.error);
console.log();

console.log("--- [5] Komentar untuk Post 101 ---");
comments
  .filter((c) => c.postId === 101)
  .forEach((c) => console.log(`  > ${c.name}: "${c.body}"`));
console.log();

console.log("--- [6] sortBy dengan keyof (urut by title) ---");
sortBy(posts, "title").forEach((p) => console.log(`  - ${p.title}`));
// sortBy(posts, "warna");
// ^ TS ERROR: "Argument of type '\"warna\"' is not assignable to parameter of type 'keyof Post'."
console.log("  [SALAH] sortBy(posts, 'warna') --> TS ERROR: 'warna' bukan key Post");
console.log();

console.log("--- [7] ApiResponse<T> pembungkus generic ---");
const response = bungkusResponse(users, "OK, user ditemukan");
console.log("success :", response.success);
console.log("message :", response.message);
console.log("jumlah  :", response.data.length);
console.log();

console.log("--- [8] DEMO readonly: BENAR vs SALAH ---");
const post1 = posts[0];
post1.title = "Judul Baru"; // BENAR: title mutable
console.log("  [BENAR] ubah title post --> ", post1.title);

// post1.id = 999;
// ^ TS ERROR: "Cannot assign to 'id' because it is a read-only property."
console.log("  [SALAH] post1.id = 999 --> TS ERROR: id readonly");

// post1.tags.push("baru");
// ^ TS ERROR: "Property 'push' does not exist on type 'readonly string[]'."
console.log("  [SALAH] post1.tags.push('baru') --> TS ERROR: tags readonly[]");
console.log();

console.log("--- [9] DEMO as const: status TIDAK BISA sembarangan ---");
// post1.status = "random";
// ^ TS ERROR: "Type '\"random\"' is not assignable to type '\"draft\" | \"published\" | \"archived\"'."
console.log("  [SALAH] post1.status = 'random' --> TS ERROR: bukan PostStatus");
post1.status = POST_STATUS.ARCHIVED;
console.log("  [BENAR] post1.status = POST_STATUS.ARCHIVED -->", post1.status);
console.log();

console.log("==========================================");
console.log("  KONSEP YANG DIPAKAI:");
console.log("  1. Primitive alias (UserID, PostID)");
console.log("  2. readonly (id, email, tags, address)");
console.log("  3. type vs interface (entity pakai interface,");
console.log("     union/result pakai type)");
console.log("  4. Record<UserID, User> --> lookup table");
console.log("  5. as const + keyof typeof --> PostStatus");
console.log("  6. Generic: findById, toLookup, sortBy,");
console.log("     ApiResponse<T>, Result<T>");
console.log("==========================================");
console.log("   SELAMAT! Kamu sudah menguasai TS Data Modeling!");
console.log("==========================================\n");
