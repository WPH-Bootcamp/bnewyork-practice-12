// =============================================================
// 05 - PROPS CHILDREN
// =============================================================
// `children` adalah prop spesial pada React. Isinya adalah apa pun
// yang ditulis DI ANTARA tag pembuka dan tag penutup:
//
//   <Card>
//     <h2>Isi</h2>   <- ini adalah children
//   </Card>
//
// Kegunaannya: membuat component wadah (mirip seperti <div>).
// =============================================================

import type { ReactNode } from "react";

// ReactNode = tipe untuk apa pun yang dapat di-render oleh React
// (string, number, JSX element, array, null, dan sebagainya)
type CardProps = {
  title: string;
  children: ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="p-4 bg-slate-700 rounded-lg mb-3">
      <h4 className="text-amber-400 font-semibold mb-2">{title}</h4>

      {/* Slot untuk apa pun yang diberikan oleh parent */}
      <div>{children}</div>
    </div>
  );
}
