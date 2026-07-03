export default function Calendar({ leads = [] }) {
  const today = new Date().toISOString().slice(0, 10);

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().slice(0, 10);

  const todayFollowUps = leads.filter((lead) => lead.followUpDate === today);
  const tomorrowFollowUps = leads.filter((lead) => lead.followUpDate === tomorrow);

  const overdue = leads.filter(
    (lead) =>
      lead.followUpDate &&
      lead.followUpDate < today &&
      lead.status !== "Won" &&
      lead.status !== "Lost"
  );

  const upcoming = leads
    .filter(
      (lead) =>
        lead.followUpDate &&
        lead.followUpDate >= today &&
        lead.status !== "Won" &&
        lead.status !== "Lost"
    )
    .sort((a, b) => a.followUpDate.localeCompare(b.followUpDate));

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Calendar</p>
          <h2>Follow Up Calendar</h2>
          <p className="muted-text">Track today, tomorrow, overdue and upcoming follow-ups.</p>
        </div>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card">
          <p>Today</p>
          <h2>{todayFollowUps.length}</h2>
        </div>

        <div className="kpi-card">
          <p>Tomorrow</p>
          <h2>{tomorrowFollowUps.length}</h2>
        </div>

        <div className="kpi-card">
          <p>Upcoming</p>
          <h2>{upcoming.length}</h2>
        </div>

        <div className="kpi-card">
          <p>Overdue</p>
          <h2>{overdue.length}</h2>
        </div>
      </section>

      <section className="dashboard-grid">
        <FollowUpPanel title="Today Follow Ups" items={todayFollowUps} />
        <FollowUpPanel title="Overdue Follow Ups" items={overdue} danger />
      </section>

      <section className="panel">
        <h2>Upcoming Follow Ups</h2>

        <div className="mini-list">
          {upcoming.length === 0 && <p>No upcoming follow-ups.</p>}

          {upcoming.map((lead) => (
            <div className="mini-item" key={lead.id}>
              <div>
                <strong>{lead.name}</strong>
                <p>{lead.phone || lead.email || "No contact"}</p>
              </div>
              <span>{lead.followUpDate}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FollowUpPanel({ title, items, danger }) {
  return (
    <div className="panel">
      <h2>{title}</h2>

      <div className="mini-list">
        {items.length === 0 && <p>No items.</p>}

        {items.map((lead) => (
          <div className="mini-item" key={lead.id}>
            <div>
              <strong>{lead.name}</strong>
              <p>{lead.phone || lead.email || "No contact"}</p>
            </div>
            <span style={danger ? { color: "#fca5a5" } : undefined}>
              {lead.followUpDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}