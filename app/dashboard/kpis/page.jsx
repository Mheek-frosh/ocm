'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, Download, ArrowUpRight, Target, TrendingUp,
  AlertTriangle, RefreshCw, X
} from 'lucide-react';
import {
  AreaChart, Area, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import styles from './kpis.module.css';

const kpiCategories = [
  { name: 'Schedule', current: 82, target: 95 },
  { name: 'Budget', current: 91, target: 95 },
  { name: 'Quality', current: 88, target: 92 },
  { name: 'Safety', current: 97, target: 98 },
  { name: 'Delivery', current: 78, target: 90 },
  { name: 'Sustainability', current: 85, target: 88 },
];

const kpiTrends = [
  { month: 'Jan', Score: 82, Target: 95 },
  { month: 'Feb', Score: 84, Target: 95 },
  { month: 'Mar', Score: 83, Target: 95 },
  { month: 'Apr', Score: 87, Target: 95 },
  { month: 'May', Score: 88, Target: 95 },
  { month: 'Jun', Score: 89, Target: 95 },
];

const drilldownData = [
  { id: 'KPI-101', category: 'Schedule', metric: 'Critical Path Float', value: '12 days', status: 'WARNING', trend: '-3d' },
  { id: 'KPI-102', category: 'Budget', metric: 'Earned Value Index', value: '1.04', status: 'ON TRACK', trend: '+0.02' },
  { id: 'KPI-103', category: 'Quality', metric: 'First-Pass Yield', value: '94.2%', status: 'ON TRACK', trend: '+1.1%' },
  { id: 'KPI-104', category: 'Safety', metric: 'TRIR (Annual)', value: '0.8', status: 'EXCELLENT', trend: '-0.2' },
  { id: 'KPI-105', category: 'Delivery', metric: 'On-Time Milestones', value: '68%', status: 'AT RISK', trend: '-5%' },
  { id: 'KPI-106', category: 'Sustainability', metric: 'Waste Diversion', value: '76%', status: 'ON TRACK', trend: '+4%' },
];

function useCount(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const absTarget = Math.abs(target);
    const hasDecimal = String(target).includes('.');
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = e * absTarget;
      setVal(hasDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      if (p < 1) requestAnimationFrame(step);
      else setVal(absTarget);
    }
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return target < 0 ? -val : val;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.value}{p.name === 'Score' || p.name === 'Target' ? '%' : ''}</span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === 'ON TRACK' || status === 'EXCELLENT'
    ? styles.badgeOnTrack
    : status === 'AT RISK' || status === 'WARNING'
      ? styles.badgeAtRisk
      : styles.badgeCritical;
  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
}

export default function KPIsPage() {
  const [selectedKPI, setSelectedKPI] = useState(null);
  const animatedScore = useCount(86.4);
  const activeCount = useCount(24);
  const atRiskCount = useCount(3);
  const trendCount = useCount(12);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Project Delta-9</span>
          <h1 className={styles.title}>Key Performance<br />Indicators</h1>
          <p className={styles.subTitleText}>
            Real-time performance scorecard tracking delivery, financial health, quality, and safety metrics against baseline targets.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <Download size={14} />
            <span>EXPORT SCORECARD</span>
          </button>
          <button className={styles.btnPrimary}>
            <ArrowUpRight size={14} />
            <span>SET TARGETS</span>
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <motion.div className={`${styles.statCard} ${styles.statCardGlow}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Overall KPI Score</span>
            <Target size={14} style={{ color: 'var(--blue)' }} />
          </div>
          <div className={styles.statValue}>{animatedScore}%</div>
          <div className={styles.statSub}>
            <span style={{ color: 'var(--green)' }}>↑ 2.4%</span>
            <span style={{ color: 'var(--text-muted)' }}> vs last quarter</span>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Active KPIs Tracked</span>
            <BarChart3 size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className={styles.statValue}>{activeCount}</div>
          <div className={styles.statSub}>
            <span style={{ color: 'var(--text-secondary)' }}>Across 6 categories</span>
          </div>
        </motion.div>

        <motion.div className={`${styles.statCard} ${styles.statCardGlowOrange}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.19 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>At-Risk KPIs</span>
            <AlertTriangle size={14} style={{ color: 'var(--orange)' }} />
          </div>
          <div className={`${styles.statValue} ${styles.statValueOrange}`}>{atRiskCount}</div>
          <div className={styles.statSub}>
            <span style={{ color: 'var(--orange)' }}>Requires intervention</span>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Trending Up</span>
            <TrendingUp size={14} style={{ color: 'var(--green)' }} />
          </div>
          <div className={`${styles.statValue} ${styles.statValueGreen}`}>{trendCount}</div>
          <div className={styles.statSub}>
            <span style={{ color: 'var(--green)' }}>Improving month-over-month</span>
          </div>
        </motion.div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <motion.div className={styles.chartBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleArea}>
                <h2 className={styles.chartTitle}>Performance Scorecard Trend</h2>
                <span className={styles.chartSubtitle}>Rolling 6-month overview · ERP integration</span>
              </div>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: 'var(--blue)' }} />
                  <span>SCORE</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotDashed} />
                  <span>TARGET</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiTrends} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0A84FF" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.6)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" domain={[70, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                  <Area type="monotone" dataKey="Score" stroke="#0A84FF" strokeWidth={3} fill="url(#scoreGrad)" name="Score" dot={{ fill: '#0A84FF', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#0A84FF' }} />
                  <Line type="monotone" dataKey="Target" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" name="Target" dot={false} activeDot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className={styles.chartBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleArea}>
                <h2 className={styles.chartTitle}>Category Breakdown</h2>
                <span className={styles.chartSubtitle}>Current achievement vs. strategic target</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiCategories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.5)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" domain={[60, 100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="current" fill="#0A84FF" radius={[4, 4, 0, 0]} name="Current" maxBarSize={56} />
                  <Bar dataKey="target" fill="rgba(100,116,139,0.35)" radius={[4, 4, 0, 0]} name="Target" maxBarSize={56} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className={styles.rightCol}>
          <motion.div className={styles.kpiDetailBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className={styles.kpiDetailHeader}>
              <h2 className={styles.kpiDetailTitle}>KPI Drilldown</h2>
              <span className={styles.kpiDetailSub}>Select a metric for context</span>
            </div>
            <div className={styles.kpiList}>
              {drilldownData.map((kpi, idx) => (
                <motion.div
                  key={kpi.id}
                  className={styles.kpiRow}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 + 0.45 }}
                  onClick={() => setSelectedKPI(kpi)}
                >
                  <div className={styles.kpiRowLeft}>
                    <span className={styles.kpiCategory}>{kpi.category}</span>
                    <span className={styles.kpiMetric}>{kpi.metric}</span>
                  </div>
                  <div className={styles.kpiRowRight}>
                    <span className={styles.kpiValue}>{kpi.value}</span>
                    <span className={styles.kpiTrend} style={{ color: kpi.trend.startsWith('+') || (!kpi.trend.startsWith('-') && kpi.trend !== '-') ? 'var(--green)' : kpi.trend === '-' ? 'inherit' : 'var(--orange)' }}>{kpi.trend}</span>
                    <StatusBadge status={kpi.status} />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={styles.chartFooter}>
              <RefreshCw size={11} style={{ marginRight: 6 }} />
              Auto-refreshed 4 min ago
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedKPI && (
          <motion.div className={styles.detailModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalContent} initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 350 }}>
              <button className={styles.modalClose} onClick={() => setSelectedKPI(null)}><X size={18} /></button>
              <div className={styles.modalHeader}>
                <span className={styles.modalSubtitle}>{selectedKPI.id} · {selectedKPI.category}</span>
                <h3 className={styles.modalTitle}>{selectedKPI.metric}</h3>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalRow}>
                  <span className={styles.modalRowLabel}>Current Value</span>
                  <span className={styles.modalRowValue}>{selectedKPI.value}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalRowLabel}>Status</span>
                  <StatusBadge status={selectedKPI.status} />
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalRowLabel}>Trend</span>
                  <span className={styles.modalRowValue} style={{ color: 'var(--green)' }}>{selectedKPI.trend} vs prior period</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
                  This KPI is measured against the strategic target baseline. Values outside of tolerance bands trigger automatic escalation to the Director of Projects. Review historical thresholds in the executive reporting module.
                </p>
              </div>
              <div className={styles.modalActions}>
                <button className={styles.btnOutline} onClick={() => setSelectedKPI(null)}>CLOSE</button>
                <button className={styles.btnPrimary} onClick={() => alert(`Viewing full history for ${selectedKPI.id}`)}>
                  <span>VIEW HISTORY</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
