'use client';
import { motion } from 'framer-motion';
import {
  Activity, Server, Database, Shield, Zap, RefreshCw, CheckCircle, AlertTriangle, XCircle
} from 'lucide-react';
import styles from './diagnostics.module.css';

const diagnosticsData = [
  {
    id: 1,
    title: 'System Performance',
    icon: Zap,
    status: 'good',
    metrics: [
      { label: 'CPU Usage', value: '34%' },
      { label: 'Memory', value: '16GB / 64GB' },
      { label: 'Uptime', value: '99.99%' },
    ]
  },
  {
    id: 2,
    title: 'Database Cluster',
    icon: Database,
    status: 'good',
    metrics: [
      { label: 'Active Conns', value: '452' },
      { label: 'Query Latency', value: '24ms' },
      { label: 'Replica Sync', value: 'Up to date' },
    ]
  },
  {
    id: 3,
    title: 'API Gateway',
    icon: Server,
    status: 'warning',
    metrics: [
      { label: 'Req / sec', value: '1,204' },
      { label: 'Error Rate', value: '0.4%' },
      { label: 'Avg Latency', value: '210ms' },
    ]
  },
  {
    id: 4,
    title: 'Security Services',
    icon: Shield,
    status: 'good',
    metrics: [
      { label: 'Firewall', value: 'Active' },
      { label: 'WAF Rules', value: 'Updated' },
      { label: 'Threat Blocks', value: '124 (24h)' },
    ]
  },
  {
    id: 5,
    title: 'Data Ingestion',
    icon: Activity,
    status: 'error',
    metrics: [
      { label: 'Pipe Status', value: 'Stalled' },
      { label: 'Queue Depth', value: '45,210' },
      { label: 'Last Sync', value: '4 hours ago' },
    ]
  },
];

export default function DiagnosticsPage() {
  const handleRunAll = () => {
    alert('Running complete system diagnostics...');
  };

  const StatusIcon = ({ status }) => {
    if (status === 'good') return <CheckCircle size={16} />;
    if (status === 'warning') return <AlertTriangle size={16} />;
    return <XCircle size={16} />;
  };

  const getStatusClass = (status) => {
    if (status === 'good') return styles.statusGood;
    if (status === 'warning') return styles.statusWarning;
    return styles.statusError;
  };

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>System Health</span>
          <h1 className={styles.title}>Diagnostics</h1>
          <p className={styles.subTitleText}>
            Real-time monitoring and diagnostic tools for all Optima Construct core services and data pipelines.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={handleRunAll}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} /> Run Diagnostics
            </span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.mainGrid}>
        {diagnosticsData.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className={styles.diagCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={18} style={{ color: 'var(--blue)' }} />
                  <span className={styles.cardTitle}>{item.title}</span>
                </div>
                <div className={`${styles.statusIcon} ${getStatusClass(item.status)}`}>
                  <StatusIcon status={item.status} />
                </div>
              </div>
              
              <div className={styles.metricsList}>
                {item.metrics.map((metric, idx) => (
                  <div key={idx} className={styles.metricItem}>
                    <span className={styles.metricLabel}>{metric.label}</span>
                    <span className={styles.metricValue}>{metric.value}</span>
                  </div>
                ))}
              </div>

              <button className={styles.actionBtn}>
                View Details
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
