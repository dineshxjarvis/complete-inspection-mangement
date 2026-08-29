"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StrataDatabase, INITIAL_STRATA_DATA } from '../data/strataData';
import { IntakeRequest, InspectionPlan } from '../types/strata';

export interface ModalButton {
  text: string;
  className?: string;
  onClick: () => void;
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  buttons: ModalButton[];
}

export interface DrawerState {
  isOpen: boolean;
  title: string;
  content: ReactNode;
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface StrataContextType {
  data: StrataDatabase;
  currentScreen: string;
  screenParams: Record<string, any>;
  navigateTo: (screenId: string, params?: Record<string, any>) => void;
  
  // Scope
  activeHolding: string;
  activeSubsidiary: string;
  activeArea: string;
  activeMine: string;
  setScope: (holding?: string, subsidiary?: string, area?: string, mine?: string) => void;

  // Filter & sub-states
  activeIntakeTab: string;
  setIntakeTab: (tab: string) => void;
  activeCalendarView: string;
  setCalendarView: (view: string) => void;
  selectedCalendarDate: string;
  setSelectedCalendarDate: (date: string) => void;
  activeEnterpriseState: string;
  setEnterpriseState: (stateId: string) => void;

  // UI Overlays
  modalState: ModalState;
  showModal: (title: string, content: ReactNode, buttons?: ModalButton[]) => void;
  closeModal: () => void;
  
  drawerState: DrawerState;
  openDrawer: (title: string, content: ReactNode) => void;
  closeDrawer: () => void;

  toasts: ToastItem[];
  showToast: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void;

  // Quick Navigator
  quickNavOpen: boolean;
  setQuickNavOpen: (open: boolean) => void;

  // Actions
  submitIntakeRequest: (req: Partial<IntakeRequest>) => void;
  acceptIntakeRequest: (reqId: string) => void;
  rejectIntakeRequest: (reqId: string) => void;
  createPlan: (plan: Partial<InspectionPlan>) => void;
  scheduleInspection: (planId: string, date: string, time: string) => void;
}

const StrataContext = createContext<StrataContextType | undefined>(undefined);

export const StrataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StrataDatabase>(INITIAL_STRATA_DATA);
  const [currentScreen, setCurrentScreen] = useState<string>('01');
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});
  
  // Scope
  const [activeHolding, setActiveHolding] = useState<string>('Coal India Limited (CIL)');
  const [activeSubsidiary, setActiveSubsidiary] = useState<string>('Eastern Coalfields Limited (ECL)');
  const [activeArea, setActiveArea] = useState<string>('Area 01 (Sripur-Kenda)');
  const [activeMine, setActiveMine] = useState<string>('Mine A2 (Deep Underground Seam VII)');

  // Sub-states
  const [activeIntakeTab, setActiveIntakeTab] = useState<string>('All');
  const [activeCalendarView, setActiveCalendarView] = useState<string>('Month');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-11-15');
  const [activeEnterpriseState, setActiveEnterpriseState] = useState<string>('state-empty-rec');

  // UI Overlays
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    content: null,
    buttons: []
  });

  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    title: '',
    content: null
  });

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [quickNavOpen, setQuickNavOpen] = useState<boolean>(false);

  const navigateTo = (screenId: string, params: Record<string, any> = {}) => {
    setCurrentScreen(screenId);
    setScreenParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setScope = (holding?: string, subsidiary?: string, area?: string, mine?: string) => {
    if (holding) setActiveHolding(holding);
    if (subsidiary) setActiveSubsidiary(subsidiary);
    if (area) setActiveArea(area);
    if (mine) setActiveMine(mine);
    showToast(`Scope set to: ${mine || area || subsidiary || holding}`, 'info');
  };

  const showModal = (title: string, content: ReactNode, buttons: ModalButton[] = []) => {
    setModalState({
      isOpen: true,
      title,
      content,
      buttons
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const openDrawer = (title: string, content: ReactNode) => {
    setDrawerState({
      isOpen: true,
      title,
      content
    });
  };

  const closeDrawer = () => {
    setDrawerState(prev => ({ ...prev, isOpen: false }));
  };

  const showToast = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Domain Actions
  const submitIntakeRequest = (req: Partial<IntakeRequest>) => {
    const newReqId = `REQ-2026-0${105 + data.intakeRequests.length}`;
    const newReq: IntakeRequest = {
      id: newReqId,
      source: req.source || 'Mine Management',
      sourceType: req.sourceType || 'Mine Management',
      requester: req.requester || 'R. K. Agarwal',
      designation: req.designation || 'Colliery Mine Agent',
      contact: req.contact || 'agent.mineA2@ecl.coalindia.in',
      inspectionTrack: req.inspectionTrack || 'Safety & Strata Control',
      inspectionType: req.inspectionType || 'Strata Control & Roof Support Urgent Inspection',
      scope: {
        holding: activeHolding,
        subsidiary: activeSubsidiary,
        area: activeArea,
        mine: activeMine,
        location: req.scope?.location || 'District 3 West Depillaring Section'
      },
      reason: req.reason || 'Abnormal telltale roof convergence detected',
      description: req.description || 'Sub-surface strata monitoring stations signaled displacement.',
      priority: req.priority || 'High',
      risk: req.risk || 'High',
      requestedDate: req.requestedDate || '2026-08-30',
      received: '2026-08-29 08:30',
      status: 'New',
      supportingInfo: 'Telemetry log attached.',
      attachments: [{ name: 'telemetry_convergence_panelW4.pdf', size: '2.4 MB', type: 'PDF' }],
      timeline: [
        { step: 'Request Created', date: '2026-08-29 08:30', by: req.requester || 'Mine Agent', done: true, current: false },
        { step: 'Received in STRATA', date: '2026-08-29 08:31', by: 'System Auto-Intake', done: true, current: true },
        { step: 'Under Review', date: 'Pending', by: 'Inspection Manager', done: false, current: false },
        { step: 'Accept / Reject Decision', date: 'Pending', by: 'Governance Authority', done: false, current: false },
        { step: 'Recommendation Creation', date: 'Pending', by: 'System / Manager', done: false, current: false },
        { step: 'Inspection Plan', date: 'Pending', by: 'Planning Cell', done: false, current: false }
      ]
    };

    setData(prev => ({
      ...prev,
      intakeRequests: [newReq, ...prev.intakeRequests]
    }));

    showToast(`Request ${newReqId} created successfully! Status: NEW`, 'success');
    navigateTo('03B', { requestId: newReqId });
  };

  const acceptIntakeRequest = (reqId: string) => {
    setData(prev => ({
      ...prev,
      intakeRequests: prev.intakeRequests.map(r => r.id === reqId ? { ...r, status: 'Accepted' } : r)
    }));
    closeModal();
    showToast(`Request ${reqId} accepted for planning.`, 'success');
  };

  const rejectIntakeRequest = (reqId: string) => {
    setData(prev => ({
      ...prev,
      intakeRequests: prev.intakeRequests.map(r => r.id === reqId ? { ...r, status: 'Rejected' } : r)
    }));
    closeModal();
    showToast(`Request ${reqId} rejected. Reason logged to audit trail.`, 'error');
  };

  const createPlan = (plan: Partial<InspectionPlan>) => {
    const newPlanId = plan.id || `PLAN-2026-00${88 + data.inspectionPlans.length}`;
    const newPlan: InspectionPlan = {
      id: newPlanId,
      recommendationId: plan.recommendationId || 'REC-2026-0048',
      requestId: plan.requestId || 'REQ-2026-0099',
      inspectionType: plan.inspectionType || 'Ventilation & Gas Dynamics Inspection',
      title: plan.title || 'Statutory Comprehensive Underground Ventilation Audit',
      track: plan.track || 'Safety & Occupational Health',
      authority: plan.authority || 'DGMS / CIL Statutory Safety Board',
      organization: activeHolding,
      subsidiary: activeSubsidiary,
      area: activeArea,
      mine: activeMine,
      location: plan.location || 'Intake Shaft 1, Splitting Points 1-6, District 3 & 4 Face',
      planner: `${data.meta.currentUser.name} (${data.meta.currentUser.role})`,
      createdDate: '2026-08-29 10:14',
      status: plan.status || 'Planned',
      plannedDate: plan.plannedDate || '2026-11-15',
      plannedDuration: '6 Hours',
      risk: plan.risk || 'High',
      purpose: plan.purpose || 'Execute statutory quarterly ventilation network survey.',
      objective: plan.objective || 'Ensure 100% compliance with CMR 2017 Regulation 153.',
      planningNotes: 'Priority audit due to historical low air velocity finding.',
      regulatoryBasis: data.regulations[0],
      checklist: {
        templateId: 'DGMS-STD-VENT-04',
        name: 'DGMS Standard Ventilation & Gas Dynamic Survey Protocol v3.1',
        checksCount: 22,
        measurementRequirements: ['Air velocity (m/s)', 'CH4 concentration (%)', 'CO concentration (ppm)'],
        evidenceRequirements: ['Digital timestamped photo of anemometer station']
      },
      teamRequirements: {
        leadCompetency: 'First Class Mine Manager Certificate of Competency (Coal)',
        specialists: ['DGMS Certified Ventilation Officer', 'Gas Testing Specialist'],
        supportingInspectors: ['Assistant Safety Officer (Underground)'],
        minTeamSize: 3,
        assignmentStatus: 'Unassigned (Awaiting Workspace 02 Hand-off)'
      },
      preparation: {
        instruments: ['Vane Anemometer', 'Smoke Tube Kit', 'Multi-Gas Detector'],
        ppe: ['SCSR 60-min', 'Cap Lamp Group I', 'Antistatic Boots'],
        documents: ['Mine Ventilation Plan v4.2', 'Daily Gas Book Register'],
        siteRequirements: ['Colliery Ventilation Officer to accompany audit team']
      },
      scheduleData: null,
      activity: [
        { time: '2026-08-29 10:14', user: data.meta.currentUser.name, action: `Plan ${newPlanId} created`, reason: 'Statutory obligation' }
      ],
      versions: [
        { version: 'v1.0', date: '2026-08-29 10:14', user: data.meta.currentUser.name, note: 'Initial creation' }
      ]
    };

    setData(prev => ({
      ...prev,
      inspectionPlans: [newPlan, ...prev.inspectionPlans]
    }));

    showToast(`Inspection Plan ${newPlanId} created! Status: ${newPlan.status}`, 'success');
    navigateTo('08', { planId: newPlanId });
  };

  const scheduleInspection = (planId: string, date: string, time: string) => {
    setData(prev => ({
      ...prev,
      inspectionPlans: prev.inspectionPlans.map(p => p.id === planId ? { ...p, status: 'Scheduled', plannedDate: date } : p)
    }));
    showToast(`Inspection ${planId} scheduled for ${date} (${time})!`, 'success');
    navigateTo('14', { inspectionId: 'INS-2026-0882' });
  };

  return (
    <StrataContext.Provider value={{
      data,
      currentScreen,
      screenParams,
      navigateTo,
      activeHolding,
      activeSubsidiary,
      activeArea,
      activeMine,
      setScope,
      activeIntakeTab,
      setIntakeTab: setActiveIntakeTab,
      activeCalendarView,
      setCalendarView: setActiveCalendarView,
      selectedCalendarDate,
      setSelectedCalendarDate,
      activeEnterpriseState,
      setEnterpriseState: setActiveEnterpriseState,
      modalState,
      showModal,
      closeModal,
      drawerState,
      openDrawer,
      closeDrawer,
      toasts,
      showToast,
      quickNavOpen,
      setQuickNavOpen,
      submitIntakeRequest,
      acceptIntakeRequest,
      rejectIntakeRequest,
      createPlan,
      scheduleInspection
    }}>
      {children}
    </StrataContext.Provider>
  );
};

export const useStrata = () => {
  const context = useContext(StrataContext);
  if (!context) {
    throw new Error('useStrata must be used within a StrataProvider');
  }
  return context;
};
