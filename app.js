// STRATA Enterprise Coal-Mining Inspection Governance Platform - Master Application Controller
// Handles Router, 22 Screens, Global State, Modals, Drawers, Dynamic Steppers & Validation

class StrataApp {
  constructor() {
    this.data = window.STRATA_DATA;
    this.currentScreen = '01'; // Default Screen 01 Dashboard
    this.activeTab = {};
    this.currentPlanStep = 1;
    this.selectedDate = '2026-11-15';
    this.activeEnterpriseState = 'state-empty-rec';
    this.selectedMultiMine = false;
    this.filters = {
      intakeTab: 'All',
      calendarView: 'Month',
      scopeHolding: 'Coal India Limited (CIL)',
      scopeSubsidiary: 'Eastern Coalfields Limited (ECL)',
      scopeArea: 'Area 01 (Sripur-Kenda)',
      scopeMine: 'Mine A2 (Deep Underground Seam VII)'
    };
    
    this.init();
  }

  init() {
    this.renderHeaderAndScope();
    this.renderSidebar();
    this.bindGlobalEvents();
    this.navigateTo('01');
    this.startClock();
  }

  startClock() {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      clockEl.textContent = `${dateStr} | ${timeStr} IST`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  renderHeaderAndScope() {
    const user = this.data.meta.currentUser;
    const userPill = document.getElementById('header-user-pill');
    if (userPill) {
      userPill.innerHTML = `
        <div class="user-avatar">${user.avatar}</div>
        <div class="user-info-text">
          <span class="user-name">${user.name}</span>
          <span class="user-role">${user.designation}</span>
        </div>
      `;
    }
  }

  renderSidebar() {
    const navItems = [
      { id: '01', title: 'Dashboard', icon: 'grid', badge: null },
      { id: '02', title: 'Inspection Intake', icon: 'inbox', badge: this.data.intakeRequests.filter(r => r.status === 'New').length },
      { id: '04', title: 'Recommendations', icon: 'sparkle', badge: this.data.recommendations.filter(r => r.status === 'Awaiting Planning').length, badgeType: 'warning' },
      { id: '06', title: 'Inspection Plans', icon: 'file-text', badge: this.data.inspectionPlans.length },
      { id: '09', title: 'Planning Calendar', icon: 'calendar', badge: null },
      { id: '10', title: 'Scheduling', icon: 'clock', badge: null },
      { id: '15', title: 'Active Inspections', icon: 'activity', badge: 1 },
      { id: '12', title: 'Overdue Inspections', icon: 'alert-triangle', badge: this.data.overdueInspections.length, badgeType: 'overdue' },
      { id: '16', title: 'Findings Monitoring', icon: 'eye', badge: this.data.findings.length },
      { id: '17', title: 'CAPA Monitoring', icon: 'check-square', badge: this.data.capaList.filter(c => c.status === 'Open' || c.status === 'Overdue').length },
      { id: '18', title: 'Report Status', icon: 'file-check', badge: null },
      { id: '19', title: 'Inspection History', icon: 'archive', badge: null },
      { id: '21', title: 'Audit / Activity', icon: 'shield', badge: null },
      { id: '22', title: 'Enterprise States', icon: 'layers', badge: '9' }
    ];

    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = navItems.map(item => `
      <li class="sidebar-nav-item ${this.currentScreen === item.id ? 'active' : ''}" data-screen="${item.id}" onclick="strata.navigateTo('${item.id}')">
        <div class="nav-item-content">
          <span class="nav-icon">${this.getIconSvg(item.icon)}</span>
          <span>${item.title}</span>
        </div>
        ${item.badge !== null ? `<span class="nav-count-badge ${item.badgeType || ''}">${item.badge}</span>` : ''}
      </li>
    `).join('');
  }

  navigateTo(screenId, params = {}) {
    this.currentScreen = screenId;
    this.screenParams = params;
    this.renderSidebar();

    const viewport = document.getElementById('screen-content-viewport');
    if (!viewport) return;

    // Render screen
    switch (screenId) {
      case '01': viewport.innerHTML = this.renderScreen01(); break;
      case '02': viewport.innerHTML = this.renderScreen02(); break;
      case '03A': viewport.innerHTML = this.renderScreen03A(); break;
      case '03B': viewport.innerHTML = this.renderScreen03B(params.requestId || 'REQ-2026-0098'); break;
      case '04': viewport.innerHTML = this.renderScreen04(); break;
      case '05': viewport.innerHTML = this.renderScreen05(params.recId || 'REC-2026-0048'); break;
      case '06': viewport.innerHTML = this.renderScreen06(); break;
      case '07': viewport.innerHTML = this.renderScreen07(params.recId || 'REC-2026-0048'); break;
      case '08': viewport.innerHTML = this.renderScreen08(params.planId || 'PLAN-2026-0088'); break;
      case '09': viewport.innerHTML = this.renderScreen09(); break;
      case '10': viewport.innerHTML = this.renderScreen10(params.planId || 'PLAN-2026-0088'); break;
      case '11': viewport.innerHTML = this.renderScreen11(params.planId || 'PLAN-2026-0088'); break;
      case '12': viewport.innerHTML = this.renderScreen12(); break;
      case '13': viewport.innerHTML = this.renderScreen13(params.planId || 'PLAN-2026-0088'); break;
      case '14': viewport.innerHTML = this.renderScreen14(params.inspectionId || 'INS-2026-0882'); break;
      case '15': viewport.innerHTML = this.renderScreen15(); break;
      case '16': viewport.innerHTML = this.renderScreen16(); break;
      case '17': viewport.innerHTML = this.renderScreen17(); break;
      case '18': viewport.innerHTML = this.renderScreen18(); break;
      case '19': viewport.innerHTML = this.renderScreen19(); break;
      case '20': viewport.innerHTML = this.renderScreen20(params.inspectionId || 'INS-2026-0782'); break;
      case '21': viewport.innerHTML = this.renderScreen21(); break;
      case '22': viewport.innerHTML = this.renderScreen22(); break;
      default: viewport.innerHTML = this.renderScreen01();
    }

    viewport.scrollTop = 0;
  }

  // ==========================================
  // SCREEN 01 — WORKSPACE ENTRY / DASHBOARD
  // ==========================================
  renderScreen01() {
    const kpis = [
      { label: 'Inspection Recommendations', value: '4', subtext: '2 High Risk', danger: false, warning: true },
      { label: 'Inspection Plans', value: '3', subtext: '1 Ready for scheduling', danger: false, warning: false, primary: true },
      { label: 'Scheduled', value: '2', subtext: 'Allocated slots', danger: false, warning: false },
      { label: 'Unassigned', value: '5', subtext: 'Awaiting Workspace 02', danger: false, warning: true },
      { label: 'In Progress', value: '1', subtext: 'Live field execution', danger: false, warning: false },
      { label: 'Overdue', value: '3', subtext: 'Action required', danger: true, warning: false }
    ];

    return `
      <div class="content-container">
        <!-- Breadcrumb -->
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Workspace</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Inspection Governance & Planning Dashboard</span>
        </div>

        <!-- Header -->
        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('shield')}
              Inspection Governance & Planning
            </h1>
            <p class="screen-subtitle">Plan, schedule, assign, and monitor inspections across the authorized organizational scope (CIL / ECL / Area 01 / Mine A2).</p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.navigateTo('02')">
              ${this.getIconSvg('inbox')} Inspection Intake
            </button>
            <button class="btn btn-primary" onclick="strata.navigateTo('07')">
              ${this.getIconSvg('plus')} Create Inspection Plan
            </button>
          </div>
        </div>

        <!-- Top KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''} ${k.primary ? 'kpi-primary' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row">
                <span class="kpi-value">${k.value}</span>
              </div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Section 2: Recommendations Requiring Attention -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">
              ${this.getIconSvg('alert-circle')}
              Inspection Recommendations Requiring Attention
            </span>
            <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('04')">View All Recommendations (${this.data.recommendations.length})</button>
          </div>
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Recommendation ID</th>
                  <th>Mine</th>
                  <th>Inspection Type</th>
                  <th>Regulatory Basis</th>
                  <th>Due Date</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.recommendations.map(r => `
                  <tr>
                    <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('05', {recId:'${r.id}'})">${r.id}</strong></td>
                    <td>${r.mine.split('(')[0]}</td>
                    <td>${r.inspectionType}</td>
                    <td><span class="badge badge-draft font-mono">${r.regulatoryBasis}</span></td>
                    <td class="font-mono">${r.dueDate}</td>
                    <td><span class="badge ${r.risk === 'High' ? 'badge-high' : 'badge-medium'}"><span class="badge-dot"></span>${r.risk}</span></td>
                    <td><span class="badge badge-awaiting"><span class="badge-dot"></span>${r.status}</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('05', {recId:'${r.id}'})">Review</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Two Column Grid for Upcoming & Attention Required + Activity -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 20px;">
          
          <!-- Left Col: Upcoming Inspections -->
          <div class="enterprise-card" style="margin-bottom:0;">
            <div class="card-header">
              <span class="card-title">
                ${this.getIconSvg('calendar')}
                Upcoming Inspections
              </span>
              <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('09')">Open Planning Calendar</button>
            </div>
            <div class="table-responsive">
              <table class="strata-table">
                <thead>
                  <tr>
                    <th>Inspection ID</th>
                    <th>Mine</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Lead Inspector</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.data.calendarEvents.slice(0, 4).map(e => `
                    <tr style="cursor:pointer;" onclick="strata.navigateTo('14', {inspectionId:'${e.id.replace('-SIM','')}'})">
                      <td><strong class="font-mono" style="color:var(--purple-primary);">${e.id}</strong></td>
                      <td>${e.mine}</td>
                      <td>${e.type}</td>
                      <td class="font-mono">${e.date}</td>
                      <td>${e.leadInspector}</td>
                      <td>
                        <span class="badge ${e.status === 'In Progress' ? 'badge-in-progress' : e.status === 'Overdue' ? 'badge-overdue' : 'badge-scheduled'}">
                          <span class="badge-dot"></span>${e.status}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Col: Attention Required Cards & Recent Activity -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="enterprise-card" style="margin-bottom:0;">
              <div class="card-header">
                <span class="card-title">${this.getIconSvg('bell')} Attention Required</span>
              </div>
              <div class="card-body" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                <div style="padding: 8px 12px; background: #FFF8E1; border: 1px solid #FFE082; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor:pointer;" onclick="strata.navigateTo('04')">
                  <div>
                    <strong style="color:#B78103; font-size:12px;">4 Unplanned Recommendations</strong>
                    <div style="font-size:10.5px; color:#6D4C41;">Statutory obligations awaiting plan approval</div>
                  </div>
                  <span class="badge badge-medium">Action</span>
                </div>
                <div style="padding: 8px 12px; background: #FFEBEE; border: 1px solid #FFCDD2; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor:pointer;" onclick="strata.navigateTo('12')">
                  <div>
                    <strong style="color:#C62828; font-size:12px;">3 Overdue Inspections</strong>
                    <div style="font-size:10.5px; color:#7F0000;">Exceeded statutory due date window</div>
                  </div>
                  <span class="badge badge-high">Escalate</span>
                </div>
                <div style="padding: 8px 12px; background: #EDE7F6; border: 1px solid #D1C4E9; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; cursor:pointer;" onclick="strata.navigateTo('06')">
                  <div>
                    <strong style="color:var(--purple-primary); font-size:12px;">5 Unassigned Inspections</strong>
                    <div style="font-size:10.5px; color:var(--text-secondary);">Ready for Workspace 02 assignment</div>
                  </div>
                  <span class="badge badge-planned">Assign</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity Mini Panel -->
            <div class="enterprise-card" style="margin-bottom:0;">
              <div class="card-header">
                <span class="card-title">${this.getIconSvg('clock')} Recent Governance Activity</span>
                <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('21')">All Logs</button>
              </div>
              <div class="card-body" style="padding: 10px 14px; max-height: 200px; overflow-y: auto;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${this.data.globalAudit.slice(0, 3).map(a => `
                    <div style="font-size:11.5px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
                      <div style="display:flex; justify-content:space-between; color:var(--text-muted); font-size:10px;">
                        <span>${a.user.split('(')[0]}</span>
                        <span class="font-mono">${a.timestamp.split(' ')[1]}</span>
                      </div>
                      <div style="font-weight:600; color:var(--text-primary);">${a.action}: <span class="font-mono" style="color:var(--purple-primary);">${a.objectId}</span></div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // ==========================================
  // SCREEN 02 — INSPECTION INTAKE
  // ==========================================
  renderScreen02() {
    const tabs = ['All', 'New', 'Under Review', 'Accepted', 'Rejected', 'Converted to Recommendation', 'Converted to Plan'];
    const activeTab = this.filters.intakeTab || 'All';

    let filtered = this.data.intakeRequests;
    if (activeTab !== 'All') {
      filtered = filtered.filter(r => r.status.toLowerCase() === activeTab.toLowerCase());
    }

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Inspection Intake</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Inspection Intake</h1>
            <p class="screen-subtitle">Review incoming inspection triggers, management requests, compliance engine signals, and DGMS notices before plan conversion.</p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-primary" onclick="strata.navigateTo('03A')">
              ${this.getIconSvg('plus')} Create Inspection Request
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <input type="text" class="filter-input" placeholder="Search Request ID, Mine, Reason..." style="min-width: 240px;">
          <select class="filter-select">
            <option>All Sources (Internal, Mine Mgmt, Compliance, DGMS)</option>
            <option>Mine Management</option>
            <option>Compliance Engine</option>
            <option>Senior Authority / DGMS</option>
          </select>
          <select class="filter-select">
            <option>All Priority (Critical, High, Medium, Low)</option>
            <option>High / Critical</option>
            <option>Medium</option>
          </select>
          <select class="filter-select">
            <option>Subsidiary: ECL</option>
            <option>BCCL</option>
            <option>CCL</option>
          </select>
          <button class="btn btn-secondary btn-sm" style="margin-left:auto;">Reset Filters</button>
        </div>

        <!-- Status Tabs -->
        <div class="tabs-nav">
          ${tabs.map(t => {
            const count = t === 'All' ? this.data.intakeRequests.length : this.data.intakeRequests.filter(r => r.status.toLowerCase() === t.toLowerCase()).length;
            return `
              <button class="tab-btn ${activeTab === t ? 'active' : ''}" onclick="strata.setIntakeTab('${t}')">
                ${t} <span class="tab-count">${count}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Source</th>
                  <th>Inspection Type</th>
                  <th>Mine / Scope</th>
                  <th>Reason</th>
                  <th>Priority</th>
                  <th>Requested By</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(r => `
                  <tr>
                    <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('03B', {requestId:'${r.id}'})">${r.id}</strong></td>
                    <td><span class="badge badge-draft">${r.source}</span></td>
                    <td><strong>${r.inspectionType}</strong></td>
                    <td>${r.scope.mine.split('(')[0]} <div style="font-size:10.5px; color:var(--text-muted);">${r.scope.location}</div></td>
                    <td style="max-width: 220px;">${r.reason}</td>
                    <td>
                      <span class="badge ${r.priority === 'Critical' ? 'badge-critical' : r.priority === 'High' ? 'badge-high' : 'badge-medium'}">
                        <span class="badge-dot"></span>${r.priority}
                      </span>
                    </td>
                    <td>${r.requester} <div style="font-size:10.5px; color:var(--text-muted);">${r.designation}</div></td>
                    <td class="font-mono">${r.received}</td>
                    <td>
                      <span class="badge ${r.status === 'New' ? 'badge-new' : r.status === 'Accepted' ? 'badge-accepted' : r.status === 'Rejected' ? 'badge-rejected' : 'badge-converted'}">
                        <span class="badge-dot"></span>${r.status}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('03B', {requestId:'${r.id}'})">
                          ${r.status === 'New' ? 'Review' : 'View'}
                        </button>
                        ${r.status === 'Accepted' ? `
                          <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('04')">To Rec</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  setIntakeTab(tab) {
    this.filters.intakeTab = tab;
    this.navigateTo('02');
  }

  // ==========================================
  // SCREEN 03A — CREATE INSPECTION REQUEST
  // ==========================================
  renderScreen03A() {
    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('02')">Inspection Intake</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Create Inspection Request</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Create Inspection Request</h1>
            <p class="screen-subtitle">Initiate a formal inspection request with organizational scope, regulatory trigger justification, and supporting technical attachments.</p>
          </div>
        </div>

        <form id="create-request-form" onsubmit="event.preventDefault(); strata.submitInspectionRequest();">
          
          <!-- Section 1: Source -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">1. Source & Requester Identity</span>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label required">Source Type</label>
                  <select class="form-control" id="req-source-type">
                    <option>Internal Safety Directorate</option>
                    <option selected>Mine Management</option>
                    <option>Compliance Engine</option>
                    <option>Regulatory / DGMS</option>
                    <option>Senior Authority</option>
                    <option>Other Authorized Source</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Requester Name</label>
                  <input type="text" class="form-control" id="req-name" value="R. K. Agarwal (Mine Agent)" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Organization / Designation</label>
                  <input type="text" class="form-control" id="req-org" value="Eastern Coalfields Limited - Mine A2" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Official Contact (Email / Phone)</label>
                  <input type="text" class="form-control" id="req-contact" value="agent.mineA2@ecl.coalindia.in | +91 94340 88219" required>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Inspection Need -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">2. Inspection Need & Technical Objective</span>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label required">Inspection Track</label>
                  <select class="form-control" id="req-track">
                    <option selected>Safety & Strata Control</option>
                    <option>Ventilation & Occupational Health</option>
                    <option>Electrical & Flameproof Machinery</option>
                    <option>Emergency Preparedness & Inundation</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Inspection Type</label>
                  <select class="form-control" id="req-type">
                    <option selected>Strata Control & Roof Support Urgent Inspection</option>
                    <option>Ventilation & Gas Dynamics Statutory Inspection</option>
                    <option>Flameproof Electrical Compliance Audit</option>
                    <option>Inundation & Water Hazard Survey</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label class="form-label required">Reason for Inspection</label>
                  <input type="text" class="form-control" id="req-reason" value="Abnormal telltale roof convergence detected (14mm in 48h) following heavy blasting in adjacent panel." required>
                </div>
                <div class="form-group full-width">
                  <label class="form-label required">Detailed Technical Description</label>
                  <textarea class="form-control" id="req-desc" required>Sub-surface strata monitoring stations have signaled accelerated displacement in junction J-14. Immediate statutory technical audit requested prior to resuming coal extraction.</textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: Scope -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">3. Organizational Scope & Target Underground Section</span>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Holding / Subsidiary</label>
                  <input type="text" class="form-control" value="Coal India Limited (CIL) / ECL" readonly style="background:#F8FAFC;">
                </div>
                <div class="form-group">
                  <label class="form-label">Area & Primary Colliery</label>
                  <input type="text" class="form-control" value="Area 01 (Sripur-Kenda) - Mine A2" readonly style="background:#F8FAFC;">
                </div>
                <div class="form-group full-width">
                  <label class="form-label required">Specific Underground Location / Panel / Seam</label>
                  <input type="text" class="form-control" id="req-location" value="District 3 West Depillaring Section, Panels W4-W6, Junction J-14" required>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 4: Priority & Risk -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">4. Priority, Risk Level & Requested Execution Window</span>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label required">Priority</label>
                  <select class="form-control" id="req-priority">
                    <option selected>High</option>
                    <option>Critical</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Risk Classification</label>
                  <select class="form-control" id="req-risk">
                    <option selected>High</option>
                    <option>Critical</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Requested Inspection Date</label>
                  <input type="date" class="form-control" id="req-date" value="2026-08-30" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Supporting Justification</label>
                  <input type="text" class="form-control" value="Convergence telemetry data uploaded. Exceeds statutory threshold.">
                </div>
              </div>
            </div>
          </div>

          <!-- Section 5: Attachments -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">5. Technical Attachments & Telemetry Records</span>
            </div>
            <div class="card-body">
              <div style="border: 2px dashed var(--border-color); border-radius: 4px; padding: 20px; text-align: center; background-color: var(--bg-surface-alt); margin-bottom: 12px;">
                <div style="color: var(--purple-primary); font-size: 24px; margin-bottom: 6px;">${this.getIconSvg('upload')}</div>
                <div style="font-weight: 600; font-size: 12px;">Click or Drag & Drop statutory logs, photos, or CAD sections</div>
                <div style="font-size: 10.5px; color: var(--text-muted);">PDF, JPG, PNG, CSV up to 25MB per file</div>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; background:#FFF; border:1px solid var(--border-light); padding:6px 12px; border-radius:3px; font-size:11.5px;">
                  <span class="font-mono">telemetry_convergence_panelW4.pdf (2.4 MB)</span>
                  <span class="badge badge-approved">Attached</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:20px; margin-bottom: 30px;">
            <button type="button" class="btn btn-secondary" onclick="strata.navigateTo('02')">Cancel</button>
            <button type="button" class="btn btn-secondary" onclick="strata.saveDraftRequest()">Save Draft</button>
            <button type="submit" class="btn btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    `;
  }

  submitInspectionRequest() {
    this.showToast('Inspection Request submitted successfully! Status: NEW (REQ-2026-0105)', 'success');
    setTimeout(() => {
      this.navigateTo('03B', { requestId: 'REQ-2026-0098' });
    }, 600);
  }

  saveDraftRequest() {
    this.showToast('Draft inspection request saved successfully.', 'success');
    this.navigateTo('03B', { requestId: 'REQ-2026-0098' });
  }

  // ==========================================
  // SCREEN 03B — INTAKE REQUEST DETAIL
  // ==========================================
  renderScreen03B(reqId) {
    const req = this.data.intakeRequests.find(r => r.id === reqId) || this.data.intakeRequests[0];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('02')">Inspection Intake</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${req.id}</span>
        </div>

        <!-- Header -->
        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              <span class="font-mono" style="color:var(--purple-primary);">${req.id}</span>
              <span>Inspection Request Detail</span>
              <span class="badge ${req.status === 'New' ? 'badge-new' : req.status === 'Accepted' ? 'badge-accepted' : 'badge-converted'}">
                <span class="badge-dot"></span>${req.status}
              </span>
            </h1>
            <p class="screen-subtitle">
              <strong>Source:</strong> ${req.source} | <strong>Scope:</strong> ${req.scope.subsidiary} / ${req.scope.area} / ${req.scope.mine.split('(')[0]} | <strong>Need:</strong> ${req.reason}
            </p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.openClarificationModal('${req.id}')">Request Clarification</button>
            <button class="btn btn-danger" onclick="strata.openRejectModal('${req.id}')">Reject</button>
            <button class="btn btn-success" onclick="strata.openAcceptModal('${req.id}')">Accept</button>
            <button class="btn btn-primary" onclick="strata.navigateTo('04')">Convert to Recommendation</button>
          </div>
        </div>

        <!-- Main Layout: Left info + Right Timeline -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
          
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            
            <div class="enterprise-card">
              <div class="card-header">
                <span class="card-title">Request Overview & Justification</span>
                <span class="badge ${req.priority === 'High' ? 'badge-high' : 'badge-medium'}">Priority: ${req.priority}</span>
              </div>
              <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 14px;">
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSPECTION TRACK</div>
                    <div style="font-weight:600;">${req.inspectionTrack}</div>
                  </div>
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSPECTION TYPE</div>
                    <div style="font-weight:600;">${req.inspectionType}</div>
                  </div>
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">REQUESTED DATE</div>
                    <div class="font-mono">${req.requestedDate}</div>
                  </div>
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">RISK CLASSIFICATION</div>
                    <div style="color:var(--status-red-text); font-weight:700;">${req.risk}</div>
                  </div>
                </div>

                <div style="margin-bottom: 12px;">
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom: 2px;">REASON FOR INTAKE TRIGGER</div>
                  <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:8px 12px; border-radius:3px; font-size:12px; font-weight:500;">
                    ${req.reason}
                  </div>
                </div>

                <div>
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom: 2px;">DETAILED DESCRIPTION</div>
                  <p style="font-size:12px; color:var(--text-secondary);">${req.description}</p>
                </div>
              </div>
            </div>

            <!-- Scope Details -->
            <div class="enterprise-card">
              <div class="card-header">
                <span class="card-title">Requested Scope & Location</span>
              </div>
              <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">HOLDING / SUBSIDIARY</div>
                    <div>${req.scope.holding} &bull; ${req.scope.subsidiary}</div>
                  </div>
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">AREA & MINE</div>
                    <div>${req.scope.area} &bull; ${req.scope.mine}</div>
                  </div>
                  <div style="grid-column: 1 / -1;">
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">TARGET OPERATIONAL SECTION</div>
                    <div class="font-mono" style="color:var(--text-primary); font-weight:600;">${req.scope.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Requester Information & Attachments -->
            <div class="enterprise-card">
              <div class="card-header">
                <span class="card-title">Requester Information & Attachments</span>
              </div>
              <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 14px;">
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">OFFICIAL REQUESTER</div>
                    <div><strong>${req.requester}</strong> (${req.designation})</div>
                  </div>
                  <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700;">CONTACT CHANNELS</div>
                    <div style="font-size:11.5px;">${req.contact}</div>
                  </div>
                </div>

                <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom: 6px;">ATTACHED EVIDENCE / RECORDS</div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${req.attachments.map(att => `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:6px 12px; border-radius:3px; font-size:11.5px;">
                      <span class="font-mono">${att.name} (${att.size})</span>
                      <button class="btn btn-secondary btn-sm" onclick="strata.showToast('Downloading ${att.name}...', 'success')">Download</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Workflow Status Timeline -->
          <div>
            <div class="enterprise-card">
              <div class="card-header">
                <span class="card-title">Governance Workflow Timeline</span>
              </div>
              <div class="card-body">
                <div class="audit-timeline">
                  ${req.timeline.map(t => `
                    <div class="timeline-item">
                      <div class="timeline-dot" style="${t.done ? 'background-color:var(--status-green-text);' : t.current ? 'background-color:var(--purple-primary);' : 'background-color:var(--border-color);'}"></div>
                      <div class="timeline-header">
                        <strong class="timeline-user" style="font-size:11.5px;">${t.step}</strong>
                        <span class="font-mono" style="font-size:10px; color:var(--text-muted);">${t.date}</span>
                      </div>
                      <div class="timeline-action" style="font-size:11px;">By: ${t.by}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Action Panel -->
            <div class="enterprise-card">
              <div class="card-header">
                <span class="card-title">Authorized Action Panel</span>
              </div>
              <div class="card-body" style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-success" style="width: 100%;" onclick="strata.openAcceptModal('${req.id}')">Accept Inspection Request</button>
                <button class="btn btn-primary" style="width: 100%;" onclick="strata.navigateTo('04')">Convert to Recommendation</button>
                <button class="btn btn-secondary" style="width: 100%;" onclick="strata.openClarificationModal('${req.id}')">Request Clarification</button>
                <button class="btn btn-danger" style="width: 100%;" onclick="strata.openRejectModal('${req.id}')">Reject Request</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  openAcceptModal(reqId) {
    this.showModal('Accept Inspection Request', `
      <p style="font-size:12.5px; margin-bottom:12px;">Are you sure you want to accept <strong>${reqId}</strong> for official inspection planning and recommendation queuing?</p>
      <div class="form-group">
        <label class="form-label">Acceptance Notes / Statutory Tag</label>
        <input type="text" class="form-control" value="Verified against DGMS telemetry threshold. Authorized for recommendation queue.">
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Confirm Acceptance', class: 'btn-success', onclick: `strata.confirmAcceptRequest('${reqId}')` }
    ]);
  }

  confirmAcceptRequest(reqId) {
    const req = this.data.intakeRequests.find(r => r.id === reqId);
    if (req) req.status = 'Accepted';
    this.closeModal();
    this.showToast(`Request ${reqId} accepted successfully!`, 'success');
    this.navigateTo('02');
  }

  openRejectModal(reqId) {
    this.showModal('Reject Inspection Request', `
      <p style="font-size:12.5px; margin-bottom:12px;">Please specify the mandatory statutory or administrative reason for rejecting request <strong>${reqId}</strong>.</p>
      <div class="form-group">
        <label class="form-label required">Rejection Reason</label>
        <select class="form-control">
          <option>Outside statutory governance scope (Delegated to colliery local team)</option>
          <option>Duplicate of active inspection plan</option>
          <option>Insufficient technical justification</option>
          <option>Mine section currently under scheduled seal-off</option>
        </select>
      </div>
      <div class="form-group" style="margin-top:8px;">
        <label class="form-label">Additional Comments</label>
        <textarea class="form-control" placeholder="Provide notes for the requester..."></textarea>
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Confirm Rejection', class: 'btn-danger', onclick: `strata.confirmRejectRequest('${reqId}')` }
    ]);
  }

  confirmRejectRequest(reqId) {
    const req = this.data.intakeRequests.find(r => r.id === reqId);
    if (req) req.status = 'Rejected';
    this.closeModal();
    this.showToast(`Request ${reqId} rejected.`, 'error');
    this.navigateTo('02');
  }

  openClarificationModal(reqId) {
    this.showModal('Request Technical Clarification', `
      <p style="font-size:12.5px; margin-bottom:12px;">Send an official query back to the requester for <strong>${reqId}</strong>.</p>
      <div class="form-group">
        <label class="form-label required">Query / Clarification Points</label>
        <textarea class="form-control" placeholder="Specify required telemetry charts, telltale readings, or surveyor logs..."></textarea>
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Send Request', class: 'btn-primary', onclick: `strata.confirmClarification('${reqId}')` }
    ]);
  }

  confirmClarification(reqId) {
    this.closeModal();
    this.showToast(`Clarification request sent to colliery agent for ${reqId}.`, 'success');
  }

  // ==========================================
  // SCREEN 04 — RECOMMENDATIONS QUEUE
  // ==========================================
  renderScreen04() {
    const kpis = [
      { label: 'New Recommendations', value: '2', subtext: 'System triggers' },
      { label: 'High Risk', value: '2', subtext: 'DGMS / Gassy Seam', danger: true },
      { label: 'Due Soon', value: '1', subtext: 'Within 14 days', warning: true },
      { label: 'Overdue', value: '0', subtext: 'None overdue' },
      { label: 'Accepted', value: '1', subtext: 'Queued for plan' },
      { label: 'Deferred', value: '0', subtext: 'None' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Inspection Recommendations</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Inspection Recommendations Queue</h1>
            <p class="screen-subtitle">System-generated recommendations requiring authorized planning review based on statutory obligations, risk thresholds, telemetry, and previous findings.</p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-primary" onclick="strata.navigateTo('07')">
              ${this.getIconSvg('plus')} Create Inspection Plan
            </button>
          </div>
        </div>

        <!-- Banner -->
        <div class="recommendation-banner">
          <div class="banner-content">
            <span class="banner-tag">SYSTEM RECOMMENDATION</span>
            <span class="banner-text">&bull; All items require authorized human evaluation before any field inspection or resource allocation is confirmed.</span>
          </div>
          <span class="badge badge-medium">HUMAN DECISION REQUIRED</span>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <input type="text" class="filter-input" placeholder="Search Recommendation ID, Obligation..." style="min-width: 220px;">
          <select class="filter-select"><option>All Authorities (DGMS, Internal Safety)</option></select>
          <select class="filter-select"><option>Track: All Tracks</option><option>Safety & Occupational Health</option><option>Strata Control</option></select>
          <select class="filter-select"><option>Risk: All</option><option>High Risk Only</option></select>
          <button class="btn btn-secondary btn-sm" style="margin-left:auto;">Filter</button>
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Recommendation ID</th>
                  <th>Inspection Type</th>
                  <th>Mine</th>
                  <th>Regulatory Basis</th>
                  <th>Obligation</th>
                  <th>Due Date</th>
                  <th>Risk</th>
                  <th>Reason Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.recommendations.map(r => `
                  <tr>
                    <td>
                      <strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('05', {recId:'${r.id}'})">
                        ${r.id}
                      </strong>
                    </td>
                    <td><strong>${r.inspectionType}</strong></td>
                    <td>${r.mine.split('(')[0]}</td>
                    <td><span class="badge badge-draft font-mono">${r.regulatoryBasis}</span></td>
                    <td style="max-width: 200px; font-size: 11.5px;">${r.obligation}</td>
                    <td class="font-mono">${r.dueDate}</td>
                    <td>
                      <span class="badge ${r.risk === 'High' ? 'badge-high' : 'badge-medium'}">
                        <span class="badge-dot"></span>${r.risk}
                      </span>
                    </td>
                    <td>${r.reasonCategory}</td>
                    <td>
                      <span class="badge ${r.status === 'Accepted' ? 'badge-accepted' : 'badge-awaiting'}">
                        <span class="badge-dot"></span>${r.status}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('05', {recId:'${r.id}'})">Review</button>
                        <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('07', {recId:'${r.id}'})">Create Plan</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Expandable "Why Recommended?" Section -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">${this.getIconSvg('info')} Why STRATA Recommended These Items</span>
          </div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
              <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:10px 12px; border-radius:4px;">
                <strong style="color:var(--text-primary); font-size:12px;">Periodic Statutory Obligation</strong>
                <p style="font-size:11px; color:var(--text-secondary); margin-top:3px;">
                  Calculated from DGMS Coal Mines Regulations 2017 (e.g. CMR Reg 153 quarterly ventilation cycle and CMR Reg 123 SCAMP audit).
                </p>
              </div>
              <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:10px 12px; border-radius:4px;">
                <strong style="color:var(--text-primary); font-size:12px;">Risk & Telemetry Alarm</strong>
                <p style="font-size:11px; color:var(--text-secondary); margin-top:3px;">
                  Automated correlation with continuous convergence sensors, gas telemetry peaks, or colliery agent safety alerts.
                </p>
              </div>
              <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:10px 12px; border-radius:4px;">
                <strong style="color:var(--text-primary); font-size:12px;">Historical Recurrence Pattern</strong>
                <p style="font-size:11px; color:var(--text-secondary); margin-top:3px;">
                  Identifies previously critical findings (e.g., FND-2026-00084) or pending CAPA re-verification requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // SCREEN 05 — RECOMMENDATION DETAIL
  // ==========================================
  renderScreen05(recId) {
    const rec = this.data.recommendations.find(r => r.id === recId) || this.data.recommendations[0];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('04')">Inspection Recommendations</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${rec.id}</span>
        </div>

        <!-- Header -->
        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              <span class="font-mono" style="color:var(--purple-primary);">${rec.id}</span>
              <span>${rec.inspectionType} Recommendation</span>
              <span class="badge badge-awaiting"><span class="badge-dot"></span>${rec.status}</span>
            </h1>
            <p class="screen-subtitle">Scope: ${rec.scope} &bull; Suggested Execution Date: <strong>${rec.suggestedDate}</strong></p>
          </div>
        </div>

        <!-- Big Mandatory Warning Banner -->
        <div class="recommendation-banner">
          <div class="banner-content">
            <span class="banner-tag">SYSTEM RECOMMENDATION</span>
            <span class="banner-text">&bull; <strong>HUMAN APPROVAL REQUIRED:</strong> This recommendation is an advisory trigger. No field inspection is scheduled until approved and planned by the Authorized Inspection Manager.</span>
          </div>
        </div>

        <!-- Section 2: Regulatory Traceability Chain -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">${this.getIconSvg('shield')} Statutory Regulatory Traceability Chain</span>
            <span class="badge badge-draft font-mono">${rec.regulatoryBasis}</span>
          </div>
          <div class="card-body">
            <div class="traceability-chain">
              <div class="trace-node">
                <div class="trace-node-label">REGULATION</div>
                <div class="trace-node-value">${rec.regulation}</div>
              </div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node">
                <div class="trace-node-label">CLAUSE</div>
                <div class="trace-node-value font-mono">${rec.clause}</div>
              </div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node">
                <div class="trace-node-label">REQUIREMENT</div>
                <div class="trace-node-value" style="font-size:11px;">${rec.requirement}</div>
              </div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node">
                <div class="trace-node-label">APPLICABILITY</div>
                <div class="trace-node-value" style="font-size:11px;">${rec.applicability}</div>
              </div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node">
                <div class="trace-node-label">OBLIGATION</div>
                <div class="trace-node-value" style="font-size:11px;">${rec.obligation}</div>
              </div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node" style="background:var(--purple-light); border-color:var(--purple-border);">
                <div class="trace-node-label" style="color:var(--purple-primary);">RECOMMENDATION</div>
                <div class="trace-node-value font-mono" style="color:var(--purple-primary);">${rec.id}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 Column Section: Why Recommended & Suggested Config -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          
          <!-- Why STRATA Recommended This -->
          <div class="enterprise-card" style="margin-bottom:0;">
            <div class="card-header">
              <span class="card-title">${this.getIconSvg('sparkle')} Why STRATA Recommended This</span>
            </div>
            <div class="card-body">
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${rec.whyRecommended.map(w => `
                  <div style="background:var(--bg-surface-alt); border-left:3px solid var(--purple-primary); padding:6px 10px; border-radius:0 3px 3px 0;">
                    <strong style="font-size:11.5px; color:var(--text-primary);">${w.signal}</strong>
                    <div style="font-size:11px; color:var(--text-secondary);">${w.detail}</div>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top:14px; padding-top:10px; border-top:1px solid var(--border-light);">
                <div style="font-size:10px; color:var(--text-muted); font-weight:700;">PREVIOUS INSPECTION HISTORY (${rec.previousHistory.lastInspectionId})</div>
                <div style="font-size:11.5px; margin-top:2px;"><strong>Last Date:</strong> ${rec.previousHistory.lastInspectionDate} &bull; <strong>Findings:</strong> ${rec.previousHistory.findingsCount}</div>
                <div style="font-size:11px; color:var(--status-red-text); margin-top:2px;">${rec.previousHistory.criticalFindings}</div>
                <div style="font-size:10.5px; color:var(--text-muted); margin-top:2px;">${rec.previousHistory.capaStatus}</div>
              </div>
            </div>
          </div>

          <!-- Suggested Inspection Configuration -->
          <div class="enterprise-card" style="margin-bottom:0;">
            <div class="card-header">
              <span class="card-title">${this.getIconSvg('file-text')} Suggested Inspection Configuration</span>
            </div>
            <div class="card-body" style="font-size:11.5px;">
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700;">SUGGESTED SCOPE</div>
                  <div>${rec.suggestedConfig.suggestedScope}</div>
                </div>
                <div>
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700;">SUGGESTED CHECKLIST TEMPLATE</div>
                  <div class="font-mono" style="color:var(--purple-primary); font-weight:600;">${rec.suggestedConfig.suggestedChecklist}</div>
                </div>
                <div>
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700;">REQUIRED COMPETENCIES</div>
                  <div>${rec.suggestedConfig.requiredCompetencies.join(' &bull; ')}</div>
                </div>
                <div>
                  <div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSTRUMENTS & PPE</div>
                  <div style="color:var(--text-secondary);">${rec.suggestedConfig.requiredInstruments.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Action Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; background:#FFF; border:1px solid var(--border-color); padding:12px 18px; border-radius:4px; margin-bottom: 24px;">
          <div style="display:flex; gap:8px;">
            <button class="btn btn-danger" onclick="strata.openRejectRecModal('${rec.id}')">Reject Recommendation</button>
            <button class="btn btn-secondary" onclick="strata.openDeferRecModal('${rec.id}')">Defer</button>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary" onclick="strata.navigateTo('07', {recId:'${rec.id}'})">Modify Parameters</button>
            <button class="btn btn-primary" onclick="strata.navigateTo('07', {recId:'${rec.id}'})">Approve & Create Plan</button>
          </div>
        </div>

      </div>
    `;
  }

  openRejectRecModal(recId) {
    this.showModal('Reject Recommendation', `
      <p style="font-size:12.5px; margin-bottom:12px;">Rejecting a system-generated recommendation requires a statutory override reason for audit logging.</p>
      <div class="form-group">
        <label class="form-label required">Override Justification</label>
        <select class="form-control">
          <option>Covered under comprehensive DGMS zonal audit</option>
          <option>Operational stoppage in panel</option>
          <option>Frequency adjusted per technical circular</option>
        </select>
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Confirm Rejection', class: 'btn-danger', onclick: `strata.confirmRejectRec('${recId}')` }
    ]);
  }

  confirmRejectRec(recId) {
    this.closeModal();
    this.showToast(`Recommendation ${recId} rejected. Logged to immutable audit trail.`, 'error');
    this.navigateTo('04');
  }

  openDeferRecModal(recId) {
    this.showModal('Defer Recommendation', `
      <p style="font-size:12.5px; margin-bottom:12px;">Defer recommendation <strong>${recId}</strong> to a future planning cycle.</p>
      <div class="form-group">
        <label class="form-label required">Defer Until Date</label>
        <input type="date" class="form-control" value="2026-12-01">
      </div>
      <div class="form-group" style="margin-top:8px;">
        <label class="form-label required">Statutory Deferral Justification</label>
        <input type="text" class="form-control" value="Scheduled seam ventilation rearrangement underway.">
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Confirm Deferral', class: 'btn-primary', onclick: `strata.confirmDeferRec('${recId}')` }
    ]);
  }

  confirmDeferRec(recId) {
    this.closeModal();
    this.showToast(`Recommendation ${recId} deferred.`, 'success');
    this.navigateTo('04');
  }

  // ==========================================
  // SCREEN 06 — INSPECTION PLANS LIST
  // ==========================================
  renderScreen06() {
    const kpis = [
      { label: 'Draft', value: '0', subtext: 'Unfinalized' },
      { label: 'Planned', value: '1', subtext: 'Ready for scheduling', primary: true },
      { label: 'Ready for Scheduling', value: '1', subtext: 'Pre-monsoon' },
      { label: 'Scheduled', value: '1', subtext: 'Slot allocated' },
      { label: 'Cancelled', value: '0', subtext: 'None' },
      { label: 'Completed', value: '1', subtext: 'Executed' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Inspection Plans</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Inspection Plans</h1>
            <p class="screen-subtitle">Governance inspection plans with defined scopes, regulatory mappings, controlled checklist templates, and competency criteria.</p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-primary" onclick="strata.navigateTo('07')">
              ${this.getIconSvg('plus')} Create Inspection Plan
            </button>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.primary ? 'kpi-primary' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <input type="text" class="filter-input" placeholder="Search Plan ID, Mine, Planner..." style="min-width: 220px;">
          <select class="filter-select"><option>All Plan Statuses</option><option>Planned</option><option>Ready for Scheduling</option><option>Scheduled</option></select>
          <select class="filter-select"><option>All Inspection Types</option><option>Ventilation</option><option>Strata Control</option><option>Electrical FLP</option></select>
          <button class="btn btn-secondary btn-sm" style="margin-left:auto;">Filter</button>
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Plan ID</th>
                  <th>Inspection Title</th>
                  <th>Mine</th>
                  <th>Type</th>
                  <th>Risk</th>
                  <th>Planned Date</th>
                  <th>Planner</th>
                  <th>Status</th>
                  <th>Next Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.inspectionPlans.map(p => `
                  <tr>
                    <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('08', {planId:'${p.id}'})">${p.id}</strong></td>
                    <td><strong>${p.title}</strong></td>
                    <td>${p.mine.split('(')[0]}</td>
                    <td>${p.inspectionType}</td>
                    <td><span class="badge ${p.risk === 'High' ? 'badge-high' : 'badge-medium'}"><span class="badge-dot"></span>${p.risk}</span></td>
                    <td class="font-mono">${p.plannedDate}</td>
                    <td>${p.planner.split('(')[0]}</td>
                    <td>
                      <span class="badge ${p.status === 'Scheduled' ? 'badge-scheduled' : p.status === 'Completed' ? 'badge-completed' : 'badge-planned'}">
                        <span class="badge-dot"></span>${p.status}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('08', {planId:'${p.id}'})">Open</button>
                        <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('07', {planId:'${p.id}'})">Edit</button>
                        ${p.status !== 'Scheduled' && p.status !== 'Completed' ? `
                          <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('10', {planId:'${p.id}'})">Schedule</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // SCREEN 07 — CREATE INSPECTION PLAN (8-Step Wizard)
  // ==========================================
  renderScreen07(recId) {
    const step = this.currentPlanStep || 1;
    const rec = this.data.recommendations.find(r => r.id === recId) || this.data.recommendations[0];

    const steps = [
      { num: 1, name: 'Source' },
      { num: 2, name: 'Scope' },
      { num: 3, name: 'Type' },
      { num: 4, name: 'Requirements' },
      { num: 5, name: 'Team Req' },
      { num: 6, name: 'Preparation' },
      { num: 7, name: 'Review' },
      { num: 8, name: 'Create' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('06')">Inspection Plans</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Create Inspection Plan</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Create Inspection Plan</h1>
            <p class="screen-subtitle">8-Step Comprehensive Statutory Planning Wizard &bull; Authority &rarr; Track &rarr; Type &rarr; Scope &rarr; Checklist &rarr; Competencies &rarr; Prep &rarr; Validation</p>
          </div>
        </div>

        <!-- 8-Step Wizard Stepper -->
        <div class="stepper-container">
          ${steps.map((s, i) => `
            <div class="stepper-step ${step > s.num ? 'completed' : step === s.num ? 'current' : ''}" style="cursor:pointer;" onclick="strata.setPlanStep(${s.num})">
              <div class="step-circle">${step > s.num ? '&check;' : s.num}</div>
              <div class="step-name">${s.num}. ${s.name}</div>
            </div>
            ${i < steps.length - 1 ? `<div class="stepper-divider ${step > s.num ? 'completed' : ''}"></div>` : ''}
          `).join('')}
        </div>

        <!-- Step Content Viewport -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">Step ${step}: ${steps[step - 1].name}</span>
          </div>
          <div class="card-body">
            ${this.renderPlanWizardStepContent(step, rec)}
          </div>
        </div>

        <!-- Wizard Navigation Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; margin-bottom: 30px;">
          <div>
            ${step > 1 ? `
              <button class="btn btn-secondary" onclick="strata.setPlanStep(${step - 1})">&larr; Previous Step</button>
            ` : `
              <button class="btn btn-secondary" onclick="strata.navigateTo('06')">Cancel</button>
            `}
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary" onclick="strata.saveDraftPlan()">Save Draft</button>
            ${step < 8 ? `
              <button class="btn btn-primary" onclick="strata.setPlanStep(${step + 1})">Next Step &rarr;</button>
            ` : `
              <button class="btn btn-success" onclick="strata.finalizePlanCreation()">Create Inspection Plan</button>
            `}
          </div>
        </div>

      </div>
    `;
  }

  setPlanStep(stepNum) {
    this.currentPlanStep = stepNum;
    this.navigateTo('07');
  }

  renderPlanWizardStepContent(step, rec) {
    switch (step) {
      case 1:
        return `
          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label required">Selected Recommendation / Trigger Source</label>
              <div style="background:var(--purple-light); border:1px solid var(--purple-border); padding:12px; border-radius:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong class="font-mono" style="color:var(--purple-primary); font-size:13px;">${rec.id} &bull; ${rec.inspectionType}</strong>
                  <span class="badge badge-awaiting">${rec.status}</span>
                </div>
                <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">
                  <strong>Basis:</strong> ${rec.regulatoryBasis} &bull; ${rec.obligation}
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Planning Mode</label>
              <select class="form-control">
                <option selected>Recommendation-based Planning (Statutory)</option>
                <option>Request-based Planning (Intake)</option>
                <option>Manual Authorized Inspection (Direct DGMS Mandate)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Authorized Planner</label>
              <input type="text" class="form-control" value="${this.data.meta.currentUser.name} (${this.data.meta.currentUser.role})" readonly style="background:#F8FAFC;">
            </div>
          </div>
        `;
      case 2:
        return `
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label required">Holding Company</label>
              <input type="text" class="form-control" value="Coal India Limited (CIL)" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Subsidiary</label>
              <input type="text" class="form-control" value="Eastern Coalfields Limited (ECL)" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Area</label>
              <input type="text" class="form-control" value="Area 01 (Sripur-Kenda)" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Primary Mine Scope</label>
              <select class="form-control">
                <option selected>Mine A2 (Deep Underground Seam VII)</option>
                <option>Mine B1 (Inclined Mine)</option>
                <option>Mine C4 (Opencast Pit 2)</option>
              </select>
            </div>
            <div class="form-group full-width">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <label class="form-label required">Target Underground Sections / Locations</label>
                <button type="button" class="btn btn-secondary btn-sm" onclick="strata.toggleMultiMine()">${this.selectedMultiMine ? 'Remove Additional Scope' : '+ Add Inspection Location (Multi-Mine)'}</button>
              </div>
              <input type="text" class="form-control" value="Intake Shaft 1, Splitting Points 1-6, District 3 & 4 Face, Main Exhaust Fan Drift">
            </div>
            ${this.selectedMultiMine ? `
              <div class="form-group full-width" style="background:#FFF3E0; border:1px solid #FFE0B2; border-left:4px solid #E65100; padding:10px 14px; border-radius:3px;">
                <strong style="color:#B78103; font-size:12px;">&excl; Multi-Mine Authorization Warning:</strong>
                <p style="font-size:11.5px; color:#5D4037; margin-top:2px;">
                  Multi-mine cross-colliery inspections require written authorization from the Director Technical (ECL) under CMR 2017 governance rules.
                </p>
              </div>
            ` : ''}
          </div>
        `;
      case 3:
        return `
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label required">Governance Authority</label>
              <input type="text" class="form-control" value="DGMS / CIL Statutory Safety Board" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Inspection Track</label>
              <input type="text" class="form-control" value="Safety & Occupational Health" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Inspection Type</label>
              <input type="text" class="form-control" value="Ventilation & Gas Dynamics Inspection" readonly style="background:#F8FAFC;">
            </div>
            <div class="form-group">
              <label class="form-label required">Estimated Duration</label>
              <input type="text" class="form-control" value="6 Hours (Full Operational Shift)">
            </div>
            <div class="form-group full-width">
              <label class="form-label required">Inspection Purpose</label>
              <input type="text" class="form-control" value="Execute statutory quarterly ventilation network survey, measure air velocity distribution across active coal faces, test static pressure depression at fan drift.">
            </div>
            <div class="form-group full-width">
              <label class="form-label required">Statutory Objective</label>
              <textarea class="form-control">Ensure 100% compliance with CMR 2017 Regulation 153/160, verify adequate air flow in District 4 to prevent methane stagnation, and certify auxiliary ventilation safety in deep seams.</textarea>
            </div>
          </div>
        `;
      case 4:
        return `
          <div>
            <div class="traceability-chain" style="margin-bottom:14px;">
              <div class="trace-node"><div class="trace-node-label">REGULATION</div><div class="trace-node-value">CMR 2017</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">CLAUSE</div><div class="trace-node-value font-mono">Reg 153(2) & 160</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">REQUIREMENT</div><div class="trace-node-value" style="font-size:11px;">Quarterly Mechanical Ventilation Survey</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">OBLIGATION</div><div class="trace-node-value" style="font-size:11px;">OBL-088</div></div>
            </div>

            <div class="form-group">
              <label class="form-label required">Select Controlled Checklist Template</label>
              <select class="form-control">
                <option selected>DGMS-STD-VENT-04: Comprehensive Underground Gassy Mine Ventilation Protocol (22 Checks)</option>
                <option>DGMS-STD-STRATA-02: SCAMP Compliance & Hydraulic Support Verification (18 Checks)</option>
                <option>DGMS-STD-ELEC-01: Flameproof Apparatus & Earth Leakage Checklist (16 Checks)</option>
              </select>
            </div>

            <div style="margin-top:14px; background:var(--bg-surface-alt); border:1px solid var(--border-light); border-radius:4px; padding:12px;">
              <strong style="font-size:12px;">Checklist Measurement & Evidence Requirements:</strong>
              <ul style="margin: 6px 0 0 18px; font-size:11.5px; color:var(--text-secondary); display:flex; flex-direction:column; gap:4px;">
                <li>Air velocity (m/s) at 8 airway stations by calibrated Vane Anemometer</li>
                <li>CH4 / CO percentage sampling at return splits & sealed goaf areas</li>
                <li>Digital timestamped photo of anemometer station reading and fan drift manometer</li>
              </ul>
            </div>
          </div>
        `;
      case 5:
        return `
          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label required">Lead Inspector Statutory Competency Criteria</label>
              <input type="text" class="form-control" value="First Class Mine Manager Certificate of Competency (Coal) under CMR 2017">
            </div>
            <div class="form-group">
              <label class="form-label required">Specialist Competency #1</label>
              <input type="text" class="form-control" value="DGMS Certified Ventilation Officer">
            </div>
            <div class="form-group">
              <label class="form-label required">Specialist Competency #2</label>
              <input type="text" class="form-control" value="Authorized Gas Testing Specialist (CH4 / CO / O2)">
            </div>
            <div class="form-group">
              <label class="form-label">Supporting Inspectors</label>
              <input type="text" class="form-control" value="Assistant Safety Officer (Underground), Mine Surveyor Rep">
            </div>
            <div class="form-group">
              <label class="form-label">Minimum Team Size</label>
              <input type="text" class="form-control" value="3 Certified Personnel" readonly style="background:#F8FAFC;">
            </div>
          </div>
        `;
      case 6:
        return `
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label required">Required Instruments & Tools</label>
              <textarea class="form-control">Vane Anemometer (Calibrated NABL), Smoke Tube Kit with Aspirator, Multi-Gas Detector (CH4, CO, CO2, O2), Digital Barometer / Manometer, Velometer</textarea>
            </div>
            <div class="form-group">
              <label class="form-label required">Required Personal Protective Equipment (PPE)</label>
              <textarea class="form-control">Self-Contained Self-Rescuer (SCSR 60-min IS rated), Cap Lamp (Group I Intrinsically Safe), Antistatic Boots (IS 15298), Mining Helmet with Chinstrap</textarea>
            </div>
            <div class="form-group full-width">
              <label class="form-label required">Statutory Documents & Site Records to Verify</label>
              <textarea class="form-control">Mine Ventilation Plan & Airway Network Diagram v4.2, Daily Gas Book Register, Fan Drift Water Gauge Logs (Past 30 Days)</textarea>
            </div>
          </div>
        `;
      case 7:
        return `
          <div>
            <div style="background:var(--bg-surface-alt); border:1px solid var(--border-color); border-radius:4px; padding:14px; margin-bottom:14px;">
              <strong style="font-size:13px; color:var(--text-primary);">Plan Summary: Statutory Q3 Comprehensive Underground Ventilation Audit</strong>
              <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">
                Scope: CIL / ECL / Area 01 / Mine A2 (Seam VII) &bull; Track: Safety & Occupational Health &bull; Target Date: 15 Nov 2026
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Scope defined:</strong> Mine A2 Full Underground Circuit & Fan Drift
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Inspection type selected:</strong> Ventilation & Gas Dynamics Inspection
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Regulatory basis mapped:</strong> CMR 2017 Reg 153 & OBL-088
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Checklist selected:</strong> DGMS-STD-VENT-04 (22 checks)
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Required competencies defined:</strong> First Class Manager + Ventilation Officer + Gas Tester
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--status-green-text);">
                <span>&check;</span> <strong>Preparation requirements defined:</strong> NABL Anemometer, Multi-gas meter, SCSR PPE
              </div>
            </div>
          </div>
        `;
      case 8:
        return `
          <div style="text-align:center; padding:20px 0;">
            <div style="font-size:32px; color:var(--status-green-text); margin-bottom:8px;">&check;</div>
            <h2 style="font-family:'Outfit',sans-serif; font-size:18px; font-weight:700;">Inspection Plan Validation Complete</h2>
            <p style="font-size:12px; color:var(--text-secondary); max-width:480px; margin:6px auto 18px auto;">
              All statutory governance gates have passed. Ready to generate immutable plan PLAN-2026-0088 for scheduling.
            </p>
          </div>
        `;
      default:
        return '';
    }
  }

  toggleMultiMine() {
    this.selectedMultiMine = !this.selectedMultiMine;
    this.navigateTo('07');
  }

  saveDraftPlan() {
    this.showToast('Inspection Plan draft saved successfully with status DRAFT.', 'success');
    this.navigateTo('08', { planId: 'PLAN-2026-0088' });
  }

  finalizePlanCreation() {
    this.showToast('Inspection Plan PLAN-2026-0088 created successfully! Status: PLANNED', 'success');
    this.navigateTo('08', { planId: 'PLAN-2026-0088' });
  }

  // ==========================================
  // SCREEN 08 — INSPECTION PLAN DETAIL
  // ==========================================
  renderScreen08(planId) {
    const plan = this.data.inspectionPlans.find(p => p.id === planId) || this.data.inspectionPlans[0];
    const activeTab = this.activeTab['plan'] || 'Overview';

    const tabs = ['Overview', 'Scope', 'Regulatory Basis', 'Checklist', 'Team Requirements', 'Preparation', 'Schedule', 'Activity'];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('06')">Inspection Plans</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${plan.id}</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              <span class="font-mono" style="color:var(--purple-primary);">${plan.id}</span>
              <span>${plan.title}</span>
              <span class="badge badge-planned"><span class="badge-dot"></span>${plan.status}</span>
            </h1>
            <p class="screen-subtitle">
              <strong>Authority:</strong> ${plan.authority} &bull; <strong>Track:</strong> ${plan.track} &bull; <strong>Mine:</strong> ${plan.mine.split('(')[0]} &bull; <strong>Planner:</strong> ${plan.planner}
            </p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.navigateTo('07', {planId:'${plan.id}'})">Edit Plan</button>
            <button class="btn btn-secondary" onclick="strata.showToast('Plan duplicate created as DRAFT', 'success')">Duplicate</button>
            <button class="btn btn-primary" onclick="strata.navigateTo('10', {planId:'${plan.id}'})">Schedule</button>
          </div>
        </div>

        <!-- Plan Tabs -->
        <div class="tabs-nav">
          ${tabs.map(t => `
            <button class="tab-btn ${activeTab === t ? 'active' : ''}" onclick="strata.setPlanTab('${t}')">${t}</button>
          `).join('')}
        </div>

        <!-- Tab Body -->
        <div class="enterprise-card">
          <div class="card-body">
            ${this.renderPlanTabContent(activeTab, plan)}
          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
          <button class="btn btn-secondary" onclick="strata.navigateTo('13', {planId:'${plan.id}'})">
            ${this.getIconSvg('shield')} View Immutable Plan Activity & Version Trail
          </button>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-danger" onclick="strata.openCancelPlanModal('${plan.id}')">Cancel Plan</button>
            <button class="btn btn-primary" onclick="strata.navigateTo('10', {planId:'${plan.id}'})">Proceed to Scheduling &rarr;</button>
          </div>
        </div>

      </div>
    `;
  }

  setPlanTab(tab) {
    this.activeTab['plan'] = tab;
    this.navigateTo('08');
  }

  renderPlanTabContent(tab, plan) {
    switch (tab) {
      case 'Overview':
        return `
          <div class="form-grid">
            <div class="form-group full-width">
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">PURPOSE & STATUTORY OBJECTIVE</div>
              <div style="font-size:12px; margin-top:3px;">${plan.purpose}</div>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${plan.objective}</p>
            </div>
            <div>
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">RISK PROFILE</div>
              <span class="badge ${plan.risk === 'High' ? 'badge-high' : 'badge-medium'}">${plan.risk}</span>
            </div>
            <div>
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">PLANNED DURATION</div>
              <div>${plan.plannedDuration}</div>
            </div>
            <div class="form-group full-width">
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">PLANNING NOTES</div>
              <div style="font-size:11.5px; color:var(--text-secondary);">${plan.planningNotes}</div>
            </div>
          </div>
        `;
      case 'Scope':
        return `
          <div class="form-grid">
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">HOLDING / SUBSIDIARY</div><div>${plan.organization} / ${plan.subsidiary}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">AREA & MINE</div><div>${plan.area} - ${plan.mine}</div></div>
            <div class="form-group full-width"><div style="font-size:10px; color:var(--text-muted); font-weight:700;">UNDERGROUND LOCATION CIRCUIT</div><div class="font-mono" style="font-weight:600;">${plan.location}</div></div>
          </div>
        `;
      case 'Regulatory Basis':
        return `
          <div>
            <div class="traceability-chain" style="margin-bottom:14px;">
              <div class="trace-node"><div class="trace-node-label">REGULATION</div><div class="trace-node-value">${plan.regulatoryBasis.regulation}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">CLAUSE</div><div class="trace-node-value font-mono">${plan.regulatoryBasis.clause}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">REQUIREMENT</div><div class="trace-node-value" style="font-size:11px;">${plan.regulatoryBasis.requirement}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">OBLIGATION</div><div class="trace-node-value font-mono">${plan.regulatoryBasis.id}</div></div>
            </div>
            <div style="font-size:12px; color:var(--text-secondary);">${plan.regulatoryBasis.obligation}</div>
          </div>
        `;
      case 'Checklist':
        return `
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div>
                <strong class="font-mono" style="color:var(--purple-primary); font-size:13px;">${plan.checklist.templateId}</strong>
                <div style="font-weight:600; font-size:12px;">${plan.checklist.name}</div>
              </div>
              <span class="badge badge-draft">${plan.checklist.checksCount} Checks</span>
            </div>
            <div style="margin-top:10px;">
              <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom:4px;">MANDATORY MEASUREMENTS</div>
              <ul style="margin-left:18px; font-size:11.5px; color:var(--text-secondary);">
                ${plan.checklist.measurementRequirements.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      case 'Team Requirements':
        return `
          <div style="font-size:12px;">
            <div style="margin-bottom:8px;"><strong>Lead Competency:</strong> ${plan.teamRequirements.leadCompetency}</div>
            <div style="margin-bottom:8px;"><strong>Specialists Required:</strong> ${plan.teamRequirements.specialists.join(', ')}</div>
            <div style="margin-bottom:8px;"><strong>Supporting Inspectors:</strong> ${plan.teamRequirements.supportingInspectors.join(', ')}</div>
            <div class="badge badge-medium" style="margin-top:6px;">${plan.teamRequirements.assignmentStatus}</div>
          </div>
        `;
      case 'Preparation':
        return `
          <div class="form-grid">
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSTRUMENTS</div><div style="font-size:11.5px;">${plan.preparation.instruments.join(', ')}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">PPE</div><div style="font-size:11.5px;">${plan.preparation.ppe.join(', ')}</div></div>
            <div class="form-group full-width"><div style="font-size:10px; color:var(--text-muted); font-weight:700;">DOCUMENTS</div><div style="font-size:11.5px;">${plan.preparation.documents.join(', ')}</div></div>
          </div>
        `;
      case 'Schedule':
        return `
          <div style="font-size:12px;">
            <div><strong>Planned Date:</strong> <span class="font-mono">${plan.plannedDate}</span></div>
            <div style="margin-top:4px;"><strong>Target Window:</strong> 09:00 – 15:00 IST (Shift A)</div>
            <div style="margin-top:8px;">
              <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('10', {planId:'${plan.id}'})">Open Scheduling Screen</button>
            </div>
          </div>
        `;
      case 'Activity':
        return `
          <div class="audit-timeline">
            ${plan.activity.map(a => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                  <span class="timeline-user">${a.user}</span>
                  <span class="font-mono" style="font-size:10px; color:var(--text-muted);">${a.time}</span>
                </div>
                <div class="timeline-action">${a.action} (${a.reason})</div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return '';
    }
  }

  openCancelPlanModal(planId) {
    this.showModal('Cancel Inspection Plan', `
      <p style="font-size:12.5px; margin-bottom:12px;">Are you sure you want to cancel plan <strong>${planId}</strong>? This action is immutable and will be recorded in the governance audit trail.</p>
      <div class="form-group">
        <label class="form-label required">Cancellation Reason</label>
        <input type="text" class="form-control" placeholder="Specify reason...">
      </div>
    `, [
      { text: 'Keep Plan', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Confirm Cancellation', class: 'btn-danger', onclick: `strata.confirmCancelPlan('${planId}')` }
    ]);
  }

  confirmCancelPlan(planId) {
    this.closeModal();
    this.showToast(`Plan ${planId} has been cancelled.`, 'error');
    this.navigateTo('06');
  }

  // ==========================================
  // SCREEN 09 — PLANNING CALENDAR
  // ==========================================
  renderScreen09() {
    const view = this.filters.calendarView || 'Month';
    const selectedDate = this.selectedDate || '2026-11-15';

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Planning Calendar</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('calendar')}
              Enterprise Inspection Planning Calendar
            </h1>
            <p class="screen-subtitle">Slot allocation, mine operational restrictions, inspector capacity, and automatic conflict detection across the scope.</p>
          </div>
          <div class="screen-actions">
            <div style="display:flex; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
              ${['Month', 'Week', 'Day', 'List'].map(v => `
                <button class="btn btn-secondary btn-sm" style="border-radius:0; border:none; ${view === v ? 'background:var(--purple-primary); color:#FFF;' : ''}" onclick="strata.setCalendarView('${v}')">${v}</button>
              `).join('')}
            </div>
            <button class="btn btn-primary" onclick="strata.navigateTo('10')">Schedule Inspection</button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <select class="filter-select"><option>Authority: DGMS & Internal</option></select>
          <select class="filter-select"><option>Track: All</option></select>
          <select class="filter-select"><option>Mine: All Mines</option><option>Mine A2</option><option>Mine B1</option><option>Mine C4</option></select>
          <select class="filter-select"><option>Risk: All</option></select>
          <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; font-size:12px;">November 2026</span>
          </div>
        </div>

        <!-- Calendar Layout (Grid + Side Panel) -->
        <div class="calendar-layout">
          
          <!-- Grid -->
          <div class="calendar-grid">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>

            <!-- Calendar Cells Sample (Days 1 to 30) -->
            ${Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
              const isSelected = dateStr === selectedDate;
              const events = this.data.calendarEvents.filter(e => e.date === dateStr);

              return `
                <div class="calendar-cell ${isSelected ? 'selected' : ''}" onclick="strata.selectCalendarDate('${dateStr}')">
                  <span class="calendar-date-num">${day}</span>
                  ${events.map(ev => `
                    <div class="cal-event-pill ${ev.hasConflict ? 'conflict' : ''}" onclick="event.stopPropagation(); strata.handleCalendarEventClick('${ev.id}')">
                      <div><strong>${ev.id.split('-')[2] || ev.id}</strong> (${ev.type.split(' ')[0]})</div>
                      <div style="font-size:9px;">${ev.mine.split('(')[0]} &bull; ${ev.time}</div>
                    </div>
                  `).join('')}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Right Side: Selected Date Details -->
          <div class="enterprise-card" style="margin-bottom:0;">
            <div class="card-header">
              <span class="card-title">${this.getIconSvg('clock')} Date: <span class="font-mono">${selectedDate}</span></span>
            </div>
            <div class="card-body" style="padding: 12px; display:flex; flex-direction:column; gap:12px;">
              
              <div>
                <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom:4px;">SCHEDULED INSPECTIONS</div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:8px; border-radius:3px; cursor:pointer;" onclick="strata.navigateTo('14', {inspectionId:'INS-2026-0882'})">
                    <div style="display:flex; justify-content:space-between;">
                      <strong class="font-mono" style="color:var(--purple-primary); font-size:11.5px;">INS-2026-0882</strong>
                      <span class="badge badge-scheduled">09:00 - 15:00</span>
                    </div>
                    <div style="font-size:11px; margin-top:2px;">Mine A2 &bull; Ventilation Survey</div>
                  </div>
                </div>
              </div>

              <!-- Capacity & Conflict Detector -->
              <div style="border-top:1px solid var(--border-light); padding-top:10px;">
                <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom:4px;">AVAILABLE MINE CAPACITY</div>
                <div style="font-size:11.5px; color:var(--text-secondary);">
                  Shift A (Morning): <strong>1 Slot Remaining</strong><br>
                  Shift B (Afternoon): <strong>Available</strong>
                </div>
              </div>

              <!-- Conflict Notice on this day -->
              <div style="background:#FFEBEE; border:1px solid #FFCDD2; padding:8px 10px; border-radius:3px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#C62828; font-size:11.5px;">1 Scheduling Conflict Detected</strong>
                  <button class="btn btn-danger btn-sm" onclick="strata.navigateTo('11', {planId:'PLAN-2026-0088'})">Resolve</button>
                </div>
                <div style="font-size:10.5px; color:#7F0000; margin-top:3px;">
                  Overlap with Substation 3 Isolation Test INS-2026-0782 (10:00 - 13:00).
                </div>
              </div>

              <div style="margin-top:auto;">
                <button class="btn btn-primary" style="width:100%;" onclick="strata.navigateTo('10')">
                  + Schedule on ${selectedDate}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }

  setCalendarView(view) {
    this.filters.calendarView = view;
    this.navigateTo('09');
  }

  selectCalendarDate(dateStr) {
    this.selectedDate = dateStr;
    this.navigateTo('09');
  }

  handleCalendarEventClick(eventId) {
    if (eventId.includes('SIM')) {
      this.navigateTo('11', { planId: 'PLAN-2026-0088' });
    } else {
      this.navigateTo('14', { inspectionId: eventId });
    }
  }

  // ==========================================
  // SCREEN 10 — SCHEDULE INSPECTION
  // ==========================================
  renderScreen10(planId) {
    const plan = this.data.inspectionPlans.find(p => p.id === planId) || this.data.inspectionPlans[0];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('06')">Inspection Plans</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('08', {planId:'${plan.id}'})">${plan.id}</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Schedule Inspection</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Schedule Inspection: <span class="font-mono" style="color:var(--purple-primary);">${plan.id}</span></h1>
            <p class="screen-subtitle">Allocate time window, underground location access, verify shift capacity, and run real-time conflict validation.</p>
          </div>
        </div>

        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">Inspection Target Parameters</span>
          </div>
          <div class="card-body">
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; font-size:11.5px;">
              <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">MINE</div><strong>${plan.mine}</strong></div>
              <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSPECTION TYPE</div><strong>${plan.inspectionType}</strong></div>
              <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">RISK LEVEL</div><span class="badge badge-high">${plan.risk}</span></div>
              <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">ESTIMATED DURATION</div><strong>${plan.plannedDuration}</strong></div>
            </div>
          </div>
        </div>

        <form onsubmit="event.preventDefault(); strata.executeSchedulePlan('${plan.id}');">
          
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">Date, Time Slot & Operational Location</span>
            </div>
            <div class="card-body">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label required">Execution Date</label>
                  <input type="date" class="form-control" id="sched-date" value="2026-11-15" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Operating Shift</label>
                  <select class="form-control">
                    <option selected>Morning Shift A (08:00 - 16:00)</option>
                    <option>Afternoon Shift B (16:00 - 00:00)</option>
                    <option>General Day Maintenance Window</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Start Time</label>
                  <input type="time" class="form-control" value="09:00" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">End Time</label>
                  <input type="time" class="form-control" value="15:00" required>
                </div>
                <div class="form-group full-width">
                  <label class="form-label required">Underground & Surface Location Scope</label>
                  <input type="text" class="form-control" value="Mine A2 Underground Seam VII & Surface Main Fan Complex" required>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 4: Inspection Team Requirement (Not selecting final inspectors) -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">Inspection Team Competency Requirements</span>
              <span class="badge badge-draft">Assignment belongs to Workspace 02</span>
            </div>
            <div class="card-body">
              <div style="display:flex; flex-direction:column; gap:6px; font-size:12px;">
                <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--bg-surface-alt); border-radius:3px;">
                  <span>Lead Inspector (First Class Mine Manager Certificate)</span>
                  <span class="badge badge-critical">Required</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--bg-surface-alt); border-radius:3px;">
                  <span>DGMS Certified Ventilation Officer</span>
                  <span class="badge badge-critical">Required</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 10px; background:var(--bg-surface-alt); border-radius:3px;">
                  <span>Electrical Specialist</span>
                  <span class="badge badge-draft">Optional</span>
                </div>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:8px;">
                &bull; Final inspector names and field roster assignments will be locked in Workspace 02.
              </div>
            </div>
          </div>

          <!-- Section 6: Scheduling Validation & Conflict Detector -->
          <div class="enterprise-card">
            <div class="card-header">
              <span class="card-title">${this.getIconSvg('alert-triangle')} Scheduling Validation & Conflict Detection</span>
            </div>
            <div class="card-body">
              <div style="background:#FFF3E0; border:1px solid #FFE0B2; padding:12px; border-radius:4px; margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#B78103; font-size:12.5px;">&excl; Potential High-Voltage Substation Conflict Detected</strong>
                  <button type="button" class="btn btn-danger btn-sm" onclick="strata.navigateTo('11', {planId:'${plan.id}'})">View Conflict Resolution (Screen 11)</button>
                </div>
                <div style="font-size:11.5px; color:#5D4037; margin-top:4px;">
                  Conflicting event: <strong>INS-2026-0782 (Electrical FLP Isolation Test)</strong> in Mine A2 on 15 Nov (10:00 - 13:00).
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:4px; font-size:11.5px; color:var(--text-secondary);">
                <div>&check; Mine operational clearance verified</div>
                <div>&check; Required 6-hour duration fits within Shift A</div>
                <div>&check; Authority scope matches authorized ECL jurisdiction</div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; margin-bottom:30px;">
            <button type="button" class="btn btn-secondary" onclick="strata.navigateTo('08', {planId:'${plan.id}'})">Back to Plan</button>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn btn-secondary" onclick="strata.saveDraftSchedule('${plan.id}')">Save Draft</button>
              <button type="submit" class="btn btn-primary">Schedule Inspection &rarr;</button>
            </div>
          </div>

        </form>
      </div>
    `;
  }

  saveDraftSchedule(planId) {
    this.showToast('Schedule draft saved.', 'success');
    this.navigateTo('08', { planId: planId });
  }

  executeSchedulePlan(planId) {
    this.showToast('Inspection scheduled successfully! Status: SCHEDULED', 'success');
    this.navigateTo('14', { inspectionId: 'INS-2026-0882' });
  }

  // ==========================================
  // SCREEN 11 — SCHEDULING CONFLICT SCREEN / MODAL
  // ==========================================
  renderScreen11(planId) {
    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('09')">Planning Calendar</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('10', {planId:'${planId}'})">Schedule</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Scheduling Conflict</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title" style="color:var(--status-red-text);">
              ${this.getIconSvg('alert-triangle')}
              Scheduling Conflict Resolution
            </h1>
            <p class="screen-subtitle">Conflict type: <strong>Operational Restriction & Substation Isolation Overlap</strong></p>
          </div>
        </div>

        <!-- Conflict Comparison Box -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:16px;">
          
          <!-- Current Target Plan -->
          <div class="enterprise-card" style="border-color:var(--purple-border); margin-bottom:0;">
            <div class="card-header" style="background:var(--purple-light);">
              <span class="card-title" style="color:var(--purple-primary);">CURRENT TARGET PLAN</span>
              <span class="badge badge-planned font-mono">${planId}</span>
            </div>
            <div class="card-body" style="font-size:12px;">
              <div style="margin-bottom:6px;"><strong>Type:</strong> Ventilation & Gas Dynamics Inspection</div>
              <div style="margin-bottom:6px;"><strong>Mine:</strong> Mine A2 (Seam VII)</div>
              <div style="margin-bottom:6px;"><strong>Target Slot:</strong> <span class="font-mono">15 Nov 2026 (09:00 – 15:00 IST)</span></div>
              <div><strong>Requirement:</strong> Requires full auxiliary ventilation fan operation and airway access.</div>
            </div>
          </div>

          <!-- Conflicting Event -->
          <div class="enterprise-card" style="border-color:var(--status-red-border); margin-bottom:0;">
            <div class="card-header" style="background:var(--status-red-bg);">
              <span class="card-title" style="color:var(--status-red-text);">CONFLICTING EVENT</span>
              <span class="badge badge-high font-mono">INS-2026-0782</span>
            </div>
            <div class="card-body" style="font-size:12px;">
              <div style="margin-bottom:6px;"><strong>Type:</strong> Electrical Flameproof (FLP) High-Voltage Audit</div>
              <div style="margin-bottom:6px;"><strong>Mine:</strong> Mine A2 Substation 3 & Fan Feeders</div>
              <div style="margin-bottom:6px;"><strong>Slot:</strong> <span class="font-mono">15 Nov 2026 (10:00 – 13:00 IST)</span></div>
              <div style="color:var(--status-red-text);"><strong>Conflict Reason:</strong> High-voltage power shutdown to Section 2 substations prevents mandatory mechanical ventilation survey simultaneously.</div>
            </div>
          </div>

        </div>

        <!-- Suggested Alternative Options -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">System-Calculated Non-Conflicting Alternative Windows</span>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:10px;">
              
              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-alt); border:1px solid var(--border-color); padding:12px; border-radius:4px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge badge-approved">Option 1 (Recommended)</span>
                    <strong class="font-mono" style="font-size:13px;">15 Nov 2026 &bull; 14:00 – 20:00 IST</strong>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">
                    Afternoon Shift window immediately following completion of Substation 3 high-voltage energization.
                  </div>
                </div>
                <button class="btn btn-primary" onclick="strata.selectConflictAlternative('2026-11-15', '14:00', '${planId}')">Select Option 1</button>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-alt); border:1px solid var(--border-color); padding:12px; border-radius:4px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge badge-draft">Option 2</span>
                    <strong class="font-mono" style="font-size:13px;">16 Nov 2026 &bull; 10:00 – 16:00 IST</strong>
                  </div>
                  <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">
                    Next working day &bull; Full unobstructed Morning Shift A window with full colliery team available.
                  </div>
                </div>
                <button class="btn btn-secondary" onclick="strata.selectConflictAlternative('2026-11-16', '10:00', '${planId}')">Select Option 2</button>
              </div>

            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
          <button class="btn btn-secondary" onclick="strata.navigateTo('08', {planId:'${planId}'})">Cancel</button>
          <button class="btn btn-primary" onclick="strata.navigateTo('10', {planId:'${planId}'})">Custom Reschedule &rarr;</button>
        </div>

      </div>
    `;
  }

  selectConflictAlternative(date, time, planId) {
    this.showToast(`Conflict resolved! Slot allocated for ${date} at ${time}.`, 'success');
    this.navigateTo('14', { inspectionId: 'INS-2026-0882' });
  }

  // ==========================================
  // SCREEN 12 — OVERDUE INSPECTIONS
  // ==========================================
  renderScreen12() {
    const kpis = [
      { label: 'Total Overdue', value: '3', subtext: 'Exceeded statutory window', danger: true },
      { label: 'Critical Risk', value: '1', subtext: 'Winding engine brake', danger: true },
      { label: 'Awaiting Scheduling', value: '1', subtext: 'Dust survey' },
      { label: 'Awaiting Assignment', value: '1', subtext: 'DGMS inquiry duty' },
      { label: 'Delayed Execution', value: '1', subtext: 'Refuge chamber' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Overdue Inspections</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title" style="color:var(--status-red-text);">
              ${this.getIconSvg('alert-triangle')}
              Overdue Inspections Governance Monitor
            </h1>
            <p class="screen-subtitle">Statutory obligations that have passed their mandated execution window without completed inspection submissions.</p>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.danger ? 'kpi-danger' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Inspection ID</th>
                  <th>Mine</th>
                  <th>Type</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Risk</th>
                  <th>Current Stage</th>
                  <th>Owner</th>
                  <th>Statutory Ref</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.overdueInspections.map(o => `
                  <tr class="row-danger">
                    <td><strong class="font-mono" style="color:var(--status-red-text); cursor:pointer;" onclick="strata.navigateTo('14', {inspectionId:'${o.id}'})">${o.id}</strong></td>
                    <td><strong>${o.mine.split('(')[0]}</strong></td>
                    <td>${o.type}</td>
                    <td class="font-mono">${o.dueDate}</td>
                    <td><span class="badge badge-overdue">${o.daysOverdue} Days</span></td>
                    <td><span class="badge badge-high"><span class="badge-dot"></span>${o.risk}</span></td>
                    <td><span class="badge badge-draft">${o.currentStage}</span></td>
                    <td>${o.owner}</td>
                    <td class="font-mono" style="font-size:11px;">${o.statutoryRef}</td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('14', {inspectionId:'${o.id}'})">Open</button>
                        <button class="btn btn-primary btn-sm" onclick="strata.navigateTo('10')">Reschedule</button>
                        <button class="btn btn-danger btn-sm" onclick="strata.openEscalateModal('${o.id}')">Escalate</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  openEscalateModal(insId) {
    this.showModal('Statutory Escalation Notice', `
      <p style="font-size:12.5px; margin-bottom:12px;">Issue a formal governance escalation notice for overdue inspection <strong>${insId}</strong> to the General Manager (Safety) and Subsidiary Director Technical.</p>
      <div class="form-group">
        <label class="form-label required">Escalation Recipient</label>
        <input type="text" class="form-control" value="Director Technical (ECL) & DGMS Liaison Cell" readonly style="background:#F8FAFC;">
      </div>
      <div class="form-group" style="margin-top:8px;">
        <label class="form-label required">Direct Remedial Directive</label>
        <textarea class="form-control">Mandate emergency allocation of replacement Lead Inspector within 24 hours per CMR 2017 governance rules.</textarea>
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Dispatch Escalation', class: 'btn-danger', onclick: `strata.confirmEscalation('${insId}')` }
    ]);
  }

  confirmEscalation(insId) {
    this.closeModal();
    this.showToast(`Escalation dispatch logged to DGMS compliance binder for ${insId}.`, 'error');
  }

  // ==========================================
  // SCREEN 13 — PLAN AUDIT / ACTIVITY
  // ==========================================
  renderScreen13(planId) {
    const plan = this.data.inspectionPlans.find(p => p.id === planId) || this.data.inspectionPlans[0];
    const activeTab = this.activeTab['audit'] || 'Activity';

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('06')">Inspection Plans</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('08', {planId:'${plan.id}'})">${plan.id}</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Plan Audit & Activity</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('shield')}
              Inspection Plan Audit & Immutable Activity Trail
            </h1>
            <p class="screen-subtitle">Plan ID: <span class="font-mono" style="color:var(--purple-primary);">${plan.id}</span> &bull; Full version history and parameter change diffs.</p>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.navigateTo('08', {planId:'${plan.id}'})">Back to Plan</button>
          </div>
        </div>

        <div class="tabs-nav">
          ${['Activity', 'Versions', 'Changes'].map(t => `
            <button class="tab-btn ${activeTab === t ? 'active' : ''}" onclick="strata.setAuditTab('${t}')">${t}</button>
          `).join('')}
        </div>

        <div class="enterprise-card">
          <div class="card-body">
            ${activeTab === 'Activity' ? `
              <div class="audit-timeline">
                ${plan.activity.map(a => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-header">
                      <div>
                        <span class="timeline-user">${a.user}</span>
                        <span style="font-size:11.5px; color:var(--text-secondary); margin-left:6px;">${a.action}</span>
                      </div>
                      <span class="font-mono timestamp">${a.time}</span>
                    </div>
                    <div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">Reason: ${a.reason}</div>
                    ${a.prev && a.next ? `
                      <div class="timeline-diff">
                        <span style="color:#C62828;">- ${a.prev}</span> &rarr; <span style="color:#1B5E20;">+ ${a.next}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : activeTab === 'Versions' ? `
              <div style="display:flex; flex-direction:column; gap:12px;">
                ${plan.versions.map(v => `
                  <div style="background:var(--bg-surface-alt); border:1px solid var(--border-color); border-radius:4px; padding:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <strong class="font-mono" style="font-size:13px; color:var(--purple-primary);">${v.version}</strong>
                        <span style="font-size:11px; color:var(--text-muted); margin-left:8px;">${v.date} by ${v.user}</span>
                      </div>
                      <button class="btn btn-secondary btn-sm" onclick="strata.showToast('Viewing snapshot of ${v.version}', 'success')">Inspect Snapshot</button>
                    </div>
                    <p style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;">${v.note}</p>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="font-size:12px; color:var(--text-secondary);">
                <p>No unauthorized parameter rollbacks detected. All 6 validation checkpoints verified under CMR 2017 statutory governance.</p>
              </div>
            `}
          </div>
        </div>

      </div>
    `;
  }

  setAuditTab(tab) {
    this.activeTab['audit'] = tab;
    this.navigateTo('13');
  }

  // ==========================================
  // SCREEN 14 — INSPECTION MANAGEMENT DETAIL (Central Hub & Handoff Page)
  // ==========================================
  renderScreen14(insId) {
    const ins = this.data.inspections.find(i => i.id === insId) || this.data.inspections[0];
    const activeTab = this.activeTab['inspection'] || 'Overview';

    const tabs = ['Overview', 'Planning', 'Regulatory Basis', 'Scope', 'Schedule', 'Team', 'Checklist', 'Findings', 'CAPA', 'Reports', 'Activity'];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Inspection Governance</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('06')">Inspection</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${ins.id}</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              <span class="font-mono" style="color:var(--purple-primary);">${ins.id}</span>
              <span>${ins.title}</span>
              <span class="badge ${ins.status === 'Scheduled' ? 'badge-scheduled' : ins.status === 'In Progress' ? 'badge-in-progress' : 'badge-final'}">
                <span class="badge-dot"></span>${ins.status}
              </span>
            </h1>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.navigateTo('13')">Audit Trail</button>
            <button class="btn btn-primary" onclick="strata.openWorkspace02HandoffModal('${ins.id}')">
              Proceed to Inspector Assignment &rarr;
            </button>
          </div>
        </div>

        <!-- Identity Strip (Strict Authority -> Track -> Type -> Scope) -->
        <div class="identity-strip">
          <div class="identity-grid">
            <div class="identity-field">
              <span class="identity-label">AUTHORITY</span>
              <span class="identity-val">${ins.authority.split('/')[0]}</span>
            </div>
            <div class="identity-field">
              <span class="identity-label">TRACK</span>
              <span class="identity-val">${ins.track}</span>
            </div>
            <div class="identity-field">
              <span class="identity-label">INSPECTION TYPE</span>
              <span class="identity-val">${ins.type}</span>
            </div>
            <div class="identity-field">
              <span class="identity-label">ORGANIZATIONAL SCOPE</span>
              <span class="identity-val font-mono">${ins.scope}</span>
            </div>
          </div>
        </div>

        <!-- 7-Stage Status Stepper -->
        <div class="stepper-container">
          ${ins.stepperStages.map((s, i) => `
            <div class="stepper-step ${s.status}">
              <div class="step-circle">${s.status === 'completed' ? '&check;' : s.status === 'current' ? '&bull;' : (i + 1)}</div>
              <div class="step-name">${s.name}</div>
            </div>
            ${i < ins.stepperStages.length - 1 ? `<div class="stepper-divider ${s.status === 'completed' ? 'completed' : ''}"></div>` : ''}
          `).join('')}
        </div>

        <!-- Main Tabs -->
        <div class="tabs-nav">
          ${tabs.map(t => `
            <button class="tab-btn ${activeTab === t ? 'active' : ''}" onclick="strata.setInspectionTab('${t}')">${t}</button>
          `).join('')}
        </div>

        <!-- Tab Body -->
        <div class="enterprise-card">
          <div class="card-body">
            ${this.renderInspectionTabContent(activeTab, ins)}
          </div>
        </div>

      </div>
    `;
  }

  setInspectionTab(tab) {
    this.activeTab['inspection'] = tab;
    this.navigateTo('14');
  }

  renderInspectionTabContent(tab, ins) {
    switch (tab) {
      case 'Overview':
        return `
          <div class="form-grid">
            <div class="form-group full-width">
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSPECTION OBJECTIVE</div>
              <div style="font-size:12.5px; font-weight:600; margin-top:2px;">Statutory quarterly mechanical ventilation and gas dynamics survey under CMR 2017 Reg 153.</div>
            </div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">PLANNED DATE</div><div class="font-mono">${ins.plannedDate}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">DURATION</div><div>${ins.duration}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">RISK CLASSIFICATION</div><span class="badge badge-high">${ins.risk}</span></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">PRIMARY MINE</div><div>${ins.scopeDetails.mine}</div></div>
          </div>
        `;
      case 'Planning':
        return `
          <div class="form-grid">
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">PLAN ID</div><strong class="font-mono" style="color:var(--purple-primary);">${ins.planId}</strong></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">RECOMMENDATION ID</div><strong class="font-mono">${ins.recommendationId}</strong></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">REQUEST ID</div><strong class="font-mono">${ins.requestId}</strong></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">PLANNER</div><div>${ins.planner}</div></div>
          </div>
        `;
      case 'Regulatory Basis':
        return `
          <div>
            <div class="traceability-chain" style="margin-bottom:14px;">
              <div class="trace-node"><div class="trace-node-label">REGULATION</div><div class="trace-node-value">${ins.regulatoryBasis.regulation}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">CLAUSE</div><div class="trace-node-value font-mono">${ins.regulatoryBasis.clause}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">REQUIREMENT</div><div class="trace-node-value" style="font-size:11px;">${ins.regulatoryBasis.requirement}</div></div>
              <div class="trace-arrow">&rarr;</div>
              <div class="trace-node"><div class="trace-node-label">OBLIGATION</div><div class="trace-node-value font-mono">${ins.regulatoryBasis.id}</div></div>
            </div>
            <p style="font-size:12px; color:var(--text-secondary);">${ins.regulatoryBasis.obligation}</p>
          </div>
        `;
      case 'Schedule':
        return `
          <div class="form-grid">
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">SCHEDULED DATE</div><div class="font-mono">${ins.schedule.date}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">TIME WINDOW</div><div class="font-mono">${ins.schedule.time}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">SHIFT</div><div>${ins.schedule.shift}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">LOCATION</div><div>${ins.schedule.location}</div></div>
          </div>
        `;
      case 'Team':
        return `
          <div style="background:var(--purple-light); border:1px solid var(--purple-border); padding:16px; border-radius:4px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div>
                <strong style="font-size:14px; color:var(--purple-primary);">Inspector Team Assignment (Workspace 02 Handoff)</strong>
                <div style="font-size:11.5px; color:var(--text-secondary);">Planning stage complete. Inspector roster and team lead selection occurs in Workspace 02.</div>
              </div>
              <button class="btn btn-primary" onclick="strata.openWorkspace02HandoffModal('${ins.id}')">
                Proceed to Inspector Assignment &rarr;
              </button>
            </div>
            <div style="font-size:12px; border-top:1px solid var(--purple-border); padding-top:10px; margin-top:10px;">
              <div><strong>Status:</strong> <span class="badge badge-awaiting">${ins.team.assignmentStatus}</span></div>
              <div style="margin-top:4px;"><strong>Specialists Required:</strong> ${ins.team.specialistsRequired.join(', ')}</div>
            </div>
          </div>
        `;
      case 'Checklist':
        return `
          <div>
            <div class="recommendation-banner" style="margin-bottom:12px;">
              <div class="banner-content">
                <span class="banner-tag">PREVIEW ONLY</span>
                <span class="banner-text">&bull; Template: <strong>${ins.checklistPreview.template}</strong>. Actual field checklist execution occurs in Workspace 03 (Mobile / Field Tablet).</span>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${ins.checklistPreview.sampleChecks.map(c => `
                <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:8px 12px; border-radius:3px; font-size:11.5px;">
                  <span><strong class="font-mono">${c.checkNo}</strong> &bull; ${c.item}</span>
                  <span class="badge badge-draft">Mandatory</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      case 'Findings':
        return `
          <div style="font-size:12px;">
            <p style="color:var(--text-muted); margin-bottom:8px;">Findings logged during execution are monitored here. (Approval authority belongs to Workspace 04/05).</p>
            <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('16')">Open Findings Monitoring Screen &rarr;</button>
          </div>
        `;
      case 'CAPA':
        return `
          <div style="font-size:12px;">
            <p style="color:var(--text-muted); margin-bottom:8px;">Corrective and Preventive Actions tracking.</p>
            <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('17')">Open CAPA Monitoring Screen &rarr;</button>
          </div>
        `;
      case 'Reports':
        return `
          <div style="font-size:12px;">
            <p style="color:var(--text-muted); margin-bottom:8px;">Final inspection statutory report status.</p>
            <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('18')">Open Report Status Screen &rarr;</button>
          </div>
        `;
      case 'Activity':
        return `
          <div class="audit-timeline">
            ${ins.activity.map(a => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                  <span class="timeline-user">${a.user}</span>
                  <span class="font-mono timestamp">${a.time}</span>
                </div>
                <div class="timeline-action">${a.action}</div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return '';
    }
  }

  openWorkspace02HandoffModal(insId) {
    this.showModal('Hand-off to Workspace 02: Inspection Assignment & Team', `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:28px; color:var(--purple-primary); margin-bottom:6px;">${this.getIconSvg('user-check')}</div>
        <h3 style="font-family:'Outfit',sans-serif; font-size:16px; font-weight:700;">Handoff Boundary: Workspace 01 &rarr; Workspace 02</h3>
        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px; max-width:440px; margin-left:auto; margin-right:auto;">
          Workspace 01 has completed governance scoping, regulatory mapping, and slot scheduling for <strong>${insId}</strong>.
          Control is now handed off to the Assignment Cell in Workspace 02 to assign certified Lead Inspectors and specialists.
        </p>
        <div style="background:var(--bg-surface-alt); border:1px solid var(--border-color); padding:10px; border-radius:4px; margin-top:14px; font-size:11.5px; text-align:left;">
          <div><strong>Locked Scope:</strong> Mine A2 (Seam VII) &bull; CMR 2017 Reg 153</div>
          <div><strong>Scheduled Slot:</strong> 15 Nov 2026 (09:00 – 15:00 IST)</div>
          <div><strong>Required Competencies:</strong> First Class Manager + Ventilation Officer</div>
        </div>
      </div>
    `, [
      { text: 'Stay in Workspace 01', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Launch Workspace 02 (Assignment)', class: 'btn-primary', onclick: `strata.confirmWorkspace02Handoff('${insId}')` }
    ]);
  }

  confirmWorkspace02Handoff(insId) {
    this.closeModal();
    this.showToast(`Hand-off payload for ${insId} transmitted to Workspace 02 (Inspector Assignment).`, 'success');
  }

  // ==========================================
  // SCREEN 15 — ACTIVE INSPECTIONS MONITORING
  // ==========================================
  renderScreen15() {
    const kpis = [
      { label: 'Not Started', value: '0', subtext: 'Scheduled' },
      { label: 'In Progress', value: '1', subtext: 'Mine A2 District 2', primary: true },
      { label: 'Paused', value: '0', subtext: 'None' },
      { label: 'Awaiting Submission', value: '0', subtext: 'None' },
      { label: 'Submitted', value: '0', subtext: 'None' },
      { label: 'At Risk', value: '0', subtext: 'Normal sync' }
    ];

    const activeIns = this.data.inspections.find(i => i.status === 'In Progress') || this.data.inspections[1];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Active Inspections</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('activity')}
              Active Field Inspections Monitoring
            </h1>
            <p class="screen-subtitle">Inspection Manager monitors field execution in real time without modifying field inspectors' recorded evidence.</p>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.primary ? 'kpi-primary' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="card-header">
            <span class="card-title">Live Field Executions</span>
          </div>
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Inspection</th>
                  <th>Mine</th>
                  <th>Lead Inspector</th>
                  <th>Progress</th>
                  <th>Checklist</th>
                  <th>Evidence</th>
                  <th>Findings</th>
                  <th>Last Sync</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('14', {inspectionId:'${activeIns.id}'})">${activeIns.id}</strong></td>
                  <td>${activeIns.scopeDetails.mine.split('(')[0]}</td>
                  <td>${activeIns.team.leadInspector.split('(')[0]}</td>
                  <td style="min-width: 140px;">
                    <div style="display:flex; justify-content:space-between; font-size:10.5px; font-weight:700; margin-bottom:2px;">
                      <span>Progress</span>
                      <span class="font-mono">${activeIns.monitoring.activeProgress}%</span>
                    </div>
                    <div class="progress-bar-container">
                      <div class="progress-bar-fill" style="width: ${activeIns.monitoring.activeProgress}%;"></div>
                    </div>
                  </td>
                  <td class="font-mono"><strong>${activeIns.monitoring.completedChecks}</strong></td>
                  <td class="font-mono">${activeIns.monitoring.evidenceCollected}</td>
                  <td><span class="badge badge-high">${activeIns.monitoring.findingsLogged}</span></td>
                  <td>
                    <span style="font-size:11px; color:#10B981; font-weight:600; cursor:pointer;" onclick="strata.openSyncDrawer('${activeIns.id}')">
                      &bull; ${activeIns.monitoring.lastSync}
                    </span>
                  </td>
                  <td><span class="badge badge-in-progress"><span class="badge-dot"></span>IN PROGRESS</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="strata.openMonitoringDrawer('${activeIns.id}')">Inspect Telemetry</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  openMonitoringDrawer(insId) {
    this.openDrawer('Field Inspection Live Telemetry', `
      <div style="font-size:12px;">
        <div style="margin-bottom:12px;">
          <div style="font-size:10px; color:var(--text-muted); font-weight:700;">INSPECTION TARGET</div>
          <div style="font-size:13px; font-weight:700; color:var(--purple-primary);">${insId}</div>
          <div>Mine A2 District 2 South Panel S3</div>
        </div>

        <div style="background:var(--bg-surface-alt); border:1px solid var(--border-color); padding:10px; border-radius:4px; margin-bottom:12px;">
          <div style="font-weight:700; font-size:11.5px;">Live Execution Statistics:</div>
          <div style="margin-top:4px;">Checklist: <strong>15 of 22 checks executed</strong> (68%)</div>
          <div>Photos Uploaded: <strong>18 high-res records</strong></div>
          <div>Findings Triggered: <strong style="color:var(--status-red-text);">3 deficiencies logged</strong></div>
        </div>

        <div style="border-top:1px solid var(--border-light); padding-top:10px;">
          <div style="font-size:10px; color:var(--text-muted); font-weight:700; margin-bottom:6px;">FIELD TIMELINE HEARTBEAT</div>
          <div style="display:flex; flex-direction:column; gap:6px; font-size:11px;">
            <div>10:43 - Substation Wi-Fi Gateway sync heartbeat acknowledged</div>
            <div>10:15 - 4 Photos of telltale indicator uploaded by P. Mukhopadhyay</div>
            <div>09:45 - Finding FND-2026-00127 logged by R. Sharma</div>
            <div>08:30 - Commenced field inspection at District 2 South</div>
          </div>
        </div>
      </div>
    `);
  }

  openSyncDrawer(insId) {
    this.openDrawer('Offline / Sync Status', `
      <div style="font-size:12px;">
        <div style="background:#E8F5E9; border:1px solid #C8E6C9; padding:10px; border-radius:4px; margin-bottom:12px;">
          <strong style="color:#1B5E20;">Uplink Status: ONLINE</strong>
          <p style="font-size:11.5px; color:#2E7D32; margin-top:2px;">
            Connected to Mine A2 Substation Wi-Fi Gateway #04.
          </p>
        </div>
        <div>Pending Offline Records: <strong>0</strong></div>
        <div>Latency: <strong>42 ms</strong></div>
        <div>Data packet integrity: <strong>100% Verified SHA-256</strong></div>
      </div>
    `);
  }

  // ==========================================
  // SCREEN 16 — FINDINGS MONITORING
  // ==========================================
  renderScreen16() {
    const kpis = [
      { label: 'Proposed', value: '1', subtext: 'Field logged' },
      { label: 'Under Review', value: '1', subtext: 'Awaiting board', warning: true },
      { label: 'Confirmed', value: '1', subtext: 'Statutory non-compliance', danger: true },
      { label: 'Returned', value: '1', subtext: 'Re-measurement' },
      { label: 'Critical', value: '1', subtext: 'Earth leakage', danger: true },
      { label: 'Overdue', value: '0', subtext: 'None' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Findings Monitoring</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Findings Monitoring</h1>
            <p class="screen-subtitle">Track inspection findings across the governance lifecycle without bypassing authorized reviewer boundaries.</p>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Finding ID</th>
                  <th>Inspection</th>
                  <th>Mine</th>
                  <th>Finding Type</th>
                  <th>Severity</th>
                  <th>Inspector</th>
                  <th>Reviewer</th>
                  <th>Status</th>
                  <th>CAPA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.findings.map(f => `
                  <tr>
                    <td><strong class="font-mono" style="color:var(--purple-primary);">${f.id}</strong></td>
                    <td><span class="font-mono">${f.inspectionId}</span></td>
                    <td>${f.mine}</td>
                    <td>${f.findingType}</td>
                    <td>
                      <span class="badge ${f.severity === 'Critical' ? 'badge-critical' : f.severity === 'High' ? 'badge-high' : 'badge-medium'}">
                        <span class="badge-dot"></span>${f.severity}
                      </span>
                    </td>
                    <td>${f.inspector}</td>
                    <td>${f.reviewer}</td>
                    <td>
                      <span class="badge ${f.status === 'Confirmed' ? 'badge-high' : f.status === 'Under Review' ? 'badge-awaiting' : 'badge-draft'}">
                        <span class="badge-dot"></span>${f.status}
                      </span>
                    </td>
                    <td><span class="badge ${f.capaRequired ? 'badge-high' : 'badge-draft'}">${f.capaRequired ? 'Required' : 'Optional'}</span></td>
                    <td>
                      <button class="btn ${f.hasReviewerPermission ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="strata.handleFindingAction('${f.id}', ${f.hasReviewerPermission})">
                        ${f.hasReviewerPermission ? 'Review' : 'View'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  handleFindingAction(findingId, hasPermission) {
    if (hasPermission) {
      this.showToast(`Opening Finding Review modal for ${findingId} (Authorized Reviewer).`, 'success');
    } else {
      this.showToast(`Viewing Finding Detail ${findingId} (Read-Only Monitor).`, 'success');
    }
  }

  // ==========================================
  // SCREEN 17 — CAPA MONITORING
  // ==========================================
  renderScreen17() {
    const kpis = [
      { label: 'Open', value: '1', subtext: 'In remediation' },
      { label: 'Due Soon', value: '1', subtext: 'Within 7 days', warning: true },
      { label: 'Overdue', value: '1', subtext: 'Auxiliary fan', danger: true },
      { label: 'Awaiting Verification', value: '1', subtext: 'Substation relay' },
      { label: 'Reopened', value: '0', subtext: 'None' },
      { label: 'Closed', value: '1', subtext: 'Verified' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">CAPA Monitoring</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Corrective & Preventive Actions (CAPA) Monitoring</h1>
            <p class="screen-subtitle">Governance tracking of corrective actions assigned to colliery engineering departments. Managers monitor but do not self-verify.</p>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.danger ? 'kpi-danger' : ''} ${k.warning ? 'kpi-warning' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>CAPA ID</th>
                  <th>Finding</th>
                  <th>Mine</th>
                  <th>Department</th>
                  <th>Action Owner</th>
                  <th>Remedial Action</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Verifier</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.capaList.map(c => `
                  <tr class="${c.status === 'Overdue' ? 'row-danger' : ''}">
                    <td><strong class="font-mono" style="color:var(--purple-primary);">${c.id}</strong></td>
                    <td><span class="font-mono">${c.findingId}</span></td>
                    <td>${c.mine}</td>
                    <td>${c.department.split(' ')[0]}</td>
                    <td>${c.actionOwner.split('(')[0]}</td>
                    <td style="max-width: 220px; font-size: 11.5px;">${c.actionTitle}</td>
                    <td class="font-mono">${c.dueDate}</td>
                    <td><span class="badge ${c.priority === 'Critical' ? 'badge-critical' : 'badge-high'}">${c.priority}</span></td>
                    <td>
                      <span class="badge ${c.status === 'Overdue' ? 'badge-overdue' : c.status === 'Closed' ? 'badge-approved' : 'badge-awaiting'}">
                        <span class="badge-dot"></span>${c.status}
                      </span>
                    </td>
                    <td>${c.verifier}</td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="strata.showToast('Viewing CAPA ${c.id} details', 'success')">View</button>
                        ${c.status === 'Overdue' ? `
                          <button class="btn btn-danger btn-sm" onclick="strata.openEscalateModal('${c.id}')">Escalate</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // SCREEN 18 — REPORT STATUS
  // ==========================================
  renderScreen18() {
    const kpis = [
      { label: 'Draft', value: '1', subtext: 'In field' },
      { label: 'Submitted', value: '0', subtext: 'None' },
      { label: 'Awaiting Review', value: '1', subtext: 'Safety Committee', warning: true },
      { label: 'Returned', value: '1', subtext: 'Re-check' },
      { label: 'Approved', value: '1', subtext: 'DGMS Signoff', primary: true },
      { label: 'Final', value: '1', subtext: 'Immutable' }
    ];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Report Status</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Inspection Report Lifecycle Status</h1>
            <p class="screen-subtitle">Monitoring statutory report progression from field draft, peer review, and DGMS submission to final digital signature.</p>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row">
          ${kpis.map(k => `
            <div class="kpi-card ${k.warning ? 'kpi-warning' : ''} ${k.primary ? 'kpi-primary' : ''}">
              <span class="kpi-label">${k.label}</span>
              <div class="kpi-val-row"><span class="kpi-value">${k.value}</span></div>
              <span class="kpi-subtext">${k.subtext}</span>
            </div>
          `).join('')}
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Inspection</th>
                  <th>Mine</th>
                  <th>Report Version</th>
                  <th>Lead Inspector</th>
                  <th>Submitted</th>
                  <th>Reviewer</th>
                  <th>Status</th>
                  <th>Last Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.reports.map(r => `
                  <tr>
                    <td><strong class="font-mono" style="color:var(--purple-primary);">${r.id}</strong></td>
                    <td><span class="font-mono">${r.inspectionId}</span></td>
                    <td>${r.mine}</td>
                    <td><span class="badge badge-draft font-mono">${r.reportVersion}</span></td>
                    <td>${r.leadInspector}</td>
                    <td class="font-mono">${r.submittedDate}</td>
                    <td>${r.reviewer}</td>
                    <td>
                      <span class="badge ${r.status === 'Approved' ? 'badge-approved' : r.status === 'Returned' ? 'badge-rejected' : 'badge-awaiting'}">
                        <span class="badge-dot"></span>${r.status}
                      </span>
                    </td>
                    <td>${r.lastAction}</td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button class="btn btn-secondary btn-sm" onclick="strata.openReportPreviewDrawer('${r.id}')">View Report</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  openReportPreviewDrawer(reportId) {
    this.openDrawer(`Statutory Inspection Report: ${reportId}`, `
      <div style="font-size:12px;">
        <div style="border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:12px;">
          <div style="font-size:10px; color:var(--text-muted); font-weight:700;">DGMS STATUTORY GOVERNANCE FORMAT</div>
          <div style="font-size:14px; font-weight:700;">Coal India Limited &bull; Eastern Coalfields Ltd</div>
          <div style="font-size:11.5px; color:var(--text-secondary);">Comprehensive Substation FLP & Electrical Safety Audit</div>
        </div>
        <p style="font-size:12px; color:var(--text-secondary); line-height:1.5;">
          This statutory inspection report has been compiled under CMR 2017 Regulation 102/107. All recorded feeler gauge tolerances and earth leakage response measurements are cryptographically signed.
        </p>
        <div style="margin-top:14px;">
          <button class="btn btn-primary btn-sm" onclick="strata.showToast('Generating official PDF copy...', 'success')">Download Signed PDF</button>
        </div>
      </div>
    `);
  }

  // ==========================================
  // SCREEN 19 — INSPECTION HISTORY
  // ==========================================
  renderScreen19() {
    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Inspection History</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">Inspection History & Archival Records</h1>
            <p class="screen-subtitle">Search and analyze finalized statutory historical inspections across all authorized subsidiaries and collieries.</p>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <input type="text" class="filter-input" placeholder="Search Inspection ID, Mine, Finding..." style="min-width: 240px;">
          <select class="filter-select"><option>Subsidiary: All (ECL, BCCL, CCL)</option></select>
          <select class="filter-select"><option>Track: All</option></select>
          <select class="filter-select"><option>Status: Final Records Only</option></select>
          <button class="btn btn-secondary btn-sm" style="margin-left:auto;">Search</button>
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Inspection ID</th>
                  <th>Date</th>
                  <th>Mine</th>
                  <th>Type</th>
                  <th>Track</th>
                  <th>Source</th>
                  <th>Findings</th>
                  <th>CAPA</th>
                  <th>Final Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('20', {inspectionId:'INS-2026-0782'})">INS-2026-0782</strong></td>
                  <td class="font-mono">15 Jul 2026</td>
                  <td>Mine A2 (Seam VII)</td>
                  <td>Flameproof Electrical Audit</td>
                  <td>Electrical & Machinery</td>
                  <td>Mandatory DGMS OBL-062</td>
                  <td><span class="badge badge-medium">3 Confirmed</span></td>
                  <td><span class="badge badge-approved">3 Closed</span></td>
                  <td><span class="badge badge-final"><span class="badge-dot"></span>FINAL</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('20', {inspectionId:'INS-2026-0782'})">Open Record</button>
                  </td>
                </tr>
                <tr>
                  <td><strong class="font-mono" style="color:var(--purple-primary); cursor:pointer;" onclick="strata.navigateTo('20', {inspectionId:'INS-2026-0610'})">INS-2026-0610</strong></td>
                  <td class="font-mono">01 Aug 2026</td>
                  <td>Mine B1</td>
                  <td>Flameproof Pumping Audit</td>
                  <td>Electrical & Machinery</td>
                  <td>Monthly Statutory</td>
                  <td><span class="badge badge-approved">1 Rectified</span></td>
                  <td><span class="badge badge-approved">1 Closed</span></td>
                  <td><span class="badge badge-final"><span class="badge-dot"></span>FINAL</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="strata.navigateTo('20', {inspectionId:'INS-2026-0782'})">Open Record</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // SCREEN 20 — HISTORICAL INSPECTION DETAIL (Final Record)
  // ==========================================
  renderScreen20(insId) {
    const hist = this.data.inspections.find(i => i.id === 'INS-2026-0782') || this.data.inspections[2];
    const activeTab = this.activeTab['historical'] || 'Summary';

    const tabs = ['Summary', 'Checklist', 'Measurements', 'Observations', 'Evidence', 'Findings', 'CAPA', 'Report', 'Versions', 'Audit'];

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="crumb-link" onclick="strata.navigateTo('19')">Inspection History</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${hist.id}</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              <span class="font-mono" style="color:var(--purple-primary);">${hist.id}</span>
              <span>Final Statutory Inspection Record</span>
              <span class="badge badge-final"><span class="badge-dot"></span>FINAL</span>
            </h1>
          </div>
          <div class="screen-actions">
            <button class="btn btn-secondary" onclick="strata.openReportPreviewDrawer('REP-2026-0410')">View Final Report</button>
            <button class="btn btn-secondary" onclick="strata.navigateTo('21')">View Audit Trail</button>
            <button class="btn btn-danger" onclick="strata.openAmendmentModal('${hist.id}')">Request Correction / Amendment</button>
          </div>
        </div>

        <!-- Immutable Read-Only Notice Banner -->
        <div style="background:#ECEFF1; border:1px solid #CFD8DC; border-left:4px solid #37474F; padding:10px 14px; border-radius:3px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="color:#263238; font-size:11.5px;">FINAL IMMUTABLE RECORD:</strong>
            <span style="font-size:11.5px; color:#455A64;">Original inspection data is legally locked. Edits are disabled; amendments require authorized governance petition.</span>
          </div>
          <span class="badge badge-draft font-mono">LOCKED</span>
        </div>

        <!-- Identity Strip -->
        <div class="identity-strip">
          <div class="identity-grid">
            <div class="identity-field"><span class="identity-label">AUTHORITY</span><span class="identity-val">${hist.authority}</span></div>
            <div class="identity-field"><span class="identity-label">TRACK</span><span class="identity-val">${hist.track}</span></div>
            <div class="identity-field"><span class="identity-label">TYPE</span><span class="identity-val">${hist.type}</span></div>
            <div class="identity-field"><span class="identity-label">SCOPE</span><span class="identity-val font-mono">${hist.scope}</span></div>
            <div class="identity-field"><span class="identity-label">INSPECTION DATE</span><span class="identity-val font-mono">${hist.inspectionDate}</span></div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs-nav">
          ${tabs.map(t => `
            <button class="tab-btn ${activeTab === t ? 'active' : ''}" onclick="strata.setHistTab('${t}')">${t}</button>
          `).join('')}
        </div>

        <!-- Tab Body -->
        <div class="enterprise-card">
          <div class="card-body">
            ${this.renderHistTabContent(activeTab, hist)}
          </div>
        </div>

      </div>
    `;
  }

  setHistTab(tab) {
    this.activeTab['historical'] = tab;
    this.navigateTo('20');
  }

  renderHistTabContent(tab, hist) {
    switch (tab) {
      case 'Summary':
        return `
          <div class="form-grid">
            <div class="form-group full-width">
              <div style="font-size:10px; color:var(--text-muted); font-weight:700;">FINAL OUTCOME</div>
              <div style="font-size:13px; font-weight:700; color:var(--status-green-text);">${hist.finalSummary.outcome}</div>
            </div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">CHECKLIST COMPLIANCE</div><div>${hist.finalSummary.checklistStatus}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">MEASUREMENTS RECORDED</div><div>${hist.finalSummary.measurementsCount} parameters</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">FINDINGS CONFIRMED</div><div>${hist.finalSummary.findingsCount}</div></div>
            <div><div style="font-size:10px; color:var(--text-muted); font-weight:700;">CAPA STATUS</div><div>${hist.finalSummary.capaCount} closed & verified</div></div>
          </div>
        `;
      case 'Measurements':
        return `
          <div class="table-responsive">
            <table class="strata-table">
              <thead><tr><th>Parameter</th><th>Recorded Telemetry</th><th>Statutory Limit</th><th>Result</th></tr></thead>
              <tbody>
                ${hist.finalSummary.measurements.map(m => `
                  <tr>
                    <td><strong>${m.param}</strong></td>
                    <td class="font-mono">${m.recorded}</td>
                    <td class="font-mono" style="font-size:11px;">${m.limit}</td>
                    <td><span class="badge badge-approved">${m.result}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      case 'Findings':
        return `
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${hist.finalSummary.findings.map(f => `
              <div style="background:var(--bg-surface-alt); border:1px solid var(--border-light); padding:10px 12px; border-radius:4px;">
                <div style="display:flex; justify-content:space-between;">
                  <strong class="font-mono" style="color:var(--purple-primary);">${f.id}</strong>
                  <span class="badge badge-approved">${f.status}</span>
                </div>
                <div style="font-size:11.5px; margin-top:2px;">${f.title}</div>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return `<div style="font-size:12px; color:var(--text-secondary);">Read-only immutable historical data for tab ${tab}.</div>`;
    }
  }

  openAmendmentModal(insId) {
    this.showModal('Request Statutory Correction / Amendment', `
      <p style="font-size:12.5px; margin-bottom:12px;">Under DGMS inspection rules, published final records (<strong>${insId}</strong>) cannot be directly modified. Submit an official amendment petition.</p>
      <div class="form-group">
        <label class="form-label required">Amendment Justification</label>
        <textarea class="form-control" placeholder="Explain the clerical or re-survey justification..."></textarea>
      </div>
    `, [
      { text: 'Cancel', class: 'btn-secondary', onclick: 'strata.closeModal()' },
      { text: 'Submit Amendment Petition', class: 'btn-primary', onclick: `strata.confirmAmendment('${insId}')` }
    ]);
  }

  confirmAmendment(insId) {
    this.closeModal();
    this.showToast(`Amendment petition for ${insId} logged for DGMS Zonal Review.`, 'success');
  }

  // ==========================================
  // SCREEN 21 — GLOBAL AUDIT / ACTIVITY
  // ==========================================
  renderScreen21() {
    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Audit & Activity</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('shield')}
              Inspection Governance Global Audit Log
            </h1>
            <p class="screen-subtitle">Complete, immutable traceability across all planning, scheduling, and governance actions. History cannot be deleted or overwritten.</p>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <input type="text" class="filter-input" placeholder="Search User, Action, Object ID..." style="min-width: 220px;">
          <select class="filter-select"><option>All Actions</option><option>Scheduled Inspection</option><option>Approved Plan</option><option>Approved Recommendation</option></select>
          <select class="filter-select"><option>Scope: All</option><option>Area 01 / Mine A2</option></select>
          <button class="btn btn-secondary btn-sm" style="margin-left:auto;">Filter</button>
        </div>

        <!-- Table -->
        <div class="enterprise-card">
          <div class="table-responsive">
            <table class="strata-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Object</th>
                  <th>Scope</th>
                  <th>Previous State</th>
                  <th>New State</th>
                  <th>Reason / Justification</th>
                </tr>
              </thead>
              <tbody>
                ${this.data.globalAudit.map(a => `
                  <tr>
                    <td class="font-mono timestamp">${a.timestamp}</td>
                    <td><strong>${a.user.split('(')[0]}</strong> <div style="font-size:10px; color:var(--text-muted);">${a.user.includes('(') ? a.user.split('(')[1].replace(')', '') : ''}</div></td>
                    <td>${a.action}</td>
                    <td><strong class="font-mono" style="color:var(--purple-primary);">${a.objectId}</strong></td>
                    <td style="font-size:11px;">${a.scope}</td>
                    <td><span class="badge badge-draft font-mono">${a.previousState}</span></td>
                    <td><span class="badge badge-approved font-mono">${a.newState}</span></td>
                    <td style="max-width: 240px; font-size: 11.5px;">${a.reason}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // SCREEN 22 — REUSABLE ENTERPRISE STATES SHOWCASE
  // ==========================================
  renderScreen22() {
    const states = [
      { id: 'state-empty-rec', name: '1. No Recommendations' },
      { id: 'state-empty-plans', name: '2. No Inspection Plans' },
      { id: 'state-empty-overdue', name: '3. No Overdue Inspections' },
      { id: 'state-perm-restricted', name: '4. Permission Restricted' },
      { id: 'state-scope-restricted', name: '5. Scope Restricted' },
      { id: 'state-loading', name: '6. Loading State (Skeleton)' },
      { id: 'state-error', name: '7. Error & Retry' },
      { id: 'state-conflict', name: '8. Concurrency Conflict' },
      { id: 'state-offline', name: '9. Offline Notice' }
    ];

    const activeState = this.activeEnterpriseState || 'state-empty-rec';

    return `
      <div class="content-container">
        <div class="breadcrumb-bar">
          <span class="crumb-link" onclick="strata.navigateTo('01')">Dashboard</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Enterprise States Showcase</span>
        </div>

        <div class="screen-header-row">
          <div class="screen-header-left">
            <h1 class="screen-title">
              ${this.getIconSvg('layers')}
              Reusable STRATA Enterprise States
            </h1>
            <p class="screen-subtitle">Consistent Indian government & enterprise visual language across edge, error, permission, and empty states.</p>
          </div>
        </div>

        <!-- State Selector Tabs -->
        <div class="tabs-nav">
          ${states.map(s => `
            <button class="tab-btn ${activeState === s.id ? 'active' : ''}" onclick="strata.setEnterpriseState('${s.id}')">${s.name}</button>
          `).join('')}
        </div>

        <!-- State Rendering Card -->
        <div class="enterprise-card">
          <div class="card-body">
            ${this.renderEnterpriseStateContent(activeState)}
          </div>
        </div>

      </div>
    `;
  }

  setEnterpriseState(stateId) {
    this.activeEnterpriseState = stateId;
    this.navigateTo('22');
  }

  renderEnterpriseStateContent(stateId) {
    switch (stateId) {
      case 'state-empty-rec':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-neutral">${this.getIconSvg('inbox')}</div>
            <h3 class="state-title">No Recommendations Requiring Planning</h3>
            <p class="state-description">All statutory obligations, triggers, and telemetry alerts for the authorized colliery scope have been evaluated or scheduled.</p>
            <button class="btn btn-secondary" onclick="strata.navigateTo('02')">View Intake Requests</button>
          </div>
        `;
      case 'state-empty-plans':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-neutral">${this.getIconSvg('file-text')}</div>
            <h3 class="state-title">No Inspection Plans Found</h3>
            <p class="state-description">No inspection plans found for the selected scope (CIL / ECL / Area 01 / Mine A2). You can generate a new plan from recommendations or manual triggers.</p>
            <button class="btn btn-primary" onclick="strata.navigateTo('07')">+ Create Inspection Plan</button>
          </div>
        `;
      case 'state-empty-overdue':
        return `
          <div class="state-container">
            <div class="state-icon-box" style="background:#E8F5E9; color:#1B5E20;">&check;</div>
            <h3 class="state-title">All Inspections Within Statutory Schedule</h3>
            <p class="state-description">Zero inspections are currently overdue across your authorized organizational scope.</p>
            <button class="btn btn-secondary" onclick="strata.navigateTo('09')">Open Planning Calendar</button>
          </div>
        `;
      case 'state-perm-restricted':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-danger">${this.getIconSvg('lock')}</div>
            <h3 class="state-title" style="color:var(--status-red-text);">Authorization Permission Restricted</h3>
            <p class="state-description">You do not have authorization to approve or delete this governance record. This action is restricted to the DGMS Statutory Liaison or General Manager (Safety).</p>
            <div class="state-meta-box">
              Required Permission: DGMS_STATUTORY_APPROVE<br>
              Current User Role: Authorized Inspection Manager
            </div>
            <button class="btn btn-secondary" onclick="strata.navigateTo('01')">Return to Dashboard</button>
          </div>
        `;
      case 'state-scope-restricted':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-warning">${this.getIconSvg('alert-triangle')}</div>
            <h3 class="state-title" style="color:var(--status-orange-text);">Outside Authorized Organizational Scope</h3>
            <p class="state-description">This inspection record belongs to BCCL Katras Area. Your active session is restricted to CIL / ECL / Area 01 (Sripur-Kenda).</p>
            <div class="state-meta-box">
              Target Scope: BCCL / Katras Area / Mine KT-1<br>
              Authorized Scope: ECL / Area 01 / Mine A2
            </div>
            <button class="btn btn-secondary" onclick="strata.navigateTo('01')">Switch to My Scope</button>
          </div>
        `;
      case 'state-loading':
        return `
          <div class="table-responsive">
            <table class="strata-table">
              <thead><tr><th>ID</th><th>Type</th><th>Mine</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                ${Array.from({ length: 4 }).map(() => `
                  <tr class="skeleton-row">
                    <td><div class="skeleton-box" style="width: 90px;"></div></td>
                    <td><div class="skeleton-box" style="width: 180px;"></div></td>
                    <td><div class="skeleton-box" style="width: 120px;"></div></td>
                    <td><div class="skeleton-box" style="width: 80px;"></div></td>
                    <td><div class="skeleton-box" style="width: 60px;"></div></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      case 'state-error':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-danger">&times;</div>
            <h3 class="state-title" style="color:var(--status-red-text);">Inspection Governance Data Could Not Be Loaded</h3>
            <p class="state-description">Communication with the central CIL Safety Gateway timed out. Ensure intranet connectivity or retry.</p>
            <button class="btn btn-primary" onclick="strata.showToast('Retrying central data sync...', 'success')">Retry Connection</button>
          </div>
        `;
      case 'state-conflict':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-warning">${this.getIconSvg('alert-circle')}</div>
            <h3 class="state-title" style="color:var(--status-orange-text);">Concurrent Modification Detected</h3>
            <p class="state-description">Another authorized planner (A. Sengupta) modified this inspection plan at 10:48 IST while your draft was open.</p>
            <button class="btn btn-primary" onclick="strata.showToast('Fetching latest version changes...', 'success')">View Latest Changes</button>
          </div>
        `;
      case 'state-offline':
        return `
          <div class="state-container">
            <div class="state-icon-box state-icon-neutral">${this.getIconSvg('wifi-off')}</div>
            <h3 class="state-title">Intranet Connectivity Unavailable</h3>
            <p class="state-description">Connection unavailable. Planning changes will be cached locally and cannot be submitted until statutory connectivity is restored.</p>
            <button class="btn btn-secondary" onclick="strata.showToast('Checking connection...', 'success')">Test Link</button>
          </div>
        `;
      default:
        return '';
    }
  }

  // ==========================================
  // Modal & Drawer & Toast Helpers
  // ==========================================
  showModal(title, bodyHtml, buttons = []) {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');

    if (!modalBackdrop) return;

    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    modalFooter.innerHTML = buttons.map(b => `
      <button class="btn ${b.class || 'btn-secondary'}" onclick="${b.onclick}">${b.text}</button>
    `).join('');

    modalBackdrop.classList.add('active');
  }

  closeModal() {
    const modalBackdrop = document.getElementById('global-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  }

  openDrawer(title, bodyHtml) {
    const drawer = document.getElementById('global-drawer');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerBody = document.getElementById('drawer-body');

    if (!drawer) return;

    drawerTitle.textContent = title;
    drawerBody.innerHTML = bodyHtml;
    drawer.classList.add('active');
  }

  closeDrawer() {
    const drawer = document.getElementById('global-drawer');
    if (drawer) drawer.classList.remove('active');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '&check;' : type === 'error' ? '&times;' : '&bull;'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  openQuickNavigator() {
    const screens = [
      { id: '01', name: 'Dashboard' },
      { id: '02', name: 'Inspection Intake' },
      { id: '03A', name: 'Create Intake Request' },
      { id: '03B', name: 'Intake Request Detail' },
      { id: '04', name: 'Recommendations Queue' },
      { id: '05', name: 'Recommendation Detail' },
      { id: '06', name: 'Inspection Plans List' },
      { id: '07', name: 'Create Inspection Plan (8-Steps)' },
      { id: '08', name: 'Inspection Plan Detail' },
      { id: '09', name: 'Planning Calendar' },
      { id: '10', name: 'Schedule Inspection' },
      { id: '11', name: 'Scheduling Conflict Screen' },
      { id: '12', name: 'Overdue Inspections' },
      { id: '13', name: 'Plan Audit & Activity' },
      { id: '14', name: 'Central Inspection Hub' },
      { id: '15', name: 'Active Field Monitoring' },
      { id: '16', name: 'Findings Monitoring' },
      { id: '17', name: 'CAPA Monitoring' },
      { id: '18', name: 'Report Status' },
      { id: '19', name: 'Inspection History' },
      { id: '20', name: 'Historical Detail (Final)' },
      { id: '21', name: 'Global Audit Log' },
      { id: '22', name: '9 Enterprise States' }
    ];

    this.showModal('Jump to STRATA Screen (01 — 22)', `
      <div class="quick-nav-grid">
        ${screens.map(s => `
          <div class="quick-nav-card" onclick="strata.closeModal(); strata.navigateTo('${s.id}')">
            <span class="quick-nav-code">SCREEN ${s.id}</span>
            <span class="quick-nav-name">${s.name}</span>
          </div>
        `).join('')}
      </div>
    `, [
      { text: 'Close', class: 'btn-secondary', onclick: 'strata.closeModal()' }
    ]);
  }

  bindGlobalEvents() {
    // Keyboard shortcut for Quick Screen Navigator (Ctrl+K or /)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openQuickNavigator();
      }
    });
  }

  getIconSvg(name) {
    const icons = {
      'grid': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      'inbox': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
      'sparkle': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
      'file-text': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      'calendar': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      'clock': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      'activity': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      'alert-triangle': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      'alert-circle': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      'eye': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      'check-square': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      'file-check': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>',
      'archive': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
      'shield': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'layers': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      'plus': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      'upload': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
      'user-check': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
      'bell': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
      'info': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      'lock': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      'wifi-off': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>'
    };
    return icons[name] || '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>';
  }
}

// Instantiate on window load
window.addEventListener('DOMContentLoaded', () => {
  window.strata = new StrataApp();
});
