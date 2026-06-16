'use client';
import { motion } from 'framer-motion';
import styles from './auth.module.css';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className={styles.wrapper}>
      {/* Animated background orbs */}
      <div className={styles.orbBlue} />
      <div className={styles.orbOrange} />
      <div className={styles.orbBlue2} />

      {/* Grid overlay */}
      <div className={styles.grid} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#0087FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke="#0087FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.logoName}>STRATOS</div>
            <div className={styles.logoSub}>Construction Intelligence</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        {children}
      </motion.div>
    </div>
  );
}
