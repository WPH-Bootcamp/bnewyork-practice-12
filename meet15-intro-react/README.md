# Meet 16 — Intro React (React + TypeScript)

> **Goal class**: Mentee paham kenapa kita pakai React, tau aturan JSX, bisa bikin
> functional component, paham props (termasuk `children`), bisa styling pakai
> `className`, dan ngerti apa itu "prop drilling".

---

## 🧭 Alur ngajar (± 90 menit)

| No  | Topik                           | File                                  | Estimasi |
| --- | ------------------------------- | ------------------------------------- | -------- |
| 0   | Kenapa React (vs DOM manual)    | `00-vanilla-vs-react/vanilla-dom.html`| 10 menit |
| 1   | Setup React + TS (Vite)         | README ini (section Setup)            | 10 menit |
| 2   | JSX rules                       | `src/01-JsxRules.tsx`                 | 10 menit |
| 3   | Functional component            | `src/02-Welcome.tsx`                  | 10 menit |
| 4   | Props: passing data             | `src/03-Greeting.tsx` + `04-UserCard.tsx` | 15 menit |
| 5   | Props `children`                | `src/05-Card.tsx`                     | 10 menit |
| 6   | Styling: `className` + Tailwind | `src/06-Button.tsx`                   | 10 menit |
| 7   | Component tree & prop drilling  | `src/07-prop-drilling/*`              | 15 menit |

---

## ⚙️ Setup project React + TS + Tailwind v4 (dari nol)

Ini cara "resmi" yang mentee harus bisa ulang sendiri:

```bash
# 1. Bikin project React + TS pakai Vite
npm create vite@latest nama-project -- --template react-ts
cd nama-project
npm install

# 2. Install Tailwind v4 + Vite plugin
npm install -D tailwindcss @tailwindcss/vite

# 3. Daftarin plugin di vite.config.ts:
#       import tailwindcss from "@tailwindcss/vite";
#       plugins: [react(), tailwindcss()]
#
# 4. Edit src/index.css → cukup 1 baris:
#       @import "tailwindcss";
#
#    (udah GA PERLU tailwind.config.js & postcss.config.js di v4)

# 5. Jalanin
npm run dev
```

**Untuk class ini**, folder `meet16-intro-react` udah lengkap (Vite + TS + Tailwind).
Mentor/mentee cukup:

```bash
cd meet16-intro-react
npm install
npm run dev
```

Buka `http://localhost:5173` → semua lesson tampil di satu halaman.

> 💡 **Tips ngajar Tailwind**: install VS Code extension **"Tailwind CSS IntelliSense"**
> supaya mentee dapet autocomplete + preview CSS saat hover className.

---

## 🧑‍🏫 Tips ngajar

1. **Mulai dari vanilla dulu** — buka `00-vanilla-vs-react/vanilla-dom.html` di browser, tunjukkan kode `document.createElement(...)` yang panjang. Baru bandingin sama React. Biar mentee ngerasain "sakit"-nya DOM manual dulu.
2. **Live coding > slide**. Ubah sesuatu di file, refresh, tunjukin efeknya.
3. **Pakai React DevTools** (extension Chrome) untuk lihat component tree waktu bahas prop drilling.
4. **Setiap lesson ada section `// 🧠 AHA MOMENT`** di komentar file — itu bagian yang paling penting dijelaskan.
