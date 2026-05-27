import { ReactNode } from "react";

interface InfoSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function InfoSection({ icon, title, children }: InfoSectionProps) {
  return (
    <div className="pt-5 mt-5 border-t border-[#EEF0F8]">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-5 flex items-center justify-center text-primary">
          {icon}
        </span>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.10em] text-text-secondary">
          {title}
        </h3>
      </div>
      <p className="text-[15px] leading-[1.55] text-text-primary">{children}</p>
    </div>
  );
}
