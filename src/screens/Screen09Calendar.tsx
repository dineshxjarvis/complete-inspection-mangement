"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export const Screen09Calendar: React.FC = () => {
  const {
    data,
    navigateTo,
    activeCalendarView,
    setCalendarView,
    selectedCalendarDate,
    setSelectedCalendarDate
  } = useStrata();

  const handleEventClick = (eventId: string) => {
    if (eventId.includes('SIM')) {
      navigateTo('11', { planId: 'PLAN-2026-0088' });
    } else {
      navigateTo('14', { inspectionId: eventId });
    }
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Planning Calendar</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <CalendarIcon size={20} color="var(--purple-primary)" />
            Enterprise Inspection Planning Calendar
          </h1>
          <p className="screen-subtitle">
            Slot allocation, mine operational restrictions, inspector capacity, and automatic conflict detection across the scope.
          </p>
        </div>
        <div className="screen-actions">
          <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
            {['Month', 'Week', 'Day', 'List'].map((v) => (
              <button
                key={v}
                className="btn btn-secondary btn-sm"
                style={{
                  borderRadius: 0,
                  border: 'none',
                  ...(activeCalendarView === v ? { background: 'var(--purple-primary)', color: '#FFF' } : {})
                }}
                onClick={() => setCalendarView(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => navigateTo('10')}>Schedule Inspection</button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select className="filter-select"><option>Authority: DGMS & Internal</option></select>
        <select className="filter-select"><option>Track: All</option></select>
        <select className="filter-select"><option>Mine: All Mines</option><option>Mine A2</option><option>Mine B1</option><option>Mine C4</option></select>
        <select className="filter-select"><option>Risk: All</option></select>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, fontSize: '12px' }}>November 2026</span>
        </div>
      </div>

      {/* Grid + Side Inspector */}
      <div className="calendar-layout">
        
        <div className="calendar-grid">
          <div className="calendar-day-header">Sun</div>
          <div className="calendar-day-header">Mon</div>
          <div className="calendar-day-header">Tue</div>
          <div className="calendar-day-header">Wed</div>
          <div className="calendar-day-header">Thu</div>
          <div className="calendar-day-header">Fri</div>
          <div className="calendar-day-header">Sat</div>

          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
            const isSelected = dateStr === selectedCalendarDate;
            const events = data.calendarEvents.filter(e => e.date === dateStr);

            return (
              <div
                key={day}
                className={`calendar-cell ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedCalendarDate(dateStr)}
              >
                <span className="calendar-date-num">{day}</span>
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className={`cal-event-pill ${ev.hasConflict ? 'conflict' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(ev.id);
                    }}
                  >
                    <div><strong>{ev.id.split('-')[2] || ev.id}</strong> ({ev.type.split(' ')[0]})</div>
                    <div style={{ fontSize: '9px' }}>{ev.mine.split('(')[0]} &bull; {ev.time}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Selected Date Inspector */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Clock size={15} /> Date: <span className="font-mono">{selectedCalendarDate}</span>
            </span>
          </div>
          <div className="card-body" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>SCHEDULED INSPECTIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '8px', borderRadius: '3px', cursor: 'pointer' }}
                  onClick={() => navigateTo('14', { inspectionId: 'INS-2026-0882' })}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong className="font-mono" style={{ color: 'var(--purple-primary)', fontSize: '11.5px' }}>INS-2026-0882</strong>
                    <span className="badge badge-scheduled">09:00 - 15:00</span>
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '2px' }}>Mine A2 &bull; Ventilation Survey</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px' }}>AVAILABLE MINE CAPACITY</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                Shift A (Morning): <strong>1 Slot Remaining</strong><br />
                Shift B (Afternoon): <strong>Available</strong>
              </div>
            </div>

            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', padding: '8px 10px', borderRadius: '3px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#C62828', fontSize: '11.5px' }}>1 Scheduling Conflict Detected</strong>
                <button className="btn btn-danger btn-sm" onClick={() => navigateTo('11', { planId: 'PLAN-2026-0088' })}>Resolve</button>
              </div>
              <div style={{ fontSize: '10.5px', color: '#7F0000', marginTop: '3px' }}>
                Overlap with Substation 3 Isolation Test INS-2026-0782 (10:00 - 13:00).
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigateTo('10')}>
                + Schedule on {selectedCalendarDate}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
