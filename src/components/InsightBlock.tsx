import { ReactNode } from "react";

interface InsightBlockProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function InsightBlock({ icon, title, children }: InsightBlockProps) {
  return (
    <div className="rounded-[24px] bg-surface-primary border border-line-strong p-[22px]">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary shrink-0">
          {icon}
        </span>
        <h3 className="text-[22px] font-bold text-primary tracking-tight leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-[19px] leading-[1.45] text-ink font-medium">{children}</p>
    </div>
  );
}
