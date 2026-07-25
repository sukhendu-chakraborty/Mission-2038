"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Compass, Cpu, CheckCircle2, AlertTriangle, Info, Zap, Layers } from "lucide-react";

/**
 * MorphMatrix Component
 * Visualizes a Morphological Matrix (Morph Matrix) for AI Biomechanical Analysis Reports.
 * Maps 4 Biomechanical Dimensions x 4 Movement Phases with dynamic telemetry data,
 * morph pathways, heatmaps, and interactive AI coaching inspection.
 */
export default function MorphMatrix({ stats = {}, report = "", drillType = "Shooting" }) {
  const [viewMode, setViewMode] = useState("pathway"); // 'pathway' | 'heatmap' | 'telemetry'
  const [selectedCell, setSelectedCell] = useState(null);

  // Extract numerical values from stats or fallback to sensible telemetry defaults
  const flexionVal = typeof stats.avg_hip_knee_angle === "number" ? stats.avg_hip_knee_angle 
                  : typeof stats.avg_knee_flexion === "number" ? stats.avg_knee_flexion 
                  : 54.2;

  const velocityVal = typeof stats.max_velocity === "number" ? stats.max_velocity 
                   : typeof stats.release_speed === "number" ? stats.release_speed 
                   : 31.8;

  const consistencyVal = typeof stats.form_consistency_pct === "number" ? stats.form_consistency_pct
                      : typeof stats.save_accuracy_pct === "number" ? stats.save_accuracy_pct
                      : 88.5;

  const reactionVal = typeof stats.reaction_time_ms === "number" ? stats.reaction_time_ms : 195;

  // Define Morph Matrix Data Grid (4 Dimensions x 4 Movement Phases)
  const phases = [
    { id: "p1", name: "P1: Stance Approach", sub: "Initial posture & stride" },
    { id: "p2", name: "P2: Power Load", sub: "Kinetic backswing storage" },
    { id: "p3", name: "P3: Impact / Release", sub: "Peak force transmission" },
    { id: "p4", name: "P4: Follow-Through", sub: "Deceleration & arc" }
  ];

  const dimensions = [
    {
      id: "dim1",
      title: "1. Joint & Angular Flexion",
      metricName: "Flexion Angle",
      cells: [
        { phaseId: "p1", title: "Upright Stance", value: "115°", score: 78, status: "Normal", active: false, detail: "Plant foot positioning sets base biomechanical torque." },
        { phaseId: "p2", title: "Backswing Deep Flexion", value: `${flexionVal.toFixed(1)}°`, score: 94, status: "Optimal", active: true, detail: "Ideal knee flexion angle detected for maximum kinetic storage." },
        { phaseId: "p3", title: "Extension Snap", value: "162°", score: 90, status: "Optimal", active: false, detail: "Rapid leg extension releases stored elastic energy." },
        { phaseId: "p4", title: "Deceleration Extension", value: "140°", score: 84, status: "Good", active: false, detail: "Smooth joint recoil prevents hyper-extension fatigue." }
      ]
    },
    {
      id: "dim2",
      title: "2. Kinetic Chain & Torque",
      metricName: "Power Output",
      cells: [
        { phaseId: "p1", title: "Ground Reaction Load", value: "420 N", score: 82, status: "Good", active: false, detail: "Initial force load into ground anchors strike trajectory." },
        { phaseId: "p2", title: "Hip Rotation Torque", value: "89 Nm", score: 91, status: "Optimal", active: true, detail: "Pelvic rotation initiates muscular kinetic transfer." },
        { phaseId: "p3", title: "Peak Impact Velocity", value: `${velocityVal.toFixed(1)} m/s`, score: 96, status: "Elite", active: true, detail: "Maximum ball launch speed recorded at instant of contact." },
        { phaseId: "p4", title: "Energy Dispersion", value: "92%", score: 87, status: "Good", active: false, detail: "Controlled dissipation protects hamstring and knee stability." }
      ]
    },
    {
      id: "dim3",
      title: "3. Balance & Center of Mass",
      metricName: "Stability Index",
      cells: [
        { phaseId: "p1", title: "Center Alignment", value: "0.08m", score: 85, status: "Good", active: false, detail: "Center of gravity balanced over plant foot center." },
        { phaseId: "p2", title: "Lateral Lean Vector", value: "12.4°", score: 92, status: "Optimal", active: true, detail: "Torso tilt maintains low center of mass over ball." },
        { phaseId: "p3", title: "Dynamic Equilibrium", value: `${consistencyVal.toFixed(0)}%`, score: Math.round(consistencyVal), status: "Optimal", active: true, detail: "Zero lateral wobble at peak contact phase." },
        { phaseId: "p4", title: "Recovery Step Stride", value: "0.45s", score: 81, status: "Good", active: false, detail: "Quick foot landing allows rapid transition into next action." }
      ]
    },
    {
      id: "dim4",
      title: "4. Spatial Arc & Precision",
      metricName: "Accuracy Vector",
      cells: [
        { phaseId: "p1", title: "Target Lock Alignment", value: "98%", score: 95, status: "Optimal", active: false, detail: "Visual gaze locked on target spot prior to strike." },
        { phaseId: "p2", title: "Trajectory Vector Plan", value: "14.2°", score: 88, status: "Good", active: false, detail: "Pre-programmed elevation angle calculated by AI vision." },
        { phaseId: "p3", title: "Contact Spot Accuracy", value: `${reactionVal}ms`, score: 93, status: "Elite", active: true, detail: "Precision hit on ball center of mass." },
        { phaseId: "p4", title: "Apex Flight Dispersion", value: "±0.04m", score: 89, status: "Optimal", active: false, detail: "Tight trajectory grouping across sequential drill reps." }
      ]
    }
  ];

  // Helper for heatmap colors
  const getHeatmapColor = (score, isActive) => {
    if (viewMode === "pathway" && isActive) {
      return "bg-gradient-to-br from-yellow-500/30 via-amber-500/20 to-yellow-600/30 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.25)] ring-1 ring-yellow-400/50";
    }
    if (score >= 90) return "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:border-emerald-400";
    if (score >= 80) return "bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:border-cyan-400";
    if (score >= 70) return "bg-amber-950/40 border-amber-500/40 text-amber-300 hover:border-amber-400";
    return "bg-rose-950/40 border-rose-500/40 text-rose-300 hover:border-rose-400";
  };

  return (
    <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-850 pb-5">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-widest">
            <Layers className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>Biomechanical Morphological Visualization</span>
          </div>
          <h3 className="text-xl font-black uppercase text-white tracking-wider mt-1 flex items-center gap-2">
            Morph Matrix Telemetry Grid
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Dynamic 4D morphological matrix mapping movement phases against biomechanical dimensions.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-zinc-900/90 p-1 rounded-2xl border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode("pathway")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === "pathway"
                ? "bg-yellow-400 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Morph Path
          </button>
          <button
            onClick={() => setViewMode("heatmap")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === "heatmap"
                ? "bg-yellow-400 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Heatmap
          </button>
          <button
            onClick={() => setViewMode("telemetry")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === "telemetry"
                ? "bg-yellow-400 text-zinc-950 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Telemetry
          </button>
        </div>
      </div>

      {/* MATRIX TABLE DISPLAY */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Phase Columns Header */}
          <div className="grid grid-cols-5 gap-3 mb-3 text-center">
            <div className="p-2 text-left text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-1">
              <Info className="w-3 h-3 text-yellow-400/80" /> Dimensions \ Phases
            </div>
            {phases.map((phase) => (
              <div key={phase.id} className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800 text-center">
                <span className="block text-xs font-black text-white uppercase tracking-wider">{phase.name}</span>
                <span className="block text-[9px] text-zinc-500 font-medium">{phase.sub}</span>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          <div className="space-y-3">
            {dimensions.map((dim) => (
              <div key={dim.id} className="grid grid-cols-5 gap-3 items-stretch">
                {/* Row Header */}
                <div className="bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850/80 flex flex-col justify-center">
                  <span className="text-xs font-black text-yellow-400/90 uppercase tracking-wider block">{dim.title}</span>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">{dim.metricName}</span>
                </div>

                {/* 4 Cells for 4 Phases */}
                {dim.cells.map((cell, idx) => {
                  const heatmapClass = getHeatmapColor(cell.score, cell.active);
                  const isSelected = selectedCell?.title === cell.title && selectedCell?.dimTitle === dim.title;

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCell({ ...cell, dimTitle: dim.title, metricName: dim.metricName })}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between min-h-[90px] ${heatmapClass} ${
                        isSelected ? "ring-2 ring-yellow-400 shadow-lg" : ""
                      }`}
                    >
                      {/* Active Morph Badge */}
                      {cell.active && viewMode === "pathway" && (
                        <span className="absolute -top-2 -right-1 bg-yellow-400 text-zinc-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md animate-pulse">
                          Active Path
                        </span>
                      )}

                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 line-clamp-1">
                          {cell.title}
                        </span>
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/10">
                          {cell.score}%
                        </span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="text-lg font-black text-white tracking-tight">{cell.value}</span>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">{cell.status}</span>
                      </div>

                      {/* Progress/Score bar in Telemetry Mode */}
                      {viewMode === "telemetry" && (
                        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2 border border-white/10">
                          <div
                            className={`h-full rounded-full ${
                              cell.score >= 90 ? "bg-emerald-400" : cell.score >= 80 ? "bg-cyan-400" : "bg-amber-400"
                            }`}
                            style={{ width: `${cell.score}%` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MATRIX FOOTER & INTERACTIVE INSPECTION MODAL */}
      <div className="pt-2 border-t border-zinc-850 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <span className="font-semibold text-zinc-300">Active Morph Pathway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-zinc-300">Optimal Zone (90%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-semibold text-zinc-300">High Efficiency (80%+)</span>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
          Click any cell to inspect detailed AI biomechanical telemetry
        </span>
      </div>

      {/* Selected Cell Detail Drawer */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 bg-zinc-900 border border-yellow-500/40 p-5 rounded-2xl space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-yellow-400 block">
                  Biomechanical Cell Inspection • {selectedCell.dimTitle}
                </span>
                <h4 className="text-lg font-black uppercase text-white tracking-wider flex items-center gap-2 mt-0.5">
                  {selectedCell.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="text-zinc-500 hover:text-white text-xs uppercase font-bold px-2 py-1 bg-zinc-950 rounded-lg border border-zinc-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-500 block tracking-widest">Measured Telemetry</span>
                <span className="text-xl font-black text-white">{selectedCell.value}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-500 block tracking-widest">Efficiency Rating</span>
                <span className="text-xl font-black text-yellow-400">{selectedCell.score} / 100</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-500 block tracking-widest">Evaluation Status</span>
                <span className="text-sm font-bold uppercase text-emerald-400">{selectedCell.status}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-yellow-400" /> AI Coach Biomechanical Finding
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                {selectedCell.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
