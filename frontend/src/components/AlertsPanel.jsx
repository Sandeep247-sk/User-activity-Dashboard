const AlertsPanel = ({ alerts }) => (
  <section className="card alerts-panel">
    <div className="panel-header">
      <div>
        <p className="muted small">Realtime signals</p>
        <h3>Alerts</h3>
      </div>
      <span className="badge neutral">{alerts.length}</span>
    </div>

    <ul className="alerts-list">
      {alerts.map((alert) => (
        <li key={alert.id}>
          <div className="stack">
            <strong>{alert.title}</strong>
            <p className="muted small">{alert.description}</p>
          </div>
          <span className="muted tiny">{new Date(alert.timestamp).toLocaleTimeString()}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default AlertsPanel;

