import type { ReactNode } from "react";

export default function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs font-mono text-muted truncate">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}
