'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

function useCounter(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime = null;
    const isFloat = String(target).includes('.');
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;
      setValue(isFloat ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(isFloat ? numericTarget.toFixed(1) : numericTarget);
    }
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function StatCard({ label, value, prefix = '', suffix = '', subLabel, subColor = 'green', delay = 0, highlight = false }) {
  const numericVal = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  const animated = useCounter(numericVal, 1400);

  // Reconstruct display value
  const display = (() => {
    const s = String(value);
    if (s.includes('.')) {
      const decimals = s.split('.')[1]?.length ?? 1;
      return String(animated).includes('.') ? animated : Number(animated).toFixed(decimals);
    }
    if (s.includes('B')) return `$${(animated / 1).toFixed(1)}B`;
    if (s.includes('d')) return `${animated}d`;
    return animated;
  })();

  return (
    <motion.div
      className={`${styles.card} ${highlight ? styles.highlight : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, boxShadow: highlight ? 'var(--shadow-orange)' : 'var(--shadow-card)' }}
    >
      <p className={styles.label}>{label}</p>
      <motion.div
        className={styles.value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        {prefix}{display}{suffix}
      </motion.div>
      {subLabel && (
        <p className={`${styles.sub} ${styles[subColor]}`}>{subLabel}</p>
      )}
    </motion.div>
  );
}
