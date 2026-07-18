import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Cloud, Layers, Cpu, Award, Zap, HardDrive, ShieldAlert, Network, Terminal } from 'lucide-react';

interface SkillsGridProps {
  categories: SkillCategory[];
  isDarkTheme: boolean;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ categories, isDarkTheme }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud Platforms': return <Cloud className="w-4 h-4" />;
      case 'Containers & Orchestration': return <Layers className="w-4 h-4" />;
      case 'Infrastructure as Code': return <Cpu className="w-4 h-4" />;
      case 'CI/CD & Automation': return <Zap className="w-4 h-4" />;
      case 'Programming & Scripting': return <Terminal className="w-4 h-4" />;
      case 'Observability & SRE': return <HardDrive className="w-4 h-4" />;
      case 'MLOps & AI Infra': return <Award className="w-4 h-4" />;
      case 'Security & Networking': return <ShieldAlert className="w-4 h-4" />;
      case 'GenAI & LLMOps': return <Cpu className="w-4 h-4" />;
      case 'Data & Messaging': return <HardDrive className="w-4 h-4" />;
      case 'Architecture & Leadership': return <Network className="w-4 h-4" />;
      case 'FinOps & Governance': return <Award className="w-4 h-4" />;
      default: return <Cloud className="w-4 h-4" />;
    }
  };

  const getProgressColor = (category: string) => {
    switch (category) {
      case 'Cloud Platforms': return 'bg-sky-500';
      case 'Containers & Orchestration': return 'bg-indigo-500';
      case 'Infrastructure as Code': return 'bg-purple-500';
      case 'CI/CD & Automation': return 'bg-amber-500';
      case 'Programming & Scripting': return 'bg-teal-500';
      case 'Observability & SRE': return 'bg-red-500';
      case 'MLOps & AI Infra': return 'bg-emerald-500';
      case 'GenAI & LLMOps': return 'bg-fuchsia-500';
      case 'Data & Messaging': return 'bg-cyan-500';
      case 'Architecture & Leadership': return 'bg-blue-600';
      case 'FinOps & Governance': return 'bg-lime-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="skills-grid-section">
      {categories.map((cat, idx) => (
        <div
          key={cat.category}
          id={`skill-cat-${idx}`}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 flex flex-col gap-4 transition-all duration-200"
        >
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50 dark:border-zinc-850">
            <span className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border dark:border-zinc-850 text-indigo-600 dark:text-emerald-400">
              {getCategoryIcon(cat.category)}
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider">{cat.category}</h4>
          </div>

          {/* Skill items */}
          <div className="flex flex-col gap-3">
            {cat.items.map((skill) => {
              const isHovered = hoveredSkill === skill.name;
              const progressColor = getProgressColor(cat.category);

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="flex flex-col gap-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-zinc-300 transition-colors duration-200 hover:text-indigo-600 dark:hover:text-emerald-400">
                      {skill.name}
                    </span>
                    <span className="text-[10px] opacity-60">{skill.level}%</span>
                  </div>

                  {/* Outer track */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden relative">
                    {/* Inner progress bar */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
