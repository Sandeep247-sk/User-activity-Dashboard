const ActivityTable = ({ logs }) => {
  if (!logs.length) {
    return <div className="card">No activity matches the selected filters.</div>;
  }

  return (
    <div className="card table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Timestamp</th>
            <th>User</th>
            <th>Location</th>
            <th>Device</th>
            <th>IP</th>
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className={log.status !== "success" ? "row-alert" : undefined}>
              <td>
                <span className={`status ${log.status}`}>{log.status}</span>
              </td>
              <td>
                <span className="mono">{new Date(log.timestamp).toLocaleString()}</span>
              </td>
              <td>
                <div className="stack">
                  <strong>{log.username}</strong>
                  <span className="muted small">{log.userId}</span>
                </div>
              </td>
              <td>{log.location}</td>
              <td>
                <div className="stack">
                  <span>{log.device}</span>
                  <span className="muted small">
                    {log.os} • {log.browser}
                  </span>
                </div>
              </td>
              <td className="mono">{log.ipAddress}</td>
              <td>
                {log.flagReason ? (
                  <span className="badge danger">{log.flagReason}</span>
                ) : (
                  <span className="badge neutral">None</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

