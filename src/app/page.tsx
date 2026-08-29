"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { Screen01Dashboard } from '../screens/Screen01Dashboard';
import { Screen02Intake } from '../screens/Screen02Intake';
import { Screen03ACreateRequest } from '../screens/Screen03ACreateRequest';
import { Screen03BRequestDetail } from '../screens/Screen03BRequestDetail';
import { Screen04Recommendations } from '../screens/Screen04Recommendations';
import { Screen05RecommendationDetail } from '../screens/Screen05RecommendationDetail';
import { Screen06PlansList } from '../screens/Screen06PlansList';
import { Screen07CreatePlanWizard } from '../screens/Screen07CreatePlanWizard';
import { Screen08PlanDetail } from '../screens/Screen08PlanDetail';
import { Screen09Calendar } from '../screens/Screen09Calendar';
import { Screen10Schedule } from '../screens/Screen10Schedule';
import { Screen11ConflictResolution } from '../screens/Screen11ConflictResolution';
import { Screen12Overdue } from '../screens/Screen12Overdue';
import { Screen13PlanAudit } from '../screens/Screen13PlanAudit';
import { Screen14InspectionHub } from '../screens/Screen14InspectionHub';
import { Screen15ActiveMonitoring } from '../screens/Screen15ActiveMonitoring';
import { Screen16Findings } from '../screens/Screen16Findings';
import { Screen17Capa } from '../screens/Screen17Capa';
import { Screen18Reports } from '../screens/Screen18Reports';
import { Screen19History } from '../screens/Screen19History';
import { Screen20HistoricalDetail } from '../screens/Screen20HistoricalDetail';
import { Screen21GlobalAudit } from '../screens/Screen21GlobalAudit';
import { Screen22EnterpriseStates } from '../screens/Screen22EnterpriseStates';

export default function StrataMainApp() {
  const { currentScreen } = useStrata();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case '01':
        return <Screen01Dashboard />;
      case '02':
        return <Screen02Intake />;
      case '03A':
        return <Screen03ACreateRequest />;
      case '03B':
        return <Screen03BRequestDetail />;
      case '04':
        return <Screen04Recommendations />;
      case '05':
        return <Screen05RecommendationDetail />;
      case '06':
        return <Screen06PlansList />;
      case '07':
        return <Screen07CreatePlanWizard />;
      case '08':
        return <Screen08PlanDetail />;
      case '09':
        return <Screen09Calendar />;
      case '10':
        return <Screen10Schedule />;
      case '11':
        return <Screen11ConflictResolution />;
      case '12':
        return <Screen12Overdue />;
      case '13':
        return <Screen13PlanAudit />;
      case '14':
        return <Screen14InspectionHub />;
      case '15':
        return <Screen15ActiveMonitoring />;
      case '16':
        return <Screen16Findings />;
      case '17':
        return <Screen17Capa />;
      case '18':
        return <Screen18Reports />;
      case '19':
        return <Screen19History />;
      case '20':
        return <Screen20HistoricalDetail />;
      case '21':
        return <Screen21GlobalAudit />;
      case '22':
        return <Screen22EnterpriseStates />;
      default:
        return <Screen01Dashboard />;
    }
  };

  return (
    <main className="main-viewport">
      {renderActiveScreen()}
    </main>
  );
}
