export default function Quotes({ leads }) {
  const quoted = leads.filter((lead) => lead.status === "Quote Sent");
  const won = leads.filter((lead) => lead.status === "Won");

  const quoteValue = quoted.reduce((sum, lead) => sum + Number(lead.value || 0), 0);
  const wonValue = won.reduce((sum, lead) => sum + Number(lead.value || 0), 0);

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Quotes</p>
          <h2>Quote Management</h2>
          <p className="muted-text">Track sent quotes and won quote value.</p>
        </div>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card"><p>Quotes Sent</p><h2>{quoted.length}</h2></div>
        <div className="kpi-card"><p>Quote Value</p><h2>${quoteValue.toLocaleString()}</h2></div>
        <div className="kpi-card"><p>Won Quotes</p><h2>{won.length}</h2></div>
        <div className="kpi-card"><p>Won Value</p><h2>${wonValue.toLocaleString()}</h2></div>
      </section>

      <section className="panel">
        <h2>Quote List</h2>

        <div className="mini-list">
          {quoted.length === 0 && <p>No quotes sent yet.</p>}

          {quoted.map((lead) => (
            <div className="mini-item" key={lead.id}>
              <div>
                <strong>{lead.name}</strong>
                <p>{lead.email || lead.phone || "No contact"}</p>
              </div>
              <span>${Number(lead.value || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}