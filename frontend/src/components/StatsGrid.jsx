const StatCard = ({ label, value, sublabel }) => (
  <div className="card stat-card">
    <p className="muted">{label}</p>
    <div className="stat-value">{value}</div>
    {sublabel && <p className="muted small">{sublabel}</p>}
  </div>
);

const StatsGrid = ({ stats }) => (
  <section className="stats-grid">
    {stats.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </section>
);

export default StatsGrid;

