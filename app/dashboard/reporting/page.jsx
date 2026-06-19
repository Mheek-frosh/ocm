'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Send, Eye, Calendar, BarChart3,
  PieChart, TrendingUp, CheckCircle2, Clock, Filter, X,
  AlertTriangle
} from 'lucide-react';
import styles from './reporting.module.css';

const reportTemplates = [
  { id: 'RPT-001', name: 'Monthly Executive Summary', type: 'Executive', freq: 'Monthly', lastRun: 'Jun 15, 2026', status: 'READY', pages: 24 },
  { id: 'RPT-002', name: 'Financial Variance Analysis', type: 'Finance', freq: 'Monthly', lastRun: 'Jun 14, 2026', status: 'READY', pages: 38 },
  { id: 'RPT-003', name: 'Safety Incident Register', type: 'HSE', freq: 'Weekly', lastRun: 'Jun 13, 2026', status: 'READY', pages: 12 },
  { id: 'RPT-004', name: 'Progress Photolog', type: 'Documentation', freq: 'Bi-weekly', lastRun: 'Jun 10, 2026', status: 'DRAFT', pages: 56 },
  { id: 'RPT-005', name: 'Resource Utilization Report', type: 'Operations', freq: 'Weekly', lastRun: 'Jun 18, 2026', status: 'READY', pages: 18 },
  { id: 'RPT-006', name: 'Subcontractor Performance Scorecard', type: 'Commercial', freq: 'Quarterly', lastRun: 'Jun 01, 2026', status: 'READY', pages: 31 },
  { id: 'RPT-007', name: 'Quality Assurance Audit', type: 'Quality', freq: 'Monthly', lastRun: 'Jun 12, 2026', status: 'REVIEW', pages: 22 },
];

const recentRuns = [
  { id: 'RR-221', name: 'Q2 Financial Variance', runBy: 'Sarah Jenkins', date: 'Jun 15, 2026 09:42', dist: 'Board + Finance', status: 'SENT' },
  { id: 'RR-220', name: 'Week 24 Safety Register', runBy: 'Marcus Vance', date: 'Jun 14, 2026 16:20', dist: 'HSE Team', status: 'SENT' },
  { id: 'RR-219', name: 'Weekly Resource Utilization', runBy: 'Evelyn Sterling', date: 'Jun 13, 2026 11:05', dist: 'PM Dashboard', status: 'DRAFT' },
  { id: 'RR-218', name: 'Subcontractor Scorecard Q2', runBy: 'David Kincaid', date: 'Jun 10, 2026 14:30', dist: 'Procurement', status: 'SENT' },
];

const reportTypeIcons = { Executive: '📊', Finance: '💰', HSE: '🦺', Documentation: '📷', Operations: '⚙️', Commercial: '🤝', Quality: '✅' };

function StatusBadge({ status }) {
  const cls = status === 'READY' || status === 'SENT'
    ? styles.badgeReady
    : status === 'DRAFT'
      ? styles.badgeDraft
      : styles.badgeReview;
  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
}

export default function ReportingPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const animatedReports = Array.isArray(() => 7) ? 7 : 7;
  const scheduledCount = reportTemplates.filter(r => r.freq === 'Monthly').length;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Project Reporting Suite</span>
          <h1 className={styles.title}>Automated<br />Report Studio</h1>
          <p className={styles.subTitleText}>
            Configure, generate, and distribute standardized reports across executive, financial, and operational stakeholders with full audit trail.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <Calendar size={14} />
            <span>SCHEDULE</span>
          </button>
          <button className={styles.btnPrimary}>
            <Send size={14} />
            <span>DISTRIBUTE NOW</span>
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <motion.div className={`${styles.statCard} ${styles.statCardGlow}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Active Report Templates</span>
            <FileText size={14} style={{ color: 'var(--blue)' }} />
          </div>
          <div className={styles.statValue}>{reportTemplates.length}</div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Scheduled This Month</span>
            <Clock size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className={styles.statValue}>14</div>
          <div className={styles.statSub}><span style={{ color: 'var(--green)' }}>● All on track</span></div>
        </motion.div>

        <motion.div className={`${styles.statCard} ${styles.statCardGlowOrange}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.19 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Pending Review</span>
            <AlertTriangle size={14} style={{ color: 'var(--orange)' }} />
          </div>
          <div className={`${styles.statValue} ${styles.statValueOrange}`}>2</div>
          <div className={styles.statSub}><span style={{ color: 'var(--orange)' }}>Awaiting approval</span></div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Recipients Reached</span>
            <Send size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className={styles.statValue}>1,248</div>
          <div className={styles.statSub}><span style={{ color: 'var(--green)' }}>↑ 12% this month</span></div>
        </motion.div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <motion.div className={styles.reportsBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Report Templates</h2>
              <div className={styles.headerRight}>
                <button className={styles.filterBtn}><Filter size={14} /><span>Filter</span></button>
              </div>
            </div>
            <div className={styles.reportTable}>
              <div className={styles.tableHeader}>
                <span className={styles.th}>Type</span>
                <span className={`${styles.th} ${styles.thWide}`}>Report Name</span>
                <span className={styles.th}>Frequency</span>
                <span className={styles.th}>Status</span>
                <span className={styles.th}>Pages</span>
                <span className={`${styles.th} ${styles.thAction}`}></span>
              </div>
              {reportTemplates.map((rpt, idx) => (
                <motion.div
                  key={rpt.id}
                  className={`${styles.tableRow} ${selectedReport === rpt.id ? styles.rowActive : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 + 0.35 }}
                  onClick={() => setSelectedReport(rpt.id)}
                >
                  <span className={styles.td}><span className={styles.typeIcon}>{reportTypeIcons[rpt.type] || '📄'}</span></span>
                  <span className={`${styles.td} ${styles.tdWide}`}>
                    <span className={styles.rptName}>{rpt.name}</span>
                    <span className={styles.rptId}>{rpt.id}</span>
                  </span>
                  <span className={styles.td}>{rpt.freq}</span>
                  <span className={styles.td}><StatusBadge status={rpt.status} /></span>
                  <span className={styles.td}>{rpt.pages}</span>
                  <span className={`${styles.td} ${styles.tdAction}`}>
                    <button className={styles.actionBtn} title="View"><Eye size={13} /></button>
                    <button className={styles.actionBtn} title="Download"><Download size={13} /></button>
                  </span>
                </motion.div>
              ))}
            </div>
            <div className={styles.chartFooter}>
              Showing {reportTemplates.length} of {reportTemplates.length} templates
            </div>
          </motion.div>
        </div>

        <div className={styles.rightCol}>
          <motion.div className={styles.historyBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Recent Distribution</h2>
              <span className={styles.historySub}>Last 7 runs</span>
            </div>
            <div className={styles.historyList}>
              {recentRuns.map((run, idx) => (
                <motion.div key={run.id} className={styles.historyRow} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 + 0.5 }}>
                  <div className={styles.historyTop}>
                    <span className={styles.historyName}>{run.name}</span>
                    <StatusBadge status={run.status} />
                  </div>
                  <div className={styles.historyMeta}>
                    <span>{run.runBy}</span>
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    <span style={{ color: 'var(--text-muted)' }}>{run.date}</span>
                  </div>
                  <div className={styles.historyDist}>
                    <Send size={11} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{run.dist}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={styles.chartFooter}>
              <CheckCircle2 size={11} style={{ marginRight: 6, color: 'var(--green)' }} />
              All distributions logged for audit compliance
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
