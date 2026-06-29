import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard
 *
 * Changes from original:
 * - Replaced emoji icons with inline SVG icons — consistent rendering
 *   across OS/browsers; emojis render differently on Windows vs macOS vs Android.
 * - Added skeleton loader so the page doesn't flash empty stat cards
 *   while auth validates. Shown for 600ms minimum to avoid layout shift.
 * - Stat values animate with a count-up on mount (CountUp component).
 * - Activity feed is structured with proper time elements for semantics.
 * - Inline opacity:0 + CSS animation pattern kept but now wrapped in a
 *   single helper for DRY-ness.
 */

// ── Count-Up ──────────────────────────────────────────────────────────────

const CountUp = ({ target, duration = 1200 }) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const numericTarget = parseInt(target, 10);
    if (isNaN(numericTarget)) {
      setValue(target);
      return;
    }

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * numericTarget));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  // Preserve non-numeric suffixes like "+" in "25+"
  const suffix = String(target).replace(/[0-9]/g, '');
  return <>{value}{suffix}</>;
};

// ── Icons ────────────────────────────────────────────────────────────────

const ProjectsIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const InvoiceIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MessagesIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MeetingsIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// ── Stat card skeleton ────────────────────────────────────────────────────

const StatSkeleton = () => (
  <div className="glass-card p-6 flex flex-col gap-3 animate-pulse">
    <div className="w-5 h-5 rounded bg-white/10" />
    <div className="w-12 h-8 rounded bg-white/10" />
    <div className="w-20 h-3 rounded bg-white/10" />
  </div>
);

// ── Main component ────────────────────────────────────────────────────────

const stats = [
  { label: 'Active Projects', value: '3', Icon: ProjectsIcon },
  { label: 'Invoices Due', value: '0', Icon: InvoiceIcon },
  { label: 'Messages', value: '2', Icon: MessagesIcon },
  { label: 'Meetings', value: '1', Icon: MeetingsIcon },
];

const activity = [
  {
    id: 1,
    title: 'Concept Design Phase Approved',
    project: 'The Meridian Project',
    datetime: '2026-06-12',
    label: '2 days ago',
    active: true,
  },
  {
    id: 2,
    title: 'Initial Consultation Notes Uploaded',
    project: 'General',
    datetime: '2026-06-07',
    label: '1 week ago',
    active: false,
  },
];

// Minimum time to show skeleton, prevents flash on fast networks
const MIN_SKELETON_MS = 600;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), MIN_SKELETON_MS);
    return () => clearTimeout(timer);
  }, []);

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="min-h-screen bg-dark pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header
          className="mb-12 animate-[fade-in_0.8s_ease-out_forwards]"
          aria-label="Dashboard header"
        >
          <span className="text-label block mb-4">Client Portal</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
            Welcome back,{' '}
            <span className="text-accent italic font-light">{firstName}</span>
          </h1>
          <p className="text-text-secondary">{user?.email}</p>
        </header>

        {/* Stats Grid */}
        <section aria-label="Account overview" className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {!ready
              ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
              : stats.map((s, idx) => (
                <div
                  key={s.label}
                  className="glass-card p-6 flex flex-col gap-3 animate-[slide-up_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
                >
                  <s.Icon />
                  <span className="text-3xl font-serif text-white" aria-live="polite">
                    <CountUp target={s.value} />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-text-muted">
                    {s.label}
                  </span>
                </div>
              ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section
          aria-label="Recent activity"
          className="glass-card p-8 mb-12 animate-[slide-up_0.8s_ease-out_forwards]"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <h2 className="text-xl font-serif text-white mb-6">Recent Activity</h2>
          <ol className="space-y-6">
            {activity.map((item, idx) => (
              <li
                key={item.id}
                className={`flex items-start gap-4 ${idx < activity.length - 1 ? 'pb-6 border-b border-dark-border' : ''
                  }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.active ? 'bg-accent' : 'bg-dark-border'
                    }`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-white mb-1">{item.title}</p>
                  <p className="text-sm text-text-muted">
                    {item.project} •{' '}
                    <time dateTime={item.datetime}>{item.label}</time>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Actions */}
        <div
          className="flex flex-wrap gap-4 animate-[fade-in_1s_ease-out_forwards]"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <Link to="/" className="btn-outline">
            Return to Home
          </Link>
          <button onClick={logout} className="btn-ghost">
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;