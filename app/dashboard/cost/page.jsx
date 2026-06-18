'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Download, ArrowUpRight, AlertTriangle, CheckCircle,
  X, Filter, ChevronRight, HelpCircle
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import styles from './cost.module.css';

// Chart mock data matching the guide image (rising curve)
const chartData = [
  { month: 'Jan', Estimate: 10, Actual: 8 },
  { month: 'Feb', Estimate: 22, Actual: 15 },
  { month: 'Mar', Estimate: 45, Actual: 38 },
  { month: 'Apr', Estimate: 70, Actual: 58 },
  { month: 'May', Estimate: 105, Actual: 92 },
  { month: 'Jun', Estimate: 135, Actual: 132 },
];

const initialRiskFlags = [
  {
    id: 'CC-4092',
    level: 'CRITICAL',
    desc: 'Subcontractor delay claim (Structural Steel). Pending review.',
    exposure: '$1.2M',
    status: 'Pending',
    details: 'Steel erection subcontractor experienced an 18-day erection cycle delay on Pods A & B. Claim covers standby equipment costs and labor overhead escalation. Current baseline assessment is ongoing.',
  },
  {
    id: 'CC-8810',
    level: 'WATCHLIST',
    desc: 'Material escalation on copper wiring exceeding baselines.',
    exposure: '$450K',
    status: 'Reviewing',
    details: 'Global spot copper price surge of +18% has impacted procurement rates for phase 3 electrical fitout. Recommend reviewing alternate supply chains or leveraging hedging contracts.',
  },
  {
    id: 'CC-1104',
    level: 'RESOLVED',
    desc: 'Concrete pour schedule variation approved.',
    exposure: '$300K',
    status: 'Approved',
    details: 'Weekend shift acceleration approved to mitigate foundation delay. Direct labor variance of $45K absorbed; project schedule recovered by 6 working days.',
  },
];

// Helper hook for counting animation
import { useEffect } from 'react';
function useCount(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const isNeg = target < 0;
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

  return target < 0 ? -val : val;
}

function CustomChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
            ${p.value}M
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CostControlPage() {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [riskFlags, setRiskFlags] = useState(initialRiskFlags);

  // Animated counters
  const animatedTCV = useCount(142.5);
  const animatedRisk = useCount(-4.2);
  const animatedCont = useCount(8.1);

  function handleAction(riskId, action) {
    if (action === 'resolve') {
      setRiskFlags(prev =>
        prev.map(r => r.id === riskId ? { ...r, level: 'RESOLVED', status: 'Approved' } : r)
      );
    } else if (action === 'escalate') {
      alert(`Escalated flag ${riskId} to executive committee.`);
    }
    setSelectedRisk(null);
  }

  return (
    <div className={styles.wrap}>
      {/* Header with Breadcrumb and Actions */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Project Delta-9</span>
          <h1 className={styles.title}>Cost Control &amp;<br />Margin Protection</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <Download size={14} />
            <span>EXPORT REPORT</span>
          </button>
          <button className={styles.btnPrimary}>
            <span>APPROVE VARIATIONS</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className={styles.statsGrid}>
        {/* TCV */}
        <motion.div
          className={`${styles.statCard} ${styles.statCardGlowBlue}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Total Contract Value (TCV)</span>
            <HelpCircle size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className={styles.statValue}>
            ${animatedTCV.toFixed(1)}M
          </div>
        </motion.div>

        {/* MARGIN RISK */}
        <motion.div
          className={`${styles.statCard} ${styles.statCardGlowOrange}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Margin Exposure Risk</span>
            <span className={`${styles.statBadge} ${styles.badgeHigh}`}>High</span>
          </div>
          <div className={`${styles.statValue} ${styles.statValueOrange}`}>
            -${Math.abs(animatedRisk).toFixed(1)}M
          </div>
        </motion.div>

        {/* CONTINGENCY */}
        <motion.div
          className={styles.statCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.19 }}
        >
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Contingency Remaining</span>
          </div>
          <div>
            <div className={styles.statValue}>
              ${animatedCont.toFixed(1)}M
            </div>
            <div className={styles.progressWrap}>
              <div className={styles.progressBarTrack}>
                <motion.div
                  className={styles.progressBarFill}
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <span className={styles.progressLabel}>45% of original</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className={styles.mainGrid}>
        {/* Left Column: Line Chart */}
        <div className={styles.leftCol}>
          <motion.div
            className={styles.chartBlock}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}>Estimate vs. Actual (YTD)</h2>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotDashed} />
                  <span>ESTIMATE</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: '#0087FF' }} />
                  <span>ACTUAL</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.6)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    unit="M"
                  />
                  <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                  
                  {/* Estimate: Slate dashed line */}
                  <Line
                    type="monotone"
                    dataKey="Estimate"
                    stroke="#475569"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    name="Estimate"
                    dot={false}
                    activeDot={false}
                  />

                  {/* Actual: Electric Blue line */}
                  <Line
                    type="monotone"
                    dataKey="Actual"
                    stroke="#0087FF"
                    strokeWidth={3}
                    name="Actual"
                    dot={{ fill: '#0087FF', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#0087FF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartFooter}>
              Cost-to-Complete Forecast (Level 2)
            </div>
          </motion.div>
        </div>

        {/* Right Column: Risk Flags */}
        <div className={styles.rightCol}>
          <motion.div
            className={styles.riskBlock}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.riskHeader}>
              <h2 className={styles.riskTitle}>Commercial Risk Flags</h2>
              <button className={styles.filterBtn} title="Filter risks">
                <Filter size={14} />
              </button>
            </div>

            <div className={styles.riskList}>
              {riskFlags.map((risk, idx) => {
                const isCritical = risk.level === 'CRITICAL';
                const isWatch = risk.level === 'WATCHLIST';
                const isResolved = risk.level === 'RESOLVED';

                return (
                  <motion.div
                    key={risk.id}
                    className={`${styles.riskCard} ${
                      isCritical ? styles.riskCardCritical : isWatch ? styles.riskCardWatchlist : styles.riskCardResolved
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.35 }}
                  >
                    <div className={styles.riskCardHeader}>
                      <span className={`${styles.riskStatus} ${
                        isCritical ? styles.criticalText : isWatch ? styles.watchlistText : styles.resolvedText
                      }`}>
                        {risk.level}
                      </span>
                      <span className={styles.riskCode}>{risk.id}</span>
                    </div>

                    <p className={styles.riskBody}>{risk.desc}</p>

                    <div className={styles.riskFooter}>
                      <span className={styles.exposureLabel}>
                        Exp: <span className={styles.exposureVal}>{risk.exposure}</span>
                      </span>
                      {!isResolved && (
                        <button
                          className={styles.reviewLink}
                          onClick={() => setSelectedRisk(risk)}
                        >
                          REVIEW
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Review Dialog/Modal overlay */}
      <AnimatePresence>
        {selectedRisk && (
          <motion.div
            className={styles.detailModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <button
                className={styles.modalClose}
                onClick={() => setSelectedRisk(null)}
              >
                <X size={18} />
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalSubtitle}>Risk Analysis — {selectedRisk.id}</span>
                <h3 className={styles.modalTitle}>{selectedRisk.level} FLAG</h3>
              </div>

              <div className={styles.modalBody}>
                <p>{selectedRisk.details}</p>

                <div className={styles.modalRow}>
                  <span className={styles.modalRowLabel}>Financial Exposure:</span>
                  <span className={styles.modalRowValue}>{selectedRisk.exposure}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalRowLabel}>Current Status:</span>
                  <span className={styles.modalRowValue}>{selectedRisk.status}</span>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.btnOutline}
                  onClick={() => handleAction(selectedRisk.id, 'escalate')}
                >
                  ESCALATE
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => handleAction(selectedRisk.id, 'resolve')}
                >
                  RESOLVE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
