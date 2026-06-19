'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCog, Download, AlertTriangle, Clock, MapPin,
  Phone, Mail, Calendar as CalIcon, Shield, CheckCircle2, X, TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip
} from 'recharts';
import styles from './workforce.module.css';

const workforce = [
  { id: 'WF-001', name: 'Marcus Vance', role: 'Site Superintendent', project: 'Delta-9 Foundations', location: 'Site A - Pod B', status: 'ON DUTY', utilization: 92, phone: '+1 555-2341', email: 'm.vance@optima.com', certs: ['OSHA 30', 'First Aid', 'Confined Space'], shifts: 28, overtime: 4.5 },
  { id: 'WF-002', name: 'Evelyn Sterling', role: 'Project Engineer', project: 'Delta-9 Foundations', location: 'Site Office', status: 'ON DUTY', utilization: 88, phone: '+1 555-2342', email: 'e.sterling@optima.com', certs: ['PMP', 'NCEES PE'], shifts: 26, overtime: 2.0 },
  { id: 'WF-003', name: 'David Kincaid', role: 'Quality Manager', project: 'Delta-9 Foundations', location: 'Site A - QC Lab', status: 'ON DUTY', utilization: 95, phone: '+1 555-2343', email: 'd.kincaid@optima.com', certs: ['ACI Level II', 'ISO 9001'], shifts: 30, overtime: 6.0 },
  { id: 'WF-004', name: 'Sarah Jenkins', role: 'Commercial Lead', project: 'Delta-9 Foundations', location: 'Head Office', status: 'REMOTE', utilization: 78, phone: '+1 555-2344', email: 's.jenkins@optima.com', certs: ['RICS MRICS'], shifts: 22, overtime: 1.5 },
  { id: 'WF-005', name: 'James Cooper', role: 'Safety Officer', project: 'Delta-9 Foundations', location: 'Site A - All Zones', status: 'ON DUTY', utilization: 90, phone: '+1 555-2345', email: 'j.cooper@optima.com', certs: ['OSHA 30', 'NASP CSP'], shifts: 28, overtime: 3.0 },
  { id: 'WF-006', name: 'Priya Nair', role: 'Structural Engineer', project: 'Delta-9 Foundations', location: 'Site Office', status: 'LEAVE', utilization: 0, phone: '+1 555-2346', email: 'p.nair@optima.com', certs: ['NCEES SE', 'LEED AP'], shifts: 0, overtime: 0 },
  { id: 'WF-007', name: 'Tomás Reyes', role: 'Foreman - Steel', project: 'Delta-9 Pod A', location: 'Site A - Pod A', status: 'ON DUTY', utilization: 85, phone: '+1 555-2347', email: 't.reyes@optima.com', certs: ['Welding Cert 6G', 'OSHA 10'], shifts: 25, overtime: 5.5 },
  { id: 'WF-008', name: 'Aisha Okonkwo', role: 'MEP Coordinator', project: 'Delta-9 Pod B', location: 'Site B - MEP Area', status: 'ON DUTY', utilization: 80, phone: '+1 555-2348', email: 'a.okonkwo@optima.com', certs: ['NFPA 70E', 'NICET III'], shifts: 24, overtime: 2.5 },
];

const utilizationData = [
  { dept: 'Engineering', utilization: 88, benchmark: 85 },
  { dept: 'Management', utilization: 84, benchmark: 82 },
  { dept: 'Safety', utilization: 91, benchmark: 88 },
  { dept: 'Quality', utilization: 93, benchmark: 90 },
  { dept: 'Site Ops', utilization: 79, benchmark: 82 },
];

function StatusBadge({ status }) {
  const cls = status === 'ON DUTY'
    ? styles.badgeActive
    : status === 'REMOTE'
      ? styles.badgeRemote
      : status === 'LEAVE'
        ? styles.badgeLeave
        : styles.badgeLeave;
  return <span className={`${styles.statusBadge} ${cls}`}>{status}</span>;
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
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
}

export default function WorkforcePage() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const onDutyCount = workforce.filter(w => w.status === 'ON DUTY').length;
  const avgUtil = Math.round(workforce.reduce((sum, w) => sum + w.utilization, 0) / workforce.length);
  const leaveCount = workforce.filter(w => w.status === 'LEAVE').length;

  const filteredWorkforce = workforce.filter(w => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'ON DUTY') return w.status === 'ON DUTY' || w.status === 'REMOTE';
    return w.status === activeFilter;
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Project Delta-9</span>
          <h1 className={styles.title}>Workforce<br />Management</h1>
          <p className={styles.subTitleText}>
            Track team allocation, utilization, certifications, and schedule compliance across all active project resources.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <Download size={14} />
            <span>EXPORT ROSTER</span>
          </button>
          <button className={styles.btnPrimary}>
            <UserCog size={14} />
            <span>ADD RESOURCE</span>
          </button>
        </div>
      </div>

      <div className={styles.filterTabs}>
        {['ALL', 'ON DUTY', 'REMOTE', 'LEAVE'].map(f => (
          <button key={f} className={`${styles.filterTabBtn} ${activeFilter === f ? styles.filterActive : ''}`} onClick={() => setActiveFilter(f)}>
            {f === 'ON DUTY' ? `On Duty (${onDutyCount + 1})` : f === 'REMOTE' ? 'Remote' : f === 'LEAVE' ? `On Leave (${leaveCount})` : `All (${workforce.length})`}
          </button>
        ))}
      </div>

      <div className={styles.statsGrid}>
        <motion.div className={`${styles.statCard} ${styles.statCardGlow}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Active Team Members</span>
            <UserCog size={14} style={{ color: 'var(--blue)' }} />
          </div>
          <div className={styles.statValue}>{onDutyCount + 1}</div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Avg Utilization</span>
            <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className={styles.statValue}>{avgUtil}%</div>
          <div className={styles.statSubMain}>
            <div className={styles.utilBarTrack}>
              <motion.div className={styles.utilBarFill} initial={{ width: 0 }} animate={{ width: `${avgUtil}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} />
            </div>
          </div>
        </motion.div>

        <motion.div className={`${styles.statCard} ${styles.statCardGlowOrange}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.19 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Overtime Alerts</span>
            <AlertTriangle size={14} style={{ color: 'var(--orange)' }} />
          </div>
          <div className={`${styles.statValue} ${styles.statValueOrange}`}>3</div>
          <div className={styles.statSub}><span style={{ color: 'var(--orange)' }}>Exceeding 5h/week</span></div>
        </motion.div>

        <motion.div className={styles.statCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Certified Staff</span>
            <Shield size={14} style={{ color: 'var(--green)' }} />
          </div>
          <div className={`${styles.statValue} ${styles.statValueGreen}`}>100%</div>
          <div className={styles.statSub}><span style={{ color: 'var(--green)' }}>All credentials current</span></div>
        </motion.div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <motion.div className={styles.rosterBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Project Roster · Alpha Team</h2>
              <span className={styles.blockSub}>{filteredWorkforce.length} members</span>
            </div>
            <div className={styles.rosterTable}>
              <div className={styles.tableHead}>
                <span className={styles.th}>Member</span>
                <span className={`${styles.th} ${styles.thWide}`}>Role / Project</span>
                <span className={styles.th}>Status</span>
                <span className={styles.th}>Util.</span>
                <span className={`${styles.th} ${styles.thLg}`}>OT/Wk</span>
                <span className={`${styles.th} ${styles.thAction}${styles.thActionCenter}`}></span>
              </div>
              {filteredWorkforce.map((person, idx) => (
                <motion.div
                  key={person.id}
                  className={styles.tableRow}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 + 0.35 }}
                  onClick={() => setSelectedStaff(person)}
                >
                  <span className={styles.td}>
                    <div className={styles.avatar}>
                      <span className={styles.avatarInitials}>
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </span>
                  <span className={`${styles.td} ${styles.tdWide}`}>
                    <span className={styles.personName}>{person.name}</span>
                    <span className={styles.personRole}>{person.role}</span>
                  </span>
                  <span className={styles.td}><StatusBadge status={person.status} /></span>
                  <span className={styles.td}>
                    <div className={styles.utilMini}>
                      <div className={styles.utilMiniBar} style={{ width: `${person.utilization}%`, background: person.utilization >= 90 ? 'var(--orange)' : 'var(--blue)' }} />
                      <span className={styles.utilVal}>{person.utilization}%</span>
                    </div>
                  </span>
                  <span className={`${styles.td} ${styles.tdLg}`}>
                    <span className={styles.otVal}>{person.overtime}h</span>
                  </span>
                  <span className={`${styles.td} ${styles.tdAction}${styles.tdActionCenter}`}>
                    <button className={styles.actionBtn} title="View profile" onClick={(e) => { e.stopPropagation(); setSelectedStaff(person); }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={styles.rightCol}>
          <motion.div className={styles.utilBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Utilization by Dept.</h2>
              <span className={styles.blockSub}>vs 82% benchmark</span>
            </div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.5)" horizontal={false} />
                  <XAxis type="number" domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <YAxis dataKey="dept" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="utilization" fill="#0A84FF" radius={[0, 4, 4, 0]} name="Utilization" maxBarSize={16} />
                  <Bar dataKey="benchmark" fill="rgba(100,116,139,0.25)" radius={[0, 4, 4, 0]} name="Benchmark" maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.utilTips}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Overtime Risk</h4>
              {workforce.filter(w => w.overtime >= 5).map(w => (
                <div key={w.id} className={styles.riskMiniRow} onClick={() => setSelectedStaff(w)}>
                  <AlertTriangle size={12} style={{ color: 'var(--orange)' }} />
                  <span className={styles.riskName}>{w.name}</span>
                  <span className={styles.riskVal}>{w.overtime}h/wk</span>
                </div>
              ))}
              <div className={styles.chartFooter}>
                Sourced from site biometric feeds · Updated 5 min ago
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedStaff && (
          <motion.div className={styles.detailModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalContent} initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 350 }}>
              <button className={styles.modalClose} onClick={() => setSelectedStaff(null)}><X size={18} /></button>
              <div className={styles.modalHeader}>
                <div className={styles.modalProfile}>
                  <div className={styles.modalAvatar}>
                    {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className={styles.modalSubtitle}>{selectedStaff.id}</span>
                    <h3 className={styles.modalTitle}>{selectedStaff.name}</h3>
                    <p className={styles.modalRole}>{selectedStaff.role}</p>
                  </div>
                </div>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><MapPin size={12} /> Location</span>
                    <span className={styles.infoVal}>{selectedStaff.location}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><Phone size={12} /> Phone</span>
                    <a href={`tel:${selectedStaff.phone}`} className={styles.infoValLink}>{selectedStaff.phone}</a>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><Mail size={12} /> Email</span>
                    <a href={`mailto:${selectedStaff.email}`} className={styles.infoValLink}>{selectedStaff.email}</a>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><CalIcon size={12} /> Shifts This Month</span>
                    <span className={styles.infoVal}>{selectedStaff.shifts}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><Clock size={12} /> Utilization</span>
                    <span className={styles.infoVal}>{selectedStaff.utilization}%</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}><AlertTriangle size={12} /> Overtime</span>
                    <span className={styles.infoVal} style={{ color: selectedStaff.overtime >= 5 ? 'var(--orange)' : 'inherit' }}>{selectedStaff.overtime}h/wk</span>
                  </div>
                </div>
                <div className={styles.certSection}>
                  <h4 className={styles.certTitle}><Shield size={13} /> Certifications &amp; Credentials</h4>
                  <div className={styles.certGrid}>
                    {selectedStaff.certs.map(c => (
                      <span key={c} className={styles.certBadge}><CheckCircle2 size={11} />{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.modalActions}>
                <button className={styles.btnOutline} onClick={() => setSelectedStaff(null)}>CLOSE</button>
                <button className={styles.btnPrimary} onClick={() => alert(`Viewing full timesheet for ${selectedStaff.id}`)}>
                  <span>VIEW TIMESHEET</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
