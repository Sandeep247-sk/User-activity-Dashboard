const statuses = [
  { value: "all", label: "All statuses" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
  { value: "suspicious", label: "Suspicious" },
];

const devices = [
  { value: "all", label: "All devices" },
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
  { value: "tablet", label: "Tablet" },
];

const FilterPanel = ({ filters, onChange, onReset }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <section className="card filter-panel">
      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={filters.status} onChange={handleChange}>
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="device">Device</label>
        <select id="device" name="device" value={filters.device} onChange={handleChange}>
          {devices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group grow">
        <label htmlFor="query">Search</label>
        <input
          id="query"
          name="query"
          type="text"
          placeholder="Type username, location, or IP"
          value={filters.query}
          onChange={handleChange}
        />
      </div>

      <button type="button" className="ghost-button" onClick={onReset}>
        Reset
      </button>
    </section>
  );
};

export default FilterPanel;

