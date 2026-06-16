'use client';
import { motion } from 'framer-motion';
import styles from './HeatmapTable.module.css';

const projects = [
  { name: 'Harborview Development', phase: 'Execution',    spi: 1.05, cpi: 1.02, status: 'On Track'  },
  { name: 'Meridian Tower',         phase: 'Procurement',  spi: 0.92, cpi: 0.98, status: 'At Risk'   },
  { name: 'Eastgate Infrastructure',phase: 'Design',       spi: 0.85, cpi: 0.88, status: 'Critical'  },
];

function StatusBadge({ status }) {
  const cls = status === 'On Track' ? 'badge-on-track' : status === 'At Risk' ? 'badge-at-risk' : 'badge-critical';
  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}

function SpiCell({ val }) {
  const color = val >= 1 ? 'var(--green)' : val >= 0.9 ? 'var(--orange)' : 'var(--red)';
  return <span style={{ color, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{val.toFixed(2)}</span>;
}

export default function HeatmapTable() {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <h2 className={styles.heading}>Project Health Heatmap</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Phase</th>
              <th>SPI</th>
              <th>CPI</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <motion.tr
                key={p.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className={styles.row}
              >
                <td className={styles.projectName}>{p.name}</td>
                <td className={styles.phase}>{p.phase}</td>
                <td><SpiCell val={p.spi} /></td>
                <td><SpiCell val={p.cpi} /></td>
                <td><StatusBadge status={p.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
