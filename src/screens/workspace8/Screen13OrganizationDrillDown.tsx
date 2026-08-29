"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FolderTree,
  Building,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ArrowRight,
  Globe,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Screen13OrganizationDrillDown: React.FC = () => {
  const {
    orgScope,
    setOrgScope,
    navigateTo,
    showToast
  } = useOversight();

  const [expandedEcl, setExpandedEcl] = useState(true);
  const [expandedArea1, setExpandedArea1] = useState(true);
  const [expandedArea2, setExpandedArea2] = useState(true);
  const [expandedCcl, setExpandedCcl] = useState(false);

  const handleSelectScope = (sub: string, area: string, mine: string) => {
    setOrgScope({
      corporate: 'Coal India Limited (CIL)',
      subsidiary: sub,
      area,
      mine
    });
    showToast(`Oversight scope set to ${mine} (${sub} &bull; ${area})`, 'info');
    navigateTo('14');
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              ENTERPRISE HIERARCHY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            ORGANIZATION HIERARCHY & COLLIERY DRILL-DOWN
          </h1>
          <p className="screen-subtitle">
            Navigate the complete Coal India Limited corporate structure &bull; Selecting any node recalculates enterprise metrics dynamically
          </p>
        </div>
      </div>

      {/* Active Scope Summary Banner */}
      <div className="card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)', color: '#FFF', marginBottom: '20px', border: '1.5px solid #D97706' }}>
        <div style={{ fontSize: '11px', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase' }}>
          CURRENTLY ACTIVE JURISDICTION SCOPE
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px', color: '#FEF3C7' }}>
          {orgScope.corporate} &rarr; {orgScope.subsidiary} &rarr; {orgScope.area} &rarr; <strong>{orgScope.mine}</strong>
        </div>
      </div>

      {/* Interactive Tree View */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          CORPORATE COLLIERY DIRECTORY TREE (CLICK ANY NODE TO DRILL DOWN)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          {/* CIL Level */}
          <div style={{ padding: '10px 14px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontWeight: 800, color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={16} color="#312E81" />
            <span>Coal India Limited (CIL) &bull; Corporate Headquarters</span>
          </div>

          {/* Subsidiary: ECL */}
          <div style={{ marginLeft: '24px' }}>
            <div
              onClick={() => setExpandedEcl(!expandedEcl)}
              style={{ padding: '8px 12px', background: '#EEF2FF', borderRadius: '4px', border: '1px solid #C7D2FE', fontWeight: 700, color: '#1E1B4B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {expandedEcl ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>Eastern Coalfields Limited (ECL) &bull; 2 Operational Areas &bull; 5 Mines</span>
              </div>
              <span className="badge badge-info font-bold">ACTIVE SUBSIDIARY</span>
            </div>

            {expandedEcl && (
              <div style={{ marginLeft: '24px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* Area 1 */}
                <div>
                  <div
                    onClick={() => setExpandedArea1(!expandedArea1)}
                    style={{ padding: '6px 10px', background: '#FFF8E1', borderRadius: '4px', border: '1px solid #FFE082', fontWeight: 700, color: '#B45309', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    {expandedArea1 ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span>Area 1 (Sanctoria / Sitarampur Division) &bull; 3 Mines</span>
                  </div>

                  {expandedArea1 && (
                    <div style={{ marginLeft: '24px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div
                        onClick={() => handleSelectScope('ECL', 'Area 1', 'Mine A2')}
                        style={{ padding: '8px 12px', background: orgScope.mine === 'Mine A2' ? '#FEF3C7' : 'var(--bg-surface-alt)', borderRadius: '4px', border: `1.5px solid ${orgScope.mine === 'Mine A2' ? '#F59E0B' : 'var(--border-color)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div>
                          <strong style={{ color: '#1E1B4B' }}>Mine A2 (Seam VII)</strong> &bull; <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Underground Coal Mine &bull; 94% Completion Rate</span>
                        </div>
                        <span className="badge badge-warning font-bold">HIGH RISK &rarr;</span>
                      </div>

                      <div
                        onClick={() => handleSelectScope('ECL', 'Area 1', 'Mine A3')}
                        style={{ padding: '8px 12px', background: orgScope.mine === 'Mine A3' ? '#FEF3C7' : 'var(--bg-surface-alt)', borderRadius: '4px', border: `1.5px solid ${orgScope.mine === 'Mine A3' ? '#F59E0B' : 'var(--border-color)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div>
                          <strong style={{ color: '#1E1B4B' }}>Mine A3 (Chora Seam)</strong> &bull; <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Underground &bull; 88% Completion Rate</span>
                        </div>
                        <span className="badge badge-info">MEDIUM RISK &rarr;</span>
                      </div>

                      <div
                        onClick={() => handleSelectScope('ECL', 'Area 1', 'Mine A5')}
                        style={{ padding: '8px 12px', background: orgScope.mine === 'Mine A5' ? '#FEF3C7' : 'var(--bg-surface-alt)', borderRadius: '4px', border: `1.5px solid ${orgScope.mine === 'Mine A5' ? '#F59E0B' : 'var(--border-color)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div>
                          <strong style={{ color: '#1E1B4B' }}>Mine A5 (High-wall Incline)</strong> &bull; <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Opencast/UG &bull; 72% Completion Rate</span>
                        </div>
                        <span className="badge badge-danger font-bold">CRITICAL RISK &rarr;</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Area 2 */}
                <div>
                  <div
                    onClick={() => setExpandedArea2(!expandedArea2)}
                    style={{ padding: '6px 10px', background: '#E8F5E9', borderRadius: '4px', border: '1px solid #C8E6C9', fontWeight: 700, color: '#1B5E20', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    {expandedArea2 ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span>Area 2 (Kajora Division) &bull; 1 Mine</span>
                  </div>

                  {expandedArea2 && (
                    <div style={{ marginLeft: '24px', marginTop: '6px' }}>
                      <div
                        onClick={() => handleSelectScope('ECL', 'Area 2', 'Mine B1')}
                        style={{ padding: '8px 12px', background: orgScope.mine === 'Mine B1' ? '#FEF3C7' : 'var(--bg-surface-alt)', borderRadius: '4px', border: `1.5px solid ${orgScope.mine === 'Mine B1' ? '#F59E0B' : 'var(--border-color)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div>
                          <strong style={{ color: '#1E1B4B' }}>Mine B1 (Haulage Main)</strong> &bull; <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Underground &bull; 96% Completion Rate</span>
                        </div>
                        <span className="badge badge-success font-bold">LOW RISK &rarr;</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Subsidiary: CCL */}
          <div style={{ marginLeft: '24px' }}>
            <div
              onClick={() => setExpandedCcl(!expandedCcl)}
              style={{ padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '4px', border: '1px solid var(--border-light)', fontWeight: 700, color: '#1E1B4B', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {expandedCcl ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>Central Coalfields Limited (CCL) &bull; North Karanpura Division</span>
              </div>
              <span className="badge badge-subtle">EXPAND</span>
            </div>

            {expandedCcl && (
              <div style={{ marginLeft: '24px', marginTop: '6px' }}>
                <div
                  onClick={() => handleSelectScope('CCL', 'North Karanpura', 'Mine C4')}
                  style={{ padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <strong style={{ color: '#1E1B4B' }}>Mine C4 (Opencast Pit 2)</strong>
                  <span className="badge badge-warning font-bold">HIGH RISK &rarr;</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
