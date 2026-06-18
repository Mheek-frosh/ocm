'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Sparkles, X, Bot } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './TopNav.module.css';

export default function TopNav() {
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  // Determine title and placeholder based on route
  let title = 'Executive Dashboard';
  let searchPlaceholder = 'Search projects, clients, KPIs…';

  if (pathname?.startsWith('/dashboard/cost')) {
    searchPlaceholder = 'Search Cost Codes...';
  } else if (pathname?.startsWith('/dashboard/clients')) {
    searchPlaceholder = 'Search Clients...';
  } else if (pathname?.startsWith('/dashboard/health')) {
    searchPlaceholder = 'Search Levers & Projections...';
  } else if (pathname?.startsWith('/dashboard/knowledge')) {
    searchPlaceholder = 'Search Insights & Archive...';
  }

  const notifications = [
    { id: 1, color: 'orange', title: 'Critical Delay Predicted', desc: 'Eastgate steel delivery likely delayed by 14 days.', time: '2m ago' },
    { id: 2, color: 'blue',   title: 'Procurement Window',       desc: 'Meridian HVAC vendor contract expires in 5 days.', time: '18m ago' },
    { id: 3, color: 'green',  title: 'Budget Approved',          desc: 'Harborview Q3 budget approved by board.', time: '1h ago' },
  ];

  return (
    <motion.header
      className={styles.nav}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Left: Wide search bar */}
      <motion.div
        className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ''}`}
        animate={{ width: searchFocused ? '460px' : '380px' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className={styles.searchInput}
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <AnimatePresence>
          {searchVal && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className={styles.clearBtn}
              onClick={() => setSearchVal('')}
            >
              <X size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right: Title description + divider + action icons */}
      <div className={styles.actions}>
        <span className={styles.contextTitle}>{title}</span>
        <span className={styles.divider} />

        {/* AI Assistant (Robot) */}
        <motion.button
          className={styles.iconBtn}
          whileHover={{ scale: 1.08, color: 'var(--blue)', borderColor: 'var(--blue-glow)' }}
          whileTap={{ scale: 0.95 }}
          title="Ask AI"
        >
          <Bot size={18} />
        </motion.button>

        {/* Notifications */}
        <div className={styles.notifWrap}>
          <motion.button
            className={styles.iconBtn}
            onClick={() => setShowNotif(s => !s)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={18} />
            <span className={styles.badge}>3</span>
          </motion.button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                className={styles.notifPanel}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.notifHeader}>
                  <span>Notifications</span>
                  <button className={styles.markAll}>Mark all read</button>
                </div>
                {notifications.map((n, i) => (
                  <motion.div
                    key={n.id}
                    className={styles.notifItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className={styles.notifDot} style={{
                      background: n.color === 'orange' ? 'var(--orange)' : n.color === 'blue' ? 'var(--blue)' : 'var(--green)'
                    }} />
                    <div>
                      <div className={styles.notifTitle}>{n.title}</div>
                      <div className={styles.notifDesc}>{n.desc}</div>
                      <div className={styles.notifTime}>{n.time}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <motion.button
          className={styles.iconBtn}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={18} />
        </motion.button>
      </div>
    </motion.header>
  );
}
