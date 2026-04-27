'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? (
        <CheckCircle size={20} style={{ color: 'var(--status-active)' }} />
      ) : (
        <AlertCircle size={20} style={{ color: 'var(--status-inactive)' }} />
      )}
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          marginLeft: '8px',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
