"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ArrowRight,
  Send,
  CheckSquare
} from 'lucide-react';

export const Screen14ReturnClarification: React.FC = () => {
  const {
    activeVerification,
    returnForClarification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [question, setQuestion] = useState(
    'Please provide the calibration validity certificate for the Digital Vane Anemometer (Model DA-800) used during the 9-grid traverse test.'
  );
  const [missingMeasurement, setMissingMeasurement] = useState(false);
  const [missingReport, setMissingReport] = useState(false);
  const [missingPhoto, setMissingPhoto] = useState(false);
  const [missingMaintenance, setMissingMaintenance] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missingItems: string[] = [];
    if (missingMeasurement) missingItems.push('Measurement Data');
    if (missingReport) missingItems.push('Repair Report');
    if (missingPhoto) missingItems.push('Optical Photo');
    if (missingMaintenance) missingItems.push('Calibration Certificate');

    returnForClarification(ver.id, question, missingItems);
  };

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
                background: 'rgba(245, 124, 0, 0.15)',
                color: '#E65100'
              }}
            >
              RETURN FOR CLARIFICATION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            REQUEST TECHNICAL CLARIFICATION &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Request missing documentation or calibration proof from the action owner in Workspace 06 without formally failing the CAPA
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Clarification Query & Checkbox Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-primary)' }}>
                What information or artifact is missing from the verification packet? *
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px', lineHeight: 1.4 }}
              />
            </div>

            {/* Missing Evidence Type Checkboxes */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Select Specific Missing Evidence Categories
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={missingMeasurement}
                    onChange={e => setMissingMeasurement(e.target.checked)}
                  />
                  <span>Measurement Sheet</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={missingReport}
                    onChange={e => setMissingReport(e.target.checked)}
                  />
                  <span>Engineering Repair Report</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={missingPhoto}
                    onChange={e => setMissingPhoto(e.target.checked)}
                  />
                  <span>GPS Optical Photograph</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={missingMaintenance}
                    onChange={e => setMissingMaintenance(e.target.checked)}
                  />
                  <span>Calibration Certificate / Log</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Routing Handoff */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #E65100' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#E65100', textTransform: 'uppercase', marginBottom: '8px' }}>
                CLARIFICATION TRANSMISSION ROUTE
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                <div>1. Verifier Submits Clarification Request</div>
                <div>&darr;</div>
                <div>2. Handed off to Workspace 06 (Screen 11 / Returned)</div>
                <div>&darr;</div>
                <div>3. Action Owner Uploads Missing Calibration Proof</div>
                <div>&darr;</div>
                <div>4. Resubmitted to Workspace 07 for Final Decision</div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', background: '#F57C00', borderColor: '#E65100', justifyContent: 'center', padding: '12px' }}
              >
                <Send size={14} />
                <span>Return to Action Owner in WS06 &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
