"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';

// All 21 Screen Components
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02VerificationQueue } from './Screen02VerificationQueue';
import { Screen03VerificationAssignment } from './Screen03VerificationAssignment';
import { Screen04VerificationDetails } from './Screen04VerificationDetails';
import { Screen05Traceability } from './Screen05Traceability';
import { Screen06EvidenceReview } from './Screen06EvidenceReview';
import { Screen07MeasurementVerification } from './Screen07MeasurementVerification';
import { Screen08SiteFollowUp } from './Screen08SiteFollowUp';
import { Screen09VerificationChecklist } from './Screen09VerificationChecklist';
import { Screen10VerificationDecision } from './Screen10VerificationDecision';
import { Screen11PassConfirmation } from './Screen11PassConfirmation';
import { Screen12FailVerification } from './Screen12FailVerification';
import { Screen13ReopenCapa } from './Screen13ReopenCapa';
import { Screen14ReturnClarification } from './Screen14ReturnClarification';
import { Screen15ReverificationQueue } from './Screen15ReverificationQueue';
import { Screen16VerificationHistory } from './Screen16VerificationHistory';
import { Screen17FollowUpMonitoring } from './Screen17FollowUpMonitoring';
import { Screen18RecurrenceDetected } from './Screen18RecurrenceDetected';
import { Screen19VerificationReport } from './Screen19VerificationReport';
import { Screen20VerificationAudit } from './Screen20VerificationAudit';
import { Screen21VerificationRegister } from './Screen21VerificationRegister';

export const Workspace7App: React.FC = () => {
  const { currentScreen } = useVerification();

  switch (currentScreen) {
    case '01':
      return <Screen01Dashboard />;
    case '02':
      return <Screen02VerificationQueue />;
    case '03':
      return <Screen03VerificationAssignment />;
    case '04':
      return <Screen04VerificationDetails />;
    case '05':
      return <Screen05Traceability />;
    case '06':
      return <Screen06EvidenceReview />;
    case '07':
      return <Screen07MeasurementVerification />;
    case '08':
      return <Screen08SiteFollowUp />;
    case '09':
      return <Screen09VerificationChecklist />;
    case '10':
      return <Screen10VerificationDecision />;
    case '11':
      return <Screen11PassConfirmation />;
    case '12':
      return <Screen12FailVerification />;
    case '13':
      return <Screen13ReopenCapa />;
    case '14':
      return <Screen14ReturnClarification />;
    case '15':
      return <Screen15ReverificationQueue />;
    case '16':
      return <Screen16VerificationHistory />;
    case '17':
      return <Screen17FollowUpMonitoring />;
    case '18':
      return <Screen18RecurrenceDetected />;
    case '19':
      return <Screen19VerificationReport />;
    case '20':
      return <Screen20VerificationAudit />;
    case '21':
      return <Screen21VerificationRegister />;
    default:
      return <Screen01Dashboard />;
  }
};
