'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import styles from '@/app/signin/signin.module.css';
import su from './signup.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  function update(key, val) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters required';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    return e;
  }

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#0087FF'][strength];

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setDone(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push('/dashboard');
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07 + 0.25, duration: 0.4, ease: [0.4,0,0.2,1] } }),
  };

  if (done) return (
    <AuthLayout title="Account created!" subtitle="Redirecting you to your dashboard…">
      <motion.div
        className={su.successWrap}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <CheckCircle2 size={64} color="#22c55e" />
        <p className={su.successText}>Welcome to STRATOS, {form.name.split(' ')[0]}!</p>
      </motion.div>
    </AuthLayout>
  );

  return (
    <AuthLayout title="Create your account" subtitle="Join STRATOS and command your projects with intelligence">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Full Name */}
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Full Name</label>
          <div className={`${styles.inputWrap} ${errors.name ? styles.inputError : ''}`}>
            <User size={16} className={styles.inputIcon} />
            <input type="text" placeholder="John Smith" className={styles.input} value={form.name} onChange={e => update('name', e.target.value)} />
          </div>
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        </motion.div>

        {/* Company */}
        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Company <span className={su.optional}>(optional)</span></label>
          <div className={styles.inputWrap}>
            <Building2 size={16} className={styles.inputIcon} />
            <input type="text" placeholder="Acme Construction LLC" className={styles.input} value={form.company} onChange={e => update('company', e.target.value)} />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Email address</label>
          <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ''}`}>
            <Mail size={16} className={styles.inputIcon} />
            <input type="email" placeholder="name@company.com" className={styles.input} value={form.email} onChange={e => update('email', e.target.value)} />
          </div>
          {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
        </motion.div>

        {/* Password */}
        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Password</label>
          <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
            <Lock size={16} className={styles.inputIcon} />
            <input type={showPwd ? 'text' : 'password'} placeholder="Min. 8 characters" className={styles.input} value={form.password} onChange={e => update('password', e.target.value)} />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(s => !s)}>
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
          {form.password && (
            <div className={su.strengthWrap}>
              <div className={su.strengthBar}>
                {[1,2,3,4].map(i => (
                  <div key={i} className={su.strengthSeg} style={{ background: i <= strength ? strengthColor : 'var(--border-light)' }} />
                ))}
              </div>
              <span className={su.strengthLabel} style={{ color: strengthColor }}>{strengthLabel}</span>
            </div>
          )}
          {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
        </motion.div>

        {/* Confirm */}
        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Confirm Password</label>
          <div className={`${styles.inputWrap} ${errors.confirm ? styles.inputError : ''}`}>
            <Lock size={16} className={styles.inputIcon} />
            <input type={showPwd ? 'text' : 'password'} placeholder="Repeat your password" className={styles.input} value={form.confirm} onChange={e => update('confirm', e.target.value)} />
          </div>
          {errors.confirm && <p className={styles.errorMsg}>{errors.confirm}</p>}
        </motion.div>

        {/* Submit */}
        <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? <><Loader2 size={18} className={styles.spinner}/> Creating account…</>
              : <><span>Create Account</span><ArrowRight size={18}/></>
            }
          </button>
        </motion.div>

        <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible" className={styles.divider}>
          <span /><p>Already have an account?</p><span />
        </motion.div>

        <motion.div custom={7} variants={fieldVariants} initial="hidden" animate="visible">
          <Link href="/signin" className={styles.secondaryBtn}>Sign in instead</Link>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
