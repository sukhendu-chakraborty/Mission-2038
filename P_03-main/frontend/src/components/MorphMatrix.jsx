import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Compass, Info, Cpu, Layers } from 'lucide-react';
import './MorphMatrix.css';

export default function MorphMatrix({ stats = {}, report = "" }) {
  const [viewMode, setViewMode] = useState('pathway');
  const [selectedCell, setSelectedCell] = useState(null);

  const flexionVal = typeof stats.avg_hip_knee_angle === 'number' ? stats.avg_hip_knee_angle 
                  : typeof stats.avg_knee_flexion === 'number' ? stats.avg_knee_flexion 
                  : 54.2;

  const velocityVal = typeof stats.max_velocity === 'number' ? stats.max_velocity 
                   : typeof stats.release_speed === 'number' ? stats.release_speed 
                   : 31.8;

  const consistencyVal = typeof stats.form_consistency_pct === 'number' ? stats.form_consistency_pct
                      : typeof stats.save_accuracy_pct === 'number' ? stats.save_accuracy_pct
                      : 88.5;

  const reactionVal = typeof stats.reaction_time_ms === 'number' ? stats.reaction_time_ms : 195;

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

  return (
    <motion.div 
      className="morph-matrix-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="morph-header">
        <div className="morph-title-group">
          <span className="morph-badge"><Layers size={14} /> Biomechanical Morph Matrix</span>
          <h3><Zap size={18} color="var(--accent-neon)" /> Morphological Visualization</h3>
          <p className="morph-subtitle">4D Telemetry grid mapping execution phases against biomechanical posture dimensions.</p>
        </div>

        <div className="morph-controls">
          <button 
            className={`morph-mode-btn ${viewMode === 'pathway' ? 'active' : ''}`}
            onClick={() => setViewMode('pathway')}
          >
            <Zap size={14} /> Morph Path
          </button>
          <button 
            className={`morph-mode-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
            onClick={() => setViewMode('heatmap')}
          >
            <Flame size={14} /> Heatmap
          </button>
          <button 
            className={`morph-mode-btn ${viewMode === 'telemetry' ? 'active' : ''}`}
            onClick={() => setViewMode('telemetry')}
          >
            <Compass size={14} /> Telemetry
          </button>
        </div>
      </div>

      <div className="morph-table-wrapper">
        <div className="morph-grid">
          <div className="morph-phases-row">
            <div className="morph-phase-col" style={{ visibility: 'hidden' }}></div>
            {phases.map(p => (
              <div key={p.id} className="morph-phase-col">
                <span className="phase-name">{p.name}</span>
                <span className="phase-sub">{p.sub}</span>
              </div>
            ))}
          </div>

          {dimensions.map(dim => (
            <div key={dim.id} className="morph-dimension-row">
              <div className="morph-dim-header">
                <span className="dim-title">{dim.title}</span>
                <span className="dim-metric">{dim.metricName}</span>
              </div>

              {dim.cells.map((cell, idx) => {
                const isActivePath = cell.active && viewMode === 'pathway';
                return (
                  <div 
                    key={idx}
                    className={`morph-cell ${isActivePath ? 'active-path' : ''}`}
                    onClick={() => setSelectedCell({ ...cell, dimTitle: dim.title })}
                  >
                    {isActivePath && <span className="active-tag">Active Path</span>}
                    <div className="cell-top">
                      <span className="cell-title">{cell.title}</span>
                      <span className="cell-score">{cell.score}%</span>
                    </div>
                    <div className="cell-bottom">
                      <span className="cell-val">{cell.value}</span>
                      <span className="cell-status">{cell.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCell && (
          <motion.div 
            className="morph-detail-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="morph-detail-header">
              <h4>{selectedCell.title} ({selectedCell.dimTitle})</h4>
              <button className="close-btn" onClick={() => setSelectedCell(null)}>✕ Close</button>
            </div>
            <div className="detail-stats">
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Telemetry Metric:</span>
                <div className="detail-stat-val">{selectedCell.value}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Efficiency Score:</span>
                <div className="detail-stat-val">{selectedCell.score} / 100</div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Status Rating:</span>
                <div className="detail-stat-val" style={{ color: '#00ff88' }}>{selectedCell.status}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              <Cpu size={14} color="var(--accent-neon)" style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              <strong>AI Biomechanical Finding:</strong> {selectedCell.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
