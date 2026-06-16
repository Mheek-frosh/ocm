'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import styles from './signin.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    // Simulate auth
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    router.push('/dashboard');
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.08 + 0.3, duration: 0.4, ease: [0.4,0,0.2,1] } }),
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Optima Construct workspace">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Email */}
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <label className={styles.label}>Email address</label>
          <div className={`${styles.inputWrap} ${errors.email ? styles.inputError : ''}`}>
            <Mail size={16} className={styles.inputIcon} />
            <input
              type="email"
              placeholder="name@company.com"
              className={styles.input}
              value={form.email}
              onChange={e => { setForm(f => ({...f, email: e.target.value})); setErrors(er => ({...er, email: ''})); }}
            />
          </div>
          {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
        </motion.div>

        {/* Password */}
        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible" className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Password</label>
            <button type="button" className={styles.forgotLink}>Forgot password?</button>
          </div>
          <div className={`${styles.inputWrap} ${errors.password ? styles.inputError : ''}`}>
            <Lock size={16} className={styles.inputIcon} />
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Enter your password"
              className={styles.input}
              value={form.password}
              onChange={e => { setForm(f => ({...f, password: e.target.value})); setErrors(er => ({...er, password: ''})); }}
            />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(s => !s)}>
              {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
            </button>
          </div>
          {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
        </motion.div>

        {/* Submit */}
        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? <><Loader2 size={18} className={styles.spinner}/> Signing in…</>
              : <><span>Sign In</span><ArrowRight size={18}/></>
            }
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible" className={styles.divider}>
          <span />
          <p>New to Optima Construct?</p>
          <span />
        </motion.div>

        {/* Create account link */}
        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
          <Link href="/signup" className={styles.secondaryBtn}>
            Create an account
          </Link>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
