"use client";

import React, { useState, useEffect } from 'react';
import { useStrata } from '../context/StrataContext';

export const ScopeBar: React.FC = () => {
  const {
    data,
    activeHolding,
    activeSubsidiary,
    activeArea,
    activeMine,
    setScope
  } = useStrata();

  const [clock, setClock] = useState<string>('29 Aug 2026 | 10:45:00 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setClock(`${dateStr} | ${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const holdings = Object.keys(data.hierarchy);
  const subsidiaries = data.hierarchy[activeHolding] ? Object.keys(data.hierarchy[activeHolding]) : [];
  const areas = (data.hierarchy[activeHolding] && data.hierarchy[activeHolding][activeSubsidiary])
    ? Object.keys(data.hierarchy[activeHolding][activeSubsidiary])
    : [];
  const mines = (data.hierarchy[activeHolding] && data.hierarchy[activeHolding][activeSubsidiary] && data.hierarchy[activeHolding][activeSubsidiary][activeArea])
    ? data.hierarchy[activeHolding][activeSubsidiary][activeArea]
    : [];

  return (
    <div className="scope-header-bar">
      <div className="scope-hierarchy-display">
        <span className="scope-label">Scope:</span>

        <div className="scope-crumb">
          <select
            value={activeHolding}
            onChange={(e) => {
              const newHolding = e.target.value;
              const newSubs = Object.keys(data.hierarchy[newHolding] || {})[0] || '';
              const newAreas = Object.keys(data.hierarchy[newHolding]?.[newSubs] || {})[0] || '';
              const newMines = data.hierarchy[newHolding]?.[newSubs]?.[newAreas]?.[0] || '';
              setScope(newHolding, newSubs, newAreas, newMines);
            }}
          >
            {holdings.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <span className="scope-arrow">&rsaquo;</span>

        <div className="scope-crumb">
          <select
            value={activeSubsidiary}
            onChange={(e) => {
              const newSubs = e.target.value;
              const newAreas = Object.keys(data.hierarchy[activeHolding]?.[newSubs] || {})[0] || '';
              const newMines = data.hierarchy[activeHolding]?.[newSubs]?.[newAreas]?.[0] || '';
              setScope(undefined, newSubs, newAreas, newMines);
            }}
          >
            {subsidiaries.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <span className="scope-arrow">&rsaquo;</span>

        <div className="scope-crumb">
          <select
            value={activeArea}
            onChange={(e) => {
              const newArea = e.target.value;
              const newMines = data.hierarchy[activeHolding]?.[activeSubsidiary]?.[newArea]?.[0] || '';
              setScope(undefined, undefined, newArea, newMines);
            }}
          >
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <span className="scope-arrow">&rsaquo;</span>

        <div className="scope-crumb">
          <select
            value={activeMine}
            onChange={(e) => setScope(undefined, undefined, undefined, e.target.value)}
          >
            {mines.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="authority-strip-pill">
        <span className="authority-badge">AUTHORITY: INTERNAL GOVERNANCE &bull; DGMS STATUTORY</span>
        <span className="system-clock">{clock}</span>
      </div>
    </div>
  );
};
