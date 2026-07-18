import { Cloud, Database, Lock, Monitor, Network, Server, Sparkles } from 'lucide-react';
import type { ArchitectureDiagram as ArchitectureDiagramType } from '@/lib/types';

const TYPE_STYLE: Record<string, { icon: typeof Cloud; className: string }> = {
  client: { icon: Monitor, className: 'text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900' },
  network: { icon: Network, className: 'text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900' },
  compute: { icon: Server, className: 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900' },
  database: { icon: Database, className: 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900' },
  storage: { icon: Cloud, className: 'text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900' },
  security: { icon: Lock, className: 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900' },
  ml: { icon: Sparkles, className: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900' },
};

export function ArchitectureDiagram({ diagram }: { diagram: ArchitectureDiagramType }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
      <div className="flex flex-col gap-2">
        {diagram.nodes.map((node) => {
          const style = TYPE_STYLE[node.type] ?? TYPE_STYLE.compute;
          const Icon = style.icon;
          const outgoing = diagram.edges.filter((e) => e.from === node.id);
          return (
            <div key={node.id} className="flex flex-col gap-1">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-white dark:bg-zinc-900 text-xs font-bold font-mono ${style.className}`}>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{node.label}</span>
              </div>
              {outgoing.map((edge, i) => (
                <div key={i} className="ml-4 pl-3 border-l border-dashed border-slate-300 dark:border-zinc-700 text-[10px] text-slate-400 dark:text-zinc-500 font-mono py-0.5">
                  → {edge.label ?? 'flows to'} → <span className="text-slate-600 dark:text-zinc-300">{diagram.nodes.find((n) => n.id === edge.to)?.label ?? edge.to}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
