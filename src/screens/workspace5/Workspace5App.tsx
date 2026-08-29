"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';

// Import Screens 01 to 18
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02FindingQueue } from './Screen02FindingQueue';
import { Screen03CriticalFindings } from './Screen03CriticalFindings';
import { Screen04FindingDetails } from './Screen04FindingDetails';
import { Screen05RegulatoryTraceability } from './Screen05RegulatoryTraceability';
import { Screen06FindingClassification } from './Screen06FindingClassification';
import { Screen07SimilarFindings } from './Screen07SimilarFindings';
import { Screen08RegulatoryAction } from './Screen08RegulatoryAction';
import { Screen09NoticeDetails } from './Screen09NoticeDetails';
import { Screen10MineResponseStatus } from './Screen10MineResponseStatus';
import { Screen11EscalationCenter } from './Screen11EscalationCenter';
import { Screen12CapaHandoff } from './Screen12CapaHandoff';
import { Screen13ActionTracker } from './Screen13ActionTracker';
import { Screen14FindingHistory } from './Screen14FindingHistory';
import { Screen15ActionRegister } from './Screen15ActionRegister';
import { Screen16RegulatoryDocuments } from './Screen16RegulatoryDocuments';
import { Screen17FindingResolution } from './Screen17FindingResolution';
import { Screen18RegulatoryAudit } from './Screen18RegulatoryAudit';

export const Workspace5App: React.FC = () => {
  const { currentScreen } = useRegulatoryAction();

  switch (currentScreen) {
    case '01':
      return <Screen01Dashboard />;
    case '02':
      return <Screen02FindingQueue />;
    case '03':
      return <Screen03CriticalFindings />;
    case '04':
      return <Screen04FindingDetails />;
    case '05':
      return <Screen05RegulatoryTraceability />;
    case '06':
      return <Screen06FindingClassification />;
    case '07':
      return <Screen07SimilarFindings />;
    case '08':
      return <Screen08RegulatoryAction />;
    case '09':
      return <Screen09NoticeDetails />;
    case '10':
      return <Screen10MineResponseStatus />;
    case '11':
      return <Screen11EscalationCenter />;
    case '12':
      return <Screen12CapaHandoff />;
    case '13':
      return <Screen13ActionTracker />;
    case '14':
      return <Screen14FindingHistory />;
    case '15':
      return <Screen15ActionRegister />;
    case '16':
      return <Screen16RegulatoryDocuments />;
    case '17':
      return <Screen17FindingResolution />;
    case '18':
      return <Screen18RegulatoryAudit />;
    default:
      return <Screen01Dashboard />;
  }
};
