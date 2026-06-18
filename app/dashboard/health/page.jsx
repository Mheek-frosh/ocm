'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse, Sliders, AlertTriangle, Bot, RefreshCw, CheckCircle,
  TrendingUp, Calendar, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import styles from './health.module.css';

// Weeks baseline data (pink "Current" line)
const baselineData = [
  { week: 'Wk 4', Current: 5 },
  { week: 'Wk 6 (Now)', Current: 12 },
  { week: 'Wk 8', Current: 10 },
  { week: 'Wk 10', Current: 7 },
  { week: 'Wk 12', Current: 5 },
  { week: 'Wk 14', Current: 3 },
];

export default function ProjectHealthPage() {
  const [overtime, setOvertime] = useState(15); // slider 0% to 50%
  const [reallocation, setReallocation] = useState('High'); // Low, High, Critical
  const [deferScope, setDeferScope] = useState(false); // checkbox

  // Calculations based on levers
  const { daysRecovered, penaltyImpact } = useMemo(() => {
    // Overtime authorization impact
    const otDays = Math.floor(overtime * 0.25); // 15% -> ~3 days, 50% -> 12 days
    const otSavings = overtime * 0.02; // in Millions

    // Resource reallocation impact
    const rrDays = reallocation === 'High' ? 6 : reallocation === 'Critical' ? 10 : 0;
    const rrSavings = reallocation === 'High' ? 0.4 : reallocation === 'Critical' ? 0.8 : 0;

    // Scope deferment impact
    const sdDays = deferScope ? 4 : 0;
    const sdSavings = deferScope ? 0.3 : 0;

    const totalDays = otDays + rrDays + sdDays;
    const totalSavings = otSavings + rrSavings + sdSavings;
    const basePenalty = 2.4; // Base penalty projected is $2.4M
    const finalPenalty = Math.max(0, basePenalty - totalSavings);

    return {
      daysRecovered: totalDays,
      penaltyImpact: finalPenalty
    };
  }, [overtime, reallocation, deferScope]);

  // Generate dynamic chart data based on calculation
  const chartData = useMemo(() => {
    return baselineData.map((data, idx) => {
      // Before/at Now (index 0, 1), simulated matches current
      if (idx <= 1) {
        return { ...data, Simulated: data.Current };
      }
      // After Now, simulated starts curving upwards based on days recovered
      const recoveryFactor = daysRecovered * 0.8;
      const Simulated = Math.round(data.Current + (recoveryFactor * (idx - 1)));
      return {
        ...data,
        Simulated
      };
    });
  }, [daysRecovered]);

  function handleReset() {
    setOvertime(15);
    setReallocation('High');
    setDeferScope(false);
  }

  function handleApply() {
    alert(`Applied scenario: ${daysRecovered} days recovered. Current Penalty Impact projection: $${penaltyImpact.toFixed(1)}M.`);
  }

  // Custom tooltips
  function CustomChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{label}</div>
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>Current Path:</span>
          <span className={styles.tooltipVal} style={{ color: '#f43f5e' }}>
            {payload[0]?.value} Days
          </span>
        </div>
        {payload[1] && (
          <div className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>Simulated:</span>
            <span className={styles.tooltipVal} style={{ color: 'var(--blue)' }}>
              {payload[1]?.value} Days
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.breadcrumb}>Project Delta-9</span>
          <h1 className={styles.title}>Simulation Sandbox</h1>
          <p className={styles.subTitleText}>
            Adjust recovery levers below to simulate impact on the projected completion date and estimated penalty costs for Phase 3 Foundations.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline} onClick={handleReset}>
            <span>Reset</span>
          </button>
          <button className={styles.btnPrimary} onClick={handleApply}>
            <span>Apply Scenario</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column: Controls and Penalty Indicators */}
        <div className={styles.leftCol}>
          {/* Recovery Levers Card */}
          <div className={styles.leverCard}>
            <h3 className={styles.leverCardTitle}>
              <Sliders size={15} style={{ color: 'var(--blue)' }} />
              <span>Recovery Levers</span>
            </h3>

            {/* Overtime Authorization */}
            <div className={styles.leverGroup}>
              <div className={styles.leverHeader}>
                <span className={styles.leverLabel}>Overtime Authorization</span>
                <span className={styles.leverValue}>+{overtime}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                className={styles.slider}
                value={overtime}
                onChange={e => setOvertime(parseInt(e.target.value))}
              />
              <div className={styles.sliderRangeLabel}>
                <span>Base (0%)</span>
                <span>Max (50%)</span>
              </div>
            </div>

            {/* Resource Reallocation */}
            <div className={styles.leverGroup}>
              <div className={styles.leverHeader}>
                <span className={styles.leverLabel}>Resource Reallocation</span>
                <span className={styles.leverValue} style={{ color: reallocation === 'Critical' ? 'var(--red)' : 'var(--blue)' }}>
                  {reallocation === 'Low' ? 'Standard' : reallocation === 'High' ? 'High Priority' : 'Critical Priority'}
                </span>
              </div>
              <div className={styles.btnGroup}>
                {['Low', 'High', 'Critical'].map(level => (
                  <button
                    key={level}
                    className={`${styles.leverBtn} ${reallocation === level ? styles.btnActive : ''}`}
                    onClick={() => setReallocation(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Deferment */}
            <div className={styles.leverGroup}>
              <span className={styles.leverLabel}>Scope Deferment</span>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={deferScope}
                  onChange={e => setDeferScope(e.target.checked)}
                />
                <span>Defer Phase 3 Landscaping</span>
              </label>
            </div>
          </div>

          {/* Penalty Impact */}
          <div className={styles.penaltyCard}>
            <span className={styles.penaltyLabel}>Estimated Penalty Impact</span>
            <div className={styles.penaltyVal}>
              ${penaltyImpact.toFixed(1)}M
            </div>
            <span className={styles.penaltyValSub}>/ projected penalty cost</span>
          </div>

          {/* AI Analysis Live */}
          <div className={styles.aiLiveCard}>
            <div className={styles.aiLiveHeader}>
              <Bot size={15} />
              <span>AI Analysis Live</span>
            </div>
            <p className={styles.aiLiveBody}>
              Applying <strong>{overtime}% Overtime</strong> and <strong>{reallocation} Priority</strong> resource allocation recovers <strong>{daysRecovered} days</strong> of schedule variance. 
              {deferScope 
                ? ' Deferring Phase 3 Landscaping saves an additional $300k, but exposes key landscaping milestones to Q4 winter frost risks.' 
                : ' Scope deferment is currently inactive. Consider activating Defer Landscaping if further foundations delays exceed baseline tolerances.'}
            </p>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className={styles.rightCol}>
          <div className={styles.chartBlock}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleArea}>
                <h2 className={styles.chartTitle}>Schedule Variance Trajectory</h2>
                <span className={styles.chartSubtitle}>Current Path vs. Simulated Recovery</span>
              </div>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotPink} />
                  <span>Current</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDotBlue} />
                  <span>Simulated</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', flex: 1, minHeight: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 15, right: 30, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,37,48,0.6)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    unit="d"
                  />
                  <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                  
                  {/* Baseline: Pink line representing current state */}
                  <Line
                    type="monotone"
                    dataKey="Current"
                    stroke="#f43f5e"
                    strokeWidth={1.5}
                    name="Current"
                    dot={{ fill: '#f43f5e', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5, fill: '#f43f5e' }}
                  />

                  {/* Simulated: Blue line reacting to controls */}
                  <Line
                    type="monotone"
                    dataKey="Simulated"
                    stroke="#0087FF"
                    strokeWidth={3}
                    name="Simulated"
                    dot={{ fill: '#0087FF', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#0087FF' }}
                  />

                  {/* Reference line for Week 6 (Now) */}
                  <ReferenceLine
                    x="Wk 6 (Now)"
                    stroke="rgba(148, 163, 184, 0.4)"
                    strokeDasharray="3 3"
                    label={{ value: 'NOW', position: 'top', fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
