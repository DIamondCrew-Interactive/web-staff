import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronRight,
  Diamond,
  ExternalLink,
  Gamepad2,
  Globe2,
  LayoutDashboard,
  Layers3,
  Menu,
  RefreshCw,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Status } from "../shared/types";

export function Brand({ subtitle = "Staff Center" }: { subtitle?: string }) {
  return (
    <a
      className="brand"
      href="/"
      aria-label={`DiamondCrew Interactive ${subtitle}`}
    >
      <img src="/diamondcrew-logo.png" alt="" />
      <span>
        <strong>
          DiamondCrew <b>Interactive</b>
        </strong>
        <small>{subtitle}</small>
      </span>
    </a>
  );
}
export function StatusBadge({
  status,
  compact = false,
}: {
  status: Status;
  compact?: boolean;
}) {
  return (
    <span
      className={`status status-${status.toLowerCase().replaceAll(" ", "-")} ${compact ? "compact" : ""}`}
    >
      <i />
      {status}
    </span>
  );
}
export function useStatus<T extends { updatedAt: string }>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const inFlight = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    const abort = new AbortController();
    controller.current = abort;
    const timer = window.setTimeout(() => abort.abort(), 12000);
    try {
      const response = await fetch(url, {
        signal: abort.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Unavailable");
      const payload: T = await response.json();
      if (mounted.current) {
        setData(payload);
        setError(false);
      }
    } catch {
      if (mounted.current) setError(true);
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
      if (mounted.current) setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    mounted.current = true;
    void refresh();
    const interval = setInterval(() => void refresh(), 30000);
    return () => {
      mounted.current = false;
      clearInterval(interval);
      controller.current?.abort();
    };
  }, [refresh]);
  return { data, loading, error, refresh };
}
export function RefreshButton({
  loading,
  refresh,
}: {
  loading: boolean;
  refresh: () => void;
}) {
  return (
    <button className="button" onClick={refresh} disabled={loading}>
      <RefreshCw size={14} className={loading ? "spin" : ""} />
      {loading ? "Refreshing…" : "Refresh status"}
    </button>
  );
}
export function TimeLabel({ at }: { at?: string }) {
  return (
    <span className="time-label">
      {at
        ? `Last checked ${new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
        : "Connecting to status API…"}
    </span>
  );
}
export function DataNotice({ mode, error }: { mode?: string; error: boolean }) {
  return (
    <>
      {error && (
        <div className="notice error" role="alert">
          Status update failed.{" "}
          {mode
            ? "Showing the last successful reading; it may be stale."
            : "Check your connection and try refreshing."}
        </div>
      )}
      {mode === "demo" && (
        <div className="notice">
          <span className="demo-dot" /> DEMO ENVIRONMENT{" "}
          <span>
            Metrics and uptime history are illustrative. Live monitoring is not
            connected.
          </span>
        </div>
      )}
    </>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function StaffLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const navigation = [
    { id: "overview", title: "Overview", icon: LayoutDashboard },
    { id: "infrastructure", title: "Infrastructure", icon: Server },
    { id: "management", title: "Management tools", icon: Layers3 },
    { id: "roleplay", title: "Roleplay management", icon: Gamepad2 },
    { id: "servers", title: "Game servers", icon: Activity },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    navigation.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <Brand />
        <button
          className="mobile-close icon-button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
        <div className="workspace-label">
          WORKSPACE <span>INTERNAL</span>
        </div>
        <nav aria-label="Main navigation">
          {navigation.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? "active" : ""}
              aria-current={active === n.id ? "location" : undefined}
              onClick={() => {
                setActive(n.id);
                setOpen(false);
              }}
            >
              <n.icon size={17} />
              {n.title}
              {active === n.id && <ChevronRight size={14} />}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="ecosystem">
            <div className="small-diamond">
              <Diamond size={18} />
            </div>
            <strong>One crew. One ecosystem.</strong>
            <p>
              Built for the people
              <br />
              behind the experience.
            </p>
            <a
              href="https://status.diamondcrew.net"
              target="_blank"
              rel="noreferrer"
            >
              Public service status <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="secure-label">
            <ShieldCheck size={15} />
            <span>Private staff workspace</span>
            <span className="tiny-dot" />
          </div>
          <div className="version">
            DIAMONDCREW INTERACTIVE <span>v1.0</span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div>
            <button
              className="mobile-menu icon-button"
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
            <span className="breadcrumb">
              Workspace <ChevronRight size={13} /> <strong>Staff Center</strong>
            </span>
          </div>
          <div className="topbar-right">
            <a
              href="https://status.diamondcrew.net"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={14} />
              Public status
              <ExternalLink size={12} />
            </a>
            <span className="topbar-divider" />
            <div className="avatar">DC</div>
            <span className="staff-user">
              Staff workspace<small>DiamondCrew Interactive</small>
            </span>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer>
          <span>© {new Date().getFullYear()} DiamondCrew Interactive</span>
          <span>
            <ShieldCheck size={13} /> Built for the crew.
          </span>
        </footer>
      </div>
    </div>
  );
}
export function LoadingState() {
  return (
    <div className="loading-state" role="status">
      <RefreshCw className="spin" size={22} />
      <span>Loading your workspace…</span>
    </div>
  );
}
export const formatUptime = (seconds: number | null) =>
  seconds === null
    ? "—"
    : `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
export { Activity, ArrowUpRight, Check, Server };
