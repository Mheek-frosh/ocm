'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronDown,
  Database,
  Gauge,
  Layers,
  Menu,
  Shield,
  TrendingUp,
  Workflow,
  X,
} from 'lucide-react';
import styles from './landing.module.css';

const logos = ['Turner Construction', 'Skanska', 'Bechtel', 'Fluor', 'Jacobs'];

const pillars = [
  {
    icon: TrendingUp,
    title: 'Predictive Intelligence',
    desc: 'Forecast schedule risks and cost overruns before they impact project delivery.',
  },
  {
    icon: Shield,
    title: 'Margin Protection',
    desc: 'Track project profitability in real time and identify commercial risks early.',
  },
  {
    icon: Workflow,
    title: 'Operational Automation',
    desc: 'Automate reporting, meeting summaries, and project coordination processes.',
  },
  {
    icon: Database,
    title: 'Institutional Knowledge',
    desc: 'Capture lessons learned and transform project experience into reusable knowledge.',
  },
];

const features = [
  {
    eyebrow: 'Executive visibility',
    title: 'Executive Command Center',
    desc: 'Monitor every active project from a single operational dashboard.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&w=1200&q=82',
    alt: 'Premium construction control room',
    bullets: ['Portfolio-wide risk view', 'Executive-ready reporting', 'Live project status tracking'],
  },
  {
    eyebrow: 'Portfolio control',
    title: 'Portfolio Visibility',
    desc: 'Track risks, schedules, procurement, and financial performance in real time.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=82',
    alt: 'Construction project dashboard',
    bullets: ['Schedule and procurement visibility', 'Financial performance tracking', 'Commercial risk prioritization'],
  },
  {
    eyebrow: 'Decision confidence',
    title: 'Data-Driven Decisions',
    desc: 'Turn field data into executive insights that improve project outcomes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=82',
    alt: 'Construction analytics dashboard',
    bullets: ['Unified operational signals', 'Actionable margin insights', 'Faster executive alignment'],
  },
];

const deploymentSteps = [
  { num: '01', title: 'Diagnostic', desc: 'Assess business objectives and operational requirements.' },
  { num: '02', title: 'Pilot', desc: 'Deploy on a high-priority project.' },
  { num: '03', title: 'Integration', desc: 'Connect ERP, procurement, and field systems.' },
  { num: '04', title: 'Rollout', desc: 'Expand deployment across active projects.' },
  { num: '05', title: 'Optimization', desc: 'Refine models and reporting workflows.' },
];

const results = [
  { value: 20, label: 'Reduction in project delays' },
  { value: 15, label: 'Increase in margin visibility' },
  { value: 40, label: 'Faster reporting cycles' },
  { value: 25, label: 'Improvement in operational efficiency' },
];

const testimonials = [
  { quote: 'Optima Construct transformed the way we monitor project performance.', name: 'Elena Morris', role: 'Chief Project Officer', company: 'Meridian Build Group' },
  { quote: 'Executive visibility improved dramatically within weeks.', name: 'Marcus Chen', role: 'Portfolio Director', company: 'Northstar Developments' },
  { quote: 'The deployment process was smooth and delivered immediate value.', name: 'Priya Shah', role: 'Operations Lead', company: 'Apex Infrastructure' },
  { quote: 'Our project teams now have one trusted source for margin and schedule risk.', name: 'Daniel Brooks', role: 'VP Construction', company: 'Harborline Contractors' },
  { quote: 'We can intervene earlier and protect outcomes before issues escalate.', name: 'Sophia Reed', role: 'Program Executive', company: 'Summit Commercial' },
  { quote: 'The platform gives leadership the clarity needed for high-stakes decisions.', name: 'James Walker', role: 'Managing Director', company: 'Keystone Projects' },
];

const faqs = [
  { q: 'How long does deployment take?', a: 'The structured deployment pathway is designed to deliver measurable value within 90 days, starting with a focused pilot and expanding from there.' },
  { q: 'Can it integrate with existing ERP systems?', a: 'Yes. Optima Construct is built to connect with ERP, procurement, scheduling, and field reporting systems used by enterprise construction teams.' },
  { q: 'Is training included?', a: 'Training is included for executive users, project leaders, and operational teams so adoption is practical and consistent across the portfolio.' },
  { q: 'Can it support multiple projects?', a: 'Yes. The platform is designed for multi-project portfolio visibility, executive reporting, and operational coordination across active construction programs.' },
  { q: 'What type of construction firms is it designed for?', a: 'It is designed for enterprise construction firms, developers, owners, and delivery teams managing complex portfolios with margin, schedule, and reporting pressure.' },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const revealUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const buttonVariants = {
  tap: { scale: 0.96 },
  hover: { y: -2, scale: 1.02 },
};

function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let frame;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <span ref={ref} className={styles.resultNumber}>{display}{suffix}</span>;
}

export default function LandingPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const particles = useMemo(() => Array.from({ length: 26 }, (_, index) => ({
    id: index,
    x: (index * 37) % 100,
    y: 12 + ((index * 23) % 72),
    size: 2 + (index % 4),
    delay: `${(index % 9) * -0.7}s`,
  })), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function go(path) {
    router.push(path);
  }

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Deployment', href: '#deployment' },
    { label: 'Insights', href: '#insights' },
    { label: 'About', href: '#about' },
  ];

  return (
    <main className={`${styles.landing} bg-[#060B14] text-[#F8FAFC]`}>
      <div className={styles.blueprintGrid} />
      <div className={styles.particleField}>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              '--delay': particle.delay,
            }}
            animate={{ opacity: [0.18, 0.55, 0.18] }}
            transition={{ duration: 5 + (particle.id % 4), repeat: Infinity, delay: particle.id * 0.08 }}
          />
        ))}
      </div>

      <motion.nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className={styles.navInner}>
          <button type="button" className={styles.logo} onClick={() => go('/')} aria-label="Optima Construct home">
            <span className={styles.logoMark}><Activity size={18} /></span>
            <span className={styles.logoText}>OPTIMA CONSTRUCT</span>
          </button>

          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>{link.label}</a>
            ))}
          </div>

          <div className={styles.navActions}>
            <button type="button" className={styles.navGhost} onClick={() => go('/login')}>Login</button>
            <motion.button type="button" className={styles.navPrimary} onClick={() => go('/signup')} whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>Request Demo</motion.button>
          </div>

          <button type="button" className={styles.menuButton} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div className={styles.mobileMenu} initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.2 }}>
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>{link.label}<ArrowRight size={14}/></a>
              ))}
              <button type="button" className={styles.mobileLink} onClick={() => { go('/login'); setMenuOpen(false); }}>Login <ArrowRight size={14}/></button>
              <button type="button" className={styles.mobileLink} onClick={() => { go('/signup'); setMenuOpen(false); }}>Request Demo <ArrowRight size={14}/></button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section id="platform" className={styles.hero}>
        <motion.div className={styles.heroLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={sectionVariants}>
          <motion.div className={styles.badge} variants={revealUp}>
            <span className={styles.liveDot} />
            ● LIVE CONSTRUCTION INTELLIGENCE
          </motion.div>

          <motion.h1 className={styles.heroTitle} variants={revealUp}>
            The Decision Platform<br />
            for <span>Construction Leaders.</span>
          </motion.h1>

          <motion.p className={styles.heroDesc} variants={revealUp}>
            Move from reactive project management to proactive operational excellence. Protect margins, reduce risk, and improve delivery outcomes across your construction portfolio.
          </motion.p>

          <motion.div className={styles.heroActions} variants={revealUp}>
            <motion.button type="button" className={styles.primaryButton} onClick={() => go('/signup')} whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
              Request a Demo <ArrowRight size={17} />
            </motion.button>
            <motion.button type="button" className={styles.secondaryButton} onClick={() => go('/login')} whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
              Explore Platform
            </motion.button>
          </motion.div>

          <motion.div className={styles.heroProof} variants={revealUp}>
            <span className={styles.proofPill}><span className={styles.check}>✓</span> Enterprise-ready deployment</span>
            <span className={styles.proofPill}><span className={styles.check}>✓</span> Portfolio margin visibility</span>
            <span className={styles.proofPill}><span className={styles.check}>✓</span> Executive command center</span>
          </motion.div>
        </motion.div>

        <motion.div className={styles.dashboardWrap} initial={{ opacity: 0, scale: 0.96, y: 24 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }} animate={{ y: [0, -14, 0] }}>
          <div className={styles.dashboardMockup}>
            <div className={styles.dashboardHeader}>
              <div className={styles.windowDots}>
                <span className={styles.windowDot} />
                <span className={styles.windowDot} />
                <span className={styles.windowDot} />
              </div>
              <div className={styles.dashboardTitle}>Portfolio Command</div>
            </div>

            <div className={styles.dashboardBody}>
              <div className={styles.dashboardMainGrid}>
                <div className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <span className={styles.panelLabel}>Revenue Forecast</span>
                    <span className={styles.panelValue}>+18.6%</span>
                  </div>
                  <svg className={styles.revenueChart} viewBox="0 0 360 152" role="img" aria-label="Revenue forecast chart">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2D9CFF" stopOpacity="0.42" />
                        <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 128 C42 94 62 112 96 78 C130 44 154 88 190 56 C226 24 252 70 286 42 C320 14 340 36 360 22 L360 152 L0 152 Z" fill="url(#chartFill)" />
                    <path d="M0 128 C42 94 62 112 96 78 C130 44 154 88 190 56 C226 24 252 70 286 42 C320 14 340 36 360 22" fill="none" stroke="#2D9CFF" strokeWidth="3" strokeLinecap="round" />
                    <path d="M0 132 C44 118 76 124 112 104 C150 84 176 96 214 76 C252 56 286 66 360 42" fill="none" stroke="rgba(248,250,252,0.35)" strokeWidth="2" strokeDasharray="6 8" />
                  </svg>
                </div>

                <div className={styles.metricStack}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricTop}>
                      <span className={styles.metricLabel}>Margin Protection</span>
                      <BarChart3 size={16} color="#0A84FF" />
                    </div>
                    <div className={styles.metricNumber}>94.2%</div>
                    <div className={styles.metricSub}>Protected margin index</div>
                    <div className={styles.progressTrack}><motion.div className={styles.progressFill} initial={{ width: 0 }} whileInView={{ width: '94.2%' }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 }} /></div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricTop}>
                      <span className={styles.metricLabel}>Cost Variance</span>
                      <TrendingUp size={16} color="#22C55E" />
                    </div>
                    <div className={styles.metricNumber}>-6.8%</div>
                    <div className={styles.metricSub}>Variance reduction</div>
                    <div className={styles.progressTrack}><motion.div className={styles.progressFill} initial={{ width: 0 }} whileInView={{ width: '68%' }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.35 }} /></div>
                  </div>
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelLabel}>Cost Variance Graph</span>
                  <span className={styles.panelValue}>Live</span>
                </div>
                <div className={styles.varianceBars}>
                  {[42, 58, 36, 72, 48, 84, 62, 90].map((height, index) => (
                    <motion.div key={index} className={styles.varianceBar} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08 * index }} />
                  ))}
                </div>
              </div>

              <div className={styles.healthGrid}>
                {[
                  { label: 'Schedule', status: 'On Track', icon: Gauge },
                  { label: 'Procurement', status: 'Watch', icon: Layers },
                  { label: 'Financial', status: 'Protected', icon: Shield },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={styles.healthCard}>
                      <Icon className={styles.healthIcon} size={18} />
                      <div>
                        <div className={styles.healthLabel}>{item.label}</div>
                        <div className={styles.healthStatus}>{item.status}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div className={`${styles.floatingCard} ${styles.one}`} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className={styles.floatingLabel}>Active Projects</div>
            <div className={styles.floatingValue}>128</div>
          </motion.div>
          <motion.div className={`${styles.floatingCard} ${styles.two}`} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}>
            <div className={styles.floatingLabel}>Risk Flags Resolved</div>
            <div className={styles.floatingValue}>41</div>
          </motion.div>
        </motion.div>
      </section>

      <section className={styles.section}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Trusted adoption</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>Trusted by Construction Teams</motion.h2>
        </motion.div>
        <motion.div className={styles.trustLogos} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {logos.map((logo) => (
            <motion.div key={logo} className={styles.logoCard} variants={revealUp}>{logo}</motion.div>
          ))}
        </motion.div>
      </section>

      <section id="solutions" className={styles.section}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Core Value Pillars</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>Core Value Pillars</motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={revealUp}>Fragmented project data leads to expensive surprises. Optima Construct unifies site, procurement, financial, and operational intelligence.</motion.p>
        </motion.div>

        <motion.div className={styles.pillarsGrid} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} className={styles.pillarCard} variants={revealUp} whileHover={{ y: -8, borderColor: 'rgba(10,132,255,0.35)' }}>
                <div className={styles.pillarIconWrap}><Icon size={22} /></div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className={styles.section}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Built for excellence</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>Built for Construction Excellence</motion.h2>
        </motion.div>

        <div className={styles.featureStack}>
          {features.map((feature, index) => (
            <motion.article key={feature.title} className={`${styles.featureCard} ${index % 2 === 1 ? styles.featureCardReverse : ''}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div className={styles.featureImageWrap} whileHover={{ scale: 1.015 }} transition={{ duration: 0.35 }}>
                <Image src={feature.image} alt={feature.alt} fill className={styles.featureImage} sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" quality={82} />
              </motion.div>
              <div className={styles.featureContent}>
                <motion.div className={styles.featureEyebrow}>{feature.eyebrow}</motion.div>
                <motion.h3 className={styles.featureTitle}>{feature.title}</motion.h3>
                <motion.p className={styles.featureDesc}>{feature.desc}</motion.p>
                <motion.div className={styles.featureBullets}>
                  {feature.bullets.map((bullet) => (
                    <span key={bullet} className={styles.featureBullet}><span className={styles.check}>✓</span>{bullet}</span>
                  ))}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="deployment" className={`${styles.section} ${styles.deploymentSection}`}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Rapid value</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>90-Day Rapid Deployment</motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={revealUp}>A structured onboarding process that delivers measurable value quickly.</motion.p>
        </motion.div>

        <motion.div className={styles.timeline} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.timelineLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
          {deploymentSteps.map((step, index) => (
            <motion.div key={step.num} className={styles.timelineStep} variants={revealUp}>
              <div className={styles.stepNumber}>{step.num}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="results" className={styles.section}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Measured outcomes</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>Real Results</motion.h2>
        </motion.div>

        <motion.div className={styles.resultsGrid} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          {results.map((result) => (
            <motion.div key={result.label} className={styles.resultCard} variants={revealUp}>
              <AnimatedCounter target={result.value} suffix="%" />
              <p className={styles.resultLabel}>{result.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="insights" className={`${styles.section} ${styles.testimonialSection}`}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Executive confidence</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>What Construction Leaders Say</motion.h2>
          <motion.p className={styles.sectionSubtitle} variants={revealUp}>Trusted by teams managing complex portfolios, commercial programs, and high-value delivery outcomes.</motion.p>
        </motion.div>

        <div className={styles.carouselViewport} aria-label="Testimonials">
          <motion.div className={styles.testimonialTrack} animate={{ x: ['-50%', 0] }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}>
            {[...testimonials, ...testimonials].map((testimonial, index) => {
              const initials = testimonial.name.split(' ').map((part) => part[0]).join('');
              return (
                <motion.article key={`${testimonial.name}-${index}`} className={styles.testimonialCard} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                  <div>
                    <div className={styles.quoteMark}>“</div>
                    <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                  </div>
                  <div className={styles.testimonialPerson}>
                    <div className={styles.avatar}>{initials}</div>
                    <div>
                      <div className={styles.personName}>{testimonial.name}</div>
                      <div className={styles.personRole}>{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <motion.div className={styles.sectionHeader} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <motion.div className={styles.sectionKicker} variants={revealUp}>Deployment questions</motion.div>
          <motion.h2 className={styles.sectionTitle} variants={revealUp}>Frequently Asked Questions</motion.h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div key={faq.q} className={styles.faqItem} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <button type="button" className={styles.faqButton} aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                  <span>{faq.q}</span>
                  <ChevronDown className={styles.faqIcon} size={16} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div className={styles.faqAnswer} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }}>
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="about" className={styles.finalCta}>
        <div className={styles.finalGlow} />
        <motion.div className={styles.finalCtaInner} initial={{ opacity: 0, y: 34, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <motion.h2 className={styles.finalTitle}>Secure Your Construction Portfolio Today</motion.h2>
          <motion.p className={styles.finalSubtitle}>Stop reacting. Start leading with confidence.</motion.p>
          <motion.div className={styles.finalActions}>
            <motion.button type="button" className={styles.primaryButton} onClick={() => go('/signup')} whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
              Request Demo <ArrowRight size={17} />
            </motion.button>
            <motion.button type="button" className={styles.secondaryButton} onClick={() => go('/login')} whileHover={buttonVariants.hover} whileTap={buttonVariants.tap}>
              Create Account
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <button type="button" className={styles.footerLogo} onClick={() => go('/')}>
            <span className={styles.logoMark}><Activity size={16} /></span>
            <span>OPTIMA CONSTRUCT</span>
          </button>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Platform</div>
            <a href="#platform" className={styles.footerLink}>Command Center</a>
            <a href="#solutions" className={styles.footerLink}>Value Pillars</a>
            <a href="#deployment" className={styles.footerLink}>Deployment</a>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Solutions</div>
            <a href="#solutions" className={styles.footerLink}>Portfolio Visibility</a>
            <a href="#results" className={styles.footerLink}>Executive Insights</a>
            <a href="#insights" className={styles.footerLink}>Testimonials</a>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Insights</div>
            <a href="#results" className={styles.footerLink}>Real Results</a>
            <a href="#deployment" className={styles.footerLink}>90-Day Plan</a>
            <a href="#about" className={styles.footerLink}>About</a>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Legal</div>
            <a href="#platform" className={styles.footerLink}>Privacy Policy</a>
            <a href="#platform" className={styles.footerLink}>Terms of Service</a>
            <a href="#about" className={styles.footerLink}>Contact</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Optima Construct. All rights reserved.</span>
          <span>The Decision Platform for Construction Leaders</span>
        </div>
      </footer>
    </main>
  );
}
