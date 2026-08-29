"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { ChecklistItem, CheckStatus } from '../../types/fieldInspection';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
  Clock,
  Filter,
  ChevronRight,
  Shield,
  Camera,
  Gauge,
  FileText,
  ArrowLeft,
  ArrowRight,
  Save,
  CheckSquare
} from 'lucide-react';

export const Screen07Checklist: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    markChecklistStatus,
    navigateTo,
    setActiveChecklistId,
    showToast
  } = useFieldInspection();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Ventilation': true,
    'Safety Controls': true,
    'Equipment & Electrical': true,
    'Records & Logs': true,
    'Emergency Preparedness': true
  });

  const categories = [
    'Ventilation',
    'Safety Controls',
    'Equipment & Electrical',
    'Records & Logs',
    'Emergency Preparedness'
  ] as const;

  const completedCount = checklistItems.filter(c => c.status !== 'Pending').length;

  const filteredItems = checklistItems.filter(item => {
    if (activeFilter === 'Pending') return item.status === 'Pending';
    if (activeFilter === 'Completed') return item.status !== 'Pending';
    if (activeFilter === 'Critical') return item.criticality === 'Critical';
    if (activeFilter === 'Failed') return item.status === 'Non-Compliant';
    if (activeFilter === 'Not Applicable') return item.status === 'N/A' || item.status === 'Unable to Verify';
    return true;
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleOpenDetail = (id: string) => {
    setActiveChecklistId(id);
    navigateTo('08', { checklistId: id });
  };

  return (
    <div className="screen-content" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-warning">EXECUTION ACTIVE</span>
            <span className="badge badge-subtle">{activeInspection.mine}</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            STATUTORY INSPECTION CHECKLIST (22 CHECKS)
          </h1>
          <p className="screen-subtitle">
            Grouped technical checks under CMR 2017 & CEA 2010. Tap any check to record measurements, observations & photos.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Completion</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FF6B00', fontFamily: 'monospace' }}>
              {completedCount} / {checklistItems.length} ({Math.round((completedCount / checklistItems.length) * 100)}%)
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('16')}
            style={{ background: '#2E7D32', borderColor: '#2E7D32' }}
          >
            <span>Review & Submit</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs" style={{ marginBottom: '16px' }}>
        {['All', 'Pending', 'Completed', 'Critical', 'Failed', 'Not Applicable'].map(tab => (
          <button
            key={tab}
            className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab} {tab === 'Failed' && checklistItems.filter(c => c.status === 'Non-Compliant').length > 0 && `(${checklistItems.filter(c => c.status === 'Non-Compliant').length})`}
          </button>
        ))}
      </div>

      {/* Grouped Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categories.map(category => {
          const categoryItems = filteredItems.filter(i => i.category === category);
          if (categoryItems.length === 0) return null;

          const isExpanded = expandedCategories[category] !== false;
          const catTotal = checklistItems.filter(i => i.category === category).length;
          const catDone = checklistItems.filter(i => i.category === category && i.status !== 'Pending').length;

          return (
            <div key={category} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Category Group Header */}
              <div
                onClick={() => toggleCategory(category)}
                style={{
                  padding: '14px 20px',
                  background: 'var(--bg-surface-alt)',
                  borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {category.toUpperCase()}
                  </span>
                  <span className="badge badge-subtle">
                    {catDone} / {catTotal} Done
                  </span>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {isExpanded ? 'Collapse' : 'Expand'}
                </span>
              </div>

              {/* Category Items List */}
              {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {categoryItems.map((item, idx) => {
                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: '14px 20px',
                          borderBottom: idx < categoryItems.length - 1 ? '1px solid var(--border-color)' : 'none',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '16px',
                          background: item.status === 'Non-Compliant' ? 'rgba(211, 47, 47, 0.03)' : undefined,
                          transition: 'background 0.15s ease'
                        }}
                      >
                        {/* Item Details */}
                        <div
                          style={{ flex: 1, cursor: 'pointer' }}
                          onClick={() => handleOpenDetail(item.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span
                              className="font-mono"
                              style={{
                                fontSize: '11.5px',
                                fontWeight: 700,
                                color: item.criticality === 'Critical' ? '#B71C1C' : '#5932A5',
                                background: item.criticality === 'Critical' ? 'var(--status-red-bg)' : 'var(--status-purple-bg)',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}
                            >
                              {item.id}
                            </span>

                            <span
                              className={`badge ${
                                item.criticality === 'Critical' ? 'badge-danger' : 'badge-warning'
                              }`}
                            >
                              {item.criticality}
                            </span>

                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {item.regulatoryTrace.clause}
                            </span>

                            {item.measurementRequired && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#1976D2', background: 'var(--status-blue-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                                <Gauge size={11} /> Measurement Req
                              </span>
                            )}

                            {item.photoRequired && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#E65100', background: 'var(--status-orange-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                                <Camera size={11} /> Photo Req
                              </span>
                            )}
                          </div>

                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                            {item.text}
                          </div>

                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                            {item.question}
                          </div>

                          {/* Quick Value/Observation Pill if available */}
                          {item.measurementValue && (
                            <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '11px', fontWeight: 600, color: '#2E7D32', background: 'var(--status-green-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                                Measured: {item.measurementValue} {item.measurementUnit}
                              </span>
                              {item.photos.length > 0 && (
                                <span style={{ fontSize: '11px', color: '#5932A5', background: 'var(--status-purple-bg)', padding: '2px 6px', borderRadius: '4px' }}>
                                  📸 {item.photos.length} Photos Attached
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Status Button Group */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <button
                            onClick={() => markChecklistStatus(item.id, 'Compliant')}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: `1px solid ${item.status === 'Compliant' ? '#2E7D32' : 'var(--border-color)'}`,
                              background: item.status === 'Compliant' ? '#2E7D32' : 'var(--bg-surface)',
                              color: item.status === 'Compliant' ? '#FFF' : 'var(--text-secondary)',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Mark Compliant"
                          >
                            <CheckCircle size={13} />
                            <span>Compliant</span>
                          </button>

                          <button
                            onClick={() => {
                              markChecklistStatus(item.id, 'Non-Compliant');
                              handleOpenDetail(item.id);
                            }}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: `1px solid ${item.status === 'Non-Compliant' ? '#D32F2F' : 'var(--border-color)'}`,
                              background: item.status === 'Non-Compliant' ? '#D32F2F' : 'var(--bg-surface)',
                              color: item.status === 'Non-Compliant' ? '#FFF' : 'var(--text-secondary)',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Mark Non-Compliant & Formulate Finding"
                          >
                            <XCircle size={13} />
                            <span>Non-Compliant</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveChecklistId(item.id);
                              navigateTo('09');
                            }}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '6px',
                              border: `1px solid ${item.status === 'N/A' || item.status === 'Unable to Verify' ? '#7C4DFF' : 'var(--border-color)'}`,
                              background: item.status === 'N/A' || item.status === 'Unable to Verify' ? '#7C4DFF' : 'var(--bg-surface)',
                              color: item.status === 'N/A' || item.status === 'Unable to Verify' ? '#FFF' : 'var(--text-muted)',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                            title="Provide mandatory N/A or Unable to Verify justification"
                          >
                            {item.status === 'N/A' ? 'N/A' : item.status === 'Unable to Verify' ? 'Unable' : 'N/A...'}
                          </button>

                          <button
                            onClick={() => handleOpenDetail(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#FF6B00',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title="Open Checklist Detail"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM STICKY ACTION BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'var(--sidebar-width)',
          right: 0,
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('06')}>
            <ArrowLeft size={14} />
            <span>Execution Overview</span>
          </button>
          <button className="btn btn-secondary" onClick={() => showToast('Checklist progress saved locally', 'success')}>
            <Save size={14} />
            <span>Save Progress</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {completedCount} of 22 checks evaluated
          </span>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('16')}
            style={{ background: '#2E7D32', borderColor: '#2E7D32' }}
          >
            <CheckSquare size={14} />
            <span>Proceed to Self-Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
