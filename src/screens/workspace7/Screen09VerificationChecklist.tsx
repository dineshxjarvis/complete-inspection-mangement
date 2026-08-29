"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  ListChecks,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const Screen09VerificationChecklist: React.FC = () => {
  const {
    activeVerification,
    updateChecklist,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [check1, setCheck1] = useState<boolean>(ver.checklist.check01ActionCompleted);
  const [check2, setCheck2] = useState<boolean>(ver.checklist.check02EvidenceProvided);
  const [check3, setCheck3] = useState<boolean>(ver.checklist.check03EvidenceAuthentic);
  const [check4, setCheck4] = useState<boolean>(ver.checklist.check04DemonstratesCorrection);
  const [check5, setCheck5] = useState<boolean>(ver.checklist.check05MeetsRequirement);
  const [check6, setCheck6] = useState<boolean>(ver.checklist.check06AdditionalActionRequired);
  const [remarks, setRemarks] = useState<string>(ver.checklist.remarks);

  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    updateChecklist(ver.id, {
      check01ActionCompleted: check1,
      check02EvidenceProvided: check2,
      check03EvidenceAuthentic: check3,
      check04DemonstratesCorrection: check4,
      check05MeetsRequirement: check5,
      check06AdditionalActionRequired: check6,
      remarks
    });
    navigateTo('10');
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
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              6-POINT STATUTORY PROTOCOL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CAPA INDEPENDENT VERIFICATION CHECKLIST &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Mandatory six-point statutory evaluation protocol required prior to final regulatory decision sign-off
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveAndProceed}>
        <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Check 01 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 01: Was the corrective engineering action completed on-site?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Verifies physical mechanical repairs and regulator shutter overhaul.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck1(true)}
                  className={`btn btn-sm ${check1 ? 'btn-primary' : 'btn-secondary'}`}
                  style={check1 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck1(false)}
                  className={`btn btn-sm ${!check1 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Check 02 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 02: Was all required verification evidence provided?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Verifies 4 required artifacts: report, photo, measurement, maintenance log.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck2(true)}
                  className={`btn btn-sm ${check2 ? 'btn-primary' : 'btn-secondary'}`}
                  style={check2 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck2(false)}
                  className={`btn btn-sm ${!check2 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Check 03 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 03: Is the evidence authentic, calibrated, and traceable?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Validates instrument serial ANM-2048 calibration certificate.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck3(true)}
                  className={`btn btn-sm ${check3 ? 'btn-primary' : 'btn-secondary'}`}
                  style={check3 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck3(false)}
                  className={`btn btn-sm ${!check3 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Check 04 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 04: Does the evidence demonstrate technical correction?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Confirmed velocity increased from 4.8 m/s to 5.9 m/s.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck4(true)}
                  className={`btn btn-sm ${check4 ? 'btn-primary' : 'btn-secondary'}`}
                  style={check4 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck4(false)}
                  className={`btn btn-sm ${!check4 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Check 05 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 05: Does the corrected condition meet CMR 2017 Reg 153(2)(b)?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Certified velocity 5.9 m/s satisfies ≥ 5.5 m/s threshold.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck5(true)}
                  className={`btn btn-sm ${check5 ? 'btn-primary' : 'btn-secondary'}`}
                  style={check5 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck5(false)}
                  className={`btn btn-sm ${!check5 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Check 06 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  CHECK 06: Is additional engineering or statutory action required?
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Indicates whether supplementary directions or equipment overhaul is needed.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheck6(true)}
                  className={`btn btn-sm ${check6 ? 'btn-danger' : 'btn-secondary'}`}
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => setCheck6(false)}
                  className={`btn btn-sm ${!check6 ? 'btn-primary' : 'btn-secondary'}`}
                  style={!check6 ? { background: '#006064', borderColor: '#004D40' } : {}}
                >
                  NO
                </button>
              </div>
            </div>

            {/* Remarks */}
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Auditor Checklist Certification Remarks *
              </label>
              <textarea
                className="form-control"
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                style={{ height: 'auto', fontSize: '12px' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: '#006064', borderColor: '#004D40', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
            >
              <Award size={15} />
              <span>Save Checklist & Proceed to Verification Decision (Screen 10) &rarr;</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
