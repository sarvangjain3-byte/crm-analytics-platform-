export default function Analytics({ leads }) {
  const total = leads.length;
  const won = leads.filter((lead) => lead.status === "Won").length;
  const lost = leads.filter((lead) => lead.status === "Lost").length;
  const quotes = leads.filter((lead) => lead.status === "Quote Sent").length;
  const revenue = leads
    .filter((lead) => lead.status === "Won")
    .reduce((sum, lead) => sum + Number(lead.value || 0), 0);

  const conversion = total ? Math.round((won / total) * 100) : 0;

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Sales Analytics</h2>
          <p className="muted-text">Track conversion, quotes, revenue and performance.</p>
        </div>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card"><p>Conversion Rate</p><h2>{conversion}%</h2></div>
        <div className="kpi-card"><p>Quotes Sent</p><h2>{quotes}</h2></div>
        <div className="kpi-card"><p>Won / Lost</p><h2>{won}/{lost}</h2></div>
        <div className="kpi-card"><p>Revenue</p><h2>${revenue.toLocaleString()}</h2></div>
      </section>

      <section className="panel">
        <h2>Status Breakdown</h2>
        <div className="snapshot-list">
          {["New", "Contacted", "Interested", "Quote Sent", "Won", "Lost"].map((status) => (
            <div key={status}>
              <span>{status}</span>
              <strong>{leads.filter((lead) => lead.status === status).length}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}