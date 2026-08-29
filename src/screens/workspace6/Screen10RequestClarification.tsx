"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  HelpCircle,
  MessageSquare,
  Send,
  ChevronLeft,
  ArrowRight,
  Clock,
  User,
  Building,
  UploadCloud
} from 'lucide-react';

export const Screen10RequestClarification: React.FC = () => {
  const {
    activeCapa,
    submitClarificationRequest,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const [question, setQuestion] = useState<string>(
    'Please clarify whether the 9-grid anemometer traverse requires an on-site presence of the DGMS Inspector or if self-certification by the First Class Certified Manager is acceptable for initial submission.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitClarificationRequest(activeCapa.id, question);
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
              <span>Back to CAPA Details</span>
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
              REQUEST CLARIFICATION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY TECHNICAL CLARIFICATION &bull; {activeCapa.id}
          </h1>
          <p className="screen-subtitle">
            Direct communication thread with the assigning authority in Workspace 05 to clarify compliance scope or procedure
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Clarification Query */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-primary)' }}>
                What technical or regulatory aspect requires clarification? *
              </label>
              <textarea
                className="form-control"
                rows={5}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '13px', lineHeight: 1.5 }}
              />
            </div>

            {/* Target Authority Info */}
            <div className="card" style={{ padding: '16px', background: 'var(--bg-surface-alt)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                RECIPIENT STATUTORY AUTHORITY
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Er. P. C. Joshi &bull; DGMS Liaison / Workspace 05 Reviewer
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Directorate General of Mines Safety Review Cell (Singrauli Division)
              </div>
            </div>
          </div>

          {/* Right Column: Communication Rules & Submit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #E65100' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#E65100', textTransform: 'uppercase', marginBottom: '8px' }}>
                COMMUNICATION PROTOCOL
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Submitting a clarification request flags the CAPA as <strong>"Clarification Requested"</strong> in Workspace 05 while keeping the action active. The statutory due date remains active.
              </p>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', background: '#F57C00', borderColor: '#E65100', justifyContent: 'center' }}
              >
                <Send size={14} />
                <span>Submit Clarification Request &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
