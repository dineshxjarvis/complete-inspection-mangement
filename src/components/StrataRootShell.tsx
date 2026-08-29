"use client";

import React from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

// Workspace 01 Components
import { Header } from './Header';
import { ScopeBar } from './ScopeBar';
import { Sidebar } from './Sidebar';
import { Modal } from './Modal';
import { Drawer } from './Drawer';
import { ToastContainer } from './ToastContainer';
import { QuickNavigator } from './QuickNavigator';

// Workspace 02 Components
import { Workspace2Header } from './workspace2/Workspace2Header';
import { Workspace2Sidebar } from './workspace2/Workspace2Sidebar';
import { Workspace2Navigator } from './workspace2/Workspace2Navigator';
import { Workspace2App } from '../screens/workspace2/Workspace2App';

// Workspace 03 Components
import { Workspace3Header } from './workspace3/Workspace3Header';
import { Workspace3Sidebar } from './workspace3/Workspace3Sidebar';
import { Workspace3Navigator } from './workspace3/Workspace3Navigator';
import { FieldPhotoCaptureModal } from './workspace3/FieldPhotoCaptureModal';
import { FieldConflictModal } from './workspace3/FieldConflictModal';
import { Workspace3App } from '../screens/workspace3/Workspace3App';

// Workspace 04 Components
import { Workspace4Header } from './workspace4/Workspace4Header';
import { Workspace4Sidebar } from './workspace4/Workspace4Sidebar';
import { Workspace4Navigator } from './workspace4/Workspace4Navigator';
import { CapaUpdateModal } from './workspace4/CapaUpdateModal';
import { EscalationModal } from './workspace4/EscalationModal';
import { EvidenceDetailDrawer } from './workspace4/EvidenceDetailDrawer';
import { Workspace4App } from '../screens/workspace4/Workspace4App';

// Workspace 05 Components
import { Workspace5Header } from './workspace5/Workspace5Header';
import { Workspace5Sidebar } from './workspace5/Workspace5Sidebar';
import { Workspace5Navigator } from './workspace5/Workspace5Navigator';
import { DocumentViewerModal } from './workspace5/DocumentViewerModal';
import { EscalateModal as Ws5EscalateModal } from './workspace5/EscalateModal';
import { ClarificationModal } from './workspace5/ClarificationModal';
import { Workspace5App } from '../screens/workspace5/Workspace5App';

// Workspace 06 Components
import { Workspace6Header } from './workspace6/Workspace6Header';
import { Workspace6Sidebar } from './workspace6/Workspace6Sidebar';
import { Workspace6Navigator } from './workspace6/Workspace6Navigator';
import { EvidenceViewerModal } from './workspace6/EvidenceViewerModal';
import { AddTaskModal } from './workspace6/AddTaskModal';
import { Workspace6App } from '../screens/workspace6/Workspace6App';

// Workspace 07 Components
import { Workspace7Header } from './workspace7/Workspace7Header';
import { Workspace7Sidebar } from './workspace7/Workspace7Sidebar';
import { Workspace7Navigator } from './workspace7/Workspace7Navigator';
import { VerificationEvidenceModal } from './workspace7/VerificationEvidenceModal';
import { ScheduleFollowUpModal } from './workspace7/ScheduleFollowUpModal';
import { Workspace7App } from '../screens/workspace7/Workspace7App';

// Workspace 08 Components
import { Workspace8Header } from './workspace8/Workspace8Header';
import { Workspace8Sidebar } from './workspace8/Workspace8Sidebar';
import { Workspace8Navigator } from './workspace8/Workspace8Navigator';
import { EscalateModal as Ws8EscalateModal } from './workspace8/EscalateModal';
import { RegulatoryDocModal } from './workspace8/RegulatoryDocModal';
import { Workspace8App } from '../screens/workspace8/Workspace8App';

export const StrataRootShell: React.FC<{ ws1Children: React.ReactNode }> = ({ ws1Children }) => {
  const { activeWorkspace } = useWorkspace();

  if (activeWorkspace === 'ws8') {
    return (
      <div className="app-container ws8-theme">
        <Workspace8Header />
        <div className="workspace-body">
          <Workspace8Sidebar />
          <div className="workspace-main-content">
            <Workspace8App />
          </div>
        </div>
        <Workspace8Navigator />
        <Ws8EscalateModal />
        <RegulatoryDocModal />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws7') {
    return (
      <div className="app-container ws7-theme">
        <Workspace7Header />
        <div className="workspace-body">
          <Workspace7Sidebar />
          <div className="workspace-main-content">
            <Workspace7App />
          </div>
        </div>
        <Workspace7Navigator />
        <VerificationEvidenceModal />
        <ScheduleFollowUpModal />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws6') {
    return (
      <div className="app-container ws6-theme">
        <Workspace6Header />
        <div className="workspace-body">
          <Workspace6Sidebar />
          <div className="workspace-main-content">
            <Workspace6App />
          </div>
        </div>
        <Workspace6Navigator />
        <EvidenceViewerModal />
        <AddTaskModal />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws5') {
    return (
      <div className="app-container ws5-theme">
        <Workspace5Header />
        <div className="workspace-body">
          <Workspace5Sidebar />
          <Workspace5App />
        </div>
        <Workspace5Navigator />
        <DocumentViewerModal />
        <Ws5EscalateModal />
        <ClarificationModal />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws4') {
    return (
      <div className="app-container ws4-theme">
        <Workspace4Header />
        <div className="workspace-body">
          <Workspace4Sidebar />
          <Workspace4App />
        </div>
        <Workspace4Navigator />
        <CapaUpdateModal />
        <EscalationModal />
        <EvidenceDetailDrawer />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws3') {
    return (
      <div className="app-container">
        <Workspace3Header />
        <div className="workspace-body">
          <Workspace3Sidebar />
          <Workspace3App />
        </div>
        <Workspace3Navigator />
        <FieldPhotoCaptureModal />
        <FieldConflictModal />
        <ToastContainer />
      </div>
    );
  }

  if (activeWorkspace === 'ws2') {
    return (
      <div className="app-container">
        <Workspace2Header />
        <div className="workspace-body">
          <Workspace2Sidebar />
          <Workspace2App />
        </div>
        <Workspace2Navigator />
        <ToastContainer />
      </div>
    );
  }

  // Workspace 01 View
  return (
    <div className="app-container">
      <Header />
      <ScopeBar />
      <div className="workspace-body">
        <Sidebar />
        {ws1Children}
      </div>
      <Modal />
      <Drawer />
      <ToastContainer />
      <QuickNavigator />
    </div>
  );
};
