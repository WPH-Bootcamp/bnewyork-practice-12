export {};

// =============================================================
// 08 - API RESPONSE PATTERN (Result<T, E>)
// =============================================================
// Gabungan dari semua konsep: discriminated union + type predicate +
// exhaustive check. Pola yang aman untuk menangani response dari API.
// =============================================================

console.log("=== API RESPONSE PATTERN ===\n");

// STEP 1: tipe Result<T, E> - discriminated union yang reusable
type Result<T, E = string> =
  | { status: "success"; data: T }
  | { status: "error"; error: E };

// STEP 2: helper agar tidak perlu menulis `{ status: ..., data: ... }` berulang
function ok<T>(data: T): Result<T, never> {
  return { status: "success", data };
}

function fail<E>(error: E): Result<never, E> {
  return { status: "error", error };
}

console.log("ok:", ok({ nama: "Budi" }));
console.log("fail:", fail("DB timeout"));
console.log();

// STEP 3: simulasi API
interface User {
  id: number;
  nama: string;
  email: string;
}

// Error juga menggunakan discriminated union
type ApiError =
  | { code: "NOT_FOUND"; message: string }
  | { code: "UNAUTHORIZED"; message: string }
  | { code: "SERVER_ERROR"; message: string; retry: boolean };

function fetchUser(id: number): Result<User, ApiError> {
  if (id < 0) return fail({ code: "UNAUTHORIZED", message: "ID tidak valid" });
  if (id === 404) return fail({ code: "NOT_FOUND", message: "User tidak ada" });
  if (id === 500) {
    return fail({ code: "SERVER_ERROR", message: "Server down", retry: true });
  }
  return ok({ id, nama: "User-" + id, email: `user${id}@mail.com` });
}

// STEP 4: type predicate untuk narrowing
function isSuccess<T, E>(r: Result<T, E>): r is { status: "success"; data: T } {
  return r.status === "success";
}

function isError<T, E>(r: Result<T, E>): r is { status: "error"; error: E } {
  return r.status === "error";
}

// CARA PEMAKAIAN 1: if/else
const r1 = fetchUser(1);
const r2 = fetchUser(404);

if (isSuccess(r1)) {
  console.log("Sukses:", r1.data.nama, "-", r1.data.email);
}

if (isError(r2)) {
  console.log("Gagal:", r2.error.code, "-", r2.error.message);
}
console.log();

// CARA PEMAKAIAN 2: switch exhaustive untuk menangani semua error code
function tampilkanError(err: ApiError): string {
  switch (err.code) {
    case "NOT_FOUND":
      return "Tidak ditemukan: " + err.message;
    case "UNAUTHORIZED":
      return "Akses ditolak: " + err.message;
    case "SERVER_ERROR":
      return "Server error: " + err.message + (err.retry ? " (retry)" : "");
    default: {
      const _exhaustive: never = err;
      throw new Error("Code baru: " + JSON.stringify(_exhaustive));
    }
  }
}

const r3 = fetchUser(500);
if (isError(r3)) console.log(tampilkanError(r3.error));

const r4 = fetchUser(404);
if (isError(r4)) console.log(tampilkanError(r4.error));
console.log();

// CARA PEMAKAIAN 3: helper `match` (pattern matching)
function match<T, E, R>(
  result: Result<T, E>,
  onSuccess: (data: T) => R,
  onError: (error: E) => R,
): R {
  if (result.status === "success") return onSuccess(result.data);
  return onError(result.error);
}

const pesan1 = match(
  fetchUser(1),
  (user) => "HALO, " + user.nama,
  (err) => "ERROR: " + err.message,
);
console.log(pesan1);

const pesan2 = match(
  fetchUser(404),
  (user) => "HALO, " + user.nama,
  (err) => "ERROR: " + err.message,
);
console.log(pesan2);
console.log();

console.log("INTI: Result<T,E> + helper + type predicate = pola API yang aman.");
