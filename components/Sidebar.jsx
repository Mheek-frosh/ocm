'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid, Users, HeartPulse, BarChart3, FileText,
  UserCog, BookOpen, CreditCard, Activity, Sparkles
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Portfolio',      href: '/dashboard',            icon: LayoutGrid   },
  { label: 'Clients',        href: '/dashboard/clients',    icon: Users        },
  { label: 'Project Health', href: '/dashboard/health',     icon: HeartPulse   },
  { label: 'KPIs',           href: '/dashboard/kpis',       icon: BarChart3    },
  { label: 'Reporting',      href: '/dashboard/reporting',  icon: FileText     },
  { label: 'Workforce',      href: '/dashboard/workforce',  icon: UserCog      },
  { label: 'Knowledge Base', href: '/dashboard/knowledge',  icon: BookOpen     },
  { label: 'Cost Control',   href: '/dashboard/cost',       icon: CreditCard   },
  { label: 'Diagnostics',    href: '/dashboard/diagnostics',icon: Activity     },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#0087FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke="#0087FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className={styles.logoName}>STRATOS</div>
          <div className={styles.logoSub}>Construction Intelligence</div>
        </div>
      </div>

      {/* Avatar */}
      <div className={styles.userCard}>
        <div className={styles.avatar}>JS</div>
        <div>
          <div className={styles.userName}>John Smith</div>
          <div className={styles.userRole}>Executive Director</div>
        </div>
        <div className={styles.onlineDot} />
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map((item, i) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 + 0.2, duration: 0.35 }}
            >
              <Link
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navActive : ''}`}
              >
                <Icon size={17} className={styles.navIcon} />
                <span>{item.label}</span>
                {active && <motion.div className={styles.activeBar} layoutId="activeBar" />}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* AI Insights button */}
      <motion.div
        className={styles.aiBtn}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles size={16} />
        AI Insights
      </motion.div>
    </motion.aside>
  );
}
