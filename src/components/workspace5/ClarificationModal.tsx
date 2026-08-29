"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  X,
  MessageSquare,
  AlertTriangle,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const ClarificationModal: React.FC = () => {
  const {
    isClarificationModalOpen,
    setIsClarificationModalOpen,
    activeFinding,
    requestClarification
  } = useRegulatoryAction();

  const [reason, setReason] = useState<string>('Please provide calibrated anemometer test certificate number and specify if secondary booster fan pitch angle was adjusted.');

  if (!isClarificationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestClarification(activeFinding.id, reason);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 20, 45, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsClarificationModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '540px',
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
            background: '#FFF3E0',
            borderBottom: '1px solid #FFE0B2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#F57C00',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#E65100' }}>
                REQUEST REGULATORY CLARIFICATION
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#BF360C' }}>
                Initiate Controlled Response Cycle for {activeFinding.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsClarificationModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#E65100',
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
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            Requesting clarification returns the official mine response to <strong>"Clarification Requested"</strong> status and prompts the Mine Manager to submit an updated revision without altering original inspection evidence.
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Specific Technical Clarification Required *
            </label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Specify the technical discrepancies, missing certificates, or procedural clarifications needed..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              style={{ height: 'auto', fontSize: '12.5px' }}
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
              onClick={() => setIsClarificationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ background: '#F57C00', borderColor: '#E65100' }}
            >
              <Send size={13} />
              <span>Transmit Clarification Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
