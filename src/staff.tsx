import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowUpRight,
  Check,
  Clock3,
  Cpu,
  Database,
  Gamepad2,
  HardDrive,
  Layers3,
  LockKeyhole,
  MemoryStick,
  Network,
  PanelTop,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { services } from "./config/services";
import type { Service, StaffSnapshot } from "./shared/types";
import {
  DataNotice,
  formatUptime,
  LoadingState,
  RefreshButton,
  SectionTitle,
  StaffLayout,
  StatusBadge,
  TimeLabel,
  useStatus,
} from "./components/ui";
import "./styles.css";

const icons = {
  panel: PanelTop,
  terminal: Terminal,
  network: Network,
  game: Gamepad2,
};
function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  const body = (
    <>
      <div className="service-card-top">
        <span
          className={`service-icon ${service.project === "Prismatic" ? "pink" : ""}`}
        >
          <Icon size={21} />
        </span>
        {service.enabled ? (
          <span className="available">
            <Check size={12} /> AVAILABLE
          </span>
        ) : (
          <StatusBadge status={service.status} compact />
        )}
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="service-card-footer">
        <span>
          {service.environment ? (
            <>
              <span className={`env env-${service.environment.toLowerCase()}`}>
                {service.environment}
              </span>
              <span className="project-label">{service.project}</span>
            </>
          ) : (
            <span className="service-domain">
              {new URL(service.url).hostname}
            </span>
          )}
        </span>
        {service.enabled ? (
          <span className="launch">
            Open panel <ArrowUpRight size={15} />
          </span>
        ) : (
          <span className="locked">
            <LockKeyhole size={12} /> Coming soon
          </span>
        )}
      </div>
    </>
  );
  return service.enabled ? (
    <a
      className="service-card enabled"
      href={service.url}
      target="_blank"
      rel="noreferrer"
    >
      {body}
    </a>
  ) : (
    <article className="service-card disabled" aria-disabled="true">
      {body}
    </article>
  );
}
function Resource({
  name,
  value,
  percent,
  detail,
  icon: Icon,
  color,
}: {
  name: string;
  value: string;
  percent: number | null;
  detail: string;
  icon: typeof Cpu;
  color: string;
}) {
  return (
    <div className="resource">
      <div className="resource-label">
        <Icon size={15} />
        {name}
      </div>
      <strong>{value}</strong>
      <div
        className="meter"
        role={percent === null ? undefined : "meter"}
        aria-label={name}
        aria-valuenow={percent ?? undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          style={{
            width: `${Math.min(100, Math.max(0, percent ?? 0))}%`,
            background: color,
          }}
        />
      </div>
      <small>{detail}</small>
    </div>
  );
}
function App() {
  const { data, error, loading, refresh } =
    useStatus<StaffSnapshot>("/api/staff/status");
  const [query, setQuery] = useState("");
  const [environment, setEnvironment] = useState("ALL");
  const manager = services.find((s) => s.id === "manager")!;
  const dev = services.find((s) => s.id === "prismatic-dev")!;
  const servers =
    data?.servers.filter(
      (s) =>
        `${s.name} ${s.project} ${s.node}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (environment === "ALL" || s.environment === environment),
    ) ?? [];
  const onlineCount = data?.servers.filter((s) => s.online).length ?? 0;
  const node = data?.node;
  return (
    <StaffLayout>
      <section id="overview" className="page-heading">
        <div>
          <span className="eyebrow">
            <span className="tiny-dot" /> DIAMONDCREW CONTROL ROOM
          </span>
          <h1>
            Your crew. Your infrastructure<span>.</span>
          </h1>
          <p>
            A clear view of your servers, services and everything in between.
          </p>
        </div>
        <div className="heading-actions">
          <TimeLabel at={data?.updatedAt} />
          <RefreshButton loading={loading} refresh={refresh} />
        </div>
      </section>
      <DataNotice mode={data?.mode} error={error} />
      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-icon blue">
            <Server size={20} />
          </span>
          <div>
            <span>Infrastructure</span>
            <strong>
              {node?.online === true
                ? "Online"
                : node?.online === false
                  ? "Offline"
                  : "Unknown"}
              <i className={node?.online ? "tiny-dot" : "tiny-dot neutral"} />
            </strong>
            <small>{node?.name ?? "DIA-01"} · Primary node</small>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon pink">
            <Gamepad2 size={21} />
          </span>
          <div>
            <span>Active game servers</span>
            <strong>
              {data ? onlineCount.toString().padStart(2, "0") : "—"}
              <small>/ {data?.servers.length ?? "—"}</small>
            </strong>
            <small>Across the ecosystem</small>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon gold">
            <Users size={20} />
          </span>
          <div>
            <span>Players online</span>
            <strong>
              {data &&
              data.servers.length > 0 &&
              data.servers.every((s) => s.players !== null)
                ? data.servers
                    .reduce((sum, s) => sum + (s.players ?? 0), 0)
                    .toString()
                    .padStart(2, "0")
                : "—"}
            </strong>
            <small>All monitored environments</small>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon purple">
            <Layers3 size={20} />
          </span>
          <div>
            <span>Management tools</span>
            <strong>
              {services
                .filter((s) => s.enabled && s.category === "management")
                .length.toString()
                .padStart(2, "0")}
              <small>
                / {services.filter((s) => s.category === "management").length}
              </small>
            </strong>
            <small>Ready to launch</small>
          </div>
        </div>
      </div>
      <section id="infrastructure">
        <SectionTitle title="Infrastructure status">
          <span className="section-note">
            <span className="tiny-dot" />{" "}
            {data?.mode === "live" ? "LIVE MODE" : "PREVIEW"}{" "}
            <span className="note-divider">/</span> 30s refresh
          </span>
        </SectionTitle>
        <div className="infrastructure-grid">
          <div className="card node-card">
            <div className="node-header">
              <div className="node-identity">
                <span className="node-icon">
                  <Server size={24} />
                </span>
                <div>
                  <h3>
                    DIA-01 <span className="tag">PRIMARY NODE</span>
                  </h3>
                  <p>DiamondCrew infrastructure</p>
                </div>
              </div>
              <span
                className={`online-label ${node?.online === true ? "" : "unknown"}`}
              >
                <i />
                {node?.online === true
                  ? "Online"
                  : node?.online === false
                    ? "Offline"
                    : "Unavailable"}
              </span>
            </div>
            <div className="resource-grid">
              <Resource
                name="CPU usage"
                value={node?.cpu == null ? "—" : `${node.cpu}%`}
                percent={node?.cpu ?? null}
                detail="Host utilization"
                icon={Cpu}
                color="var(--blue)"
              />
              <Resource
                name="Memory"
                value={node?.ramUsedGb == null ? "—" : `${node.ramUsedGb} GB`}
                percent={
                  node?.ramUsedGb != null && node.ramTotalGb
                    ? (node.ramUsedGb / node.ramTotalGb) * 100
                    : null
                }
                detail={
                  node?.ramTotalGb
                    ? `of ${node.ramTotalGb} GB allocated`
                    : "Monitoring not connected"
                }
                icon={MemoryStick}
                color="var(--pink)"
              />
              <Resource
                name="Disk usage"
                value={node?.diskUsedGb == null ? "—" : `${node.diskUsedGb} GB`}
                percent={
                  node?.diskUsedGb != null && node.diskTotalGb
                    ? (node.diskUsedGb / node.diskTotalGb) * 100
                    : null
                }
                detail={
                  node?.diskTotalGb
                    ? `of ${node.diskTotalGb} GB capacity`
                    : "Monitoring not connected"
                }
                icon={HardDrive}
                color="var(--gold)"
              />
            </div>
            <div className="node-bottom">
              <span>
                <Clock3 size={14} />
                Uptime{" "}
                <strong>{formatUptime(node?.uptimeSeconds ?? null)}</strong>
              </span>
              <span>
                <ShieldCheck size={14} />
                {data?.mode === "demo"
                  ? "Sample node metrics"
                  : "Host agent not connected"}
              </span>
            </div>
          </div>
          <div className="card infrastructure-services">
            <div className="subheading">
              <h3>Core services</h3>
              <span>{data?.infrastructure.length ?? 5} SERVICES</span>
            </div>
            {data?.infrastructure.map((s, i) => (
              <div className="infra-row" key={s.id} title={s.detail}>
                <span>
                  {i === 2 ? (
                    <Database size={15} />
                  ) : i === 4 ? (
                    <Network size={15} />
                  ) : (
                    <Layers3 size={15} />
                  )}
                  <span>{s.name}</span>
                </span>
                <StatusBadge status={s.status} compact />
              </div>
            ))}
            {!data && <LoadingState />}
          </div>
        </div>
      </section>
      <section id="management">
        <SectionTitle title="Management tools">
          <span className="section-note">
            Your infrastructure, at your fingertips
          </span>
        </SectionTitle>
        <div className="management-grid">
          {services
            .filter((s) => s.category === "management")
            .map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
        </div>
      </section>
      <section id="roleplay">
        <SectionTitle title="Roleplay management">
          <span className="section-note">
            TXADMIN CONSOLES <span className="count">04</span>
          </span>
        </SectionTitle>
        <div className="roleplay-grid">
          {services
            .filter((s) => s.category === "roleplay")
            .map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
        </div>
      </section>
      <section id="servers">
        <SectionTitle title="Active game servers">
          <span className="section-note">
            <Activity size={14} /> Server telemetry
          </span>
        </SectionTitle>
        <div className="card server-list">
          <div className="table-toolbar">
            <label className="search">
              <Search size={15} />
              <input
                aria-label="Search game servers"
                placeholder="Search servers…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="filter-group" aria-label="Environment filter">
              {["ALL", "PROD", "DEV"].map((e) => (
                <button
                  key={e}
                  aria-pressed={environment === e}
                  className={environment === e ? "selected" : ""}
                  onClick={() => setEnvironment(e)}
                >
                  {e === "ALL" ? "All environments" : e}
                </button>
              ))}
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>SERVER / PROJECT</th>
                  <th>STATUS</th>
                  <th>PLAYERS</th>
                  <th>CPU</th>
                  <th>RAM</th>
                  <th>UPTIME</th>
                  <th>PORT / NODE</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="server-name">
                        <span className="server-avatar">
                          <Gamepad2 size={20} />
                        </span>
                        <div>
                          <strong>
                            {s.name}{" "}
                            <span
                              className={`env env-${s.environment.toLowerCase()}`}
                            >
                              {s.environment}
                            </span>
                          </strong>
                          <small>{s.project}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`online-label ${s.online === true ? "" : "unknown"}`}
                      >
                        <i />
                        {s.online === true
                          ? "Online"
                          : s.online === false
                            ? "Offline"
                            : "Unknown"}
                      </span>
                    </td>
                    <td>
                      <Users size={12} /> {s.players ?? "—"}{" "}
                      <span className="muted">/ {s.maxPlayers ?? "—"}</span>
                    </td>
                    <td>{s.cpu === null ? "—" : `${s.cpu.toFixed(1)}%`}</td>
                    <td>
                      {s.ramMb === null
                        ? "—"
                        : `${(s.ramMb / 1024).toFixed(2)} GB`}
                    </td>
                    <td>{formatUptime(s.uptimeSeconds)}</td>
                    <td>
                      <span className="port">{s.port}</span>
                      <small>{s.node}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {servers.length === 0 && (
            <div className="empty-state">
              <Server size={24} />
              <strong>
                {loading && !data
                  ? "Loading servers…"
                  : query || environment !== "ALL"
                    ? "No matching servers"
                    : "No game servers connected"}
              </strong>
              <span>
                {query || environment !== "ALL"
                  ? "Try another search or environment."
                  : "Add your server identifiers to the backend configuration."}
              </span>
            </div>
          )}
          <div className="table-bottom">
            <span>
              {servers.length} server{servers.length === 1 ? "" : "s"} shown
            </span>
            <span>
              Read-only monitoring <ShieldCheck size={12} />
            </span>
          </div>
        </div>
      </section>
      <section className="quick-section">
        <div>
          <span className="quick-icon">
            <Zap size={19} />
          </span>
          <div>
            <h2>Quick actions</h2>
            <p>Less clicking. More creating.</p>
          </div>
        </div>
        <div className="quick-actions">
          {manager.enabled ? (
            <a
              className="button primary"
              href={manager.url}
              target="_blank"
              rel="noreferrer"
            >
              <PanelTop size={14} />
              Open Server Manager
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <button className="button" disabled>
              Open Server Manager
            </button>
          )}
          {dev.enabled ? (
            <a
              className="button"
              href={dev.url}
              target="_blank"
              rel="noreferrer"
            >
              Open Prismatic DEV
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <button className="button" disabled title="IN PROGRESS">
              <LockKeyhole size={13} />
              Open Prismatic DEV<span className="soon">SOON</span>
            </button>
          )}
          <RefreshButton loading={loading} refresh={refresh} />
        </div>
      </section>
      {data?.mode === "live" && <p className="live-note">{data.note}</p>}
    </StaffLayout>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
