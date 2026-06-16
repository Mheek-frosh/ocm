'use client';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import styles from './TrendChart.module.css';

const data = [
  { month: 'Jan', costVariance: -2,  resourceUtil: 68 },
  { month: 'Feb', costVariance: -5,  resourceUtil: 72 },
  { month: 'Mar', costVariance: -3,  resourceUtil: 78 },
  { month: 'Apr', costVariance: -8,  resourceUtil: 75 },
  { month: 'May', costVariance: -4,  resourceUtil: 82 },
  { month: 'Jun', costVariance: -12, resourceUtil: 86 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          <span style={{ color: '#94a3b8' }}>{p.name}:</span>
          <span style={{ color: '#f1f5f9', fontWeight: 600 }}>
            {p.dataKey === 'costVariance' ? `${p.value}%` : `${p.value}%`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart() {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2 className={styles.heading}>Portfolio Trend: Variance &amp; Utilization</h2>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#0087FF' }} />
            Cost Variance
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#22c55e' }} />
            Resource Utilization
          </div>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0087FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0087FF" stopOpacity={0.02}/>
              </linearGradient>
              <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.8)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="costVariance"
              stroke="#0087FF"
              strokeWidth={2}
              fill="url(#costGrad)"
              name="Cost Variance"
              dot={{ fill: '#0087FF', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: '#0087FF' }}
            />
            <Area
              type="monotone"
              dataKey="resourceUtil"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#utilGrad)"
              name="Resource Utilization"
              dot={{ fill: '#22c55e', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: '#22c55e' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
