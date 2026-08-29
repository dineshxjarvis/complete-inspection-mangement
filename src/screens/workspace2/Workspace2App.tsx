"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';

// Import all 20 Workspace 02 Screens
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02Queue } from './Screen02Queue';
import { Screen03Preview } from './Screen03Preview';
import { Screen04AssignTeam } from './Screen04AssignTeam';
import { Screen05TeamDetail } from './Screen05TeamDetail';
import { Screen06AddMemberDrawer } from './Screen06AddMemberDrawer';
import { Screen07InspectorProfile } from './Screen07InspectorProfile';
import { Screen08PreInspectionBrief } from './Screen08PreInspectionBrief';
import { Screen09ValidationEngine } from './Screen09ValidationEngine';
import { Screen10ConfirmModal } from './Screen10ConfirmModal';
import { Screen11SuccessHandoff } from './Screen11SuccessHandoff';
import { Screen12History } from './Screen12History';
import { Screen13ReassignPersonnel } from './Screen13ReassignPersonnel';
import { Screen14ReassignConfirm } from './Screen14ReassignConfirm';
import { Screen15AvailabilityMatrix } from './Screen15AvailabilityMatrix';
import { Screen16ActiveAssignments } from './Screen16ActiveAssignments';
import { Screen17AuditActivity } from './Screen17AuditActivity';
import { Screen18AcceptDecline } from './Screen18AcceptDecline';
import { Screen19ConflictResolver } from './Screen19ConflictResolver';
import { Screen20EnterpriseStates } from './Screen20EnterpriseStates';

export const Workspace2App: React.FC = () => {
  const { currentScreen } = useAssignment();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case '01':
        return <Screen01Dashboard />;
      case '02':
        return <Screen02Queue />;
      case '03':
        return <Screen03Preview />;
      case '04':
        return <Screen04AssignTeam />;
      case '05':
        return <Screen05TeamDetail />;
      case '06':
        return <Screen06AddMemberDrawer />;
      case '07':
        return <Screen07InspectorProfile />;
      case '08':
        return <Screen08PreInspectionBrief />;
      case '09':
        return <Screen09ValidationEngine />;
      case '10':
        return <Screen10ConfirmModal />;
      case '11':
        return <Screen11SuccessHandoff />;
      case '12':
        return <Screen12History />;
      case '13':
        return <Screen13ReassignPersonnel />;
      case '14':
        return <Screen14ReassignConfirm />;
      case '15':
        return <Screen15AvailabilityMatrix />;
      case '16':
        return <Screen16ActiveAssignments />;
      case '17':
        return <Screen17AuditActivity />;
      case '18':
        return <Screen18AcceptDecline />;
      case '19':
        return <Screen19ConflictResolver />;
      case '20':
        return <Screen20EnterpriseStates />;
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
