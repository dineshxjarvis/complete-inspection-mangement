"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02MyCapaQueue } from './Screen02MyCapaQueue';
import { Screen03CapaIntake } from './Screen03CapaIntake';
import { Screen04CapaDetails } from './Screen04CapaDetails';
import { Screen05ActionPlan } from './Screen05ActionPlan';
import { Screen06UpdateProgress } from './Screen06UpdateProgress';
import { Screen07EvidenceUpload } from './Screen07EvidenceUpload';
import { Screen08EvidenceReview } from './Screen08EvidenceReview';
import { Screen09BlockedAction } from './Screen09BlockedAction';
import { Screen10RequestClarification } from './Screen10RequestClarification';
import { Screen11ReturnedCapa } from './Screen11ReturnedCapa';
import { Screen12ComplianceStatus } from './Screen12ComplianceStatus';
import { Screen13SubmitForVerification } from './Screen13SubmitForVerification';
import { Screen14CapaHistory } from './Screen14CapaHistory';
import { Screen15ActionAudit } from './Screen15ActionAudit';
import { Screen16CapaRegister } from './Screen16CapaRegister';
import { Screen17CompletedActions } from './Screen17CompletedActions';
import { Screen18VerificationHandoff } from './Screen18VerificationHandoff';

export const Workspace6App: React.FC = () => {
  const { currentScreen } = useCorrectiveAction();

  switch (currentScreen) {
    case '01':
      return <Screen01Dashboard />;
    case '02':
      return <Screen02MyCapaQueue />;
    case '03':
      return <Screen03CapaIntake />;
    case '04':
      return <Screen04CapaDetails />;
    case '05':
      return <Screen05ActionPlan />;
    case '06':
      return <Screen06UpdateProgress />;
    case '07':
      return <Screen07EvidenceUpload />;
    case '08':
      return <Screen08EvidenceReview />;
    case '09':
      return <Screen09BlockedAction />;
    case '10':
      return <Screen10RequestClarification />;
    case '11':
      return <Screen11ReturnedCapa />;
    case '12':
      return <Screen12ComplianceStatus />;
    case '13':
      return <Screen13SubmitForVerification />;
    case '14':
      return <Screen14CapaHistory />;
    case '15':
      return <Screen15ActionAudit />;
    case '16':
      return <Screen16CapaRegister />;
    case '17':
      return <Screen17CompletedActions />;
    case '18':
      return <Screen18VerificationHandoff />;
    default:
      return <Screen01Dashboard />;
  }
};
