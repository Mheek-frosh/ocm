'use client';
import StatCard from '@/components/StatCard';
import HeatmapTable from '@/components/HeatmapTable';
import AIPanel from '@/components/AIPanel';
import TrendChart from '@/components/TrendChart';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      {/* Stat cards row */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Active Engagements"
          value={42}
          subLabel="+3 this quarter"
          subColor="green"
          delay={0.1}
        />
        <StatCard
          label="Total Contract Value"
          value={1.2}
          prefix="$"
          suffix="B"
          subLabel="+12% YoY"
          subColor="green"
          delay={0.18}
        />
        <StatCard
          label="Open Risk Flags"
          value={7}
          subLabel="2 Critical"
          subColor="orange"
          delay={0.26}
          highlight
        />
        <StatCard
          label="Avg Decision Latency"
          value={2.4}
          suffix="d"
          subLabel="-0.5d vs target"
          subColor="blue"
          delay={0.34}
        />
      </div>

      {/* Main content grid */}
      <div className={styles.mainGrid}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <HeatmapTable />
          <TrendChart />
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <AIPanel />
        </div>
      </div>
    </div>
  );
}
