import { ReactNode } from "react";

interface InsightSectionProps {
  title: string;
  children: ReactNode;
}

export function InsightSection({ title, children }: InsightSectionProps) {
  return (
    <div
      className="
        relative
        rounded-[22px]
        p-5
        bg-gradient-to-br from-[#EEF0FF] to-[#DFE4FF]
        border border-[#DDE2FF]
      "
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(82,105,255,0.14)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3C8.13 3 5 6.13 5 10C5 12.38 6.19 14.47 8 15.74V18C8 18.55 8.45 19 9 19H15C15.55 19 16 18.55 16 18V15.74C17.81 14.47 19 12.38 19 10C19 6.13 15.87 3 12 3Z"
              fill="#5269FF"
            />
            <path
              d="M9 20H15M10 22H14"
              stroke="#5269FF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.10em] text-primary">
          {title}
        </h3>
      </div>
      <p className="text-[17px] leading-[1.5] text-text-primary font-medium">
        {children}
      </p>
    </div>
  );
}
