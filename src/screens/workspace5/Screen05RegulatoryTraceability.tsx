"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  GitCommit,
  Lock,
  ChevronLeft,
  Info,
  ExternalLink,
  Shield,
  Layers,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';

export const Screen05RegulatoryTraceability: React.FC = () => {
  const {
    activeFinding,
    traceabilityChain,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const selectedNode = traceabilityChain[selectedNodeIndex];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding ({activeFinding.id})</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              REGULATORY BASIS TRACEABILITY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY TRACEABILITY SPINE &bull; {activeFinding.id}
          </h1>
          <p className="screen-subtitle">
            10-Tier bidirectional lineage establishing immutable statutory grounding from Coal Mines Regulations to field measurement
          </p>
        </div>

        {/* Immutability Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#E8EAF6',
            border: '1px solid #C5CAE9',
            borderRadius: '6px',
            color: '#1A237E',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          <Lock size={14} color="#303F9F" />
          <span>Statutory Origin: Strictly Read-Only</span>
        </div>
      </div>

      {/* Main Traceability Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Vertical Traceability Nodes */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1A237E', marginBottom: '16px' }}>
            10-LEVEL STATUTORY TRACEABILITY SPINE
          </div>

          <div style={{ position: 'relative' }}>
            {traceabilityChain.map((node, idx) => {
              const isSelected = idx === selectedNodeIndex;
              const isLast = idx === traceabilityChain.length - 1;

              return (
                <div key={node.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  {/* Vertical Line */}
                  {!isLast && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '15px',
                        top: '30px',
                        bottom: '-12px',
                        width: '2px',
                        backgroundColor: '#C5CAE9',
                        zIndex: 1
                      }}
                    />
                  )}

                  {/* Node Dot / Icon */}
                  <div
                    onClick={() => setSelectedNodeIndex(idx)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#1A237E' : '#E8EAF6',
                      color: isSelected ? '#FFF' : '#3F51B5',
                      border: `2px solid ${isSelected ? '#303F9F' : '#9FA8DA'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '11.5px',
                      fontFamily: 'monospace',
                      zIndex: 2,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 10px rgba(26, 35, 126, 0.4)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Node Content Card */}
                  <div
                    onClick={() => setSelectedNodeIndex(idx)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: isSelected ? '#E8EAF6' : 'var(--bg-surface-alt)',
                      border: `1px solid ${isSelected ? '#7986CB' : 'var(--border-color)'}`,
                      marginBottom: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        className="badge badge-info font-mono"
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          background: isSelected ? '#1A237E' : undefined,
                          color: isSelected ? '#FFF' : undefined
                        }}
                      >
                        {node.tier}
                      </span>
                      <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {node.id}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {node.title}
                    </div>

                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {node.description.substring(0, 75)}...
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Node Deep Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #1A237E' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-primary font-mono" style={{ fontSize: '11px', background: '#1A237E', color: '#FFF' }}>
                  LEVEL {selectedNodeIndex + 1} &bull; {selectedNode.tier}
                </span>
                <h2 style={{ margin: '6px 0 0', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedNode.title}
                </h2>
              </div>
              <span className="badge badge-success font-mono" style={{ fontSize: '10.5px' }}>
                {selectedNode.status}
              </span>
            </div>

            {/* Description */}
            <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {selectedNode.description}
            </div>

            {/* Metadata Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Object ID:</span>
                <span className="font-mono" style={{ fontWeight: 700, color: '#1A237E' }}>{selectedNode.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Statutory Source:</span>
                <span style={{ fontWeight: 600 }}>{selectedNode.source}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Effective / Promulgation Date:</span>
                <span style={{ fontWeight: 600 }}>{selectedNode.effectiveDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Statutory Version:</span>
                <span className="font-mono">{selectedNode.version}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => showToast(`Navigated to global statutory module for ${selectedNode.id}`, 'info')}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <ExternalLink size={13} />
                <span>Open Global Module</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigateTo('08')}
                style={{ flex: 1, background: '#1A237E', borderColor: '#303F9F', justifyContent: 'center' }}
              >
                <span>Proceed to Action (Screen 08)</span>
              </button>
            </div>
          </div>

          {/* Differentiator Banner */}
          <div
            className="card"
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
              border: '1px solid #9FA8DA',
              fontSize: '12px',
              color: '#1A237E',
              lineHeight: 1.4
            }}
          >
            <strong>STRATA Traceability Guarantee:</strong> Every confirmed finding is anchored directly to enforceable Coal Mines Regulations clauses. Modifying statutory requirements from field inspection views is strictly prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};
