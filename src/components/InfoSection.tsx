import { ReactNode } from "react";

interface InfoSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  accent?: "primary" | "default";
}

export function InfoSection({
  icon,
  title,
  children,
  accent = "default",
}: InfoSectionProps) {
  return (
    <div className="pt-[22px] mt-[22px] border-t border-line-soft">
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="w-7 h-7 flex items-center justify-center text-primary shrink-0">
          {icon}
        </span>
        <h3
          className={`text-[22px] font-bold tracking-tight leading-tight ${
            accent === "primary" ? "text-primary" : "text-ink"
          }`}
        >
          {title}
        </h3>
      </div>
      <p className="text-[18px] leading-[1.5] text-ink-soft">{children}</p>
    </div>
  );
}
