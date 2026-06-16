import styles from './dashboard.module.css';
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/TopNav';

export const metadata = {
  title: 'Dashboard — STRATOS',
  description: 'STRATOS Construction Intelligence Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopNav />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
