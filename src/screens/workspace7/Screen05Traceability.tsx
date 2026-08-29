"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  GitBranch,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  FileText,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface TraceNode {
  level: number;
  tier: string;
  code: string;
  title: string;
  description: string;
  authority: string;
  status: 'ACTIVE' | 'CONFIRMED' | 'VERIFIED';
}

const TRACE_CHAIN: TraceNode[] = [
  { level: 1, tier: 'REGULATION', code: 'CMR 2017', title: 'Coal Mines Regulations 2017', description: 'Statutory framework enacted under Section 57 of the Mines Act, 1952.', authority: 'DGMS Statutory Code', status: 'ACTIVE' },
  { level: 2, tier: 'CLAUSE', code: 'Reg 153(2)(b)', title: 'Minimum Return Airway Velocity', description: 'Air velocity in all return working airways must not drop below 5.5 m/s.', authority: 'Ministry of Labour & Employment', status: 'ACTIVE' },
  { level: 3, tier: 'REQUIREMENT', code: 'REQ-VENT-014', title: 'Airway Velocity ≥ 5.5 m/s Threshold', description: 'Mandatory mechanical and booster calibration to maintain minimum air velocity.', authority: 'Director General of Mines Safety', status: 'ACTIVE' },
  { level: 4, tier: 'OBLIGATION', code: 'OBL-MGR-002', title: 'Mine Manager Statutory Compliance Duty', description: 'Colliery Manager holds direct non-delegable duty to maintain adequate ventilation.', authority: 'Mines Act Section 17', status: 'ACTIVE' },
  { level: 5, tier: 'INSPECTION', code: 'INS-2026-0882', title: 'Seam VII Quarterly Safety Inspection', description: 'Underground field audit by lead inspector.', authority: 'DGMS Inspectorate', status: 'CONFIRMED' },
  { level: 6, tier: 'CHECKLIST ITEM', code: 'CHK-VENT-09', title: 'Return Airflow Measurement Protocol', description: '9-point traverse velocity check at regulator split.', authority: 'Standard Operating Procedure', status: 'CONFIRMED' },
  { level: 7, tier: 'OBSERVATION', code: 'OBS-2026-00482', title: 'Velocity Anemometer Reading 4.8 m/s', description: 'Observed velocity 4.8 m/s below statutory minimum 5.5 m/s.', authority: 'R. Sharma (Inspector)', status: 'CONFIRMED' },
  { level: 8, tier: 'FINDING', code: 'FND-2026-00127', title: 'Airflow Velocity Deficiency in Shaft 3 Return', description: 'Confirmed statutory finding requiring formal enforcement.', authority: 'Confirmed by Er. P. C. Joshi', status: 'CONFIRMED' },
  { level: 9, tier: 'CAPA', code: 'CAPA-2026-0048', title: 'Ventilation System Overhaul Plan', description: 'Remediation plan assigned to Chief Ventilation Engineer.', authority: 'Ventilation Department', status: 'CONFIRMED' },
  { level: 10, tier: 'CORRECTIVE ACTION', code: 'ACT-REPAIR-01', title: 'Louvre Descaling & Fan Pitch Calibration', description: 'Mechanical execution and shutter alignment completed.', authority: 'Maintenance Overhaul Crew', status: 'CONFIRMED' },
  { level: 11, tier: 'EVIDENCE', code: 'EVD-VER-03', title: 'Post-Repair 9-Grid Traverse (5.9 m/s)', description: 'Calibrated digital anemometer measurement proving compliance.', authority: 'Chief Ventilation Engineer', status: 'CONFIRMED' },
  { level: 12, tier: 'VERIFICATION', code: 'VER-2026-0031', title: 'DGMS Independent Verification & Closure', description: 'Independent verification decision certifying full statutory compliance.', authority: 'Er. R. Sharma (DGMS Auditor)', status: 'VERIFIED' }
];

export const Screen05Traceability: React.FC = () => {
  const { navigateTo } = useVerification();
  const [selectedNode, setSelectedNode] = useState<TraceNode>(TRACE_CHAIN[11]);

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
              <span>Back to Verification Details</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              12-TIER STATUTORY LINEAGE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CORRECTIVE ACTION & VERIFICATION TRACEABILITY SPINE
          </h1>
          <p className="screen-subtitle">
            Unbroken horizontal audit chain linking primary statute &rarr; observation &rarr; remediation &rarr; independent closure
          </p>
        </div>
      </div>

      {/* Horizontal Scrollable Traceability Chain */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px', overflowX: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#006064', marginBottom: '14px' }}>
          HORIZONTAL 12-TIER REGULATORY LINEAGE (CLICK ANY NODE TO INSPECT)
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '1400px', paddingBottom: '10px' }}>
          {TRACE_CHAIN.map((node, idx) => {
            const isSelected = selectedNode.code === node.code;

            return (
              <React.Fragment key={node.code}>
                <div
                  onClick={() => setSelectedNode(node)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: `1.5px solid ${isSelected ? '#006064' : 'var(--border-color)'}`,
                    background: isSelected ? '#E0F7FA' : 'var(--bg-surface-alt)',
                    minWidth: '130px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '9.5px', fontWeight: 800, color: isSelected ? '#006064' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                    TIER {node.level} &bull; {node.tier}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {node.code}
                  </div>
                </div>

                {idx < TRACE_CHAIN.length - 1 && (
                  <span style={{ color: '#80DEEA', fontWeight: 800, fontSize: '14px' }}>&rarr;</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Details Card */}
      <div className="card" style={{ padding: '24px', borderLeft: '4px solid #006064', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#006064', fontWeight: 800, textTransform: 'uppercase' }}>
              TIER {selectedNode.level}: {selectedNode.tier} RECORD
            </span>
            <h2 style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {selectedNode.code} &bull; {selectedNode.title}
            </h2>
          </div>
          <span className="badge badge-success font-mono font-bold">
            ✓ {selectedNode.status}
          </span>
        </div>

        <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {selectedNode.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Governing Authority:</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedNode.authority}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Audit Immutability:</span>
            <div style={{ fontWeight: 600, color: '#006064', marginTop: '2px' }}>Read-Only Verified</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Cryptographic Digest:</span>
            <div style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '11px', marginTop: '2px' }}>sha256_e3b0c44298fc1c14</div>
          </div>
        </div>
      </div>
    </div>
  );
};
