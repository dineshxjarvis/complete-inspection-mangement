"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useStrata();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>
            {t.type === 'success' && <Check size={14} />}
            {t.type === 'error' && <X size={14} />}
            {t.type === 'warning' && <AlertTriangle size={14} />}
            {t.type === 'info' && <Info size={14} />}
          </span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
