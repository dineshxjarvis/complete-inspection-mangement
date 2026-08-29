"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { X } from 'lucide-react';

export const Modal: React.FC = () => {
  const { modalState, closeModal } = useStrata();

  if (!modalState.isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{modalState.title}</h3>
          <button className="modal-close-btn" onClick={closeModal}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          {modalState.content}
        </div>
        {modalState.buttons && modalState.buttons.length > 0 && (
          <div className="modal-footer">
            {modalState.buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`btn ${btn.className || 'btn-secondary'}`}
                onClick={btn.onClick}
              >
                {btn.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
