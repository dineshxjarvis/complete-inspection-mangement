"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02MineInspections } from './Screen02MineInspections';
import { Screen03MineInspectionDetails } from './Screen03MineInspectionDetails';
import { Screen04ChecklistView } from './Screen04ChecklistView';
import { Screen05ObservationDetails } from './Screen05ObservationDetails';
import { Screen06InspectionEvidence } from './Screen06InspectionEvidence';
import { Screen07Findings } from './Screen07Findings';
import { Screen08FindingDetails } from './Screen08FindingDetails';
import { Screen09MineResponse } from './Screen09MineResponse';
import { Screen10ResponseReview } from './Screen10ResponseReview';
import { Screen10AResponseSubmitted } from './Screen10AResponseSubmitted';
import { Screen11ResponseHistory } from './Screen11ResponseHistory';
import { Screen12CapaOverview } from './Screen12CapaOverview';
import { Screen13CapaDetails } from './Screen13CapaDetails';
import { Screen14OverdueActions } from './Screen14OverdueActions';
import { Screen15SafetyActionCenter } from './Screen15SafetyActionCenter';
import { Screen16UpcomingInspections } from './Screen16UpcomingInspections';
import { Screen17DocumentSubmission } from './Screen17DocumentSubmission';
import { Screen18CapaProgressUpdate } from './Screen18CapaProgressUpdate';
import { Screen19InspectionHistory } from './Screen19InspectionHistory';
import { Screen20AuditActivity } from './Screen20AuditActivity';

export const Workspace4App: React.FC = () => {
  const { currentScreen } = useMineResponse();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case '01':
        return <Screen01Dashboard />;
      case '02':
        return <Screen02MineInspections />;
      case '03':
        return <Screen03MineInspectionDetails />;
      case '04':
        return <Screen04ChecklistView />;
      case '05':
        return <Screen05ObservationDetails />;
      case '06':
        return <Screen06InspectionEvidence />;
      case '07':
        return <Screen07Findings />;
      case '08':
        return <Screen08FindingDetails />;
      case '09':
        return <Screen09MineResponse />;
      case '10':
        return <Screen10ResponseReview />;
      case '10A':
        return <Screen10AResponseSubmitted />;
      case '11':
        return <Screen11ResponseHistory />;
      case '12':
        return <Screen12CapaOverview />;
      case '13':
        return <Screen13CapaDetails />;
      case '14':
        return <Screen14OverdueActions />;
      case '15':
        return <Screen15SafetyActionCenter />;
      case '16':
        return <Screen16UpcomingInspections />;
      case '17':
        return <Screen17DocumentSubmission />;
      case '18':
        return <Screen18CapaProgressUpdate />;
      case '19':
        return <Screen19InspectionHistory />;
      case '20':
        return <Screen20AuditActivity />;
      default:
        return <Screen01Dashboard />;
    }
  };

  return (
    <main className="main-viewport ws4-viewport">
      {renderActiveScreen()}
    </main>
  );
};
