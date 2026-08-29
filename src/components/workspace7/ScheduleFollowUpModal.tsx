"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  X,
  Calendar,
  MapPin,
  User,
  Clock,
  Send,
  FileCheck
} from 'lucide-react';

export const ScheduleFollowUpModal: React.FC = () => {
  const {
    isScheduleFollowUpModalOpen,
    setIsScheduleFollowUpModalOpen,
    activeVerification,
    scheduleFollowUp
  } = useVerification();

  const [scheduledDate, setScheduledDate] = useState('15 Jan 2027');
  const [verifier, setVerifier] = useState('Er. R. Sharma (DGMS Panel Senior Auditor)');
  const [location, setLocation] = useState(activeVerification.location);
  const [verificationType, setVerificationType] = useState<'Measurement' | 'Document Review' | 'Site Visit' | 'Interview' | 'Technical Test'>('Measurement');
  const [requiredEquipment, setRequiredEquipment] = useState('Calibrated Digital Vane Anemometer (ANM-2048), Optical Inspection Scope');
  const [requiredDocuments, setRequiredDocuments] = useState('Monthly Airway Survey Register, DGMS Statutory Log Sheet');

  if (!isScheduleFollowUpModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleFollowUp(activeVerification.id, {
      scheduledDate,
      verifier,
      location,
      verificationType,
      requiredEquipment,
      requiredDocuments,
      status: 'Scheduled'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 20, 25, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsScheduleFollowUpModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #006064 0%, #00838F 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#80DEEA" />
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>
              SCHEDULE POST-VERIFICATION FOLLOW-UP &bull; {activeVerification.id}
            </h2>
          </div>
          <button
            onClick={() => setIsScheduleFollowUpModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#80DEEA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Follow-Up Target Date *
              </label>
              <input
                type="text"
                className="form-control"
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Verification Type *
              </label>
              <select
                className="form-control"
                value={verificationType}
                onChange={e => setVerificationType(e.target.value as any)}
              >
                <option value="Measurement">Measurement (On-Site Quantitative)</option>
                <option value="Site Visit">Site Visit (Physical Inspection)</option>
                <option value="Document Review">Document Review</option>
                <option value="Technical Test">Technical Test</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Assigned Independent Verifier *
            </label>
            <input
              type="text"
              className="form-control"
              value={verifier}
              onChange={e => setVerifier(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Underground Colliery Location *
            </label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Required Test Equipment & Calibration Tools *
            </label>
            <input
              type="text"
              className="form-control"
              value={requiredEquipment}
              onChange={e => setRequiredEquipment(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Mandatory Reference Documents *
            </label>
            <input
              type="text"
              className="form-control"
              value={requiredDocuments}
              onChange={e => setRequiredDocuments(e.target.value)}
              required
            />
          </div>

          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsScheduleFollowUpModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ background: '#006064', borderColor: '#004D40' }}
            >
              <Send size={13} />
              <span>Confirm Schedule & Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
