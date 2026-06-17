'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, Download, Search, Filter, Phone, Mail,
  Calendar, DollarSign, Briefcase, FileText, X, ChevronRight, CheckCircle
} from 'lucide-react';
import styles from './clients.module.css';

const initialClients = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    company: 'Apex Holdings LLC',
    initials: 'AH',
    colorGrad: 'linear-gradient(135deg, #0087FF 0%, #002244 100%)',
    activeProjects: 4,
    contractValue: '$180.0M',
    totalFulfillment: '68%',
    lastTouchpoint: 'Yesterday',
    health: 'ON TRACK',
    email: 's.jenkins@apexholdings.com',
    phone: '+1 (555) 234-5678',
    projects: [
      { name: 'Apex Tech Tower Phase 1', status: 'ON TRACK', progress: 85 },
      { name: 'Apex Tech Tower Phase 2', status: 'ON TRACK', progress: 40 },
      { name: 'Apex Logistics Hub', status: 'ON TRACK', progress: 95 },
      { name: 'Apex Residential West', status: 'ON TRACK', progress: 52 },
    ],
    finance: { billed: '$122.4M', pending: '$57.6M' }
  },
  {
    id: 'c2',
    name: 'Marcus Vance',
    company: 'Vista Developments',
    initials: 'VD',
    colorGrad: 'linear-gradient(135deg, #FF6B35 0%, #441a00 100%)',
    activeProjects: 2,
    contractValue: '$94.5M',
    totalFulfillment: '42%',
    lastTouchpoint: '3 days ago',
    health: 'AT RISK',
    email: 'm.vance@vistadev.io',
    phone: '+1 (555) 987-6543',
    projects: [
      { name: 'Vista Condominiums Pod A', status: 'AT RISK', progress: 55 },
      { name: 'Vista Commercial Park', status: 'ON TRACK', progress: 30 },
    ],
    finance: { billed: '$39.7M', pending: '$54.8M' }
  },
  {
    id: 'c3',
    name: 'Evelyn Sterling',
    company: 'Skyline Partners',
    initials: 'SP',
    colorGrad: 'linear-gradient(135deg, #ef4444 0%, #440000 100%)',
    activeProjects: 1,
    contractValue: '$120.0M',
    totalFulfillment: '90%',
    lastTouchpoint: '2 hours ago',
    health: 'CRITICAL',
    email: 'evelyn@skylinepartners.com',
    phone: '+1 (555) 345-6789',
    projects: [
      { name: 'Skyline Plaza (Structural Steel)', status: 'CRITICAL', progress: 90 },
    ],
    finance: { billed: '$108.0M', pending: '$12.0M' }
  },
  {
    id: 'c4',
    name: 'David Kincaid',
    company: 'Vertex Group',
    initials: 'VG',
    colorGrad: 'linear-gradient(135deg, #0087FF 0%, #002244 100%)',
    activeProjects: 3,
    contractValue: '$210.0M',
    totalFulfillment: '75%',
    lastTouchpoint: 'May 28',
    health: 'ON TRACK',
    email: 'd.kincaid@vertexgroup.net',
    phone: '+1 (555) 876-5432',
    projects: [
      { name: 'Vertex Corporate Campus', status: 'ON TRACK', progress: 80 },
      { name: 'Vertex Data Center', status: 'ON TRACK', progress: 90 },
      { name: 'Vertex Substation Beta', status: 'ON TRACK', progress: 55 },
    ],
    finance: { billed: '$157.5M', pending: '$52.5M' }
  },
];

// Helper hook for counting animation
import { useEffect } from 'react';
function useCount(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const absTarget = Math.abs(target);
    const hasDecimal = String(target).includes('.');

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * absTarget;
      
      setVal(hasDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(absTarget);
    }
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

export default function ClientsPage() {
  const [searchVal, setSearchVal] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedClient, setSelectedClient] = useState(null);

  // Animated numbers
  const animatedActive = useCount(18);
  const animatedRevenue = useCount(854.2);
  const animatedHealth = useCount(94);

  // Filter clients based on tab and search query
  const filteredClients = initialClients.filter(c => {
    const matchesTab = activeTab === 'ALL' || c.health === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          c.company.toLowerCase().includes(searchVal.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Partners &amp; Accounts</span>
          <h1 className={styles.title}>Client Portfolio &amp;<br />Health Matrix</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <Download size={14} />
            <span>EXPORT CSV</span>
          </button>
          <button className={styles.btnPrimary}>
            <Plus size={14} />
            <span>ADD CLIENT</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.statsGrid}>
        {/* Active Clients */}
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <span className={styles.statLabel}>Active Accounts</span>
          <div>
            <div className={styles.statValue}>{animatedActive}</div>
            <div className={`${styles.statSub} ${styles.subGreen}`}>+2 onboarding</div>
          </div>
        </motion.div>

        {/* Contract Pipeline */}
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <span className={styles.statLabel}>Total Account Pipeline</span>
          <div>
            <div className={styles.statValue}>${animatedRevenue.toFixed(1)}M</div>
            <div className={`${styles.statSub} ${styles.subGreen}`}>+8.4% growth YoY</div>
          </div>
        </motion.div>

        {/* Portfolio Health Index */}
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.19 }}
        >
          <span className={styles.statLabel}>Portfolio Health Index</span>
          <div>
            <div className={styles.statValue}>{animatedHealth}%</div>
            <div className={`${styles.statSub} ${styles.subBlue}`}>Excellent Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Search & Quick Filters Bar */}
      <div className={styles.filterBar}>
        <div className={`${styles.searchBox} ${searchFocused ? styles.searchBoxFocused : ''}`}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search accounts or companies..."
            className={styles.searchInput}
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <div className={styles.filterTabs}>
          {['ALL', 'ON TRACK', 'AT RISK', 'CRITICAL'].map(tab => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Grid */}
      <div className={styles.clientsGrid}>
        {filteredClients.map((client, idx) => {
          const healthStyle = client.health === 'ON TRACK' 
            ? 'badge-on-track' 
            : client.health === 'AT RISK' 
              ? 'badge-at-risk' 
              : 'badge-critical';

          const progressColor = client.health === 'ON TRACK'
            ? 'var(--blue)'
            : client.health === 'AT RISK'
              ? 'var(--orange)'
              : 'var(--red)';

          return (
            <motion.div
              key={client.id}
              className={styles.clientCard}
              onClick={() => setSelectedClient(client)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08 + 0.25 }}
            >
              <div className={styles.clientCardHeader}>
                <div className={styles.avatar} style={{ background: client.colorGrad }}>
                  {client.initials}
                </div>
                <div className={styles.nameCol}>
                  <h3 className={styles.clientName}>{client.name}</h3>
                  <span className={styles.clientCompany}>{client.company}</span>
                </div>
              </div>

              <div className={styles.metricsRow}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Projects</span>
                  <span className={styles.metricValue}>{client.activeProjects} Active</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>TCV</span>
                  <span className={styles.metricValue}>{client.contractValue}</span>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span>Fulfillment</span>
                  <span>{client.totalFulfillment}</span>
                </div>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    style={{ background: progressColor }}
                    initial={{ width: 0 }}
                    animate={{ width: client.totalFulfillment }}
                    transition={{ duration: 1.0, ease: 'easeOut', delay: idx * 0.08 + 0.4 }}
                  />
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className={`healthBadge ${healthStyle}`}>
                  {client.health}
                </span>
                <button className={styles.manageBtn}>
                  <span>Manage Account</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Details Drawer */}
      <AnimatePresence>
        {selectedClient && (
          <>
            <motion.div
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.drawerProfile}>
                  <div className={styles.drawerAvatar} style={{ background: selectedClient.colorGrad }}>
                    {selectedClient.initials}
                  </div>
                  <div className={styles.drawerNameArea}>
                    <h2 className={styles.drawerName}>{selectedClient.name}</h2>
                    <span className={styles.drawerCompany}>{selectedClient.company}</span>
                  </div>
                </div>
                <button
                  className={styles.drawerClose}
                  onClick={() => setSelectedClient(null)}
                >
                  <X size={15} />
                </button>
              </div>

              <div className={styles.drawerScroll}>
                {/* Contact info */}
                <div>
                  <h4 className={styles.sectionTitle}>Contact &amp; Key Details</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Email</span>
                      <a href={`mailto:${selectedClient.email}`} className={styles.infoValue}>{selectedClient.email}</a>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Phone</span>
                      <a href={`tel:${selectedClient.phone}`} className={styles.infoValue}>{selectedClient.phone}</a>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Last touchpoint</span>
                      <span className={styles.infoValue}>{selectedClient.lastTouchpoint}</span>
                    </div>
                  </div>
                </div>

                {/* Financial breakdown */}
                <div>
                  <h4 className={styles.sectionTitle}>Financial Breakdown</h4>
                  <div className={styles.financeGrid}>
                    <div className={styles.financeCard}>
                      <span className={styles.financeLabel}>Billed (YTD)</span>
                      <div className={styles.financeValue}>{selectedClient.finance.billed}</div>
                    </div>
                    <div className={styles.financeCard}>
                      <span className={styles.financeLabel}>Remaining Contract</span>
                      <div className={styles.financeValue}>{selectedClient.finance.pending}</div>
                    </div>
                  </div>
                </div>

                {/* Active Projects checklist */}
                <div>
                  <h4 className={styles.sectionTitle}>Active Projects</h4>
                  <div className={styles.projectList}>
                    {selectedClient.projects.map((proj, pIdx) => {
                      const projHealthClass = proj.status === 'ON TRACK'
                        ? 'badge-on-track'
                        : proj.status === 'AT RISK'
                          ? 'badge-at-risk'
                          : 'badge-critical';

                      const barColor = proj.status === 'ON TRACK'
                        ? 'var(--blue)'
                        : proj.status === 'AT RISK'
                          ? 'var(--orange)'
                          : 'var(--red)';

                      return (
                        <div key={pIdx} className={styles.projectItem}>
                          <div className={styles.projectTitleRow}>
                            <span className={styles.projectTitle}>{proj.name}</span>
                            <span className={`projectStatus ${projHealthClass}`}>{proj.status}</span>
                          </div>
                          
                          <div className={styles.progressSection}>
                            <div className={styles.progressHeader}>
                              <span>Completion</span>
                              <span>{proj.progress}%</span>
                            </div>
                            <div className={styles.progressBar}>
                              <motion.div
                                className={styles.progressFill}
                                style={{ background: barColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${proj.progress}%` }}
                                transition={{ duration: 0.8, delay: pIdx * 0.05 + 0.2 }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.drawerActions}>
                <button
                  className={styles.btnOutline}
                  onClick={() => alert(`Emailing ${selectedClient.name}...`)}
                >
                  <Mail size={14} />
                  <span>Send Email</span>
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => alert('Editing full client settings...')}
                >
                  <span>Edit Account</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
