"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { Camera, X, Check, RefreshCw, MapPin, Clock, User, Shield } from 'lucide-react';

export const FieldPhotoCaptureModal: React.FC = () => {
  const {
    cameraModalOpen,
    setCameraModalOpen,
    cameraTargetId,
    addEvidence,
    activeInspection,
    showToast
  } = useFieldInspection();

  const [flashActive, setFlashActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [photoTitle, setPhotoTitle] = useState('Seam VII LVC Anemometer Flow Verification');
  const [sampleIndex, setSampleIndex] = useState(0);

  const samplePhotos = [
    {
      title: 'Digital Anemometer Flow Display at Seam VII LVC',
      url: '/evidence/lvc_anemometer_reading.jpg',
      coords: '23.6841° N, 86.9532° E (-320m RL)'
    },
    {
      title: 'Torn Brattice Cloth in 3rd Dip Airway',
      url: '/evidence/damaged_brattice_cloth.jpg',
      coords: '23.6841° N, 86.9532° E (-320m RL)'
    },
    {
      title: 'Stone Dust Loading Deficit on Belt Roadway 4',
      url: '/evidence/stone_dust_barrier_deficient.jpg',
      coords: '23.6848° N, 86.9540° E'
    },
    {
      title: 'FLP Gate End Box Feeler Gauge Gap Test',
      url: '/evidence/flp_feeler_gauge_check.jpg',
      coords: '23.6843° N, 86.9533° E'
    }
  ];

  if (!cameraModalOpen) return null;

  const handleShutter = () => {
    setFlashActive(true);
    setTimeout(() => {
      setFlashActive(false);
      const chosen = samplePhotos[sampleIndex % samplePhotos.length];
      setCapturedPhoto(chosen.url);
      setPhotoTitle(chosen.title);
      setSampleIndex(prev => prev + 1);
      showToast('Field Photo captured with tamper-evident metadata watermark', 'success');
    }, 250);
  };

  const handleSave = () => {
    if (!capturedPhoto) return;

    addEvidence({
      inspectionId: activeInspection.id,
      type: 'PHOTO',
      title: photoTitle,
      previewUrl: capturedPhoto,
      fileSize: '3.4 MB (JPEG)',
      linkedChecklistId: cameraTargetId || 'REQ-VENT-014',
      capturedBy: 'R. Sharma (Lead Inspector)',
      gpsCoordinates: '23.6841° N, 86.9532° E (Level -320m RL)',
      device: 'ToughPad G2 Industrial (DGMS Safe S/N: TP-8842)'
    });

    setCapturedPhoto(null);
    setCameraModalOpen(false);
  };

  const now = new Date();
  const timeString = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';

  return (
    <div className="modal-backdrop" style={{ display: 'flex', zIndex: 10001 }}>
      <div
        className="modal-dialog"
        style={{
          maxWidth: '640px',
          width: '92%',
          background: '#12161F',
          color: '#F7FAFC',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #2D3748',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #2D3748',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#1A202C'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={18} color="#FF6B00" />
            <span style={{ fontWeight: 700, fontSize: '14px' }}>
              Field Optical Evidence Capture (DGMS Approved)
            </span>
          </div>
          <button
            onClick={() => {
              setCapturedPhoto(null);
              setCameraModalOpen(false);
            }}
            style={{ background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Viewfinder / Preview Screen */}
        <div
          style={{
            position: 'relative',
            height: '340px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Flash Effect */}
          {flashActive && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#FFF',
                zIndex: 20,
                opacity: 0.9,
                transition: 'opacity 0.2s ease-out'
              }}
            />
          )}

          {capturedPhoto ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    background: 'rgba(255, 107, 0, 0.1)',
                    border: '2px solid #FF6B00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Camera size={44} color="#FF6B00" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                  {photoTitle}
                </span>
                <span style={{ fontSize: '11px', color: '#81C784' }}>
                  ✓ ISO/IEC 27037 Digital Evidence Tamper-Proof Stamped
                </span>
              </div>

              {/* Watermark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  right: 12,
                  background: 'rgba(0,0,0,0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '11px',
                  lineHeight: '1.4',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFB74D' }}>
                  <span>STRATA &bull; {activeInspection.id}</span>
                  <span>{activeInspection.mine} / {activeInspection.seam}</span>
                </div>
                <div style={{ color: '#E2E8F0', marginTop: '2px' }}>
                  <span>GPS: 23.6841° N, 86.9532° E &bull; </span>
                  <span>{timeString}</span>
                </div>
                <div style={{ color: '#A0AEC0', fontSize: '10px' }}>
                  Inspector: R. Sharma (Lead) &bull; Check: {cameraTargetId || 'REQ-VENT-014'}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, #1F2937 0%, #0F172A 100%)'
              }}
            >
              {/* Viewfinder crosshairs */}
              <div
                style={{
                  width: '200px',
                  height: '160px',
                  border: '2px dashed rgba(255, 107, 0, 0.6)',
                  borderRadius: '8px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '12px', height: '12px', borderTop: '2px solid #FF6B00', borderLeft: '2px solid #FF6B00', position: 'absolute', top: -4, left: -4 }} />
                <div style={{ width: '12px', height: '12px', borderTop: '2px solid #FF6B00', borderRight: '2px solid #FF6B00', position: 'absolute', top: -4, right: -4 }} />
                <div style={{ width: '12px', height: '12px', borderBottom: '2px solid #FF6B00', borderLeft: '2px solid #FF6B00', position: 'absolute', bottom: -4, left: -4 }} />
                <div style={{ width: '12px', height: '12px', borderBottom: '2px solid #FF6B00', borderRight: '2px solid #FF6B00', position: 'absolute', bottom: -4, right: -4 }} />
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Align instrument/hazard in frame</span>
              </div>

              {/* Top status in camera */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  right: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: '#94A3B8'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={11} color="#FF6B00" /> GPS Lock Active
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Shield size={11} color="#4CAF50" /> DGMS Safe Sensor
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{ padding: '16px 20px', background: '#1A202C' }}>
          {capturedPhoto ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', color: '#A0AEC0', marginBottom: '4px' }}>
                  Evidence Title & Context:
                </label>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={e => setPhotoTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#242D3D',
                    border: '1px solid #2D3748',
                    borderRadius: '6px',
                    color: '#FFF',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCapturedPhoto(null)}
                  style={{ background: '#2D3748', color: '#FFF' }}
                >
                  <RefreshCw size={13} />
                  <span>Retake</span>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  style={{ background: '#FF6B00', borderColor: '#FF6B00', color: '#FFF' }}
                >
                  <Check size={14} />
                  <span>Save to Evidence Log</span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={handleShutter}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF6B00, #E65100)',
                  border: '4px solid #FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(255, 107, 0, 0.5)',
                  transition: 'transform 0.1s ease'
                }}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                title="Capture Photo"
              >
                <Camera size={24} color="#FFF" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
