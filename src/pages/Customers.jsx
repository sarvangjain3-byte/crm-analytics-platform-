export default function Customers() {
  return (
    <div className="panel">
      <h2>Customers</h2>

      <p className="muted-text">
        Manage all installed customers here.
      </p>

      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Total Customers</p>
          <h2>0</h2>
        </div>

        <div className="kpi-card">
          <p>Installations</p>
          <h2>0</h2>
        </div>

        <div className="kpi-card">
          <p>Warranty</p>
          <h2>0</h2>
        </div>

        <div className="kpi-card">
          <p>Revenue</p>
          <h2>$0</h2>
        </div>
      </div>
    </div>
  );
}