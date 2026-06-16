'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import styles from './AIPanel.module.css';

export default function AIPanel() {
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  async function handleApprove() {
    setApproving(true);
    await new Promise(r => setTimeout(r, 1200));
    setApproving(false);
    setApproved(true);
  }

  return (
    <div className={styles.column}>
      {/* AI Intelligence */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className={styles.cardHeader}>
          <Sparkles size={16} className={styles.sparkle} />
          <h3 className={styles.cardTitle}>AI Intelligence</h3>
        </div>

        <motion.div
          className={styles.alert}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.alertLabel} style={{ color: 'var(--orange)' }}>
            <span className={styles.alertDot} style={{ background: 'var(--orange)' }} />
            Critical Delay Predicted
          </div>
          <p className={styles.alertText}>
            Eastgate steel delivery likely delayed by 14 days due to port congestion. Suggest immediate alternative sourcing.
          </p>
        </motion.div>

        <motion.div
          className={styles.alert}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className={styles.alertLabel} style={{ color: 'var(--blue)' }}>
            <span className={styles.alertDot} style={{ background: 'var(--blue)' }} />
            Procurement Window
          </div>
          <p className={styles.alertText}>
            Meridian HVAC vendor contract expires in 5 days. Price lock recommended before Q4 increases.
          </p>
        </motion.div>
      </motion.div>

      {/* Decision Queue */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <h3 className={styles.cardTitle} style={{ marginBottom: 14 }}>Decision Queue</h3>

        <AnimatePresence mode="wait">
          {approved ? (
            <motion.div
              key="approved"
              className={styles.approvedState}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CheckCircle2 size={32} color="var(--green)" />
              <span>Budget Approved!</span>
            </motion.div>
          ) : (
            <motion.div key="queue" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={styles.queueCard}>
                <AlertTriangle size={14} className={styles.queueIcon} />
                <p className={styles.queueText}>
                  Approve Eastgate emergency budget allocation ($250k) for expedited concrete curing.
                </p>
              </div>
              <div className={styles.queueActions}>
                <motion.button
                  className={styles.btnApprove}
                  onClick={handleApprove}
                  disabled={approving}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {approving
                    ? <Loader2 size={14} className={styles.spin} />
                    : 'Approve'
                  }
                </motion.button>
                <motion.button
                  className={styles.btnReview}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Review
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
