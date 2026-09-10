import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCheck,
  CircleAlert,
  Globe2,
  HeartPulse,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import {
  Brand,
  DataNotice,
  LoadingState,
  RefreshButton,
  SectionTitle,
  StatusBadge,
  TimeLabel,
  useStatus,
} from "./components/ui";
import type { PublicSnapshot } from "./shared/types";
import "./styles.css";

function PublicApp() {
  const { data, loading, error, refresh } =
    useStatus<PublicSnapshot>("/api/public/status");
  const operational = data?.overall === "OPERATIONAL";
  return (
    <div className="public-shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="public-header">
        <Brand subtitle="Service Status" />
        <a href="https://diamondcrew.net" target="_blank" rel="noreferrer">
          DiamondCrew website <ArrowUpRight size={14} />
        </a>
      </header>
      <main id="main" className="public-main">
        <div className="public-intro">
          <span className="eyebrow">DIAMONDCREW ECOSYSTEM</span>
          <h1>
            Good experiences start
            <br />
            with a solid connection<span>.</span>
          </h1>
          <p>Availability and updates for the worlds we build together.</p>
        </div>
        <DataNotice mode={data?.mode} error={error} />
        <section
          className={`public-hero card ${operational ? "healthy" : "attention"}`}
        >
          <div className="hero-check">
            {operational ? <CheckCheck size={29} /> : <Activity size={29} />}
          </div>
          <div>
            <h2>
              {!data
                ? "Checking service status"
                : data.maintenance.active
                  ? "Scheduled maintenance in progress"
                  : operational
                    ? "All systems operational"
                    : "Some services need attention"}
            </h2>
            <p>
              {error
                ? "Updates are currently unavailable. Displayed readings may be stale."
                : data?.mode === "demo"
                  ? "This is a preview of the DiamondCrew status experience."
                  : operational
                    ? "Everything is running as expected."
                    : "Service availability is degraded or monitoring data is unavailable."}
            </p>
          </div>
          <div className="public-refresh">
            <RefreshButton loading={loading} refresh={refresh} />
            <TimeLabel at={data?.updatedAt} />
          </div>
        </section>
        {data?.incident && (
          <section className="incident-banner" role="alert">
            <CircleAlert size={21} />
            <div>
              <span className="eyebrow">ACTIVE INCIDENT</span>
              <h2>{data.incident.title}</h2>
              <p>{data.incident.message}</p>
            </div>
          </section>
        )}
        <section>
          <SectionTitle title="Service availability">
            <span className="section-note">
              {data?.mode === "demo"
                ? "60 DAYS · SAMPLE HISTORY"
                : "60 DAYS · HISTORY NOT CONNECTED"}
            </span>
          </SectionTitle>
          <div className="card public-services">
            {data?.services.map((s) => (
              <article className="public-service" key={s.id}>
                <div className="public-service-heading">
                  <div>
                    <span
                      className={`service-icon ${s.id === "prismatic" ? "pink" : ""}`}
                    >
                      {s.id === "web" ? (
                        <Globe2 size={20} />
                      ) : s.id === "infrastructure" ? (
                        <ShieldCheck size={20} />
                      ) : (
                        <HeartPulse size={20} />
                      )}
                    </span>
                    <div>
                      <h3>{s.name}</h3>
                      <p>{s.description}</p>
                    </div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
                <div
                  className="history-bars"
                  aria-label={
                    data.mode === "demo"
                      ? "Illustrative 60 day history, 100 percent operational"
                      : "Historical monitoring data is not available"
                  }
                >
                  {s.history.map((status, i) => (
                    <span
                      key={i}
                      className={
                        status
                          ? `history-${status.toLowerCase()}`
                          : "history-unknown"
                      }
                      title={`${60 - i} day${60 - i === 1 ? "" : "s"} ago: ${status ?? "No data"}${data.mode === "demo" ? " (sample)" : ""}`}
                    />
                  ))}
                </div>
                <div className="history-caption">
                  <span>60 days ago</span>
                  <span>
                    {s.uptime === null
                      ? "Uptime data not available"
                      : `${s.uptime.toFixed(2)}% uptime · sample`}
                  </span>
                  <span>Today</span>
                </div>
              </article>
            ))}
            {!data && <LoadingState />}
          </div>
        </section>
        <div className="public-bottom-grid">
          <section className="card update-card">
            <div className="update-icon">
              <CalendarClock size={21} />
            </div>
            <span className="eyebrow">PLANNED WORK</span>
            <h2>
              {data?.maintenance.active
                ? "Maintenance in progress"
                : "Scheduled maintenance"}
            </h2>
            <p>
              {data?.maintenance.message ?? "Loading maintenance information…"}
            </p>
            <span
              className={`update-foot ${data?.maintenance.active ? "gold-text" : ""}`}
            >
              {data?.maintenance.active ? (
                <Wrench size={13} />
              ) : (
                <Check size={13} />
              )}{" "}
              {data?.maintenance.active
                ? "We’re working on it"
                : data
                  ? "No upcoming interruptions announced"
                  : "Checking updates"}
            </span>
          </section>
          <section className="card update-card">
            <div className="update-icon pink">
              <Activity size={21} />
            </div>
            <span className="eyebrow">CURRENT UPDATES</span>
            <h2>
              {data?.incident
                ? "An incident is being tracked"
                : "No active incidents"}
            </h2>
            <p>
              {data?.incident
                ? "Follow the incident notice above for the latest information."
                : data
                  ? "Any announced service disruptions will appear here. Historical incident tracking is not connected yet."
                  : "Checking for announced incidents…"}
            </p>
            <span className="update-foot">
              <ShieldCheck size={13} />
              Transparent by design
            </span>
          </section>
        </div>
        <div className="public-bottom-note">
          <span className="tiny-dot" /> Automatically checked every 30 seconds{" "}
          <span>·</span> All times in your local timezone
        </div>
      </main>
      <footer className="public-footer">
        <span>© {new Date().getFullYear()} DiamondCrew Interactive</span>
        <span>
          Built for the community. <img src="/diamondcrew-logo.png" alt="" />
        </span>
      </footer>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<PublicApp />);
