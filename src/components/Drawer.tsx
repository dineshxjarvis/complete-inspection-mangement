"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { X } from 'lucide-react';

export const Drawer: React.FC = () => {
  const { drawerState, closeDrawer } = useStrata();

  if (!drawerState.isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 240
        }}
        onClick={closeDrawer}
      />
      <div className="drawer-overlay">
        <div className="drawer-header">
          <h3 className="drawer-title">{drawerState.title}</h3>
          <button className="modal-close-btn" style={{ color: '#FFF' }} onClick={closeDrawer}>
            <X size={16} />
          </button>
        </div>
        <div className="drawer-body">
          {drawerState.content}
        </div>
      </div>
    </>
  );
};
