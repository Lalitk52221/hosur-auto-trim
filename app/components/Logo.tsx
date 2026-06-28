// import Image from 'next/image'
// import React from 'react'

// export default function Logo() {
//   return (
//     <div className="flex items-center gap-0">
//           <a href="#home" className="text-(--hat-navy) font-bold text-lg tracking-widest py-4">
//             <Image src="/images/logo.png" alt="Logo" width={80} height={80} />
//           </a>
//           <div className="leading-tight">
//             <div className ="font-extrabold text-[15px] text-blue-950">HOSUR AUTO TRIMS</div>
//             <div className="text-[11px] tracking-[0.3em] 'text-slate-500">PVT. LTD.</div>
//           </div>
//         </div>
//   )
// }
import Image from "next/image";
import React from "react";

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${light? "bg-white rounded-full":""}`}>
        <a
          href="#home"
          className="text-(--hat-navy) font-bold text-lg tracking-widest py-4"
        >
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} />
        </a>
      </div>
      <div className="leading-tight">
        <div
          className={`font-extrabold tracking-wide text-[15px] ${light ? "text-white" : "text-(--hat-navy)"}`}
        >
          HOSUR AUTO TRIMS
        </div>
        <div
          className={`text-[11px] tracking-[0.3em] ${light ? "text-white/70" : "text-slate-500"}`}
        >
          PVT. LTD.
        </div>
      </div>
    </div>
  );
}
