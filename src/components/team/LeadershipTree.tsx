'use client';

import React, { useState } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  Clock,
  Phone,
  UserPlus,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Info,
  Crown,
  Briefcase,
  FileCheck2,
} from 'lucide-react';
import { OrgTreeNode } from '@/types';
import { INITIAL_LEADERSHIP_TREE } from '@/data/team';
import { AddLeaderModal } from './AddLeaderModal';

export const LeadershipTree: React.FC = () => {
  const [treeData, setTreeData] = useState<OrgTreeNode[]>(INITIAL_LEADERSHIP_TREE);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hasCustomNodes, setHasCustomNodes] = useState(false);

  // Collect all nodes to serve as potential parents in the Add Leader modal
  const getAllNodes = (nodes: OrgTreeNode[]): { id: string; label: string }[] => {
    let result: { id: string; label: string }[] = [];
    nodes.forEach((n) => {
      result.push({ id: n.id, label: `${n.position} (${n.name})` });
      if (n.children && n.children.length > 0) {
        result = result.concat(getAllNodes(n.children));
      }
    });
    return result;
  };

  const availableParents = getAllNodes(treeData);

  const handleAddLeader = (newNode: OrgTreeNode) => {
    setHasCustomNodes(true);
    setTreeData((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as OrgTreeNode[];

      const insertNode = (nodes: OrgTreeNode[]): boolean => {
        for (const node of nodes) {
          if (node.id === newNode.parentId) {
            node.children = node.children || [];
            node.children.push(newNode);
            return true;
          }
          if (node.children && node.children.length > 0) {
            if (insertNode(node.children)) return true;
          }
        }
        return false;
      };

      if (!newNode.parentId) {
        updated.push(newNode);
      } else {
        const inserted = insertNode(updated);
        if (!inserted) {
          // If parent not found, attach under root
          if (updated[0]) {
            updated[0].children = updated[0].children || [];
            updated[0].children.push(newNode);
          }
        }
      }

      return updated;
    });
  };

  const handleReset = () => {
    setTreeData(INITIAL_LEADERSHIP_TREE);
    setHasCustomNodes(false);
  };

  const presidentNode = treeData[0];
  const secondLevelNodes = presidentNode?.children || [];

  return (
    <div className="space-y-8">
      {/* Leadership Header Strip & Interactive Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
              Organizational Hierarchy
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
              Data-Driven & Expandable
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Directorate & Office-Bearers Structure
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Hierarchical organizational tree representing executive governance. Confirmed members are highlighted alongside positions awaiting formal Directorate confirmation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {hasCustomNodes && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Tree
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            + Add Position / Officer
          </button>
        </div>
      </div>

      {/* Visual Organizational Tree Display */}
      <div className="bg-slate-50/70 rounded-3xl border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden shadow-inner">
        {/* DESKTOP TREE VIEW (Visible on lg and above) */}
        <div className="hidden lg:block">
          {/* Level 1: Root Node (President) */}
          {presidentNode && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <NodeCard node={presidentNode} isRoot />
              </div>

              {/* Vertical connector from President */}
              {secondLevelNodes.length > 0 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-10 bg-amber-400" />
                  {/* Horizontal distributor line */}
                  <div
                    className="h-0.5 bg-slate-300 relative"
                    style={{
                      width: secondLevelNodes.length > 1 ? `${Math.min(secondLevelNodes.length * 280, 950)}px` : '2px',
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Level 2: Sub-Nodes (VP, Secretary, Treasurer, and custom nodes) */}
          {secondLevelNodes.length > 0 && (
            <div className="flex justify-center items-start gap-6 pt-0 flex-wrap">
              {secondLevelNodes.map((node) => (
                <div key={node.id} className="flex flex-col items-center">
                  {/* Vertical drop line from horizontal crossbar */}
                  <div className="w-0.5 h-8 bg-slate-300" />

                  <div className="w-[300px]">
                    <NodeCard node={node} />
                  </div>

                  {/* Level 3: Children if any */}
                  {node.children && node.children.length > 0 && (
                    <div className="flex flex-col items-center mt-2 w-full">
                      <div className="w-0.5 h-6 bg-slate-300" />
                      <div className="space-y-4 w-full">
                        {node.children.map((child) => (
                          <div key={child.id} className="w-[280px] mx-auto">
                            <NodeCard node={child} isSubBranch />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE & TABLET TREE VIEW (Responsive Indented Cards - No Horizontal Breakage) */}
        <div className="lg:hidden space-y-4">
          {presidentNode && (
            <div className="space-y-3">
              <div className="border-l-4 border-amber-400 pl-2">
                <NodeCard node={presidentNode} isRoot />
              </div>

              {secondLevelNodes.length > 0 && (
                <div className="pl-4 sm:pl-6 border-l-2 border-dashed border-slate-300 space-y-4 pt-2">
                  {secondLevelNodes.map((node) => (
                    <div key={node.id} className="space-y-3">
                      <NodeCard node={node} />

                      {node.children && node.children.length > 0 && (
                        <div className="pl-4 sm:pl-6 border-l-2 border-slate-300 space-y-3 pt-1">
                          {node.children.map((child) => (
                            <NodeCard key={child.id} node={child} isSubBranch />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Legend & Notice */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold text-slate-700">Confirmed Office-Bearer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="font-semibold text-slate-700">Confirmation Pending</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5" />
          <span>Use &quot;+ Add Position / Officer&quot; to preview additional leadership levels</span>
        </div>
      </div>

      <AddLeaderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableParents={availableParents}
        onAddLeader={handleAddLeader}
      />
    </div>
  );
};

interface NodeCardProps {
  node: OrgTreeNode;
  isRoot?: boolean;
  isSubBranch?: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, isRoot, isSubBranch }) => {
  const isConfirmed = node.status === 'confirmed';

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden shadow-sm hover:shadow-md ${
        isRoot
          ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-amber-400/50'
          : isConfirmed
          ? 'bg-white border-emerald-300 text-slate-900'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Node Header Banner */}
      <div
        className={`px-4 py-2.5 flex items-center justify-between gap-2 border-b ${
          isRoot
            ? 'bg-amber-400/10 border-amber-400/20'
            : isConfirmed
            ? 'bg-emerald-50/80 border-emerald-200'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5">
          {isRoot ? (
            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
          ) : isConfirmed ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span
            className={`text-[10px] font-black uppercase tracking-wider ${
              isRoot
                ? 'text-amber-300'
                : isConfirmed
                ? 'text-emerald-800'
                : 'text-amber-800'
            }`}
          >
            {isConfirmed ? 'Confirmed Officer' : 'Pending Confirmation'}
          </span>
        </div>

        {node.isCustomAdded && (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-900">
            Added Node
          </span>
        )}
      </div>

      {/* Node Content */}
      <div className="p-4 sm:p-5 space-y-2.5">
        <div>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider block ${
              isRoot ? 'text-amber-400' : 'text-blue-900'
            }`}
          >
            {node.position}
          </span>
          <h4
            className={`text-base sm:text-lg font-black tracking-tight ${
              isRoot ? 'text-white' : 'text-slate-900'
            }`}
          >
            {node.name}
          </h4>
        </div>

        {node.phone && (
          <div className="flex items-center gap-2 text-xs font-semibold pt-1">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <a
              href={`tel:${node.phone}`}
              className={
                isRoot
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-blue-900'
              }
            >
              {node.phone}
            </a>
          </div>
        )}

        {node.description && (
          <p
            className={`text-xs leading-relaxed ${
              isRoot ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {node.description}
          </p>
        )}
      </div>
    </div>
  );
};
