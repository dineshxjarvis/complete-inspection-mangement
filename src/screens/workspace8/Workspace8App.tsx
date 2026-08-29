"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import { Screen01Dashboard } from './Screen01Dashboard';
import { Screen02InspectionPerformance } from './Screen02InspectionPerformance';
import { Screen03InspectionCoverage } from './Screen03InspectionCoverage';
import { Screen04ActiveInspections } from './Screen04ActiveInspections';
import { Screen05InspectionOverview } from './Screen05InspectionOverview';
import { Screen06CriticalFindings } from './Screen06CriticalFindings';
import { Screen07FindingDetails } from './Screen07FindingDetails';
import { Screen08RepeatFindings } from './Screen08RepeatFindings';
import { Screen09CapaPerformance } from './Screen09CapaPerformance';
import { Screen10OverdueCapa } from './Screen10OverdueCapa';
import { Screen11RiskOverview } from './Screen11RiskOverview';
import { Screen12MineRiskDetails } from './Screen12MineRiskDetails';
import { Screen13OrganizationDrillDown } from './Screen13OrganizationDrillDown';
import { Screen14MineGovernanceProfile } from './Screen14MineGovernanceProfile';
import { Screen15RegulatoryOversight } from './Screen15RegulatoryOversight';
import { Screen16ExternalInspectionDetails } from './Screen16ExternalInspectionDetails';
import { Screen17RegulatoryResponseStatus } from './Screen17RegulatoryResponseStatus';
import { Screen18InspectionTrackAnalytics } from './Screen18InspectionTrackAnalytics';
import { Screen19InspectionTypeAnalytics } from './Screen19InspectionTypeAnalytics';
import { Screen20ReportCentre } from './Screen20ReportCentre';
import { Screen21ReportBuilder } from './Screen21ReportBuilder';
import { Screen22GeneratedReport } from './Screen22GeneratedReport';
import { Screen23EscalationCentre } from './Screen23EscalationCentre';
import { Screen24EscalationDetails } from './Screen24EscalationDetails';
import { Screen25AuditTrail } from './Screen25AuditTrail';
import { Screen26ObjectHistory } from './Screen26ObjectHistory';
import { Screen27RegulatoryTraceability } from './Screen27RegulatoryTraceability';
import { Screen28RegulatoryStatusMatrix } from './Screen28RegulatoryStatusMatrix';
import { Screen29SeniorNotifications } from './Screen29SeniorNotifications';
import { Screen30RegulatoryAuthorityView } from './Screen30RegulatoryAuthorityView';
import { Screen31RegulatoryAuthorityDashboard } from './Screen31RegulatoryAuthorityDashboard';
import { Screen32RegulatoryDocumentViewer } from './Screen32RegulatoryDocumentViewer';
import { Screen33RegulatoryClosure } from './Screen33RegulatoryClosure';
import { Screen34OversightSearch } from './Screen34OversightSearch';
import { Screen35FinalSummary } from './Screen35FinalSummary';

export const Workspace8App: React.FC = () => {
  const { currentScreen } = useOversight();

  switch (currentScreen) {
    case '01':
      return <Screen01Dashboard />;
    case '02':
      return <Screen02InspectionPerformance />;
    case '03':
      return <Screen03InspectionCoverage />;
    case '04':
      return <Screen04ActiveInspections />;
    case '05':
      return <Screen05InspectionOverview />;
    case '06':
      return <Screen06CriticalFindings />;
    case '07':
      return <Screen07FindingDetails />;
    case '08':
      return <Screen08RepeatFindings />;
    case '09':
      return <Screen09CapaPerformance />;
    case '10':
      return <Screen10OverdueCapa />;
    case '11':
      return <Screen11RiskOverview />;
    case '12':
      return <Screen12MineRiskDetails />;
    case '13':
      return <Screen13OrganizationDrillDown />;
    case '14':
      return <Screen14MineGovernanceProfile />;
    case '15':
      return <Screen15RegulatoryOversight />;
    case '16':
      return <Screen16ExternalInspectionDetails />;
    case '17':
      return <Screen17RegulatoryResponseStatus />;
    case '18':
      return <Screen18InspectionTrackAnalytics />;
    case '19':
      return <Screen19InspectionTypeAnalytics />;
    case '20':
      return <Screen20ReportCentre />;
    case '21':
      return <Screen21ReportBuilder />;
    case '22':
      return <Screen22GeneratedReport />;
    case '23':
      return <Screen23EscalationCentre />;
    case '24':
      return <Screen24EscalationDetails />;
    case '25':
      return <Screen25AuditTrail />;
    case '26':
      return <Screen26ObjectHistory />;
    case '27':
      return <Screen27RegulatoryTraceability />;
    case '28':
      return <Screen28RegulatoryStatusMatrix />;
    case '29':
      return <Screen29SeniorNotifications />;
    case '30':
      return <Screen30RegulatoryAuthorityView />;
    case '31':
      return <Screen31RegulatoryAuthorityDashboard />;
    case '32':
      return <Screen32RegulatoryDocumentViewer />;
    case '33':
      return <Screen33RegulatoryClosure />;
    case '34':
      return <Screen34OversightSearch />;
    case '35':
      return <Screen35FinalSummary />;
    default:
      return <Screen01Dashboard />;
  }
};
