"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Play,
  MapPin,
  Clock,
  Wifi,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Smartphone
} from 'lucide-react';

export const Screen05StartInspection: React.FC = () => {
  const {
    activeInspection,
    startInspection,
    navigateTo,
    isOnline,
    lastSyncTime,
    showToast
  } = useFieldInspection();

  const [gpsDetected, setGpsDetected] = useState<boolean>(true);
  const [gpsCoordinates, setGpsCoordinates] = useState<string>('23.6841° N, 86.9532° E (Shaft Incline Portal A2)');
  const [confirmedLocation, setConfirmedLocation] = useState<boolean>(false);
  const [isRefreshingGps, setIsRefreshingGps] = useState<boolean>(false);

  const handleRefreshGps = () => {
    setIsRefreshingGps(true);
    setTimeout(() => {
      setIsRefreshingGps(false);
      setGpsCoordinates('23.68412° N, 86.95325° E (Accuracy: ± 2.1m)');
      showToast('GPS Satellite Coordinates refreshed and locked', 'success');
    }, 800);
  };

  const handleStart = () => {
    if (!confirmedLocation) {
      showToast('Please confirm the statutory affirmation checkbox to initiate the official field record.', 'error');
      return;
    }
    startInspection(true);
  };

  const now = new Date();
  const timeFormatted = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST';

  return (
    <div className="screen-content" style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(255, 107, 0, 0.15)', color: '#E65100' }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-warning">OFFICIAL COMMENCEMENT</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            START FIELD INSPECTION
          </h1>
          <p className="screen-subtitle">
            Initiate the immutable field execution session, timestamp lock, and GPS presence record
          </p>
        </div>
      </div>

      {/* Main Confirmation Card */}
      <div className="card" style={{ padding: '24px', borderTop: '4px solid #FF6B00', marginBottom: '20px' }}>
        
        {/* Inspection Summary Block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px', background: 'var(--bg-surface-subtle)', padding: '16px', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Mine</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{activeInspection.mine}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{activeInspection.seam}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scope Area</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{activeInspection.area}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>District 4 Working Face</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inspection Type</div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{activeInspection.type}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Safety &bull; DGMS Track</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Role</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FF6B00' }}>{activeInspection.role}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Lead First Class Manager</div>
          </div>
        </div>

        {/* Live Device & Telemetry Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid var(--border-color)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Clock size={14} color="#FF6B00" />
              <span>COMMENCEMENT TIME</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{timeFormatted}</div>
          </div>

          <div style={{ border: '1px solid var(--border-color)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Wifi size={14} color={isOnline ? '#2E7D32' : '#F57C00'} />
              <span>CONNECTIVITY STATE</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: isOnline ? '#2E7D32' : '#F57C00' }}>
              {isOnline ? 'Online Gateway Active' : 'Offline Local Mode'}
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-color)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Smartphone size={14} color="#5932A5" />
              <span>DEVICE SESSION ID</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>
              SES-2026-TP8842-A2
            </div>
          </div>
        </div>

        {/* GPS Location Confirmation */}
        <div
          style={{
            background: 'rgba(255, 107, 0, 0.06)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#FF6B00" />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#E65100' }}>
                Geospatial Location Verification (DGMS Geo-Lock)
              </span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleRefreshGps}
              disabled={isRefreshingGps}
              style={{ fontSize: '11.5px' }}
            >
              {isRefreshingGps ? 'Detecting...' : 'Use Current Location'}
            </button>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
            {gpsCoordinates}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            ✓ Verified within statutory boundary perimeter of Mine A2 (ECL Sripur Area).
          </div>
        </div>

        {/* Official Statutory Notice */}
        <div
          style={{
            background: '#FFF3E0',
            borderLeft: '4px solid #F57C00',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontSize: '12.5px',
            color: '#E65100',
            lineHeight: 1.5
          }}
        >
          <strong>Official Record Notice:</strong> Starting this inspection will create the official field execution record under Section 22 of the Mines Act 1952 and CMR 2017. All subsequent measurements, observations, and timestamps will become part of the immutable governance audit trail.
        </div>

        {/* Mandatory Affirmation Checkbox */}
        <div
          onClick={() => setConfirmedLocation(!confirmedLocation)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            borderRadius: '8px',
            border: `2px solid ${confirmedLocation ? '#FF6B00' : 'var(--border-color)'}`,
            background: confirmedLocation ? 'rgba(255, 107, 0, 0.08)' : 'var(--bg-surface)',
            cursor: 'pointer',
            marginBottom: '24px'
          }}
        >
          <input
            type="checkbox"
            checked={confirmedLocation}
            onChange={() => {}}
            style={{ width: '18px', height: '18px', accentColor: '#FF6B00', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            I confirm that I am at the inspection location (Mine A2 Seam VII) with assigned team and am ready to begin official field execution.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('04')}>
            <ArrowLeft size={14} />
            <span>Back to Readiness</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleStart}
            disabled={!confirmedLocation}
            style={{
              background: confirmedLocation ? 'linear-gradient(135deg, #FF6B00, #E65100)' : '#A0AEC0',
              borderColor: confirmedLocation ? '#FF6B00' : '#A0AEC0',
              padding: '10px 28px',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: confirmedLocation ? '0 4px 14px rgba(255, 107, 0, 0.4)' : 'none'
            }}
          >
            <Play size={16} />
            <span>START INSPECTION (INITIATE EXECUTION)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
