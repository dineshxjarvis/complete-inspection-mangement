import React from 'react';
import { RegulationBasis } from '../types/strata';

interface TraceabilityChainProps {
  basis: RegulationBasis;
  recommendationId?: string;
}

export const TraceabilityChain: React.FC<TraceabilityChainProps> = ({ basis, recommendationId }) => {
  return (
    <div className="traceability-chain">
      <div className="trace-node">
        <div className="trace-node-label">REGULATION</div>
        <div className="trace-node-value">{basis.regulation}</div>
      </div>
      <div className="trace-arrow">&rarr;</div>
      <div className="trace-node">
        <div className="trace-node-label">CLAUSE</div>
        <div className="trace-node-value font-mono">{basis.clause}</div>
      </div>
      <div className="trace-arrow">&rarr;</div>
      <div className="trace-node">
        <div className="trace-node-label">REQUIREMENT</div>
        <div className="trace-node-value" style={{ fontSize: '11px' }}>{basis.requirement}</div>
      </div>
      <div className="trace-arrow">&rarr;</div>
      <div className="trace-node">
        <div className="trace-node-label">APPLICABILITY</div>
        <div className="trace-node-value" style={{ fontSize: '11px' }}>{basis.applicability}</div>
      </div>
      <div className="trace-arrow">&rarr;</div>
      <div className="trace-node">
        <div className="trace-node-label">OBLIGATION</div>
        <div className="trace-node-value font-mono">{basis.id}</div>
      </div>
      {recommendationId && (
        <>
          <div className="trace-arrow">&rarr;</div>
          <div className="trace-node" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-border)' }}>
            <div className="trace-node-label" style={{ color: 'var(--purple-primary)' }}>RECOMMENDATION</div>
            <div className="trace-node-value font-mono" style={{ color: 'var(--purple-primary)' }}>{recommendationId}</div>
          </div>
        </>
      )}
    </div>
  );
};
