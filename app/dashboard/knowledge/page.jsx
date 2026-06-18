'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Sparkles, Clock, Calendar, CheckCircle, ShieldAlert,
  X, ArrowRight, HelpCircle, FileText
} from 'lucide-react';
import styles from './knowledge.module.css';

const trendingInsights = {
  main: {
    id: 't-main',
    category: 'SUPPLY CHAIN RISK',
    title: 'Predictive Delay: Structural Steel Lead Times',
    body: 'Machine learning models detect a consistent 14-day variance across 3 concurrent Tier 1 projects regarding regional steel delivery. Mitigate by advancing procurement schedules for Q3 structural packages immediately.',
    confidence: '92%',
    time: 'Just updated',
    details: 'Regional supply chains for hot-rolled steel members are experiencing capacity constraints. Logistics logs suggest a backlog in raw billet refining. Advancing the procurement timeline protects core structural phases on Meridian, Eastgate, and Harborview.'
  },
  secondary: [
    {
      id: 't-sec1',
      category: 'COST OVERRUN PATTERN',
      title: 'MEP Variations in Retrofits',
      body: 'Historical data shows 22% average budget variance in downtown commercial retrofits. Focus contingency allocations here.',
      details: 'Concealed utilities and structural anomalies in load-bearing masonry accounts for 85% of these variations. Suggest deploying 3D lidar scans prior to final MEP baselines.'
    },
    {
      id: 't-sec2',
      category: 'QUALITY OPTIMIZATION',
      title: 'Concrete Curing Metrics',
      body: 'Recent winter pours achieved target strength 15% faster utilizing adjusted aggregate ratios. Update template specs.',
      details: 'By increasing silica fume ratios by 2.5% and adjusting thermal blankets, early strength gains were accelerated. Reducing formwork striking latency by 36 hours.'
    }
  ]
};

const lessonsArchive = {
  schedule: {
    iconClass: 'columnIconSchedule',
    icon: Clock,
    count: 124,
    items: [
      {
        id: 'l-s1',
        title: 'Weather Delay Mitigation',
        desc: 'Pre-planning temporary enclosures for Q4 facade installations saved approx. 12 days.',
        project: 'PROJ: ALPHA-1',
        date: 'MAR 12, 2024',
        details: 'Enclosing levels 3-6 ahead of winter storm baselines allowed interior rough-ins to continue uninterrupted. Cost of enclosures ($22K) was offset by labor efficiency gains.'
      },
      {
        id: 'l-s2',
        title: 'Subcontractor Sequencing',
        desc: 'HVAC rough-in overlap with framing caused rework. Strict milestone sign-offs required.',
        project: 'PROJ: OMEGA-4',
        date: 'FEB 28, 2024',
        details: 'Framing inspections must be fully approved and signed off before ductwork fabricators begin staging. Coordinated 3D models were bypassed, leading to header clashes.'
      }
    ]
  },
  cost: {
    iconClass: 'columnIconCost',
    icon: FileText,
    count: 89,
    items: [
      {
        id: 'l-c1',
        title: 'Material Price Escalation clause',
        desc: 'Lack of escalation clause for copper piping led to 14% budget hit. New standard contract...',
        project: 'PROJ: DELTA-2',
        date: 'JAN 15, 2024',
        details: 'Baseline copper index was not pegged to London Metal Exchange rates. All future HVAC contracts now include a standard +-5% index trigger threshold.'
      },
      {
        id: 'l-c2',
        title: 'Value Engineering: Lighting',
        desc: 'Swapping spec to Alternative Vendor B yielded $45k savings with zero architectural...',
        project: 'PROJ: BETA-9',
        date: 'DEC 10, 2023',
        details: 'Direct replacement of architectural luminaires with identical performance specs. Approved by owner and code consultant within 4 working days.'
      }
    ]
  },
  quality: {
    iconClass: 'columnIconQuality',
    icon: CheckCircle,
    count: 215,
    items: [
      {
        id: 'l-q1',
        title: 'Waterproofing Failure Points',
        desc: 'Identified recurring flash detailing issues at roof penetrations. Added secondary...',
        project: 'PROJ: SIGMA-1',
        date: 'MAR 02, 2024',
        details: 'Coping transition details leaked during hydrostatic testing. Standard detail has been updated to include high-performance double-membrane seals at curbs.'
      },
      {
        id: 'l-q2',
        title: 'Millwork Finish Inconsistencies',
        desc: 'Environmental controls during acclimatization phase were insufficient. Strict humidity...',
        project: 'PROJ: GAMMA-7',
        date: 'FEB 14, 2024',
        details: 'Premium walnut paneling warped post-installation due to dry winter HVAC conditions. Wood panels must reside on-site in sealed conditioning space for 7 days minimum.'
      }
    ]
  }
};

export default function KnowledgeBasePage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className={styles.wrap}>
      {/* Trending AI Insights */}
      <div className={styles.archiveWrapper}>
        <div className={styles.sectionHeader}>
          <span className={styles.breadcrumb}>Intelligence Hub</span>
          <h2 className={styles.sectionTitle}>
            <Sparkles size={16} style={{ color: 'var(--blue)' }} />
            <span>Trending AI Insights</span>
          </h2>
          <p className={styles.sectionSubtitle}>Cross-project analysis synthesized in real-time.</p>
        </div>

        <div className={styles.trendingGrid}>
          {/* Main Alert Card */}
          <motion.div
            className={styles.mainAlertCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <div className={styles.cardHeader}>
                <span className={`${styles.tagBadge} ${styles.tagGreen}`}>
                  {trendingInsights.main.category}
                </span>
                <span className={styles.timeMuted}>
                  <Clock size={11} />
                  <span>{trendingInsights.main.time}</span>
                </span>
              </div>
              <h3 className={styles.mainAlertTitle}>{trendingInsights.main.title}</h3>
              <p className={styles.mainAlertBody}>{trendingInsights.main.body}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <button
                className={styles.footerLink}
                onClick={() => setSelectedItem({ ...trendingInsights.main, type: 'Trending Alert' })}
              >
                <span>VIEW DATA CONTEXT</span>
                <ArrowRight size={12} />
              </button>
              <span className={styles.confidenceVal}>
                Confidence: {trendingInsights.main.confidence}
              </span>
            </div>
          </motion.div>

          {/* Secondary Cards Stack */}
          <div className={styles.secondaryCol}>
            {trendingInsights.secondary.map((item, idx) => (
              <motion.div
                key={item.id}
                className={styles.secondaryCard}
                onClick={() => setSelectedItem({ ...item, type: 'AI Trend Pattern' })}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.15 }}
              >
                <span className={styles.secondaryCategory}>{item.category}</span>
                <h4 className={styles.secondaryTitle}>{item.title}</h4>
                <p className={styles.secondaryBody}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons Learned Archive */}
      <div className={styles.archiveWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <BookOpen size={16} style={{ color: 'var(--blue)' }} />
            <span>Lessons Learned Archive</span>
          </h2>
          <p className={styles.sectionSubtitle}>Historical data mined from completed and active construction phases.</p>
        </div>

        <div className={styles.archiveGrid}>
          {/* Schedule */}
          <motion.div
            className={styles.archiveCol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.columnHeader}>
              <div className={styles.columnTitle}>
                <Clock size={14} className={styles.columnIconSchedule} />
                <span>SCHEDULE</span>
              </div>
              <span className={styles.columnBadge}>{lessonsArchive.schedule.count} Entries</span>
            </div>
            <div className={styles.lessonsList}>
              {lessonsArchive.schedule.items.map(item => (
                <div
                  key={item.id}
                  className={styles.lessonCard}
                  onClick={() => setSelectedItem({ ...item, type: 'Schedule Lesson' })}
                >
                  <h4 className={styles.lessonTitle}>{item.title}</h4>
                  <p className={styles.lessonBody}>{item.desc}</p>
                  <div className={styles.lessonFooter}>
                    <span className={styles.projCode}>{item.project}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.btnViewAll} onClick={() => alert('Opening schedule archive...')}>
              VIEW ALL SCHEDULE INSIGHTS
            </button>
          </motion.div>

          {/* Cost */}
          <motion.div
            className={styles.archiveCol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.columnHeader}>
              <div className={styles.columnTitle}>
                <FileText size={14} className={styles.columnIconCost} />
                <span>COST</span>
              </div>
              <span className={styles.columnBadge}>{lessonsArchive.cost.count} Entries</span>
            </div>
            <div className={styles.lessonsList}>
              {lessonsArchive.cost.items.map(item => (
                <div
                  key={item.id}
                  className={styles.lessonCard}
                  onClick={() => setSelectedItem({ ...item, type: 'Cost Lesson' })}
                >
                  <h4 className={styles.lessonTitle}>{item.title}</h4>
                  <p className={styles.lessonBody}>{item.desc}</p>
                  <div className={styles.lessonFooter}>
                    <span className={styles.projCode}>{item.project}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.btnViewAll} onClick={() => alert('Opening cost archive...')}>
              VIEW ALL COST INSIGHTS
            </button>
          </motion.div>

          {/* Quality */}
          <motion.div
            className={styles.archiveCol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={styles.columnHeader}>
              <div className={styles.columnTitle}>
                <CheckCircle size={14} className={styles.columnIconQuality} />
                <span>QUALITY</span>
              </div>
              <span className={styles.columnBadge}>{lessonsArchive.quality.count} Entries</span>
            </div>
            <div className={styles.lessonsList}>
              {lessonsArchive.quality.items.map(item => (
                <div
                  key={item.id}
                  className={styles.lessonCard}
                  onClick={() => setSelectedItem({ ...item, type: 'Quality Lesson' })}
                >
                  <h4 className={styles.lessonTitle}>{item.title}</h4>
                  <p className={styles.lessonBody}>{item.desc}</p>
                  <div className={styles.lessonFooter}>
                    <span className={styles.projCode}>{item.project}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.btnViewAll} onClick={() => alert('Opening quality archive...')}>
              VIEW ALL QUALITY INSIGHTS
            </button>
          </motion.div>
        </div>
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setSelectedItem(null)}>
                <X size={18} />
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalCategory}>{selectedItem.type || 'Insight Detail'}</span>
                <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
              </div>

              <div className={styles.modalBody}>
                <p>{selectedItem.details || selectedItem.body}</p>

                {selectedItem.project && (
                  <div className={styles.modalRow}>
                    <div className={styles.modalRowItem}>
                      <span className={styles.modalLabel}>Project Code</span>
                      <span className={styles.modalVal}>{selectedItem.project}</span>
                    </div>
                    <div className={styles.modalRowItem}>
                      <span className={styles.modalLabel}>Date Logged</span>
                      <span className={styles.modalVal}>{selectedItem.date}</span>
                    </div>
                  </div>
                )}
              </div>

              <button className={styles.btnModalClose} onClick={() => setSelectedItem(null)}>
                Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
