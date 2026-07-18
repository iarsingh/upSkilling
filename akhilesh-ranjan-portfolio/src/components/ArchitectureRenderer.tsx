import React, { useState } from 'react';
import { ArchitectureDiagram } from '../types';
import { Network, Database, Shield, Cpu, Server, HardDrive, Smartphone, Globe, ArrowRight, Info } from 'lucide-react';

interface ArchitectureRendererProps {
  diagram: ArchitectureDiagram;
}

export const ArchitectureRenderer: React.FC<ArchitectureRendererProps> = ({ diagram }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Smartphone className="w-5 h-5" />;
      case 'network': return <Globe className="w-5 h-5" />;
      case 'compute': return <Cpu className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'storage': return <HardDrive className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'ml': return <Cpu className="w-5 h-5 text-purple-400" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getNodeColorClass = (type: string, isHovered: boolean, isRelated: boolean) => {
    const baseClass = isHovered 
      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10 scale-105' 
      : isRelated
      ? 'border-indigo-400 bg-indigo-500/5 text-indigo-300 shadow-md scale-102'
      : 'border-slate-200 bg-white text-slate-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200';

    switch (type) {
      case 'security':
        return isHovered ? 'border-red-500 bg-red-500/10 text-red-400 shadow-lg' : isRelated ? 'border-amber-400 bg-amber-500/5 text-amber-300' : 'border-amber-200 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10 text-amber-700 dark:text-amber-400';
      case 'ml':
        return isHovered ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-lg' : isRelated ? 'border-pink-400 bg-pink-500/5 text-pink-300' : 'border-purple-200 dark:border-purple-900/40 bg-purple-50/20 dark:bg-purple-950/10 text-purple-700 dark:text-purple-400';
      default:
        return baseClass;
    }
  };

  // Find related nodes
  const relatedNodeIds = new Set<string>();
  if (hoveredNodeId) {
    diagram.edges.forEach(edge => {
      if (edge.from === hoveredNodeId) relatedNodeIds.add(edge.to);
      if (edge.to === hoveredNodeId) relatedNodeIds.add(edge.from);
    });
  }

  return (
    <div className="flex flex-col gap-4 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 bg-slate-50/40 dark:bg-zinc-950/20" id={`architecture-view-${diagram.id}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-3 border-slate-100 dark:border-zinc-900">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{diagram.title}</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{diagram.description}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 px-2 py-1 rounded border dark:border-zinc-800 self-start no-print">
          <Info className="w-3 h-3 text-indigo-500" />
          <span>Hover a node to view its direct connections</span>
        </div>
      </div>

      {/* Graphical Grid Topology Simulation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 relative py-4" id="topology-nodes">
        {diagram.nodes.map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const isRelated = relatedNodeIds.has(node.id);
          const borderStyle = getNodeColorClass(node.type, isHovered, isRelated);

          return (
            <div
              key={node.id}
              id={`node-${diagram.id}-${node.id}`}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all duration-350 cursor-pointer select-none relative overflow-hidden ${borderStyle}`}
            >
              {/* Pulse effect if active */}
              {(isHovered || isRelated) && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-850 border dark:border-zinc-800">
                  {getNodeIcon(node.type)}
                </span>
                <span className="text-xs font-bold truncate leading-tight">{node.label}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider opacity-60 font-mono mt-1">{node.type}</span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Data Flow Highlights */}
      <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-3 rounded-xl">
        <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
          Active Connection Flow
        </h5>
        
        <div className="flex flex-col gap-1.5" id="flow-details">
          {diagram.edges.map((edge, index) => {
            const isSelfHovered = hoveredNodeId === edge.from || hoveredNodeId === edge.to;
            const fromNode = diagram.nodes.find(n => n.id === edge.from);
            const toNode = diagram.nodes.find(n => n.id === edge.to);

            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all text-xs ${
                  isSelfHovered
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium'
                    : hoveredNodeId
                    ? 'opacity-20'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                <span className="font-semibold">{fromNode?.label}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                <span className="font-semibold">{toNode?.label}</span>
                {edge.label && (
                  <span className="text-[10px] opacity-60 ml-auto font-mono bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    {edge.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
