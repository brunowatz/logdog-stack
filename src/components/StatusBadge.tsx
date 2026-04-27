'use client';

import { ClientStatus } from '@/types';
import { getStatusLabel } from '@/lib/utils';

interface StatusBadgeProps {
  status: ClientStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${status}`}>
      <span className="dot" />
      {getStatusLabel(status)}
    </span>
  );
}
