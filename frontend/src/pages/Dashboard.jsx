import { useCallback, useEffect, useMemo, useState } from "react";

import ActivityTable from "../components/ActivityTable.jsx";
import AlertsPanel from "../components/AlertsPanel.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import Header from "../components/Header.jsx";
import StatsGrid from "../components/StatsGrid.jsx";
import { fetchActivityLogs } from "../services/api.js";

const defaultFilters = {
  status: "all",
  device: "all",
  query: "",
};

const DashboardPage = ({ onLogout }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [userEmail, setUserEmail] = useState(() => window.localStorage.getItem("lastLoggedInUser") || "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("dashboardTheme") || "light";
  });

  const loadLogs = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await fetchActivityLogs();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 30000);
    return () => clearInterval(interval);
  }, [loadLogs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dashboardTheme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const applyFilters = () => {
      const nextLogs = logs.filter((log) => {
        const matchesStatus = filters.status === "all" || log.status === filters.status;
        const matchesDevice =
          filters.device === "all" || log.device.toLowerCase() === filters.device.toLowerCase();

        const searchTarget = `${log.username} ${log.location} ${log.ipAddress}`.toLowerCase();
        const matchesQuery = searchTarget.includes(filters.query.toLowerCase());

        return matchesStatus && matchesDevice && matchesQuery;
      });

      setFilteredLogs(nextLogs);
    };

    applyFilters();
  }, [filters, logs]);

  const stats = useMemo(() => {
    const total = logs.length;
    const successes = logs.filter((log) => log.status === "success").length;
    const failures = logs.filter((log) => log.status === "failed").length;
    const suspicious = logs.filter((log) => log.status === "suspicious").length;

    return [
      { label: "Total logins", value: total },
      { label: "Successful", value: successes },
      { label: "Failed", value: failures },
      { label: "Suspicious", value: suspicious },
    ];
  }, [logs]);

  const alerts = useMemo(
    () =>
      logs
        .filter((log) => log.status !== "success")
        .slice(0, 5)
        .map((log) => ({
          id: log.id,
          title: log.status === "failed" ? "Failed login" : "Suspicious pattern",
          description: `${log.username} • ${log.location}`,
          timestamp: log.timestamp,
        })),
    [logs],
  );

  return (
    <div className={`page theme-${theme}`}>
      <Header
        userEmail={userEmail}
        alertCount={alerts.length}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        onLogout={() => {
          onLogout();
        }}
      />

      <main className="layout">
        <section className="column">
          <StatsGrid stats={stats} />
          <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

          {isLoading && <div className="card">Loading activity...</div>}
          {error && <div className="card error-card">{error}</div>}
          {!isLoading && !error && <ActivityTable logs={filteredLogs} />}
        </section>

        <section className="column narrow">
          <AlertsPanel alerts={alerts} />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;

