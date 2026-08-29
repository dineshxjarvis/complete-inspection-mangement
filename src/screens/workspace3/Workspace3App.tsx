"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';

// Import all 21 Workspace 03 Screens
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02MyInspections } from './Screen02MyInspections';
import { Screen03PreInspectionBrief } from './Screen03PreInspectionBrief';
import { Screen04ReadinessCheck } from './Screen04ReadinessCheck';
import { Screen05StartInspection } from './Screen05StartInspection';
import { Screen06ExecutionOverview } from './Screen06ExecutionOverview';
import { Screen07Checklist } from './Screen07Checklist';
import { Screen08ChecklistItemDetail } from './Screen08ChecklistItemDetail';
import { Screen09NAUnableToVerify } from './Screen09NAUnableToVerify';
import { Screen10ObservationCapture } from './Screen10ObservationCapture';
import { Screen11PauseInspection } from './Screen11PauseInspection';
import { Screen11APausedState } from './Screen11APausedState';
import { Screen12EvidenceCapture } from './Screen12EvidenceCapture';
import { Screen13ProposedFinding } from './Screen13ProposedFinding';
import { Screen14OfflineSyncCenter } from './Screen14OfflineSyncCenter';
import { Screen15TeamActivity } from './Screen15TeamActivity';
import { Screen16FieldSelfReview } from './Screen16FieldSelfReview';
import { Screen17SubmissionModal } from './Screen17SubmissionModal';
import { Screen17ASubmittedSuccess } from './Screen17ASubmittedSuccess';
import { Screen18ReturnedInspection } from './Screen18ReturnedInspection';
import { Screen19VersionHistory } from './Screen19VersionHistory';
import { Screen20AuditTrail } from './Screen20AuditTrail';
import { Screen21CompletedHistory } from './Screen21CompletedHistory';

export const Workspace3App: React.FC = () => {
  const { currentScreen } = useFieldInspection();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case '01':
        return <Screen01Dashboard />;
      case '02':
        return <Screen02MyInspections />;
      case '03':
        return <Screen03PreInspectionBrief />;
      case '04':
        return <Screen04ReadinessCheck />;
      case '05':
        return <Screen05StartInspection />;
      case '06':
        return <Screen06ExecutionOverview />;
      case '07':
        return <Screen07Checklist />;
      case '08':
        return <Screen08ChecklistItemDetail />;
      case '09':
        return <Screen09NAUnableToVerify />;
      case '10':
        return <Screen10ObservationCapture />;
      case '11':
        return <Screen11PauseInspection />;
      case '11A':
        return <Screen11APausedState />;
      case '12':
        return <Screen12EvidenceCapture />;
      case '13':
        return <Screen13ProposedFinding />;
      case '14':
        return <Screen14OfflineSyncCenter />;
      case '15':
        return <Screen15TeamActivity />;
      case '16':
        return <Screen16FieldSelfReview />;
      case '17':
        return <Screen17SubmissionModal />;
      case '17A':
        return <Screen17ASubmittedSuccess />;
      case '18':
        return <Screen18ReturnedInspection />;
      case '19':
        return <Screen19VersionHistory />;
      case '20':
        return <Screen20AuditTrail />;
      case '21':
        return <Screen21CompletedHistory />;
      default:
        return <Screen01Dashboard />;
    }
  };

  return (
    <main className="main-viewport">
      {renderActiveScreen()}
    </main>
  );
};
