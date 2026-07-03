export default function Pipeline({ leads }) {
  const columns = [
    "New",
    "Contacted",
    "Interested",
    "Quote Sent",
    "Won",
    "Lost",
  ];

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h2>Sales Pipeline</h2>
        </div>
      </section>

      <div className="pipeline">
        {columns.map((status) => (
          <div className="pipeline-column" key={status}>
            <h3>{status}</h3>

            {leads
              .filter((lead) => lead.status === status)
              .map((lead) => (
                <div className="pipeline-card" key={lead.id}>
                  <strong>{lead.name}</strong>
                  <p>{lead.phone}</p>
                  <small>${lead.value || 0}</small>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}