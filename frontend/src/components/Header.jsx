const Header = ({ userEmail, alertCount, onLogout, theme, onToggleTheme }) => {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Security dashboard</p>
        <h1>User Activity Monitor</h1>
        <p className="muted">
          Track authentication attempts, devices, and locations without any Tailwind or TypeScript dependencies.
        </p>
      </div>

      <div className="header-meta">
        <div className="chip">
          <span className="chip-label">Alerts</span>
          <strong>{alertCount}</strong>
        </div>
        <div className="chip">
          <span className="chip-label">Signed in</span>
          <strong>{userEmail || "anonymous@local"}</strong>
        </div>
        <button type="button" className="ghost-button theme-toggle" onClick={onToggleTheme}>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        <button type="button" className="ghost-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

