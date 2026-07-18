import {
  Activity,
  BrainCircuit,
  Cloud,
  Cpu,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Cloud,
  Layers,
  Cpu,
  GitBranch,
  Terminal,
  Activity,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Cloud;
}
